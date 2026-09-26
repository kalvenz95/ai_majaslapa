import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import EditableText from './EditableText';

export default function OnboardingSection() {
  const [questions, setQuestions] = useState([
    'Kāds ir tavs galvenais mērķis?',
    'Vai tev jau ir bizness vai klients?',
    'Vai tev ir iepriekšēja pieredze ar AI?',
    'Vai gribi pārdot pakalpojumus vai veidot produktu?',
    'Cik laika nedēļā vari veltīt?',
  ]);
  const [paths, setPaths] = useState([
    { icon: '🌱', title: 'Iesācējs', desc: 'Sāc ar 1. programmu. Pamati → ienākumi.' },
    { icon: '💼', title: 'Freelanceris', desc: 'Uzreiz uz 2. programmu. Klienti → aģenti.' },
    { icon: '🏢', title: 'Aģentūra', desc: 'Premium ceļš. Voice AI + bizness.' },
    { icon: '🚀', title: 'Startup', desc: 'Pilna 3. programma + AI lietotne.' },
  ]);

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <EditableText value="Personalizēts ceļš" style={styles.eyebrow} />
        <Text style={styles.title}>Platforma pielāgojas{"\n"}<Text style={styles.titleEm}>Tev</Text></Text>
      </View>
      <View style={styles.grid}>
        <View style={styles.left}>
          <EditableText value="Pirmajā ieiešanas reizē atbildi uz 5 jautājumiem — un platforma piedāvā Tev personalizētu mācīšanās ceļu." style={styles.leftDesc} multiline />
          <View style={styles.questions}>
            {questions.map((q, i) => (
              <EditableText key={i} value={q} onChange={v => setQuestions(qs => qs.map((x, j) => j === i ? v : x))} style={styles.question} />
            ))}
          </View>
        </View>
        <View style={styles.right}>
          <EditableText value="Pēc atbildēm — Tavs ceļš:" style={styles.rightLabel} />
          <View style={styles.paths}>
            {paths.map((p, i) => (
              <View style={styles.pathCard} key={i}>
                <Text style={styles.pathIcon}>{p.icon}</Text>
                <EditableText value={p.title} onChange={v => setPaths(ps => ps.map((x, j) => j === i ? { ...x, title: v } : x))} style={styles.pathTitle} />
                <EditableText value={p.desc} onChange={v => setPaths(ps => ps.map((x, j) => j === i ? { ...x, desc: v } : x))} style={styles.pathDesc} multiline />
              </View>
            ))}
          </View>
        </View>
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
  grid: { flexDirection: 'row', gap: 24, justifyContent: 'space-between' },
  left: { flex: 1, marginRight: 16 },
  leftDesc: { color: '#9fb1c7', fontSize: 15, marginBottom: 16 },
  questions: { gap: 8 },
  question: { backgroundColor: '#111926', borderColor: 'rgba(255,255,255,0.06)', borderWidth: 1, borderRadius: 10, color: '#9fb1c7', fontSize: 14, padding: 12, marginBottom: 8 },
  right: { flex: 1, marginLeft: 16 },
  rightLabel: { color: '#22c7a5', fontSize: 10, fontFamily: 'JetBrains Mono', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 },
  paths: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  pathCard: { backgroundColor: '#141f2d', borderColor: 'rgba(255,255,255,0.06)', borderWidth: 1, borderRadius: 10, padding: 14, marginBottom: 8, width: 120, alignItems: 'center' },
  pathIcon: { fontSize: 20, marginBottom: 4 },
  pathTitle: { color: '#eef6ff', fontWeight: '600', fontSize: 13, marginBottom: 2, textAlign: 'center' },
  pathDesc: { color: '#9fb1c7', fontSize: 11, textAlign: 'center' },
});
