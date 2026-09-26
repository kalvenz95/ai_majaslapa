import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import EditableText from './EditableText';

const initial = [
  { icon: '🏠', num: 'BLOKS 01', title: 'Sākums', panel: 'home', list: ['Turpini no vietas', 'Kopējais progress', 'Šodienas uzdevums', 'Jaunumi no mentora'] },
  { icon: '📚', num: 'BLOKS 02', title: 'Programmas', panel: 'programs', list: ['Moduļi un lekcijas', 'Video materiāli', 'Praktiskie uzdevumi', 'Testi un checkpointi'] },
  { icon: '🛠️', num: 'BLOKS 03', title: 'Darba zona', panel: 'resources', list: ['Prompt bibliotēka', 'Outreach šabloni', 'Cenu piedāvājumi', 'AI aģentu scenāriji'] },
  { icon: '👥', num: 'BLOKS 04', title: 'Kopiena', panel: 'community', list: ['Visi ieraksti', 'Jautājumi un atbildes', 'Progresi un uzvaras', 'Top studenti'] },
  { icon: '🎯', num: 'BLOKS 05', title: 'Atbalsts', panel: 'support', list: ['Čats ar mentoru', 'Rezervēt zvanu', 'Uzdot jautājumu', 'FAQ'] },
  { icon: '🤝', num: 'BLOKS 06', title: 'Partneru panelis', panel: 'partner', list: ['Unikālais referral kods', 'Statistika un klikšķi', 'Komisiju tabula', 'Izmaksas katru mēnesi'] },
];

export default function AppBlocks({ onOpenApp }: { onOpenApp?: (panel: string) => void }) {
  const [blocks, setBlocks] = useState(initial);

  function update(i: number, field: string, val: string) {
    setBlocks(b => b.map((item, idx) => idx === i ? { ...item, [field]: val } : item));
  }
  function updateList(bi: number, li: number, val: string) {
    setBlocks(b => b.map((item, idx) => idx === bi ? { ...item, list: item.list.map((l, j) => j === li ? val : l) } : item));
  }

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <EditableText value="Aplikācijas struktūra" style={styles.eyebrow} />
        <Text style={styles.title}>5 galvenie{"\n"}<Text style={styles.titleEm}>aplikācijas bloki</Text></Text>
        <EditableText value="Nevis vienkāršs kurss — pilnvērtīga platforma ar visu, kas vajadzīgs no mācīšanās līdz pirmajiem ienākumiem." style={styles.sub} multiline />
      </View>
      <View style={styles.grid}>
        {blocks.map((b, i) => (
          <TouchableOpacity style={styles.card} key={i} onPress={() => onOpenApp?.(b.panel)} activeOpacity={0.75}>
            <Text style={styles.icon}>{b.icon}</Text>
            <EditableText value={b.num} onChange={v => update(i, 'num', v)} style={styles.num} />
            <EditableText value={b.title} onChange={v => update(i, 'title', v)} style={styles.blockTitle} />
            <View style={styles.list}>
              {b.list.map((item, j) => (
                <EditableText key={j} value={item} onChange={v => updateList(i, j, v)} style={styles.listItem} />
              ))}
            </View>
            <Text style={styles.openBtn}>Atvērt →</Text>
          </TouchableOpacity>
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
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'space-between' },
  card: { backgroundColor: '#111926', borderColor: 'rgba(255,255,255,0.06)', borderWidth: 1, borderRadius: 14, padding: 18, marginBottom: 12, width: '47%', minWidth: 160, maxWidth: 220 },
  icon: { fontSize: 32, marginBottom: 8 },
  num: { color: '#22c7a5', fontSize: 10, fontFamily: 'JetBrains Mono', marginBottom: 4 },
  blockTitle: { color: '#eef6ff', fontSize: 16, fontWeight: '600', marginBottom: 6 },
  list: { marginTop: 4 },
  listItem: { color: '#9fb1c7', fontSize: 12, lineHeight: 18 },
  openBtn: { color: '#22c7a5', fontSize: 12, fontWeight: '700', marginTop: 12 },
});
