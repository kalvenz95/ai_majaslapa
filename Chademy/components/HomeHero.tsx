import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import EditableText from './EditableText';

export default function HomeHero({ onOpenApp }: { onOpenApp?: () => void }) {
  const [title, setTitle] = useState('No nulles\nlīdz savam\n');
  const [titleEm, setTitleEm] = useState('AI biznesam');
  const [sub, setSub] = useState('Nevis tikai kurss — pilnvērtīga AI mācību aplikācija un biznesa platforma. Iemācies veidot AI risinājumus, saprast tirgu un sākt pārdot pakalpojumus Latvijā. Bez programmēšanas.');
  return (
    <View>
      {/* HERO SECTION */}
      <View style={styles.heroSection}>
        <EditableText value="Chademy · AI Biznesa Platforma · Latvijā" style={styles.eyebrow} />
        <View style={{ marginBottom: 16 }}>
          <EditableText value={title} onChange={setTitle} style={styles.heroTitle} multiline />
          <EditableText value={titleEm} onChange={setTitleEm} style={[styles.heroTitle, styles.heroEm]} />
        </View>
        <EditableText value={sub} onChange={setSub} style={styles.heroSub} multiline />
        <View style={styles.tagsRow}>
          <Text style={styles.tagGreen}>✓ Programmēšana nav vajadzīga</Text>
          <Text style={styles.tagGreen}>✓ Latvijas tirgus fokuss</Text>
          <Text style={styles.tag}>3 programmas</Text>
          <Text style={styles.tag}>Darba zona</Text>
          <Text style={styles.tag}>Kopiena</Text>
          <Text style={styles.tag}>Mentoru atbalsts</Text>
        </View>
        <View style={styles.heroBtns}>
          <TouchableOpacity style={styles.btnPrimary} onPress={onOpenApp}><Text style={styles.btnPrimaryText}>Sākt bezmaksas →</Text></TouchableOpacity>
          <TouchableOpacity style={styles.btnOutline}><Text style={styles.btnOutlineText}>Apskatīt programmas</Text></TouchableOpacity>
        </View>
        <View style={styles.heroProof}>
          <View style={styles.proofCol}><Text style={styles.proofNum}>3</Text><Text style={styles.proofLbl}>Programmas</Text></View>
          <View style={styles.proofCol}><Text style={styles.proofNum}>80k+</Text><Text style={styles.proofLbl}>MVU Latvijā</Text></View>
          <View style={styles.proofCol}><Text style={styles.proofNum}>TOP 4</Text><Text style={styles.proofLbl}>AI lietošanā ES</Text></View>
          <View style={styles.proofCol}><Text style={styles.proofNum}>€0</Text><Text style={styles.proofLbl}>Koda zināšanas</Text></View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b1016',
  },
  heroSection: {
    paddingTop: 80,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  eyebrow: {
    color: '#22c7a5',
    fontFamily: 'JetBrains Mono',
    fontSize: 12,
    letterSpacing: 2,
    marginBottom: 16,
  },
  heroTitle: {
    color: '#eef6ff',
    fontFamily: 'Clash Display',
    fontSize: 36,
    fontWeight: '700',
    lineHeight: 40,
    marginBottom: 16,
  },
  heroEm: {
    color: '#22c7a5',
    fontWeight: '700',
  },
  heroSub: {
    color: '#9fb1c7',
    fontSize: 15,
    marginBottom: 20,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  tag: {
    color: '#9fb1c7',
    fontSize: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 6,
  },
  tagGreen: {
    color: '#73e7d0',
    fontSize: 12,
    borderWidth: 1,
    borderColor: 'rgba(24,194,156,0.25)',
    backgroundColor: 'rgba(24,194,156,0.05)',
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 6,
  },
  heroBtns: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  btnPrimary: {
    backgroundColor: '#22c7a5',
    borderRadius: 9,
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginRight: 8,
  },
  btnPrimaryText: {
    color: '#0b1016',
    fontWeight: '700',
    fontSize: 15,
  },
  btnOutline: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    borderRadius: 9,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  btnOutlineText: {
    color: '#9fb1c7',
    fontWeight: '500',
    fontSize: 15,
  },
  heroProof: {
    flexDirection: 'row',
    gap: 24,
    marginTop: 24,
    flexWrap: 'wrap',
  },
  proofCol: {
    alignItems: 'center',
    marginRight: 24,
    marginBottom: 8,
  },
  proofNum: {
    color: '#73e7d0',
    fontFamily: 'Clash Display',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  proofLbl: {
    color: '#4a6070',
    fontSize: 10,
    textAlign: 'center',
  },
});
