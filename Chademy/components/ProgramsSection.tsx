import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import EditableText from './EditableText';

const initial = [
  {
    badge: 'Iesācēji',
    badgeColor: '#8ba4ff',
    num: 'PROGRAMMA 01',
    title: 'AI pamati un sociālo tīklu celšana',
    desc: 'AI pamati, satura idejas, Reels/TikTok/Stories, voiceover skripti, faceless content workflow un pirmie ienākumi.',
    modules: ['Modulis 1: AI pamati un prompti', 'Modulis 2: Reels, TikTok, Stories ar AI', 'Modulis 3: Faceless content workflow', 'Modulis 4: Pirmie ienākumi ar AI saturu'],
    price: '€79',
  },
  {
    badge: 'Biznesa fokuss',
    badgeColor: '#22c7a5',
    num: 'PROGRAMMA 02',
    title: 'AI aģenti biznesam',
    desc: 'Izveido AI mājaslapu un WhatsApp aģentu reālam klientam. Gatavs klienta piedāvājums. 300–800 EUR/mēn.',
    modules: ['Modulis 1: AI mājaslapa', 'Modulis 2: WhatsApp aģents', 'Modulis 3: Klienta piedāvājums'],
    price: '€499',
  },
  {
    badge: 'Premium',
    badgeColor: '#f5a623',
    num: 'PROGRAMMA 03',
    title: 'Voice AI un biznesa izaugsme',
    desc: 'Balss AI ar Latvijas numuru, biznesa reģistrācija, klientu piesaiste un savas AI lietotnes izveide bez koda.',
    modules: ['Modulis 1: Voice AI pamati', 'Modulis 2: Latvijas numurs un integrācijas', 'Modulis 3: Biznesa uzbūve', 'Modulis 4: AI lietotnes izveide'],
    price: '€699',
  },
];

export default function ProgramsSection() {
  const [programs, setPrograms] = useState(initial);

  function update(i: number, field: string, val: string) {
    setPrograms(p => p.map((item, idx) => idx === i ? { ...item, [field]: val } : item));
  }
  function updateModule(pi: number, mi: number, val: string) {
    setPrograms(p => p.map((item, idx) => idx === pi ? { ...item, modules: item.modules.map((m, j) => j === mi ? val : m) } : item));
  }

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <EditableText value="Mācību programmas" style={styles.eyebrow} />
        <Text style={styles.title}>3 profesionālas{"\n"}<Text style={styles.titleEm}>programmas</Text></Text>
        <EditableText value="Programma → Modulis → Lekcija → Uzdevums → Rezultāts. Katrs solis ved tuvāk savam AI biznesam." style={styles.sub} multiline />
      </View>
      <View style={styles.grid}>
        {programs.map((p, i) => (
          <View style={styles.card} key={i}>
            <EditableText value={p.badge} onChange={v => update(i, 'badge', v)} style={[styles.badge, { borderColor: p.badgeColor, color: p.badgeColor }]} />
            <EditableText value={p.num} onChange={v => update(i, 'num', v)} style={styles.num} />
            <EditableText value={p.title} onChange={v => update(i, 'title', v)} style={styles.progTitle} />
            <EditableText value={p.desc} onChange={v => update(i, 'desc', v)} style={styles.progDesc} multiline />
            <View style={styles.modules}>
              {p.modules.map((m, j) => (
                <EditableText key={j} value={m} onChange={v => updateModule(i, j, v)} style={styles.module} />
              ))}
            </View>
            <EditableText value={p.price} onChange={v => update(i, 'price', v)} style={styles.price} />
          </View>
        ))}
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
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 2, backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 16, justifyContent: 'space-between' },
  card: { backgroundColor: '#111926', padding: 20, borderRadius: 16, margin: 4, flex: 1, minWidth: 220, maxWidth: 320, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' },
  badge: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4, borderWidth: 1, fontSize: 10, fontFamily: 'JetBrains Mono', marginBottom: 8, marginTop: 2 },
  num: { color: '#4a6070', fontSize: 10, fontFamily: 'JetBrains Mono', marginBottom: 6 },
  progTitle: { color: '#eef6ff', fontSize: 18, fontWeight: '600', marginBottom: 6 },
  progDesc: { color: '#9fb1c7', fontSize: 13, marginBottom: 10 },
  modules: { marginBottom: 10 },
  module: { color: '#9fb1c7', fontSize: 13, marginBottom: 2 },
  price: { color: '#73e7d0', fontSize: 24, fontWeight: '700', marginTop: 8 },
});
