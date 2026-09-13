# Kopienas piekļuves testi

Pārbauda, ka Chademy Community ir aizsargāta serverī, nevis tikai frontendā.
Izsauc **īstos** API maršrutu apstrādātājus pret **īstu** Postgres. Vienīgais
dublieris ir Clerk sesija (`clerk-stub.ts`), lai varētu izspēlēt dažādus
lietotājus.

Mape ir izslēgta no `tsconfig.json` un neietekmē `npm run build`.
Ja negribi to turēt repozitorijā — vari droši izdzēst visu mapi.

## Palaišana

Vajag Postgres. Vienkāršākais — pagaidu iegultais serveris:

```bash
# 1. Kaut kur ārpus projekta
npm install embedded-postgres tsx
```

```js
// serve.mjs — palaid atsevišķā terminālī, atstāj darboties
import EmbeddedPostgres from "embedded-postgres";
const pg = new EmbeddedPostgres({
  databaseDir: "./pgdata", user: "postgres", password: "postgres",
  port: 55432, persistent: true,
});
await pg.initialise();
await pg.start();
console.log("READY");
setInterval(() => {}, 1 << 30);
```

**Svarīgi:** datubāzei jābūt UTF8 kodējumā, citādi kategoriju emoji nesaglabājas
(uz latviešu Windows noklusējums ir WIN1257):

```sql
CREATE DATABASE chademy_utf8 WITH ENCODING 'UTF8' TEMPLATE template0
  LC_COLLATE 'C' LC_CTYPE 'C';
```

```bash
# 2. Uzliek shēmu
export TESTDB="postgresql://postgres:postgres@localhost:55432/chademy_utf8"
DATABASE_URL="$TESTDB" DIRECT_URL="$TESTDB" npx prisma db push --skip-generate

# 3. Palaiž testus
DATABASE_URL="$TESTDB" DIRECT_URL="$TESTDB" OWNER_EMAIL="owner@chademy.com" \
  npx tsx --tsconfig ./__ctest__/tsconfig.json ./__ctest__/run.ts
```

## Ko pārbauda

| Scenārijs | Gaidītais |
|---|---|
| TEST 1 | Nepieteicies → 401, nesaņem nevienu ierakstu |
| TEST 2 | Reģistrēts bez pirkuma → 403 + aizslēgtais paziņojums |
| TEST 3 | Apmaksāts dalībnieks → 200 |
| TEST 4 | Tiešs ieraksta URL bez apmaksas → 403, saturs nenoplūst |
| TEST 5 | Apmaksāts dalībnieks publicē → 201 |
| TEST 6 | Svešs ieraksts: rediģēt/dzēst/piespraust → 403 |
| TEST 7 | Admins dzēš svešu ierakstu, piesprauž, sūta paziņojumu → 200/201 |
| TEST 8 | Apmaksa atmaksāta vai konts bloķēts → piekļuve pazūd |

Papildus: admin kategorija parastam dalībniekam, ierobežotais dalībnieks,
paziņojumu izolācija starp lietotājiem, e-pasta nenoplūšana API atbildēs.
