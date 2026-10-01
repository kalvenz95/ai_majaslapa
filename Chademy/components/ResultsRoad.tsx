import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import EditableText from './EditableText';

export default function ResultsRoad() {
  const [steps, setSteps] = useState([
    { icon: '🧠', title: 'AI pamati', desc: 'Saprast, kā darbojas' },
    { icon: '🛠️', title: 'Pirmais produkts', desc: 'AI aģents vai mājaslapa' },
    { icon: '🤝', title: 'Pirmais klients', desc: 'Reāls Latvijas uzņēmums' },
    { icon: '💶', title: 'Pirmie 100 €', desc: 'Pārbaudīts modelis' },
    { icon: '🤖', title: 'Voice AI', desc: 'Premium pakalpojums' },
    { icon: '📈', title: '1000 €/mēn', desc: 'Stabils bizness' },
  ]);

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <EditableText value="Rezultātu ceļš" style={styles.eyebrow} />
        <Text style={styles.title}>No nulles{"\n"}<Text style={styles.titleEm}>līdz 1000 €/mēn</Text></Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.road}>
        {steps.map((s, i) => (
          <View style={styles.step} key={i}>
            <Text style={styles.icon}>{s.icon}</Text>
            <EditableText value={s.title} onChange={v => setSteps(ss => ss.map((x, j) => j === i ? { ...x, title: v } : x))} style={styles.stepTitle} />
            <EditableText value={s.desc} onChange={v => setSteps(ss => ss.map((x, j) => j === i ? { ...x, desc: v } : x))} style={styles.stepDesc} />
            {i < steps.length - 1 && <Text style={styles.arrow}>→</Text>}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { paddingHorizontal: 24, paddingVertical: 40, backgroundColor: '#0b1016' },
  header: { marginBottom: 24 },
  eyebrow: { color: '#22c7a5', fontSize: 12, fontFamily: 'JetBrains Mono', letterSpacing: 2, marginBottom: 8 },
  title: { color: '#eef6ff', fontSize: 28, fontWeight: '700', marginBottom: 8 },
  titleEm: { color: '#22c7a5', fontWeight: '700' },
  road: { flexDirection: 'row' },
  step: { backgroundColor: '#111926', borderColor: 'rgba(255,255,255,0.06)', borderWidth: 1, borderRadius: 12, padding: 20, marginRight: 10, minWidth: 140, alignItems: 'center', position: 'relative' },
  icon: { fontSize: 24, marginBottom: 8 },
  stepTitle: { color: '#eef6ff', fontWeight: '600', fontSize: 13, marginBottom: 2, textAlign: 'center' },
  stepDesc: { color: '#4a6070', fontSize: 11, textAlign: 'center' },
  arrow: { position: 'absolute', right: -16, top: '50%', fontSize: 18, color: '#4a6070' },
});
