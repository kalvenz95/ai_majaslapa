Balss aģentu paraugu ieraksti
=============================

Ievieto šeit reālos zvanu ierakstus (MP3), lai sadaļā "Mūsu darbi → Balss aģenti"
atskaņotājs atskaņotu īstu audio. Faila nosaukumiem jāsakrīt ar tiem, kas norādīti
komponentē src/components/home/ShowcaseV2.tsx (VOICE_SAMPLES masīvs):

  restorans.mp3        — restorāna rezervācijas zvans
  skaistumkopsana.mp3  — skaistumkopšanas salona pieraksts
  autoserviss.mp3      — auto servisa zvans

Kamēr faili nav pievienoti, atskaņotājs vizuāli demonstrē atskaņošanu
(viļņforma + progress), bet skaņas nav. Tiklīdz ievietosi MP3 ar pareizo nosaukumu,
tas atskaņosies automātiski.
