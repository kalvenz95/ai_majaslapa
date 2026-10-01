import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import EditableText from './EditableText';

export default function ReferralSection() {
  const [steps, setSteps] = useState([
    { icon: '🏷️', title: 'Tu iegūst kodu', desc: 'Piem. KALVIS10 — unikāls tikai Tev' },
    { icon: '📢', title: 'Tu reklamē', desc: 'Kopīgo kodu TikTok, Instagram, YouTube vai citā kanālā' },
    { icon: '💰', title: 'Tu pelni komisiju', desc: '10% no katra pirkuma — automātiski uz Tavu kontu' },
  ]);
  const [example, setExample] = useState([
    '5% konvertācija (50 pirkumi) — 50 cilvēki',
    'Vidējais pirkums — €79',
    'Tava komisija (10%) — €395',
  ]);

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <EditableText value="Partneru programma" style={styles.eyebrow} />
        <Text style={styles.title}>Pelni ar{"\n"}<Text style={styles.titleEm}>referral kodu</Text></Text>
        <EditableText value="Iesaki Chademy saviem sekotājiem — katrs klients, kas pērk ar Tavu kodu, nes Tev komisiju. Automātiski, katru mēnesi." style={styles.sub} multiline />
      </View>
      <View style={styles.grid}>
        {steps.map((s, i) => (
          <View style={styles.card} key={i}>
            <Text style={styles.icon}>{s.icon}</Text>
            <EditableText value={s.title} onChange={v => setSteps(ss => ss.map((x, j) => j === i ? { ...x, title: v } : x))} style={styles.cardTitle} />
            <EditableText value={s.desc} onChange={v => setSteps(ss => ss.map((x, j) => j === i ? { ...x, desc: v } : x))} style={styles.cardDesc} multiline />
          </View>
        ))}
      </View>
      <View style={styles.exampleBox}>
        <EditableText value="Piemērs — 1000 sekotāji" style={styles.exampleLabel} />
        {example.map((line, i) => (
          <EditableText key={i} value={line} onChange={v => setExample(ex => ex.map((x, j) => j === i ? v : x))} style={styles.exampleText} />
        ))}
        <EditableText value="Bezmaksas · Automātiskas izmaksas" style={styles.cta} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { paddingHorizontal: 24, paddingVertical: 40, backgroundColor: '#0b1016' },
  header: { marginBottom: 24 },
  eyebrow: { color: '#22c7a5', fontSize: 12, fontFamily: 'JetBrains Mono', letterSpacing: 2, marginBottom: 8 },
  title: { color: '#eef6ff', fontSize: 28, fontWeight: '700', marginBottom: 8 },
  titleEm: { color: '#22c7a5', fontWeight: '700' },
  sub: { color: '#9fb1c7', fontSize: 15, marginBottom: 16 },
  grid: { flexDirection: 'row', gap: 14, marginBottom: 28, justifyContent: 'space-between' },
  card: { backgroundColor: '#111926', borderColor: 'rgba(255,255,255,0.06)', borderWidth: 1, borderRadius: 14, padding: 24, alignItems: 'center', flex: 1, marginHorizontal: 4 },
  icon: { fontSize: 32, marginBottom: 10 },
  cardTitle: { color: '#eef6ff', fontSize: 18, fontWeight: '700', marginBottom: 6, textAlign: 'center' },
  cardDesc: { color: '#9fb1c7', fontSize: 13, textAlign: 'center' },
  exampleBox: { backgroundColor: '#111926', borderColor: 'rgba(24,194,156,0.2)', borderWidth: 1, borderRadius: 16, padding: 24, marginTop: 24 },
  exampleLabel: { color: '#22c7a5', fontSize: 10, fontFamily: 'JetBrains Mono', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 },
  exampleText: { color: '#9fb1c7', fontSize: 13, marginBottom: 4 },
  cta: { color: '#4a6070', fontSize: 11, fontFamily: 'JetBrains Mono', marginTop: 10 },
});
