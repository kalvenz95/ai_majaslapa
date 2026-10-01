import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import EditableText from './EditableText';

export default function TrustSection() {
  const [tiles, setTiles] = useState([
    { num: 'TOP 4', lbl: 'Latvija AI lietošanā ES (Eurostat 2024)' },
    { num: '80k+', lbl: 'MVU Latvijā bez AI risinājumiem' },
    { num: '€0', lbl: 'Nepieciešamas koda zināšanas' },
    { num: '24/7', lbl: 'AI aģents strādā par Tevi' },
    { num: '300€+', lbl: 'Viens WhatsApp aģents klients/mēn' },
  ]);

  return (
    <View style={styles.section}>
      <View style={styles.grid}>
        {tiles.map((t, i) => (
          <View style={styles.tile} key={i}>
            <EditableText value={t.num} onChange={v => setTiles(ts => ts.map((x, j) => j === i ? { ...x, num: v } : x))} style={styles.num} />
            <EditableText value={t.lbl} onChange={v => setTiles(ts => ts.map((x, j) => j === i ? { ...x, lbl: v } : x))} style={styles.lbl} multiline />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { paddingHorizontal: 24, paddingVertical: 40, backgroundColor: '#0b1016' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'space-between' },
  tile: { backgroundColor: '#111926', borderColor: 'rgba(255,255,255,0.06)', borderWidth: 1, borderRadius: 12, padding: 20, alignItems: 'center', flex: 1, minWidth: 120, margin: 4 },
  num: { color: '#73e7d0', fontSize: 28, fontWeight: '700', fontFamily: 'Clash Display', marginBottom: 4, textAlign: 'center' },
  lbl: { color: '#9fb1c7', fontSize: 12, textAlign: 'center' },
});
