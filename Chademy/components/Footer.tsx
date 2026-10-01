import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import EditableText from './EditableText';

export default function Footer() {
  const [desc, setDesc] = useState('AI BIZNESA PLATFORMA · LATVIJĀ · 2025');
  const [links, setLinks] = useState(['Noteikumi', 'Privātums (GDPR)', 'Kontakti']);

  return (
    <View style={styles.footer}>
      <Text style={styles.logo}>Chad<Text style={styles.logoAccent}>emy</Text></Text>
      <EditableText value={desc} onChange={setDesc} style={styles.desc} />
      <View style={styles.links}>
        {links.map((l, i) => (
          <EditableText key={i} value={l} onChange={v => setLinks(ls => ls.map((x, j) => j === i ? v : x))} style={styles.link} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: { alignItems: 'center', paddingVertical: 40, paddingHorizontal: 24, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.06)', backgroundColor: '#0b1016', marginTop: 24 },
  logo: { fontSize: 20, fontWeight: '700', color: '#eef6ff', marginBottom: 8, fontFamily: 'Clash Display' },
  logoAccent: { color: '#22c7a5' },
  desc: { fontSize: 11, color: '#4a6070', fontFamily: 'JetBrains Mono', letterSpacing: 2, marginBottom: 16 },
  links: { flexDirection: 'row', gap: 20, flexWrap: 'wrap', justifyContent: 'center' },
  link: { fontSize: 12, color: '#4a6070', marginHorizontal: 10 },
});
