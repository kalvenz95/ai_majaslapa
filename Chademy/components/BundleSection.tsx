import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import EditableText from './EditableText';

export default function BundleSection() {
  const [feats, setFeats] = useState([
    'Visas 3 programmas — AI pamati, aģenti, Voice AI',
    'Darba zona — prompti, šabloni, outreach skripti',
    'Resursu bibliotēka — PDF, cenu lapas, AI rīki',
    'Kopienas piekļuve — jautājumi, progresi, top studenti',
    'Mentoru čats un zvanu rezervācija',
    'Sertifikāti par katru programmu',
  ]);
  const [desc, setDesc] = useState('Viss, kas vajadzīgs no pirmās nodaļas līdz pirmajam klientam — visas 3 programmas, darba zona, kopiena un mentoru atbalsts.');
  const [priceOld, setPriceOld] = useState('€1277');
  const [priceNew, setPriceNew] = useState('€897');
  const [priceSave, setPriceSave] = useState('IETAUPA €380');
  const [monthly, setMonthly] = useState('vai 3 × €316 ikmēneša');

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <EditableText value="Pilnais komplekts" style={styles.eyebrow} />
        <Text style={styles.title}>Visas 3 programmas{"\n"}<Text style={styles.titleEm}>vienā paketē</Text></Text>
      </View>
      <View style={styles.bundleWrap}>
        <View style={{ flex: 1 }}>
          <Text style={styles.bundleTitle}>Chademy <Text style={styles.titleEm}>Full Access</Text></Text>
          <EditableText value={desc} onChange={setDesc} style={styles.bundleDesc} multiline />
          <View style={styles.feats}>
            {feats.map((f, i) => (
              <EditableText key={i} value={`• ${f}`} onChange={v => setFeats(fs => fs.map((x, j) => j === i ? v.replace(/^• ?/, '') : x))} style={styles.feat} />
            ))}
          </View>
        </View>
        <View style={styles.priceCard}>
          <EditableText value={priceOld} onChange={setPriceOld} style={styles.old} />
          <EditableText value={priceNew} onChange={setPriceNew} style={styles.new} />
          <EditableText value={priceSave} onChange={setPriceSave} style={styles.save} />
          <EditableText value={monthly} onChange={setMonthly} style={styles.monthlyText} />
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
  bundleWrap: { flexDirection: 'row', backgroundColor: '#111926', borderColor: 'rgba(24,194,156,0.2)', borderWidth: 1, borderRadius: 20, padding: 24, gap: 24, alignItems: 'center' },
  bundleTitle: { color: '#eef6ff', fontSize: 24, fontWeight: '700', marginBottom: 8 },
  bundleDesc: { color: '#9fb1c7', fontSize: 15, marginBottom: 8 },
  feats: { marginTop: 8, marginBottom: 8 },
  feat: { color: '#9fb1c7', fontSize: 14, marginBottom: 4 },
  priceCard: { backgroundColor: '#141f2d', borderColor: 'rgba(24,194,156,0.2)', borderWidth: 1, borderRadius: 14, padding: 20, alignItems: 'center', minWidth: 120 },
  old: { color: '#4a6070', fontSize: 14, textDecorationLine: 'line-through', fontFamily: 'JetBrains Mono' },
  new: { color: '#73e7d0', fontSize: 32, fontWeight: '700', fontFamily: 'Clash Display', lineHeight: 36 },
  save: { color: '#22c7a5', fontSize: 11, backgroundColor: 'rgba(24,194,156,0.1)', borderColor: 'rgba(24,194,156,0.2)', borderWidth: 1, paddingHorizontal: 10, paddingVertical: 3, borderRadius: 100, fontFamily: 'JetBrains Mono', marginTop: 6 },
  monthlyText: { color: '#4a6070', fontSize: 11, fontFamily: 'JetBrains Mono', marginTop: 10 },
});
