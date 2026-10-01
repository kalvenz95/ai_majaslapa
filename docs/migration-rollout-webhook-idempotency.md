# Migrāciju rollout ceļvedis webhook idempotences labojumam

Šis ceļvedis attiecas uz migrāciju ķēdi:

- `20260929115900_baseline`
- `20260929120000_referral_payment_credit`

Mērķis: droši ieviest `ReferralPaymentCredit` ledger tabulu un backfill, lai atkārtoti Stripe `invoice.payment_succeeded` notikumi nepieskaita partnera kredītu vēlreiz.

## 1) Pirmsdarbi (obligāti)

1. Izveido pilnu datubāzes rezerves kopiju (schema + data) un pārbaudi atjaunošanas procedūru testa vidē.
2. Pārliecinies, ka tev ir precīzs mērķa vides statuss:
   - vai DB jau satur `_prisma_migrations` ierakstus;
   - vai DB shēma jau eksistē no pre-fix izvietošanas (`db push`/manuālas izmaiņas).
3. Veic rollout vispirms disposable/staging vidē ar reprezentatīviem datiem.

---

## 2) Scenārijs A — svaiga (empty) datubāze

Ja datubāze ir jauna un bez lietotāju datiem:

```powershell
$env:DATABASE_URL = "postgresql://..."
$env:DIRECT_URL = $env:DATABASE_URL
npx prisma migrate deploy
npx prisma migrate status
```

Sagaidāmais rezultāts:

- `migrate deploy` beidzas bez kļūdām.
- Pēdējais `migrate status` rāda, ka nav pending migrāciju.

**STOP ROLLOUT**, ja:

- `migrate deploy` vai pēdējais `migrate status` atgriež kļūdu;
- statusā redzamas negaidītas pending/failed migrācijas.

Šajā scenārijā **nedrīkst** lietot `migrate resolve --applied` baseline migrācijai.

---

## 3) Scenārijs B — esoša pre-fix datubāze ar datiem

### 3.1 Kā pārbaudīt, ka schema atbilst `20260929115900_baseline`

Šie soļi ir validēti ar Prisma `5.22.x`.

1) Izveido salīdzināšanas DB un tajā ielādē baseline SQL:

```powershell
# 1) Tavas esošās DB URL (kandidāts rollout)
$env:DATABASE_URL = "postgresql://..."
$env:DIRECT_URL = $env:DATABASE_URL

# 2) Atsevišķa disposable salīdzināšanas DB URL
$env:BASELINE_COMPARE_URL = "postgresql://..."

# 3) Baseline ielāde salīdzināšanas DB
Get-Content -Raw prisma/migrations/20260929115900_baseline/migration.sql |
  psql "$env:BASELINE_COMPARE_URL" -v ON_ERROR_STOP=1
```

2) Izveido shēmas diff starp esošo DB un baseline salīdzināšanas DB:

```powershell
npx prisma migrate diff `
  --from-url "$env:DATABASE_URL" `
  --to-url "$env:BASELINE_COMPARE_URL" `
  --script > baseline-schema-diff.sql
```

3) Pārbaudi failu `baseline-schema-diff.sql`.

Sagaidāmais rezultāts, ja schema tiešām atbilst baseline:

- `baseline-schema-diff.sql` ir tukšs vai satur tikai tehnisku/no-op izvadi.
- Failā nav biznesa objektu DDL (`CREATE`, `ALTER`, `DROP`) uz esošām tabulām/enumiem.

**STOP ROLLOUT**, ja:

- diff satur reālas DDL atšķirības (`CREATE`, `ALTER`, `DROP`) biznesa objektiem;
- nevari droši interpretēt diff rezultātu.

### 3.2 Kad drīkst lietot `migrate resolve --applied`

`npx prisma migrate resolve --applied 20260929115900_baseline` ir atbilstošs **tikai tad**, ja:

- DB jau satur baseline ekvivalentu shēmu (3.1 solī pārbaudīts),
- bet `_prisma_migrations` vēsturē baseline nav atzīmēta.

Komandas:

```powershell
npx prisma migrate status
npx prisma migrate resolve --applied 20260929115900_baseline
npx prisma migrate deploy
npx prisma migrate status
```

Sagaidāmais rezultāts:

- Pirmais `migrate status` pre-fix DB gadījumā var rādīt pending migrācijas.
- `resolve` izdodas bez kļūdām.
- `deploy` pieliek tikai nākamo migrāciju (`20260929120000_referral_payment_credit`).
- Pēdējais `status` rāda, ka pending migrāciju nav.

**STOP ROLLOUT**, ja:

- `resolve` neizdodas;
- `deploy` mēģina izpildīt baseline `CREATE TYPE/CREATE TABLE` uz jau eksistējošas DB;
- pēc deploy joprojām ir pending/failed migrācijas.

### 3.3 Ko darīt, ja schema atšķiras vai migrāciju vēsture jau eksistē

- Ja schema **neatbilst** baseline, **neizmanto** `resolve --applied` akli.
  - Vispirms izveido un validē drift korekcijas plānu (starpmigrācija vai controlled reconciliation).
- Ja `_prisma_migrations` jau satur vēsturi:
  - analizē pašreizējo ķēdi ar `npx prisma migrate status`;
  - nepārraksti vēsturi bez apstiprināta plāna;
  - nodrošini, ka nākamais `migrate deploy` ir konsekvents ar esošo stāvokli.

---

## 4) Kāpēc šis ir svarīgi šim labojumam

- `20260929120000_referral_payment_credit` izveido `ReferralPaymentCredit` tabulu un izpilda backfill no vēsturiskajiem `PAID` maksājumiem.
- Tas pasargā no partnera dubulta kredīta, ja vecs Stripe `invoice.payment_succeeded` notikums tiek atkārtoti piegādāts pēc rollout.

---

## 5) Pēcmigrācijas verifikācija (obligāta)

Pēc migrācijas (abos scenārijos):

1. Apstiprini, ka `ReferralPaymentCredit` tabula un FK ir izveidoti.
2. Apstiprini, ka backfill ir noticis (esošiem `PAID` payment ierakstiem ir ledger rindas).
3. Apstiprini webhook uzvedību ar testu/replay testvidē:
   - divas paralēlas piegādes vienam invoice => 1 kredīts,
   - atšķirīgi invoice => atsevišķi kredīti,
   - FAILED -> PAID retry ceļš pabeidz trūkstošo kredītu vienreiz.
4. Pārbaudi, ka nav negaidītu kļūdu lietotnes un DB logos pēc rollout.

**STOP ROLLOUT**, ja jebkurš no šiem punktiem neizpildās.

---

## 6) Drošības un rollback piezīmes

- Nekad nepalaid migrāciju bez backup un rollback plāna.
- Ja verifikācija neizdodas, apturi rollout un atjauno no backup saskaņā ar incidentu procedūru.
- Šis ceļvedis neparedz tiešas izmaiņas production DB bez atbilstošas change approval procedūras.
