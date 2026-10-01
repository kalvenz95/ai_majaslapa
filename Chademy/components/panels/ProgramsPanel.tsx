import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Image, ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// ─── Design tokens ────────────────────────────────────────────────────────────
const C = {
  bg:      '#080d12',
  surface: '#0f1720',
  card:    '#131e2a',
  border:  'rgba(255,255,255,0.06)',
  accent:  '#18c99a',
  accentDim:'rgba(24,201,154,0.12)',
  accentBorder:'rgba(24,201,154,0.28)',
  gold:    '#f0b429',
  red:     '#f05252',
  text:    '#e8f4ff',
  muted:   '#8096ab',
  faint:   '#2a3a4a',
} as const;

// ─── Unsplash images (specific high-res IDs) ──────────────────────────────────
const IMGS = {
  hero:    'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1400&q=90&fit=crop',
  robot:   'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&q=85&fit=crop',
  nocode:  'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=85&fit=crop',
  website: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1200&q=85&fit=crop',
  team:    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=85&fit=crop',
  future:  'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&q=85&fit=crop',
};

// ─── Atom: section number + title ────────────────────────────────────────────
function SectionHeading({ num, title }: { num: string; title: string }) {
  return (
    <View style={sh.wrap}>
      <View style={sh.numPill}><Text style={sh.num}>{num}</Text></View>
      <View style={sh.line} />
      <Text style={sh.title}>{title}</Text>
    </View>
  );
}
const sh = StyleSheet.create({
  wrap:    { marginBottom: 28, marginTop: 12 },
  numPill: { backgroundColor: C.accent, borderRadius: 6, paddingHorizontal: 10, paddingVertical: 4, alignSelf: 'flex-start', marginBottom: 14 },
  num:     { color: '#fff', fontSize: 11, fontWeight: '800', letterSpacing: 1.5 },
  line:    { height: 1, backgroundColor: C.border, marginBottom: 14 },
  title:   { color: C.text, fontSize: 24, fontWeight: '800', lineHeight: 32 },
});

// ─── Atom: inline image with caption ─────────────────────────────────────────
function LessonImage({ uri, caption, height = 280 }: { uri: string; caption: string; height?: number }) {
  return (
    <View style={[img.wrap, { height }]}>
      <Image source={{ uri }} style={img.image} resizeMode="cover" />
      <View style={img.overlay} />
      <View style={img.caption}>
        <Ionicons name="camera-outline" size={12} color={C.muted} />
        <Text style={img.capTxt}>{caption}</Text>
      </View>
    </View>
  );
}
const img = StyleSheet.create({
  wrap:    { borderRadius: 14, overflow: 'hidden', marginBottom: 28, position: 'relative' },
  image:   { width: '100%', height: '100%' },
  overlay: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, backgroundColor: 'rgba(8,13,18,0.7)' },
  caption: { position: 'absolute', bottom: 12, left: 16, flexDirection: 'row', alignItems: 'center', gap: 5 },
  capTxt:  { color: C.muted, fontSize: 11 },
});

// ─── Atom: callout card (tip / warning / info) ────────────────────────────────
type CalloutType = 'tip' | 'warning' | 'info';
function Callout({ type = 'tip', title, children }: { type?: CalloutType; title: string; children: React.ReactNode }) {
  const cfg = {
    tip:     { icon: 'bulb-outline'     as const, color: C.accent, bg: C.accentDim,                border: C.accentBorder },
    warning: { icon: 'alert-circle-outline' as const, color: C.gold,   bg: 'rgba(240,180,41,0.08)', border: 'rgba(240,180,41,0.25)' },
    info:    { icon: 'information-circle-outline' as const, color: '#7cb8f0', bg: 'rgba(124,184,240,0.08)', border: 'rgba(124,184,240,0.22)' },
  };
  const c = cfg[type];
  return (
    <View style={[co.wrap, { backgroundColor: c.bg, borderColor: c.border }]}>
      <View style={[co.iconWrap, { backgroundColor: c.border }]}>
        <Ionicons name={c.icon} size={18} color={c.color} />
      </View>
      <View style={co.body}>
        <Text style={[co.title, { color: c.color }]}>{title}</Text>
        {children}
      </View>
    </View>
  );
}
const co = StyleSheet.create({
  wrap:     { flexDirection: 'row', gap: 14, borderWidth: 1, borderRadius: 12, padding: 18, marginVertical: 20 },
  iconWrap: { width: 36, height: 36, borderRadius: 8, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  body:     { flex: 1 },
  title:    { fontWeight: '700', fontSize: 14, marginBottom: 6 },
});

// ─── Atom: body text ──────────────────────────────────────────────────────────
function Body({ children }: { children: React.ReactNode }) {
  return <Text style={{ color: C.muted, fontSize: 15, lineHeight: 27, marginBottom: 18 }}>{children}</Text>;
}
function Em({ children }: { children: React.ReactNode }) {
  return <Text style={{ color: C.text, fontWeight: '600' }}>{children}</Text>;
}
function H3({ children }: { children: React.ReactNode }) {
  return <Text style={{ color: C.text, fontSize: 19, fontWeight: '700', marginTop: 28, marginBottom: 14 }}>{children}</Text>;
}
function Divider() {
  return <View style={{ height: 1, backgroundColor: C.border, marginVertical: 36 }} />;
}

// ─── Atom: check/cross list ───────────────────────────────────────────────────
function CheckList({ items }: { items: { ok: boolean; text: string }[] }) {
  return (
    <View style={{ gap: 10, marginVertical: 16 }}>
      {items.map((item, i) => (
        <View key={i} style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 10 }}>
          <Ionicons
            name={item.ok ? 'checkmark-circle' : 'close-circle'}
            size={20}
            color={item.ok ? C.accent : C.red}
            style={{ marginTop: 2, flexShrink: 0 }}
          />
          <Text style={{ color: item.ok ? C.text : C.muted, fontSize: 14, lineHeight: 22, flex: 1 }}>
            {item.text}
          </Text>
        </View>
      ))}
    </View>
  );
}

// ─── Compare table ────────────────────────────────────────────────────────────
function CompareTable() {
  const rows = [
    ['Reklāmas teksti', '8 stundas darbā', '10 minūtes ar AI'],
    ['Klientu e-pasti', '45 min katrs', '2 min — AI uzraksta'],
    ['Grāmatvedība', '€500/mēn grāmatvedim', 'AI asistents no €20'],
    ['Sociālie mediji', '4 h nedēļā', 'AI ģenerē idejas'],
    ['Klientu apkalpošana', 'Darbinieks 8h/d', 'AI čatbots 24/7'],
  ];
  return (
    <View style={ct.wrap}>
      <View style={ct.headerRow}>
        <Text style={[ct.hCell, { flex: 1.2 }]}>UZDEVUMS</Text>
        <Text style={[ct.hCell, { flex: 1, color: C.red + 'cc' }]}>BEZ AI</Text>
        <Text style={[ct.hCell, { flex: 1, color: C.accent }]}>AR AI</Text>
      </View>
      {rows.map(([task, before, after], i) => (
        <View key={i} style={[ct.row, i % 2 === 0 && { backgroundColor: 'rgba(255,255,255,0.02)' }]}>
          <Text style={[ct.cell, { flex: 1.2, color: C.muted, fontSize: 13 }]}>{task}</Text>
          <View style={[ct.valueWrap, { flex: 1 }]}>
            <Ionicons name="time-outline" size={12} color={C.red} />
            <Text style={[ct.cell, { color: C.red + 'bb', fontSize: 13 }]}>{before}</Text>
          </View>
          <View style={[ct.valueWrap, { flex: 1 }]}>
            <Ionicons name="flash-outline" size={12} color={C.accent} />
            <Text style={[ct.cell, { color: C.accent, fontSize: 13, fontWeight: '600' }]}>{after}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}
const ct = StyleSheet.create({
  wrap:      { borderRadius: 12, borderWidth: 1, borderColor: C.border, overflow: 'hidden', marginVertical: 20 },
  headerRow: { flexDirection: 'row', backgroundColor: '#0f1720', paddingVertical: 11, paddingHorizontal: 16, gap: 8 },
  hCell:     { color: C.muted, fontSize: 11, fontWeight: '700', letterSpacing: 1 },
  row:       { flexDirection: 'row', paddingVertical: 13, paddingHorizontal: 16, borderTopWidth: 1, borderTopColor: C.border, alignItems: 'center', gap: 8 },
  valueWrap: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  cell:      { color: C.text, fontSize: 14 },
});

// ─── Tools grid ───────────────────────────────────────────────────────────────
function ToolsGrid() {
  const tools = [
    { name: 'n8n',       icon: '⚡', desc: 'Automatizācijas plūsmas',  price: 'Bezmaksas', tag: 'TOP' },
    { name: 'Make',      icon: '🔗', desc: 'Apps savienošana',          price: 'No $9/mēn', tag: '' },
    { name: 'Voiceflow', icon: '🤖', desc: 'AI čatboti',               price: 'Bezmaksas', tag: 'IETEICAMS' },
    { name: 'Framer',    icon: '🎨', desc: 'Mājas lapas ar AI',         price: 'No $0',     tag: '' },
    { name: 'Notion AI', icon: '📝', desc: 'Dokumenti un projekti',     price: 'No $8/mēn', tag: '' },
    { name: 'Zapier',    icon: '⚙️', desc: 'Viegla automātika',         price: 'Bezmaksas', tag: '' },
  ];
  return (
    <View style={tg.grid}>
      {tools.map((t, i) => (
        <View key={i} style={tg.card}>
          <View style={tg.top}>
            <Text style={tg.iconText}>{t.icon}</Text>
            {t.tag ? <View style={tg.tagWrap}><Text style={tg.tagTxt}>{t.tag}</Text></View> : null}
          </View>
          <Text style={tg.name}>{t.name}</Text>
          <Text style={tg.desc}>{t.desc}</Text>
          <View style={tg.priceRow}>
            <Ionicons name="pricetag-outline" size={11} color={C.accent} />
            <Text style={tg.price}>{t.price}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}
const tg = StyleSheet.create({
  grid:     { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginVertical: 20 },
  card:     { backgroundColor: C.card, borderWidth: 1, borderColor: C.border, borderRadius: 12, padding: 18, minWidth: 160, flex: 1 },
  top:      { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  iconText: { fontSize: 28 },
  tagWrap:  { backgroundColor: C.accentDim, borderRadius: 4, paddingHorizontal: 7, paddingVertical: 2 },
  tagTxt:   { color: C.accent, fontSize: 9, fontWeight: '800', letterSpacing: 0.8 },
  name:     { color: C.text, fontWeight: '700', fontSize: 16, marginBottom: 4 },
  desc:     { color: C.muted, fontSize: 12, lineHeight: 18, marginBottom: 10, flex: 1 },
  priceRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  price:    { color: C.accent, fontSize: 12, fontWeight: '600' },
});

// ─── Agent flow ───────────────────────────────────────────────────────────────
function AgentFlow() {
  const steps = [
    { icon: 'person-outline' as const,         label: 'Klients\nraksta' },
    { icon: 'chatbubble-ellipses-outline' as const, label: 'AI\nsaprot' },
    { icon: 'git-branch-outline' as const,     label: 'Sistēma\nrīkojas' },
    { icon: 'checkmark-done-outline' as const, label: 'Rezultāts\nnosūtīts' },
  ];
  return (
    <View style={af.wrap}>
      <Text style={af.label}>Kā darbojas AI aģents — soli pa solim</Text>
      <View style={af.row}>
        {steps.map((s, i) => (
          <React.Fragment key={i}>
            <View style={af.step}>
              <View style={af.iconCircle}>
                <Ionicons name={s.icon} size={22} color={C.accent} />
              </View>
              <Text style={af.stepLabel}>{s.label}</Text>
              <Text style={af.stepNum}>0{i + 1}</Text>
            </View>
            {i < steps.length - 1 && (
              <View style={af.connector}>
                <View style={af.connLine} />
                <Ionicons name="chevron-forward" size={14} color={C.accent} style={af.connArrow} />
              </View>
            )}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
}
const af = StyleSheet.create({
  wrap:       { backgroundColor: C.card, borderRadius: 14, padding: 24, marginVertical: 20, borderWidth: 1, borderColor: C.border },
  label:      { color: C.muted, fontSize: 11, fontWeight: '700', letterSpacing: 1, marginBottom: 20, textAlign: 'center' },
  row:        { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  step:       { alignItems: 'center', gap: 8, flex: 1 },
  iconCircle: { width: 52, height: 52, borderRadius: 26, backgroundColor: C.accentDim, borderWidth: 1, borderColor: C.accentBorder, alignItems: 'center', justifyContent: 'center' },
  stepLabel:  { color: C.muted, fontSize: 11, textAlign: 'center', lineHeight: 16 },
  stepNum:    { color: C.faint, fontSize: 10, fontWeight: '700' },
  connector:  { width: 32, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginBottom: 20 },
  connLine:   { flex: 1, height: 1, backgroundColor: C.faint },
  connArrow:  { marginLeft: -4 },
});


// ─── Stats bar ────────────────────────────────────────────────────────────────
function StatsBar({ stats }: { stats: { num: string; label: string; icon: keyof typeof Ionicons.glyphMap }[] }) {
  return (
    <View style={sb.wrap}>
      {stats.map((s, i) => (
        <React.Fragment key={i}>
          <View style={sb.item}>
            <Ionicons name={s.icon} size={20} color={C.accent} style={sb.icon} />
            <Text style={sb.num}>{s.num}</Text>
            <Text style={sb.label}>{s.label}</Text>
          </View>
          {i < stats.length - 1 && <View style={sb.sep} />}
        </React.Fragment>
      ))}
    </View>
  );
}
const sb = StyleSheet.create({
  wrap:  { flexDirection: 'row', backgroundColor: C.card, borderRadius: 14, borderWidth: 1, borderColor: C.border, paddingVertical: 20, marginVertical: 20, justifyContent: 'space-around', flexWrap: 'wrap', gap: 8 },
  item:  { alignItems: 'center', paddingHorizontal: 8, minWidth: 80 },
  icon:  { marginBottom: 6 },
  num:   { color: C.text, fontSize: 24, fontWeight: '800', marginBottom: 2 },
  label: { color: C.muted, fontSize: 11, textAlign: 'center' },
  sep:   { width: 1, backgroundColor: C.border, alignSelf: 'stretch', marginVertical: 8 },
});

// ─── Before/after cost box ────────────────────────────────────────────────────
function CostCompare() {
  return (
    <View style={cc.wrap}>
      <View style={[cc.half, { borderRightWidth: 1, borderRightColor: C.border }]}>
        <View style={cc.topRow}>
          <Ionicons name="close-circle-outline" size={20} color={C.red} />
          <Text style={[cc.label, { color: C.red }]}>Tradicionāli</Text>
        </View>
        <Text style={cc.bigNum}>4–6 ned.</Text>
        <Text style={cc.sub}>+ €800–3000 par mājas lapu</Text>
        <View style={cc.bullets}>
          {['Web dizainers', 'Programmētājs', 'Tekstu rakstītājs', 'SEO speciālists'].map((x, i) => (
            <View key={i} style={cc.bullet}>
              <Ionicons name="remove-outline" size={14} color={C.muted} />
              <Text style={cc.bulletTxt}>{x}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={cc.half}>
        <View style={cc.topRow}>
          <Ionicons name="flash" size={20} color={C.accent} />
          <Text style={[cc.label, { color: C.accent }]}>Ar AI rīkiem</Text>
        </View>
        <Text style={[cc.bigNum, { color: C.accent }]}>2–4 h</Text>
        <Text style={cc.sub}>+ €0–29/mēn (patstāvīgi)</Text>
        <View style={cc.bullets}>
          {['Framer / Webflow AI', 'Claude saturam', 'Unsplash bildēm', 'Tu pats!'].map((x, i) => (
            <View key={i} style={cc.bullet}>
              <Ionicons name="checkmark-outline" size={14} color={C.accent} />
              <Text style={[cc.bulletTxt, { color: C.text }]}>{x}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
const cc = StyleSheet.create({
  wrap:   { flexDirection: 'row', backgroundColor: C.card, borderRadius: 14, borderWidth: 1, borderColor: C.border, overflow: 'hidden', marginVertical: 20 },
  half:   { flex: 1, padding: 22 },
  topRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  label:  { fontWeight: '700', fontSize: 13, letterSpacing: 0.5 },
  bigNum: { color: C.text, fontSize: 30, fontWeight: '800', marginBottom: 4 },
  sub:    { color: C.muted, fontSize: 12, marginBottom: 14 },
  bullets:{ gap: 8 },
  bullet: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  bulletTxt: { color: C.muted, fontSize: 13 },
});

// ─── Quote / highlight ────────────────────────────────────────────────────────
function Quote({ text, author }: { text: string; author?: string }) {
  return (
    <View style={{ borderLeftWidth: 3, borderLeftColor: C.accent, paddingLeft: 18, marginVertical: 20 }}>
      <Text style={{ color: C.text, fontSize: 17, fontStyle: 'italic', lineHeight: 28, marginBottom: author ? 8 : 0 }}>
        "{text}"
      </Text>
      {author && <Text style={{ color: C.accent, fontSize: 12, fontWeight: '700' }}>— {author}</Text>}
    </View>
  );
}

// ─── PromptCompare — bad vs good prompt ──────────────────────────────────────
function PromptCompare({ bad, good, badResult, goodResult }: {
  bad: string; good: string; badResult?: string; goodResult?: string;
}) {
  return (
    <View style={pc.wrap}>
      <View style={[pc.col, { borderRightWidth: 1, borderRightColor: C.border }]}>
        <View style={pc.colHeader}>
          <Ionicons name="close-circle" size={16} color={C.red} />
          <Text style={[pc.colTitle, { color: C.red }]}>VĀJŠ PROMPT</Text>
        </View>
        <Text style={pc.text}>{bad}</Text>
        {badResult && (
          <View style={[pc.result, { backgroundColor: 'rgba(240,82,82,0.07)', borderColor: 'rgba(240,82,82,0.2)' }]}>
            <Text style={[pc.resultLabel, { color: C.red + 'aa' }]}>AI atbilde:</Text>
            <Text style={[pc.resultText, { color: C.red + '99' }]}>{badResult}</Text>
          </View>
        )}
      </View>
      <View style={pc.col}>
        <View style={pc.colHeader}>
          <Ionicons name="checkmark-circle" size={16} color={C.accent} />
          <Text style={[pc.colTitle, { color: C.accent }]}>LABS PROMPT</Text>
        </View>
        <Text style={pc.text}>{good}</Text>
        {goodResult && (
          <View style={[pc.result, { backgroundColor: C.accentDim, borderColor: C.accentBorder }]}>
            <Text style={[pc.resultLabel, { color: C.accent + 'aa' }]}>AI atbilde:</Text>
            <Text style={[pc.resultText, { color: C.muted }]}>{goodResult}</Text>
          </View>
        )}
      </View>
    </View>
  );
}
const pc = StyleSheet.create({
  wrap:        { flexDirection: 'row', backgroundColor: C.card, borderRadius: 12, borderWidth: 1, borderColor: C.border, marginVertical: 18, overflow: 'hidden' },
  col:         { flex: 1, padding: 16 },
  colHeader:   { flexDirection: 'row', alignItems: 'center', gap: 7, marginBottom: 12 },
  colTitle:    { fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  text:        { color: C.text, fontSize: 13, lineHeight: 21, fontStyle: 'italic' },
  result:      { borderRadius: 8, borderWidth: 1, padding: 10, marginTop: 12 },
  resultLabel: { fontSize: 10, fontWeight: '700', letterSpacing: 0.5, marginBottom: 4 },
  resultText:  { fontSize: 12, lineHeight: 18 },
});

// ─── FormulaBlock — prompt anatomy visual ─────────────────────────────────────
function FormulaBlock() {
  const parts = [
    { key: 'LOMA',         color: '#7c93f0', icon: 'person-circle-outline' as const,  desc: 'Kāds eksperts ir AI?',         example: '"Tu esi pieredzējis mārketinga speciālists..."' },
    { key: 'KONTEKSTS',    color: '#f0b429', icon: 'information-circle-outline' as const, desc: 'Kas ir situācija?',         example: '"Es vadu nelielu frizētavu Rīgā, 3 darbinieki..."' },
    { key: 'UZDEVUMS',     color: C.accent,  icon: 'checkmark-done-outline' as const,  desc: 'Ko precīzi jādara?',           example: '"Uzraksti 5 Instagram ierakstu idejas..."' },
    { key: 'FORMĀTS',      color: '#c77cf0', icon: 'list-outline' as const,            desc: 'Kādā formā atbildi?',          example: '"...saraksta formātā ar emojiem, katrs 2 rindkopas"' },
    { key: 'IEROBEŽOJUMI', color: '#f07c7c', icon: 'options-outline' as const,         desc: 'Valoda, garums, stils',        example: '"...latviski, max 100 vārdi, draudzīgs tonis"' },
  ];
  return (
    <View style={fb.wrap}>
      <Text style={fb.title}>PROMPTA FORMULA — 5 daļas</Text>
      {parts.map((p, i) => (
        <View key={i} style={fb.row}>
          <View style={[fb.keyWrap, { backgroundColor: p.color + '22', borderColor: p.color + '44' }]}>
            <Ionicons name={p.icon} size={14} color={p.color} />
            <Text style={[fb.key, { color: p.color }]}>{p.key}</Text>
          </View>
          <View style={fb.right}>
            <Text style={fb.desc}>{p.desc}</Text>
            <Text style={fb.example}>{p.example}</Text>
          </View>
          {i < parts.length - 1 && <View style={fb.connector}><Text style={fb.plus}>+</Text></View>}
        </View>
      ))}
    </View>
  );
}
const fb = StyleSheet.create({
  wrap:      { backgroundColor: C.card, borderRadius: 14, borderWidth: 1, borderColor: C.border, padding: 20, marginVertical: 20 },
  title:     { color: C.muted, fontSize: 10, fontWeight: '800', letterSpacing: 1.5, marginBottom: 16, textAlign: 'center' },
  row:       { position: 'relative', marginBottom: 4 },
  keyWrap:   { flexDirection: 'row', alignItems: 'center', gap: 6, borderWidth: 1, borderRadius: 7, paddingHorizontal: 10, paddingVertical: 6, alignSelf: 'flex-start', marginBottom: 4 },
  key:       { fontSize: 11, fontWeight: '800', letterSpacing: 1 },
  right:     { paddingLeft: 4, paddingBottom: 12 },
  desc:      { color: C.muted, fontSize: 12, marginBottom: 2 },
  example:   { color: C.text + 'cc', fontSize: 12, fontStyle: 'italic', lineHeight: 18 },
  connector: { position: 'absolute', right: 0, top: 0, width: 24, height: 24, alignItems: 'center', justifyContent: 'center' },
  plus:      { color: C.faint, fontWeight: '800', fontSize: 18 },
});

// ─── RuleCard — single prompt rule ────────────────────────────────────────────
function RuleCards({ rules }: { rules: { num: string; title: string; bad: string; good: string }[] }) {
  return (
    <View style={{ gap: 12, marginVertical: 16 }}>
      {rules.map((r, i) => (
        <View key={i} style={{ backgroundColor: C.card, borderRadius: 12, borderWidth: 1, borderColor: C.border, overflow: 'hidden' }}>
          <View style={{ backgroundColor: '#0f1720', paddingHorizontal: 16, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <View style={{ backgroundColor: C.accentDim, borderRadius: 5, paddingHorizontal: 7, paddingVertical: 3 }}>
              <Text style={{ color: C.accent, fontSize: 10, fontWeight: '800' }}>LIKUMS {r.num}</Text>
            </View>
            <Text style={{ color: C.text, fontWeight: '700', fontSize: 14 }}>{r.title}</Text>
          </View>
          <View style={{ flexDirection: 'row', borderTopWidth: 1, borderTopColor: C.border }}>
            <View style={{ flex: 1, padding: 12, borderRightWidth: 1, borderRightColor: C.border, backgroundColor: 'rgba(240,82,82,0.04)' }}>
              <Text style={{ color: C.red + '99', fontSize: 9, fontWeight: '800', letterSpacing: 1, marginBottom: 5 }}>VĀJŠ</Text>
              <Text style={{ color: C.muted, fontSize: 12, lineHeight: 18, fontStyle: 'italic' }}>{r.bad}</Text>
            </View>
            <View style={{ flex: 1, padding: 12, backgroundColor: 'rgba(24,201,154,0.04)' }}>
              <Text style={{ color: C.accent + '99', fontSize: 9, fontWeight: '800', letterSpacing: 1, marginBottom: 5 }}>LABS</Text>
              <Text style={{ color: C.text, fontSize: 12, lineHeight: 18, fontStyle: 'italic' }}>{r.good}</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

// ─── PromptBox — copyable AI prompt ──────────────────────────────────────────
function PromptBox({ label, prompt }: { label: string; prompt: string }) {
  return (
    <View style={pb.wrap}>
      <View style={pb.header}>
        <Ionicons name="chatbubble-ellipses-outline" size={14} color={C.accent} />
        <Text style={pb.headerTxt}>{label}</Text>
        <View style={pb.copyTag}><Text style={pb.copyTxt}>KOPĒT UN IZMANTOT</Text></View>
      </View>
      <Text style={pb.prompt}>{prompt}</Text>
    </View>
  );
}
const pb = StyleSheet.create({
  wrap:     { backgroundColor: '#0a1520', borderRadius: 10, borderWidth: 1, borderColor: C.accentBorder, marginVertical: 14, overflow: 'hidden' },
  header:   { flexDirection: 'row', alignItems: 'center', gap: 7, backgroundColor: C.accentDim, paddingHorizontal: 14, paddingVertical: 9, borderBottomWidth: 1, borderBottomColor: C.accentBorder },
  headerTxt:{ color: C.accent, fontSize: 11, fontWeight: '700', letterSpacing: 0.8, flex: 1 },
  copyTag:  { backgroundColor: 'rgba(24,201,154,0.2)', borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2 },
  copyTxt:  { color: C.accent, fontSize: 9, fontWeight: '800', letterSpacing: 0.5 },
  prompt:   { color: '#c8dff0', fontSize: 13, lineHeight: 22, padding: 14, fontFamily: 'monospace' },
});

// ─── Phase header ─────────────────────────────────────────────────────────────
function PhaseHeader({ num, title, time, icon }: { num: string; title: string; time: string; icon: keyof typeof Ionicons.glyphMap }) {
  return (
    <View style={ph.wrap}>
      <View style={ph.left}>
        <View style={ph.iconBox}><Ionicons name={icon} size={18} color={C.accent} /></View>
        <View>
          <Text style={ph.phase}>FĀZE {num}</Text>
          <Text style={ph.title}>{title}</Text>
        </View>
      </View>
      <View style={ph.timeBox}>
        <Ionicons name="time-outline" size={12} color={C.gold} />
        <Text style={ph.time}>{time}</Text>
      </View>
    </View>
  );
}
const ph = StyleSheet.create({
  wrap:    { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: C.card, borderRadius: 12, borderWidth: 1, borderColor: C.border, borderLeftWidth: 3, borderLeftColor: C.accent, paddingHorizontal: 18, paddingVertical: 14, marginTop: 28, marginBottom: 16 },
  left:    { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconBox: { width: 38, height: 38, borderRadius: 10, backgroundColor: C.accentDim, alignItems: 'center', justifyContent: 'center' },
  phase:   { color: C.accent, fontSize: 10, fontWeight: '800', letterSpacing: 1.5 },
  title:   { color: C.text, fontSize: 16, fontWeight: '700' },
  timeBox: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(240,180,41,0.1)', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 4 },
  time:    { color: C.gold, fontSize: 11, fontWeight: '700' },
});

// ─── Sub-step (nested inside a phase) ────────────────────────────────────────
function SubStep({ num, title, children }: { num: string; title: string; children: React.ReactNode }) {
  return (
    <View style={ss.wrap}>
      <View style={ss.header}>
        <View style={ss.num}><Text style={ss.numTxt}>{num}</Text></View>
        <Text style={ss.title}>{title}</Text>
      </View>
      <View style={ss.body}>{children}</View>
    </View>
  );
}
const ss = StyleSheet.create({
  wrap:   { marginBottom: 20, paddingLeft: 4 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  num:    { width: 26, height: 26, borderRadius: 6, backgroundColor: C.faint, alignItems: 'center', justifyContent: 'center' },
  numTxt: { color: C.muted, fontWeight: '800', fontSize: 11 },
  title:  { color: C.text, fontSize: 15, fontWeight: '700' },
  body:   { paddingLeft: 36 },
});

// ─── Platform comparison table ────────────────────────────────────────────────
function PlatformTable() {
  const rows = [
    { name: 'Framer',      best: '⭐ Mūsdienīgs dizains', ai: true,  code: false, free: true,  price: '€0 / €14+',   for: 'Portfelis, pakalpojumi' },
    { name: 'Webflow',     best: 'Pilna kontrole',        ai: true,  code: false, free: true,  price: '€0 / €14+',   for: 'Biznesa lapas' },
    { name: 'Carrd',       best: 'Vienkāršākais',         ai: false, code: false, free: true,  price: '€0 / €9/g',   for: 'Vienas lapas' },
    { name: 'Squarespace', best: 'Skaisti šabloni',       ai: true,  code: false, free: false, price: 'No €12/mēn',  for: 'E-komercija' },
    { name: 'Notion',      best: 'Ātrākais starts',       ai: true,  code: false, free: true,  price: '€0 / €8+',    for: 'Portfelis, blog' },
  ];
  return (
    <View style={{ marginVertical: 20 }}>
      <View style={{ flexDirection: 'row', backgroundColor: '#0f1720', borderTopLeftRadius: 12, borderTopRightRadius: 12, borderWidth: 1, borderColor: C.border, paddingVertical: 10, paddingHorizontal: 14 }}>
        {['PLATFORMA', 'LABĀKAIS', 'AI', 'BEZMAKS.', 'CENA', 'PIEMĒROTĀKAIS'].map((h, i) => (
          <Text key={i} style={{ color: C.muted, fontSize: 10, fontWeight: '700', letterSpacing: 0.8, flex: i === 0 ? 1.2 : i === 1 ? 1.6 : i === 5 ? 1.8 : 0.7, textAlign: i > 1 && i < 5 ? 'center' : 'left' }}>{h}</Text>
        ))}
      </View>
      {rows.map((r, i) => (
        <View key={i} style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderTopWidth: 0, borderColor: C.border, paddingVertical: 11, paddingHorizontal: 14, backgroundColor: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent', ...(i === rows.length - 1 ? { borderBottomLeftRadius: 12, borderBottomRightRadius: 12 } : {}) }}>
          <Text style={{ flex: 1.2, color: r.name === 'Framer' ? C.accent : C.text, fontWeight: r.name === 'Framer' ? '700' : '500', fontSize: 13 }}>{r.name}{r.name === 'Framer' ? ' ★' : ''}</Text>
          <Text style={{ flex: 1.6, color: C.muted, fontSize: 12 }}>{r.best}</Text>
          <Text style={{ flex: 0.7, textAlign: 'center', fontSize: 14 }}>{r.ai ? '✓' : '–'}</Text>
          <Text style={{ flex: 0.7, textAlign: 'center', fontSize: 14 }}>{r.free ? '✓' : '✗'}</Text>
          <Text style={{ flex: 0.7, color: C.accent, fontSize: 11, fontWeight: '600', textAlign: 'center' }}>{r.price}</Text>
          <Text style={{ flex: 1.8, color: C.muted, fontSize: 11 }}>{r.for}</Text>
        </View>
      ))}
    </View>
  );
}

// ─── Screen instruction box ───────────────────────────────────────────────────
function ScreenNote({ children }: { children: React.ReactNode }) {
  return (
    <View style={{ backgroundColor: '#0c1825', borderRadius: 8, borderWidth: 1, borderColor: C.faint, padding: 12, marginVertical: 10, flexDirection: 'row', gap: 8, alignItems: 'flex-start' }}>
      <Ionicons name="desktop-outline" size={14} color={C.muted} style={{ marginTop: 2, flexShrink: 0 }} />
      <Text style={{ color: C.muted, fontSize: 12, lineHeight: 20, flex: 1 }}>{children}</Text>
    </View>
  );
}

// ─── Numbered mini-list ───────────────────────────────────────────────────────
function MiniList({ items }: { items: string[] }) {
  return (
    <View style={{ gap: 7, marginVertical: 10 }}>
      {items.map((item, i) => (
        <View key={i} style={{ flexDirection: 'row', gap: 10, alignItems: 'flex-start' }}>
          <View style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: C.faint, alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
            <Text style={{ color: C.muted, fontSize: 10, fontWeight: '700' }}>{i + 1}</Text>
          </View>
          <Text style={{ color: C.muted, fontSize: 13, lineHeight: 20, flex: 1 }}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// LEKCIJA 1 — full lesson view
// ═══════════════════════════════════════════════════════════════════════════════
function LessonOne({ onBack }: { onBack: () => void }) {
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 80 }} showsVerticalScrollIndicator={false}>

      {/* Back */}
      <TouchableOpacity onPress={onBack} style={lx.back}>
        <Ionicons name="arrow-back" size={16} color={C.muted} />
        <Text style={lx.backTxt}>Atpakaļ uz programmu</Text>
      </TouchableOpacity>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <View style={lx.hero}>
        <Image source={{ uri: IMGS.hero }} style={lx.heroImg} resizeMode="cover" />
        <View style={lx.heroGrad} />
        <View style={lx.heroContent}>
          <View style={lx.heroBadge}>
            <Ionicons name="school-outline" size={12} color={C.accent} />
            <Text style={lx.heroBadgeTxt}>PROGRAMMA 1 · LEKCIJA 1</Text>
          </View>
          <Text style={lx.heroTitle}>Ievads{'\n'}mākslīgajā intelektā</Text>
          <View style={lx.heroMeta}>
            <View style={lx.metaChip}><Ionicons name="time-outline" size={13} color={C.muted} /><Text style={lx.metaTxt}>18 min</Text></View>
            <View style={lx.metaChip}><Ionicons name="book-outline" size={13} color={C.muted} /><Text style={lx.metaTxt}>Lasīšana</Text></View>
            <View style={lx.metaChip}><Ionicons name="leaf-outline" size={13} color={C.accent} /><Text style={[lx.metaTxt, { color: C.accent }]}>Iesācējs</Text></View>
          </View>
        </View>
      </View>

      {/* ── Intro ────────────────────────────────────────────────────────── */}
      <View style={lx.intro}>
        <Text style={lx.introText}>
          Šī lekcija ir tava pirmā solis pasaulē, kas mainīs to, kā tu strādā, domā un pelna.
          Nav nepieciešamas tehniskas zināšanas — tikai vēlme iemācīties ko jaunu. Sāksim.
        </Text>
      </View>

      {/* ══════════════════════════════════════════════════════════════
          SADAĻA 1 — Kas ir AI?
      ══════════════════════════════════════════════════════════════ */}
      <SectionHeading num="SADAĻA 01" title="Kas ir mākslīgais intelekts — un kāpēc tas ir svarīgi TIEŠI TAGAD?" />

      <LessonImage uri={IMGS.robot} caption="Mākslīgais intelekts — vairs ne tikai zinātnes fantastika." height={300} />

      <Body>
        Iedomājies, ka tev ir asistents, kurš <Em>nekad nepārgurst</Em>, atbild uz jebkuru jautājumu
        sekundes laikā, runā 50 valodās, var uzrakstīt tekstu, analizēt dokumentus, veidot attēlus un
        pārvaldīt desmitiem uzdevumu vienlaicīgi — un viss tas par mazāku cenu nekā viena kafija dienā.
        Tas ir mākslīgais intelekts 2025. gadā.
      </Body>

      <Body>
        <Em>Tehniski</Em> — AI ir datorprogrammu veids, kas apmācīts uz miljardiem tekstu, attēlu un datu.
        Rezultātā tas spēj "saprast" valodu, atpazīt modeļus un ģenerēt jaunus risinājumus. Bet tev nav
        jāzina, kā tas strādā iekšienē — tāpat kā tev nav jāzina, kā automašīnas dzinējs darbojas, lai
        varētu braukt.
      </Body>

      <Quote
        text="AI neaizstās cilvēkus. Cilvēki, kuri prot lietot AI, aizstās cilvēkus, kuri to neprot."
        author="Sabiedrībā populāra atziņa 2025. gadā"
      />

      <StatsBar stats={[
        { num: '400M+', label: 'ChatGPT aktīvie lietotāji', icon: 'people-outline' },
        { num: '80%',   label: 'darbu ietekmēs AI', icon: 'trending-up-outline' },
        { num: 'TOP 4', label: 'Latvija AI lietošanā ES', icon: 'flag-outline' },
        { num: '€0',    label: 'Koda zināšanas vajadzīgas', icon: 'code-slash-outline' },
      ]} />

      <H3>Kāpēc 2025. gads ir īpašs?</H3>

      <Body>
        2023–2024. gadā AI kļuva pieejams visiem. 2025. gadā tas kļūst <Em>profesionāli izmantojams</Em>
        bez jebkādas tehniskas pieredzes. Rīki kā ChatGPT, Claude un Gemini ir tik intuitīvi, ka tos
        var izmantot jebkurš, kurš prot rakstīt īsziņas.
      </Body>

      <Body>
        Latvijā situācija ir īpaši interesanta — vairums uzņēmumu vēl <Em>nav sākuši</Em> aktīvi
        izmantot AI ikdienā. Tas nozīmē, ka cilvēki, kuri apgūst šīs prasmes šodien, var kļūt par
        pieprasītiem speciālistiem <Em>jau rīt</Em>.
      </Body>

      <H3>Reāls laika ietaupījums — skaitļi runā</H3>
      <CompareTable />

      <H3>Ko AI PROT un ko NEVAR?</H3>
      <CheckList items={[
        { ok: true,  text: 'Rakstīt tekstus, e-pastus, aprakstus, mārketinga materiālus' },
        { ok: true,  text: 'Analizēt datus un dokumentus, atrast kļūdas' },
        { ok: true,  text: 'Tulkot valodas — labāk nekā lielākā daļa tulkotāju' },
        { ok: true,  text: 'Veidot attēlus, logotipus, vizuālos materiālus' },
        { ok: true,  text: 'Automatizēt atkārtotus darbus — e-pastus, atskaites, datus' },
        { ok: false, text: 'Aizstāt cilvēcisko empātiju un personiskās attiecības' },
        { ok: false, text: 'Garantēt 100% precīzas faktu atbildes — vienmēr pārbaudi!' },
        { ok: false, text: 'Uzņemties juridisku vai morālu atbildību par lēmumiem' },
        { ok: false, text: 'Darboties bez tavas vadības un skaidras instrukcijas' },
      ]} />

      <Callout type="tip" title="Galvenā prasme: Prompt Writing">
        <Text style={{ color: C.muted, fontSize: 13, lineHeight: 20 }}>
          AI ir tikpat labs, cik labi tu to norādi. Māksla formulēt uzdevumu AI tā, lai tas saprastu
          precīzi, sauc par <Text style={{ color: C.text, fontWeight: '600' }}>Prompt Writing</Text>.
          Tieši šo mācīsimies visā Chademy programmā.
        </Text>
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════════════════════════════
          SADAĻA 2 — Nav vajadzīgas kodēšanas prasmes
      ══════════════════════════════════════════════════════════════ */}
      <SectionHeading num="SADAĻA 02" title="Vai man TIEŠĀM nav vajadzīgas kodēšanas prasmes?" />

      <LessonImage uri={IMGS.nocode} caption="Mūsdienu AI rīki — projektēti ikvienam, ne tikai programmētājiem." height={260} />

      <Body>
        Kodēšana ir lieliski — bet tā vairs <Em>nav priekšnoteikums</Em> digitālo risinājumu veidošanai.
        "No-code" un "low-code" revolūcija nozīmē, ka šodien tu vari uzbūvēt automatizācijas sistēmas,
        AI čatbotus, mājas lapas un digitālos produktus, <Em>nerakstot nevienu koda rindu</Em>.
      </Body>

      <Body>
        Pamato: <Em>Coding = instrukcijas datoram.</Em> No-code rīki jau ir uzrakstījuši šīs
        instrukcijas tevis vietā. Tu vienkārši sakārto loģiku ar pelīti vai dabiskā valodā.
        AI vēl vairāk vienkāršo procesu — tu apraksti, ko vēlies, AI palīdz to uzbūvēt.
      </Body>

      <H3>6 galvenie no-code AI rīki, ko mācāmies šajā programmā</H3>
      <ToolsGrid />

      <H3>Kā izskatās AI aģents reālā dzīvē?</H3>

      <Body>
        <Em>Scenārijs:</Em> Tev ir neliels veikals. Klients Facebook raksta: "Vai jums ir sarkana
        jaka 42. izmērā?" Bez AI — tu manuāli atbildi. Ar AI aģentu — tas automātiski pārbauda
        noliktavu, atbild klientam un, ja preces nav, piedāvā alternatīvas. Viss bez tavas iesaistīšanās.
      </Body>

      <AgentFlow />

      <Body>
        Šādu sistēmu var uzbūvēt ar <Em>Voiceflow + n8n</Em> dažās stundās. Bez koda. Tieši šo
        darīsim 2. programmā — "AI Automatizācija ar n8n".
      </Body>

      <Callout type="info" title="Ko mācīsimies šajā programmā?">
        <Text style={{ color: C.muted, fontSize: 13, lineHeight: 20 }}>
          Prompt Engineering → ChatGPT un Claude praksē → Pirmais AI čatbots → Automatizācija →
          Mājas lapas veidošana → Klientu piesaiste → Pirmie ienākumi no AI pakalpojumiem Latvijā.
        </Text>
      </Callout>

      <H3>Reāli piemēri — ko Latvijā jau var darīt</H3>
      <CheckList items={[
        { ok: true, text: 'Frizieris automatizē atgādinājumus un rezervācijas ar AI — ietaupa 3h nedēļā' },
        { ok: true, text: 'Grāmatvedis izmanto Claude dokumentu analīzei — apstrādā 10x vairāk klientu' },
        { ok: true, text: 'E-komercija ar AI čatbotu klientu apkalpošanā — 24/7 bez papildu darbiniekiem' },
        { ok: true, text: 'Mārketinga speciālists ar AI ģenerē saturu 5 platformām vienlaikus' },
        { ok: true, text: 'Freelanceris piedāvā AI automatizācijas pakalpojumus — €50–150/h' },
      ]} />

      <Divider />

      {/* ══════════════════════════════════════════════════════════════
          SADAĻA 3 — Kas ir promts un kā to rakstīt?
      ══════════════════════════════════════════════════════════════ */}
      <SectionHeading num="SADAĻA 03" title="Kas ir 'promts' un kā ar to iegūt labāko rezultātu?" />

      <LessonImage uri={IMGS.nocode} caption="Komunikācija ar AI — tas viss notiek caur tekstu, ko tu raksti." height={240} />

      <Body>
        Pirms sākam veidot mājas lapu, ir viena prasme, bez kuras AI kļūst bezjēdzīgs —
        <Em> prompt writing</Em>. Šī ir pati svarīgākā lieta, ko iemācīsies visā programmā.
        Veltīsim tai laiku, jo no tā ir atkarīgs viss pārējais.
      </Body>

      <H3>Ko nozīmē vārds "promts"?</H3>

      <Body>
        Latviskojot: <Em>promts (no angļu "prompt") = uzdevums, ko tu dod AI</Em>.
        Vienkāršāk sakot — tas ir teksts, ko tu ieraksti čatā ar AI (ChatGPT, Claude u.c.),
        lai tas ko izdarītu. Tas var būt jautājums, lūgums, instrukcija vai uzdevums.
      </Body>

      <View style={{ backgroundColor: C.card, borderRadius: 12, borderWidth: 1, borderColor: C.border, padding: 20, marginVertical: 16 }}>
        <Text style={{ color: C.muted, fontSize: 11, fontWeight: '700', letterSpacing: 1.5, marginBottom: 14 }}>IKDIENAS ANALOGIJA</Text>
        <View style={{ gap: 12 }}>
          {[
            { icon: 'restaurant-outline' as const, title: 'Restorānā', text: 'Tu saki ofkantam: "Vienu kafiju, lūdzu, bez cukura, ar pienu." Tas ir promts.' },
            { icon: 'search-outline' as const,     title: 'Google meklēšanā', text: 'Tu ieraksti: "labākie restorāni Rīgā 2025". Tas ir promts.' },
            { icon: 'chatbubble-outline' as const, title: 'ChatGPT vai Claude', text: 'Tu ieraksti: "Uzraksti man e-pastu klientam par aizkavētu piegādi." Tas arī ir promts.' },
          ].map((item, i) => (
            <View key={i} style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 12 }}>
              <View style={{ width: 34, height: 34, borderRadius: 8, backgroundColor: C.accentDim, alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Ionicons name={item.icon} size={16} color={C.accent} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: C.text, fontWeight: '700', fontSize: 13, marginBottom: 3 }}>{item.title}</Text>
                <Text style={{ color: C.muted, fontSize: 13, lineHeight: 20 }}>{item.text}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <Body>
        Atšķirība no Google: Google meklē jau esošu informāciju internetā. AI <Em>ģenerē jaunu
        atbildi</Em> tieši tev, balstoties uz to, ko tu lūdzi. Jo precīzāk tu lūdz, jo labāku
        rezultātu saņem. Tieši tur ir atšķirība starp cilvēku, kurš AI "izmēģinājis", un
        cilvēku, kurš AI <Em>prot izmantot</Em>.
      </Body>

      <Callout type="tip" title="Galvenā atziņa">
        <Text style={{ color: C.muted, fontSize: 13, lineHeight: 20 }}>
          <Text style={{ color: C.text, fontWeight: '600' }}>AI ir tikpat labs, cik labs ir tavs promts.</Text>
          {' '}Vājš promts → vispārīga, bezjēdzīga atbilde. Labs promts → precīzs,
          lietojams rezultāts. Šo prasmi sauc par <Text style={{ color: C.text, fontWeight: '600' }}>Prompt Engineering</Text>.
        </Text>
      </Callout>

      <H3>Kāpēc lielākā daļa cilvēku saņem sliktas AI atbildes?</H3>

      <Body>
        Pamēģini šādā veidā: ieraksti ChatGPT "uzraksti tekstu par manu firmu". Saņemsi
        pilnīgi vispārīgu, bezkrāsainu tekstu, ko nevarēsi izmantot. Tad mēģini ar
        detalizētu prompt un redzi, kāda ir atšķirība:
      </Body>

      <PromptCompare
        bad={'"uzraksti tekstu par manu firmu"'}
        good={'"Tu esi profesionāls copywriter. Es vadu nelielu elektriķu firmu Rīgā ar 4 darbiniekiem. Mēs strādājam gan privātmāju, gan biroju projektos. Uzraksti mājas lapas "Par mums" sadaļu — 130 vārdi, profesionāls bet silts tonis, latviski. Sāc ar aizraujošu pirmo teikumu, ne ar "Mūsu uzņēmums ir...""'}
        badResult={"Mūsu uzņēmums ir vadošs risinājumu sniedzējs Latvijā. Mēs piedāvājam augstākās kvalitātes pakalpojumus un esam apņēmušies nodrošināt klientu apmierinātību..."}
        goodResult={"No pirmā elektrības kabeļa līdz pabeigtam projektam — mēs esam Rīgas elektriķi, kuriem uzticas gan ģimenes, gan biroji. Četri gadi, desmitiem projektu un vienkāršs princips: darbs ir padarīts tikai tad, kad klients ir apmierināts..."}
      />

      <H3>Prompta formula — 5 daļas</H3>

      <Body>
        Labam promptam parasti ir 5 daļas. Nav obligāti visas lietot katrreiz — bet jo vairāk
        iekļauj, jo precīzāku atbildi saņem. Iegaumē šo formulu:
      </Body>

      <FormulaBlock />

      <Body>
        <Em>Piemērs — pilns promts pēc formulas:</Em>
      </Body>

      <PromptBox
        label="PIEMĒRS: Pilns promts pēc formulas"
        prompt={`[LOMA] Tu esi pieredzējis e-pasta mārketinga speciālists.

[KONTEKSTS] Es vadu tiešsaistes veikalu ar Latvijas amatniecības precēm. Mans e-pasta sarakstā ir 340 abonenti. Šī nedēļa ir Ziemassvētku izpārdošana — 20% atlaide visam.

[UZDEVUMS] Uzraksti e-pasta vēstuli, kas mudina cilvēkus iepirkties šajā nedēļā.

[FORMĀTS] Struktūra: aizraujošs virsraksts (max 8 vārdi) + 3 īsas rindkopas + noslēguma CTA poga teksts.

[IEROBEŽOJUMI] Latviski. Silts, personīgs tonis. Max 200 vārdi. Bez kliša frāzēm kā "nepalaid garām".`}
      />

      <H3>8 likumi labam promptam</H3>

      <RuleCards rules={[
        {
          num:   '01',
          title: 'Dod AI lomu',
          bad:   '"Uzraksti recepti."',
          good:  '"Tu esi šefpavārs ar 15 gadu pieredzi itāļu virtuvē. Uzraksti recepti..."',
        },
        {
          num:   '02',
          title: 'Esi konkrēts — ne vispārīgs',
          bad:   '"Uzraksti kaut ko par mārketingu."',
          good:  '"Uzraksti 3 Instagram parakstus kosmētikas zīmolam, mērķauditorija: sievietes 25–40, Latvija."',
        },
        {
          num:   '03',
          title: 'Norādi formātu',
          bad:   '"Apraksti ieguvumus."',
          good:  '"Apraksti 5 ieguvumus saraksta formātā, katrs max 1 teikums, ar emoji sākumā."',
        },
        {
          num:   '04',
          title: 'Norādi valodu un toni',
          bad:   '"Uzraksti e-pastu klientam."',
          good:  '"Uzraksti e-pastu latviski. Tonis: profesionāls, bet draudzīgs. Ne pārāk formāls."',
        },
        {
          num:   '05',
          title: 'Norādi garumu',
          bad:   '"Uzraksti aprakstu."',
          good:  '"Uzraksti aprakstu — max 80 vārdi, piemērots Instagram bio."',
        },
        {
          num:   '06',
          title: 'Parādi piemēru (ja ir)',
          bad:   '"Uzraksti virsrakstu."',
          good:  '"Uzraksti 5 virsrakstus. Stils kā šajā piemērā: \'Kā ietaupīt 10h nedēļā ar vienu rīku\'"',
        },
        {
          num:   '07',
          title: 'Saki, ko NEVAJAG',
          bad:   '"Uzraksti par mani."',
          good:  '"Uzraksti par mani. Nelietot vārdus \'kaislīgs\', \'motivēts\', \'dinamisks\'. Nesākt ar \'Esmu...\'."',
        },
        {
          num:   '08',
          title: 'Turpini sarunu — nepārtraucies',
          bad:   'Jautā vienu reizi, saņem atbildi, aiziet.',
          good:  '"Labi, tagad to pašu tekstu pārraksti draudzīgākā tonī." Vai: "Pievieno konkrētākus skaitļus."',
        },
      ]} />

      <H3>Biežākās kļūdas iesācējiem</H3>

      <CheckList items={[
        { ok: false, text: 'Pārāk īss promts: "uzraksti par AI" → AI nezina, ko tieši tu gribi' },
        { ok: false, text: 'Nav norādīta valoda: AI automātiski atbild angliski, ja tu raksti angliski' },
        { ok: false, text: 'Nav norādīts formāts: saņemsi garu tekstu, kad gribēji sarakstu' },
        { ok: false, text: 'Viena mēģinājuma domāšana: lielākā daļa labu rezultātu rodas 3.–5. iterācijā' },
        { ok: false, text: 'Nav konteksta: "uzraksti e-pastu" → AI nezina, kam, par ko, kādā tonī' },
        { ok: true,  text: 'Pareizi: raksti promptu kā detalizētu uzdevumu labam darba kolēģim' },
      ]} />

      <H3>Praktiski piemēri — izmēģini šodien</H3>

      <Body>
        Šie promti darbojas <Em>tieši tagad</Em> — atver claude.ai vai chat.openai.com un
        izmēģini. Neaizmirsti aizstāt iekavās esošo ar saviem datiem.
      </Body>

      <PromptBox
        label="PRAKTISKAIS PROMTS #1: Iepazīšanās ar AI"
        prompt={`Sveiki! Es esmu [tavs vārds], [tavs amats vai nodarbošanās] no Latvijas. Es tikko sāku mācīties izmantot AI savā darbā.

Palīdzi man saprast: kādos 5 konkrētos uzdevumos cilvēks manā profesijā varētu izmantot AI katru dienu? Dod praktiskus, reālistiskus piemērus — ne abstraktus.

Raksti latviski, saraksta formātā.`}
      />

      <PromptBox
        label="PRAKTISKAIS PROMTS #2: Teksta uzlabošana"
        prompt={`Zemāk ir teksts, ko esmu uzrakstījis. Lūdzu uzlabo to:
— Padariet to skaidrāku un kodolīgāku
— Saglabā manu toni un balsi
— Izlabo gramatikas kļūdas
— Nekļūsti pārāk formāls

TEKSTS:
[Ielīmē šeit savu tekstu]

Raksti latviski. Pēc uzlabotā teksta paskaidro īsi, ko mainīji un kāpēc.`}
      />

      <PromptBox
        label="PRAKTISKAIS PROMTS #3: Ideju ģenerēšana"
        prompt={`Es esmu [apraksts: kas tu esi, ko dari] Latvijā.

Vajadzīgas idejas: [konkrēts uzdevums, piemēram: 10 Instagram ierakstu tēmas nākamajai mēnesim].

Mana mērķauditorija: [apraksts].
Tonis: [profesionāls / humors / informatīvs / iedvesmojošs].
Platforma: [Instagram / LinkedIn / Facebook / e-pasts].

Dod idejas saraksta formātā ar īsu paskaidrojumu katrai. Latviski.`}
      />

      <Callout type="info" title="Zelta padoms — saruna, nevis vienkāršs jautājums">
        <Text style={{ color: C.muted, fontSize: 13, lineHeight: 21 }}>
          AI atceras visu iepriekšējo sarunu. Izmanto to:{'\n'}
          <Text style={{ color: C.text, fontWeight: '600' }}>"Labi. Tagad to pašu pārraksti garākā versijā."</Text>{'\n'}
          <Text style={{ color: C.text, fontWeight: '600' }}>"Pievieno humoru."</Text>{'\n'}
          <Text style={{ color: C.text, fontWeight: '600' }}>"Pirmā varianta toni saglabā, bet otrā versijas saturu."</Text>{'\n'}
          Labākais rezultāts rodas iteratīvi — ne no pirmā promptа, bet no 3.–5. jautājuma.
        </Text>
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════════════════════════════
          SADAĻA 4 — Mājas lapas veidošana ar AI
      ══════════════════════════════════════════════════════════════ */}
      <SectionHeading num="SADAĻA 04" title="Kā uzbūvēt savu pirmo mājas lapu ar AI — soli pa solim" />

      <LessonImage uri={IMGS.website} caption="Moderna mājas lapa — tagad sasniedzama dažu stundu laikā, bez programmētāja." height={280} />

      <Body>
        Mājas lapa ir tavs <Em>digitālais birojs</Em> — pirmā lieta, ko potenciālie klienti meklē
        Google un ko pārbauda pirms sadarboties ar tevi. Līdz šim profesionāla lapa maksāja
        €800–3000 un prasīja nedēļas. Ar AI rīkiem to var uzbūvēt <Em>vienā dienā, par €0</Em>.
        Šajā sadaļā ejam cauri katram solim precīzi.
      </Body>

      <StatsBar stats={[
        { num: '3–4 h',  label: 'Laiks no nulles līdz lapai', icon: 'timer-outline' },
        { num: '€0',     label: 'Sākotnējās izmaksas',        icon: 'card-outline' },
        { num: '6 fāzes',label: 'Strukturēts process',        icon: 'git-branch-outline' },
        { num: '100%',   label: 'Bez kodēšanas',              icon: 'code-slash-outline' },
      ]} />

      {/* ── Platformu salīdzinājums ─────────────────────────────── */}
      <H3>Kuru platformu izvēlēties?</H3>
      <Body>
        Pirms sākt būvēt, jāizvēlas platforma. Ieteicam sākt ar <Em>Framer</Em> — tai ir
        iebūvēts AI dizaina asistents, mūsdienīgākie šabloni un bezmaksas plāns. Bet dažādiem
        mērķiem der dažādas platformas:
      </Body>
      <PlatformTable />

      <Callout type="tip" title="Mūsu ieteikums: sāc ar Framer">
        <Text style={{ color: C.muted, fontSize: 13, lineHeight: 20 }}>
          Framer ir optimāls pirmās lapas veidošanai — tas izskatās profesionāli no pirmās dienas,
          nav nepieciešamas dizaina zināšanas, un AI palīdz gan ar izkārtojumu, gan tekstu.
          Visas šīs instrukcijas ir orientētas uz Framer.
        </Text>
      </Callout>

      {/* ══ FĀZE 1 ══════════════════════════════════════════════════ */}
      <PhaseHeader num="1" title="Plānošana ar AI" time="~30 min" icon="map-outline" />

      <SubStep num="1.1" title="Atver Claude.ai un izveido kontu">
        <Body>
          Dodies uz <Em>claude.ai</Em> un izveido bezmaksas kontu ar Google vai e-pastu. Claude ir
          Anthropic mākslīgā intelekta asistents — tas ir lieliski piemērots tekstu rakstīšanai un
          strukturēšanai latviešu valodā.
        </Body>
        <ScreenNote>
          Ekrānā redzi tukšu čata logu ar teksta lauku apakšā. Tieši tur ievadīsi savus uzdevumus.
        </ScreenNote>
      </SubStep>

      <SubStep num="1.2" title="Ģenerē mājas lapas struktūru">
        <Body>Kopē šo prompt un aizvieto iekavās esošo ar savu informāciju:</Body>
        <PromptBox
          label="PROMPT: Mājas lapas struktūra"
          prompt={`Es esmu [tavs amats vai biznesa apraksts] no Latvijas. Mans mērķis ar mājas lapu ir [piesaistīt klientus / parādīt portfeli / pārdot pakalpojumus].

Mana mērķauditorija ir [apraksti — piemēram: mazie uzņēmumi Latvijā, kas meklē mārketinga palīdzību].

Lūdzu izveido:
1. Ieteicamo mājas lapas struktūru (sadaļas un to kārtību)
2. Īsu aprakstu par katru sadaļu — ko tajā rakstīt
3. 3 ieteikumus — ko noteikti iekļaut, lai lapa pārdotu

Raksti latviski.`}
        />
        <Body>
          Claude atgriezīs strukturētu plānu. Saglabā to — izmantosi nākamajā solī kā pamatu
          katra sadaļas teksta ģenerēšanai.
        </Body>
      </SubStep>

      <SubStep num="1.3" title="Precizē un pielāgo plānu">
        <Body>
          Izlasi Claude piedāvāto struktūru. Ja kāda sadaļa neliekas vajadzīga — saki Claude:
          <Em> "Noņem sadaļu X, pievieno sadaļu Y."</Em> Turpini sarunu — AI atceras visu iepriekš
          teikto un pielāgojas.
        </Body>
        <MiniList items={[
          'Tipiska portfeļa lapa: Hero → Par mani → Pakalpojumi → Portfelis → Kontakti',
          'Tipiska biznesa lapa: Hero → Problēma/Risinājums → Atsauksmes → CTA → Kontakti',
          'Vienkārša landing page: Hero → 3 priekšrocības → Sociālie pierādījumi → Forma',
        ]} />
      </SubStep>

      {/* ══ FĀZE 2 ══════════════════════════════════════════════════ */}
      <PhaseHeader num="2" title="Satura rakstīšana ar AI" time="~45 min" icon="create-outline" />

      <Body>
        Tagad ģenerēsim tekstu katrai lapas sadaļai. Katram prompt beidzot pievieno:
        <Em> "Raksti latviski, profesionāli bet draudzīgā tonī, ne vairāk kā X vārdi."</Em>
      </Body>

      <SubStep num="2.1" title="Hero sadaļa — pirmais iespaids">
        <Body>
          Hero ir pirmā lieta, ko apmeklētājs redz. Tajā jābūt: virsrakstam (kas tu esi un ko dari),
          apakšvirsrakstam (kādu rezultātu sniedz) un pogai (aicinājums uz darbību).
        </Body>
        <PromptBox
          label="PROMPT: Hero sadaļas teksts"
          prompt={`Uzraksti hero sadaļas tekstu manai mājas lapai.

Es esmu [tavs amats], kas palīdz [mērķauditorijai] ar [pakalpojums/rezultāts].

Vajadzīgs:
• Virsraksts (maks. 8 vārdi) — skaidri apraksta, ko es daru
• Apakšvirsraksts (1–2 teikumi) — kādu konkrētu rezultātu sniedzu
• CTA poga teksts (3–5 vārdi) — aicinājums uz darbību

Raksti latviski. Tonis: pārliecinošs, konkrēts, bez žargona.`}
        />
        <ScreenNote>
          Piemērs: "AI Automatizācijas Speciālists Latvijā | Ietaupiet 10h nedēļā ar pielāgotiem AI risinājumiem | Sāciet Šodien →"
        </ScreenNote>
      </SubStep>

      <SubStep num="2.2" title='"Par mani" sadaļa'>
        <Body>
          Šī sadaļa veido uzticību. Klienti pērk no cilvēkiem, kuriem uzticas — nevis no
          anonīmām lapām. Esi konkrēts un personīgs.
        </Body>
        <PromptBox
          label='PROMPT: "Par mani" sadaļa'
          prompt={`Uzraksti "Par mani" sadaļu mājas lapai.

Par mani: [vārds], [amats/pieredze], [kur strādā vai no kurienes], [ko īpaši prot].
Mans lielākais sasniegums/pieredze: [pievieno konkrētu faktu].
Kāpēc sāku ar šo: [personīgais stāsts 1–2 teikumos].

Izveidojiet tekstu ~120 vārdos. Sāc ar aizraujošu pirmo teikumu.
Neizmanto kliša frāzes kā "kaislīgs" vai "motivēts".
Raksti latviski, personīgā tonī.`}
        />
      </SubStep>

      <SubStep num="2.3" title="Pakalpojumu sadaļa">
        <Body>
          Katram pakalpojumam vajadzīgs: nosaukums, īss apraksts (1–2 teikumi), konkrēts
          rezultāts, ko klients saņem, un (pēc izvēles) cena vai "No €X".
        </Body>
        <PromptBox
          label="PROMPT: 3 pakalpojumu apraksti"
          prompt={`Uzraksti 3 pakalpojumu aprakstus mājas lapai.

Mani pakalpojumi (saraksti tos):
1. [Pakalpojums 1]
2. [Pakalpojums 2]
3. [Pakalpojums 3]

Katram vajadzīgs:
• Nosaukums (3–5 vārdi, skaidrs un konkrēts)
• Apraksts (2–3 teikumi) — ko iegūst klients
• 1 teikums ar konkrētu rezultātu vai priekšrocību

Tonis: profesionāls, uz rezultātu orientēts. Raksti latviski.`}
        />
      </SubStep>

      <SubStep num="2.4" title="Sociālie pierādījumi (atsauksmes)">
        <Body>
          Ja tev vēl nav īstu atsauksmju — lūdz AI uzrakstīt <Em>reālistiskus piemērus</Em>,
          ko vēlāk aizstāsi ar īstajām. Vai vienkārši pievienot sadaļu: "Pirmie 3 klienti saņem
          50% atlaidi apmaiņā pret atsauksmi."
        </Body>
        <PromptBox
          label="PROMPT: Atsauksmju piemēri"
          prompt={`Uzraksti 3 reālistiskas klientu atsauksmes manai mājas lapai.

Mans pakalpojums: [pakalpojuma apraksts].
Mana mērķauditorija: [apraksti tipisko klientu].

Katrai atsauksmei:
• Pilns vārds (izdomāts, latvisks)
• Amats un uzņēmums
• Atsauksme 2–3 teikumos — konkrēts rezultāts, ko ieguva

Raksti latviski, dabiski un ticami — ne pārāk parfēti.`}
        />
        <Callout type="warning" title="Svarīgi!">
          <Text style={{ color: C.muted, fontSize: 13, lineHeight: 20 }}>
            Pirms publicēšanas aizstāj AI ģenerētās atsauksmes ar <Text style={{ color: C.text, fontWeight: '600' }}>īstām</Text>.
            AI piemēri ir tikai pagaidu aizpildīšanai dizaina laikā.
          </Text>
        </Callout>
      </SubStep>

      <SubStep num="2.5" title="Kontaktu sadaļa un CTA">
        <PromptBox
          label="PROMPT: Kontaktu sadaļas teksts"
          prompt={`Uzraksti kontaktu sadaļas tekstu mājas lapai.

Mans pakalpojums: [apraksts].
Ko vēlos, lai klients dara: [piesakās konsultācijai / nosūta e-pastu / rezervē tikšanos].
Mans e-pasts / Calendly saite / cits kontakts: [norādi].

Vajadzīgs:
• Virsraksts (aicinoša frāze, maks. 6 vārdi)
• 2–3 teikumu teksts zem virsraksta
• Poga teksts

Raksti latviski, pārliecinoši, bez spiediena.`}
        />
      </SubStep>

      {/* ══ FĀZE 3 ══════════════════════════════════════════════════ */}
      <PhaseHeader num="3" title="Framer konta izveide un projekta sākšana" time="~15 min" icon="rocket-outline" />

      <SubStep num="3.1" title="Reģistrācija Framer">
        <MiniList items={[
          'Dodies uz framer.com',
          'Noklikšķini "Get started for free" (zaļa poga augšā labajā stūrī)',
          'Izvēlies "Continue with Google" — tas ir ātrākais veids',
          'Apstiprina e-pastu, ja nepieciešams',
          'Nokļūsti Framer dashboard — redzēsi tukšu projektu sarakstu',
        ]} />
        <ScreenNote>
          Bezmaksas plānā ietilpst: 1 publicēts projekts, Framer apakšdomēns (tavaslapa.framer.website),
          neierobežots dizains. Maksas plāns vajadzīgs tikai pašam domēnam vai vairāk projektiem.
        </ScreenNote>
      </SubStep>

      <SubStep num="3.2" title="Jauna projekta izveide ar AI">
        <MiniList items={[
          'Nospied "+ New Project" vai "Create Project"',
          'Izvēlies "Generate with AI" (nevis tukšu projektu)',
          'Laukā ievadi sava biznesa aprakstu angliski (AI labāk saprot angliski)',
          'Framer AI ģenerēs pilnu lapas struktūru ar dizainu ~30 sekunžu laikā',
          'Pārskatīsi rezultātu nākamajā fāzē',
        ]} />
        <PromptBox
          label="PROMPT: Framer AI laukam (angliski)"
          prompt={`A professional [your profession] website for a Latvian [freelancer/business].
Services: [list your services].
Target audience: [describe].
Style: modern, clean, dark/light [choose one], professional.
Sections needed: Hero, About, Services, Testimonials, Contact.`}
        />
      </SubStep>

      <SubStep num="3.3" title="Alternatīva: izvēlies šablonu">
        <Body>
          Ja AI ģenerētais rezultāts nepatīk — izmanto šablonus. Framer šabloni ir
          augstākās kvalitātes no visām no-code platformām.
        </Body>
        <MiniList items={[
          'Nospied "Templates" kreisajā izvēlnē',
          'Filtrē pēc kategorijas: Portfolio, Agency, Business, Freelance',
          'Izvēlies šablonu, klikšķini "Use Template"',
          'Šablons atvērsies redaktorā ar demo saturu — aizstāsi ar savu',
        ]} />
      </SubStep>

      {/* ══ FĀZE 4 ══════════════════════════════════════════════════ */}
      <PhaseHeader num="4" title="Dizains un satura ievietošana" time="~60–90 min" icon="color-palette-outline" />

      <SubStep num="4.1" title="Framer redaktora orientācija">
        <Body>
          Framer redaktors ir sadalīts 3 daļās — iepazīsties ar tām pirms sākt rediģēt:
        </Body>
        <MiniList items={[
          'Kreisā puse — "Layers" (slāņi): visa lapas struktūra kā koks. Klikšķini uz jebkura elementa, lai to atlasītu.',
          'Vidus — "Canvas" (audekls): vizuālais priekšskatījums. Dubultklikšķis uz teksta, lai rediģētu.',
          'Labā puse — "Properties" (īpašības): fonta izmērs, krāsa, atstarpes, efekti. Mainās atkarībā no atlasītā.',
        ]} />
        <ScreenNote>
          Ātrākais veids rediģēt tekstu: dubultklikšķis uz tā tieši canvas. Neizmanto layers paneli — tas ir lēnāks.
        </ScreenNote>
      </SubStep>

      <SubStep num="4.2" title="Aizstāj demo tekstus ar AI saturu">
        <Body>
          Tagad ņem no Fāzes 2 AI ģenerētos tekstus un ievieto Framer:
        </Body>
        <MiniList items={[
          'Hero virsraksts: dubultklikšķis → atlasi visu tekstu (Ctrl+A) → ielīmē jauno',
          'Hero apakšvirsraksts: tāpat',
          'CTA pogas teksts: dubultklikšķis uz pogas → mainī tekstu',
          '"Par mani" teksts: atrod sadaļu layers panelī, dubultklikšķis uz teksta bloka',
          'Pakalpojumi: katram pakalpojumam ir atsevišķs "card" komponents — rediģē katru atsevišķi',
        ]} />
        <Callout type="tip" title="Ātrais padoms">
          <Text style={{ color: C.muted, fontSize: 13, lineHeight: 20 }}>
            Ja kāda sadaļa nav vajadzīga — atlasi to layers panelī, nospied <Text style={{ color: C.text, fontWeight: '600' }}>Delete</Text>.
            Ja vajag pievienot jaunu — nospied "+" canvas rīkjoslā un izvēlies komponentu.
          </Text>
        </Callout>
      </SubStep>

      <SubStep num="4.3" title="Krāsu palete — izvēlies savu stilu">
        <Body>
          Framer ļauj mainīt visu lapas krāsu paleti ar vienu klikšķi. Kreisajā panelī
          atver <Em>"Assets" → "Colors"</Em> — tur redzi visas lapas pamatkrāsas.
        </Body>
        <MiniList items={[
          'Primārā krāsa: tava zīmola krāsa — poga, akcentu elementi',
          'Fona krāsa: tumša (#0a0f1a) vai gaišs (#ffffff) — izvēlies vienu stilu',
          'Teksta krāsa: automātiski kontrastē ar fonu',
          'Ieteicamas profesionālas kombinācijas: Tumša + tirkīzs, Gaišs + tumši zils, Krēmkrāsa + zaļš',
        ]} />
        <ScreenNote>
          Padomi krāsu izvēlei: coolors.co ģenerē harmoniskas paletes — ievadi savu primāro krāsu un
          saņem 4 papildkrāsas. Pilnīgi bezmaksas.
        </ScreenNote>
      </SubStep>

      <SubStep num="4.4" title="Bildes — Unsplash integrācija">
        <Body>
          Framer ir tieša integrācija ar Unsplash — augstākās kvalitātes bezmaksas foto arhīvu.
          Nav nepieciešams atsevišķi lejupielādēt bildes.
        </Body>
        <MiniList items={[
          'Klikšķini uz jebkuras esošas bildes lapā',
          'Labajā panelī nospied "Replace Image"',
          'Atvērsies Unsplash meklēšana tieši Framer iekšienē',
          'Meklē angliski: "professional workspace", "laptop minimal", "team meeting", u.c.',
          'Izvēlies bildi — tā automātiski aizstāj veco ar pareiziem izmēriem',
        ]} />
        <Callout type="tip" title="Labākie meklēšanas vārdi Unsplash">
          <Text style={{ color: C.muted, fontSize: 13, lineHeight: 20 }}>
            <Text style={{ color: C.text }}>Hero bildei:</Text> "dark minimal workspace", "professional desk setup"{'\n'}
            <Text style={{ color: C.text }}>Par mani:</Text> "person laptop coffee", "freelancer working"{'\n'}
            <Text style={{ color: C.text }}>Pakalpojumi:</Text> "business meeting", "digital marketing", "automation"{'\n'}
            <Text style={{ color: C.text }}>Vispārīgi:</Text> Vienmēr pievieno "–people" lai izvairītos no sejām, ja nevēlies
          </Text>
        </Callout>
      </SubStep>

      <SubStep num="4.5" title="Fonti — profesionālas kombinācijas">
        <Body>
          Framer atbalsta Google Fonts bibliotēku — 1000+ bezmaksas fonti. Labajā panelī,
          atlasot tekstu, redzi "Font" lauku. Ieteicamās kombinācijas:
        </Body>
        <MiniList items={[
          'Virsraksti: "Syne" vai "Space Grotesk" + teksts: "Inter" — moderns, tehnoloģisks',
          'Virsraksti: "Playfair Display" + teksts: "Lato" — elegants, uzticams',
          'Virsraksti: "Manrope" + teksts: "DM Sans" — tīrs, minimāls',
          'Virsraksti: "Clash Display" + teksts: "Satoshi" — premium, mūsdienīgs',
        ]} />
      </SubStep>

      <SubStep num="4.6" title="Mobilā versija — pārbaude">
        <Body>
          Vairāk nekā 60% apmeklētāju nāks no tālruņa. Framer automātiski rada mobilo versiju,
          bet tā jāpārbauda.
        </Body>
        <MiniList items={[
          'Canvas augšā nospied tālruņa ikonu (vai Ctrl+Shift+M)',
          'Pārskatīsi, kā lapa izskatās telefonā',
          'Ja teksts pārāk liels vai mazs — atlasi to un mainī izmēru tieši mobilajā skatā',
          'Pārbaudi, vai visas pogas ir viegli saspiedamas (min. 44×44px)',
          'Galvenā sadaļa bez ritināšanas — logo un CTA jābūt redzamiem uzreiz',
        ]} />
      </SubStep>

      {/* ══ FĀZE 5 ══════════════════════════════════════════════════ */}
      <PhaseHeader num="5" title="Publicēšana un domēna iestatīšana" time="~20 min" icon="globe-outline" />

      <SubStep num="5.1" title="Publicē ar bezmaksas Framer domēnu">
        <MiniList items={[
          'Canvas augšā labajā stūrī nospied "Publish" (zila poga)',
          'Izvēlies "Publish to framer.website"',
          'Ievadi sava lapas URL nosaukumu: piemēram "karlis-ai" → karlis-ai.framer.website',
          'Nospied "Publish" — lapa būs dzīvā internetā ~30 sekunžu laikā',
          'Dalies ar URL draugiem un saņem pirmo atsauksmi!',
        ]} />
        <ScreenNote>
          Pirmo reizi publicē bezmaksas versiju. Vispirms parādi draugiem vai kolēģiem —
          saņem atsauksmes. Tikai tad, kad esi apmierināts, iegādājies īsto domēnu.
        </ScreenNote>
      </SubStep>

      <SubStep num="5.2" title="Pievienot savu domēnu (.lv vai .com)">
        <Body>
          Savs domēns (piemēram, karlis.lv) padara lapu daudz profesionālāku. Process:
        </Body>
        <MiniList items={[
          '1. Iegādājies domēnu: 1a.lv (Latvijā) vai Namecheap.com (starptautiski). .lv ~ €12/gadā',
          '2. Framer iestatījumos atver "Publish" → "Custom Domain" → ievadi savu domēnu',
          '3. Framer parādīs DNS ierakstus, kas jāpievieno domēna reģistratūrā',
          '4. Atver 1a.lv vai Namecheap DNS iestatījumus, pievieno norādītos A/CNAME ierakstus',
          '5. Nogaidi 15–60 min — domēns aktivizējas automātiski',
        ]} />
        <Callout type="info" title="Kā atrast DNS iestatījumus 1a.lv?">
          <Text style={{ color: C.muted, fontSize: 13, lineHeight: 20 }}>
            Piesakies 1a.lv → "Mani domēni" → klikšķini uz sava domēna → "DNS iestatījumi".
            Ja aizķeries, kopē Framer DNS ierakstus un pajautā Claude:{'\n'}
            <Text style={{ color: C.text, fontWeight: '600' }}>"Kā pievienot šos DNS ierakstus 1a.lv domēnam?"</Text>
          </Text>
        </Callout>
      </SubStep>

      {/* ══ FĀZE 6 ══════════════════════════════════════════════════ */}
      <PhaseHeader num="6" title="AI čatbota pievienošana ar Voiceflow" time="~30 min" icon="chatbubbles-outline" />

      <Body>
        Voiceflow ļauj bez koda izveidot AI asistentu, kas atbild klientu jautājumiem tavā lapā
        24/7. Tas vāc kontaktinformāciju, atbild uz biežākajiem jautājumiem un nosūta svarīgus
        jautājumus tev uz e-pastu.
      </Body>

      <SubStep num="6.1" title="Voiceflow konta izveide">
        <MiniList items={[
          'Dodies uz voiceflow.com → "Get started free"',
          'Reģistrējies ar Google kontu',
          'Izvēlies "Create Agent" → "Chat Agent"',
          'Nosaukums: piemēram "Manas lapas asistents"',
        ]} />
      </SubStep>

      <SubStep num="6.2" title="AI aģenta konfigurācija">
        <Body>
          Voiceflow AI bloks ir vienkāršākais veids, kā aģents atbild uz jebkuru jautājumu.
          Tas izmanto GPT-4 vai Claude zem pārsega.
        </Body>
        <PromptBox
          label="VOICEFLOW: AI aģenta sistēmas prompt"
          prompt={`Tu esi [Tavs vārds] mājas lapas asistents. Tava loma ir:
1. Atbildēt uz jautājumiem par maniem pakalpojumiem
2. Palīdzēt potenciālajiem klientiem saprast, vai mani pakalpojumi der viņiem
3. Savākt kontaktinformāciju (vārds + e-pasts) interesētiem klientiem

Mani pakalpojumi: [pievieno savu pakalpojumu sarakstu]
Cenas: [pievieno vai "jautājiet atsevišķi"]
Kontakti: [e-pasts vai Calendly saite]

Esi draudzīgs, īss un konkrēts. Atbildi latviski.
Ja nezini atbildi — piedāvā nosūtīt jautājumu man personīgi.`}
        />
      </SubStep>

      <SubStep num="6.3" title="Čatbota iegulšana Framer lapā">
        <MiniList items={[
          'Voiceflow: nospied "Publish" → iegūsti embed kodu (HTML snippet)',
          'Framer: atver "Site Settings" → "Custom Code" → "End of </body>"',
          'Ielīmē Voiceflow kodu un saglabā',
          'Publicē lapu atkārtoti — čatbots parādīsies apakšējā labajā stūrī',
          'Testē: uzraksti jautājumu un pārbaudī, vai AI atbild pareizi',
        ]} />
      </SubStep>

      {/* ══ FĀZE 7 ══════════════════════════════════════════════════ */}
      <PhaseHeader num="7" title="SEO pamati — Google atradīs tevi" time="~20 min" icon="search-outline" />

      <Body>
        SEO (Search Engine Optimization) nozīmē — optimizēt lapu tā, lai Google to parādītu
        augstāk meklēšanas rezultātos. Pamata SEO var izdarīt 20 minūtēs ar AI palīdzību.
      </Body>

      <SubStep num="7.1" title="Meta virsraksts un apraksts">
        <Body>
          Tie ir teksti, ko Google parāda meklēšanas rezultātos. Katrai lapai jābūt unikāliem.
        </Body>
        <PromptBox
          label="PROMPT: SEO meta teksti"
          prompt={`Uzraksti SEO meta virsrakstu un aprakstu mājas lapai.

Mans bizness: [apraksts]
Galvenais atslēgvārds: [ko cilvēki meklētu, lai atrastu mani — latviski vai angliski]
Atrašanās vieta: [Rīga / Latvija / visa Latvija]

Vajadzīgs:
• Meta virsraksts: maks. 60 rakstzīmes, iekļauj atslēgvārdu
• Meta apraksts: 150–160 rakstzīmes, aicinoši un informatīvi

Raksti latviski (ja mērķauditorija ir Latvijā).`}
        />
        <ScreenNote>
          Framer: "Site Settings" → "SEO" → ievadi meta virsrakstu un aprakstu. Ietekme uz Google redzamību parādās pēc 2–8 nedēļām.
        </ScreenNote>
      </SubStep>

      <SubStep num="7.2" title="Google Search Console — reģistrācija">
        <MiniList items={[
          'Dodies uz search.google.com/search-console',
          'Pievieno savu domēnu (vai URL prefix ar framer.website URL)',
          'Verifikācijai: Framer "Custom Code" → galvas daļā ielīmē Google meta tagu',
          'Iesūti sitemap: Framer automātiski ģenerē sitemap.xml — ievadi to Search Console',
          'Google sāks indeksēt tavu lapu — process aizņem 1–7 dienas',
        ]} />
      </SubStep>

      {/* ── Izmaksu salīdzinājums ─────────────────────────────────── */}
      <H3>Reālās izmaksas — ko maksā profesionāla lapa</H3>
      <CostCompare />

      {/* ── Biežākās kļūdas ──────────────────────────────────────── */}
      <H3>5 biežākās kļūdas — un kā izvairīties</H3>
      <CheckList items={[
        { ok: false, text: 'Kļūda #1: Pārāk daudz teksta hero sadaļā. Risinājums: Hero = virsraksts + 1–2 teikumi + poga. Viss.' },
        { ok: false, text: 'Kļūda #2: Nav skaidra CTA (aicinājuma uz darbību). Katrā lapā jābūt vismaz 2 aicinājumiem sazināties.' },
        { ok: false, text: 'Kļūda #3: Netiek pārbaudīta mobilā versija. Vairāk nekā 60% apmeklētāju nāk no telefona.' },
        { ok: false, text: 'Kļūda #4: AI ģenerēts teksts paliek bez personalizācijas. Vienmēr pielāgo ar savu balsi un faktiem.' },
        { ok: false, text: 'Kļūda #5: Lapa netiek publicēta, jo "vēl nav gatava". Publicē agri, pilnveido vēlāk — progress, ne perfektums.' },
        { ok: true,  text: 'Pareizi: publicē 80% versiju šodien, pievienot pārējo nākamajā nedēļā.' },
      ]} />

      <H3>Ko vari pārdot ar šo mājas lapu</H3>
      <CheckList items={[
        { ok: true, text: 'AI automatizācijas pakalpojumi citiem uzņēmumiem — €300–800 par projektu' },
        { ok: true, text: 'Čatbotu izveide un uzstādīšana — €150–500 par čatbotu' },
        { ok: true, text: 'Konsultācijas par AI ieviešanu biznesā — €50–150/h' },
        { ok: true, text: 'Mājas lapu izveide citiem ar Framer — €200–600 par lapu' },
        { ok: true, text: 'Digitālie produkti (e-grāmatas, šabloni, kursi) — pasīvie ienākumi' },
      ]} />

      <Divider />

      {/* ══════════════════════════════════════════════════════════════
          NOSLĒGUMS
      ══════════════════════════════════════════════════════════════ */}
      <View style={lx.outro}>
        <Image source={{ uri: IMGS.team }} style={lx.outroImg} resizeMode="cover" />
        <View style={lx.outroOverlay} />
        <View style={lx.outroContent}>
          <Ionicons name="trophy-outline" size={36} color={C.gold} style={{ marginBottom: 12 }} />
          <Text style={lx.outroTitle}>Lekcija pabeigta!</Text>
          <Text style={lx.outroBody}>
            Tu tagad saproti, kas ir AI, kāpēc šis ir īstais laiks sākt, un ka kodēšana nav vajadzīga.
            Nākamajā lekcijā sāksim praktiski — atvērsim Claude.ai un uzrakstīsim savu pirmo prompt.
          </Text>
          <View style={lx.outroMeta}>
            {[
              { icon: 'checkmark-circle' as const, txt: 'AI pamati', ok: true },
              { icon: 'checkmark-circle' as const, txt: 'No-code rīki', ok: true },
              { icon: 'checkmark-circle' as const, txt: 'Mājas lapa', ok: true },
            ].map((m, i) => (
              <View key={i} style={lx.outroBadge}>
                <Ionicons name={m.icon} size={14} color={C.accent} />
                <Text style={lx.outroBadgeTxt}>{m.txt}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity style={lx.ctaBtn}>
            <Text style={lx.ctaTxt}>Lekcija 2: Pirmais Prompt →</Text>
            <Ionicons name="arrow-forward" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

    </ScrollView>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PROGRAMS LIST
// ═══════════════════════════════════════════════════════════════════════════════
function ProgramsList({ onOpenLesson1, onOpenLesson2, onOpenLesson3 }: { onOpenLesson1: () => void; onOpenLesson2: () => void; onOpenLesson3: () => void }) {
  return (
    <View>
      <View style={{ marginBottom: 32 }}>
        <Text style={{ color: C.accent, fontSize: 11, fontWeight: '700', letterSpacing: 2, marginBottom: 8 }}>MANA PROGRAMMA</Text>
        <Text style={{ color: C.text, fontSize: 30, fontWeight: '800', marginBottom: 6 }}>Tavs mācību ceļš</Text>
        <Text style={{ color: C.muted, fontSize: 14, lineHeight: 22, maxWidth: 500 }}>
          Programma → Modulis → Lekcija → Uzdevums → Rezultāts. Katrs solis ved tuvāk pirmajiem ienākumiem.
        </Text>
      </View>

      {/* Active program */}
      <View style={pl.card}>
        <View style={pl.cardTop}>
          <View style={pl.cardLeft}>
            <Text style={pl.progLabel}>PROGRAMMA 1 · AKTĪVA</Text>
            <Text style={pl.progTitle}>Ievads mākslīgajā intelektā</Text>
            <Text style={pl.progDesc}>No nulles līdz pirmajam AI rīkam. Ideāli iesācējiem bez jebkādas pieredzes.</Text>
            <View style={pl.progTags}>
              {['18 lekcijas', '6 nedēļas', 'Iesācējs'].map((tag, i) => (
                <View key={i} style={pl.tag}>
                  <Text style={pl.tagTxt}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>
          <View style={pl.cardRight}>
            <Text style={pl.pct}>8%</Text>
            <Text style={pl.pctSub}>1 / 12 lekcijas</Text>
            <View style={pl.progBar}><View style={[pl.progFill, { width: '8%' as any }]} /></View>
          </View>
        </View>

        <View style={pl.moduleSection}>
          <Text style={pl.moduleLabel}>
            <Ionicons name="cube-outline" size={12} color={C.muted} /> MODULIS 1 — Pamati
          </Text>

          {/* Lekcija 1 */}
          <TouchableOpacity style={pl.lessonRow} onPress={onOpenLesson1} activeOpacity={0.7}>
            <View style={pl.lessonIcon}>
              <Ionicons name="checkmark-circle" size={22} color={C.accent} />
            </View>
            <View style={pl.lessonInfo}>
              <Text style={pl.lessonTitle}>1. Ievads AI — Kas, Kāpēc, Kā?</Text>
              <View style={pl.lessonMeta}>
                <Ionicons name="time-outline" size={12} color={C.muted} />
                <Text style={pl.lessonMetaTxt}>18 min</Text>
                <Text style={pl.dot}>·</Text>
                <Ionicons name="book-outline" size={12} color={C.muted} />
                <Text style={pl.lessonMetaTxt}>Lasīšana</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color={C.accent} />
          </TouchableOpacity>

          {/* Lekcija 2 */}
          <TouchableOpacity style={[pl.lessonRow, { borderColor: '#25d36640', backgroundColor: 'rgba(37,211,102,0.04)' }]} onPress={onOpenLesson2} activeOpacity={0.7}>
            <View style={pl.lessonIcon}>
              <Ionicons name="play-circle" size={22} color="#25d366" />
            </View>
            <View style={pl.lessonInfo}>
              <Text style={pl.lessonTitle}>2. WhatsApp AI aģenti — soli pa solim</Text>
              <View style={pl.lessonMeta}>
                <Ionicons name="time-outline" size={12} color={C.muted} />
                <Text style={pl.lessonMetaTxt}>25 min</Text>
                <Text style={pl.dot}>·</Text>
                <Ionicons name="construct-outline" size={12} color={C.muted} />
                <Text style={pl.lessonMetaTxt}>Praktisks</Text>
                <Text style={pl.dot}>·</Text>
                <Ionicons name="logo-whatsapp" size={12} color="#25d366" />
                <Text style={[pl.lessonMetaTxt, { color: '#25d366' }]}>Jauns</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#25d366" />
          </TouchableOpacity>

          {/* Lekcija 3 */}
          <TouchableOpacity style={[pl.lessonRow, { borderColor: 'rgba(124,106,240,0.35)', backgroundColor: 'rgba(124,106,240,0.04)' }]} onPress={onOpenLesson3} activeOpacity={0.7}>
            <View style={pl.lessonIcon}>
              <Ionicons name="globe-outline" size={22} color="#7c6af0" />
            </View>
            <View style={pl.lessonInfo}>
              <Text style={pl.lessonTitle}>3. Mājas lapas čatbots — Voiceflow un n8n</Text>
              <View style={pl.lessonMeta}>
                <Ionicons name="time-outline" size={12} color={C.muted} />
                <Text style={pl.lessonMetaTxt}>25 min</Text>
                <Text style={pl.dot}>·</Text>
                <Ionicons name="construct-outline" size={12} color={C.muted} />
                <Text style={pl.lessonMetaTxt}>Praktisks</Text>
                <Text style={pl.dot}>·</Text>
                <Ionicons name="globe-outline" size={12} color="#7c6af0" />
                <Text style={[pl.lessonMetaTxt, { color: '#7c6af0' }]}>Jauns</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#7c6af0" />
          </TouchableOpacity>

          {/* Locked lessons */}
          {[
            { title: '4. Prompt Engineering pamati', time: '30 min' },
            { title: '5. AI biznesa modeļi Latvijā', time: '25 min' },
            { title: '6. ChatGPT, Claude, Gemini — kuru izvēlēties?', time: '15 min' },
          ].map((l, i) => (
            <View key={i} style={[pl.lessonRow, pl.lessonLocked]}>
              <View style={[pl.lessonIcon, { opacity: 0.4 }]}>
                <Ionicons name="lock-closed-outline" size={20} color={C.muted} />
              </View>
              <View style={pl.lessonInfo}>
                <Text style={[pl.lessonTitle, { color: C.faint }]}>{l.title}</Text>
                <Text style={[pl.lessonMetaTxt, { fontSize: 11 }]}>Pieejama pēc iepriekšējās</Text>
              </View>
              <Ionicons name="lock-closed-outline" size={14} color={C.faint} />
            </View>
          ))}
        </View>
      </View>

      {/* Locked programs */}
      {[
        { num: '2', title: 'AI Automatizācija ar n8n', desc: 'Veido automatizācijas plūsmas bez koda.', icon: 'flash-outline' as const },
        { num: '3', title: 'AI Bizness un Ienākumi',   desc: 'Pirmie klienti, cenas, piedāvājums.',    icon: 'trending-up-outline' as const },
      ].map((p, i) => (
        <View key={i} style={[pl.card, pl.lockedCard]}>
          <View style={pl.lockedLeft}>
            <View style={pl.lockedIconWrap}>
              <Ionicons name={p.icon} size={20} color={C.faint} />
            </View>
            <View>
              <Text style={pl.lockedNum}>PROGRAMMA {p.num}</Text>
              <Text style={pl.lockedTitle}>{p.title}</Text>
              <Text style={pl.lockedDesc}>{p.desc}</Text>
            </View>
          </View>
          <Ionicons name="lock-closed" size={18} color={C.faint} />
        </View>
      ))}
    </View>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// LEKCIJA 2 — WhatsApp AI aģenti
// ═══════════════════════════════════════════════════════════════════════════════
function LessonTwo({ onBack }: { onBack: () => void }) {

  // WhatsApp-specific flow diagram
  function WaFlow() {
    const steps = [
      { icon: 'logo-whatsapp' as const,           color: '#25d366', label: 'Klients raksta\nWhatsApp' },
      { icon: 'cloud-outline' as const,           color: '#7c93f0', label: 'WhatsApp\nBusiness API' },
      { icon: 'git-network-outline' as const,     color: C.gold,    label: 'n8n / Make\nWebhook' },
      { icon: 'hardware-chip-outline' as const,   color: C.accent,  label: 'AI (Claude /\nChatGPT)' },
      { icon: 'chatbubble-ellipses-outline' as const, color: '#25d366', label: 'Atbilde uz\nWhatsApp' },
    ];
    return (
      <View style={{ backgroundColor: C.card, borderRadius: 14, borderWidth: 1, borderColor: C.border, padding: 22, marginVertical: 20 }}>
        <Text style={{ color: C.muted, fontSize: 10, fontWeight: '800', letterSpacing: 1.5, marginBottom: 18, textAlign: 'center' }}>KĀ DARBOJAS WHATSAPP AI AĢENTS</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 4 }}>
          {steps.map((s, i) => (
            <React.Fragment key={i}>
              <View style={{ alignItems: 'center', gap: 8, flex: 1, minWidth: 60 }}>
                <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: s.color + '22', borderWidth: 1.5, borderColor: s.color + '55', alignItems: 'center', justifyContent: 'center' }}>
                  <Ionicons name={s.icon} size={22} color={s.color} />
                </View>
                <Text style={{ color: C.muted, fontSize: 10, textAlign: 'center', lineHeight: 15 }}>{s.label}</Text>
              </View>
              {i < steps.length - 1 && (
                <View style={{ alignItems: 'center', marginBottom: 20 }}>
                  <Ionicons name="chevron-forward" size={16} color={C.faint} />
                </View>
              )}
            </React.Fragment>
          ))}
        </View>
      </View>
    );
  }

  // Platform comparison for WA tools
  function WaToolsTable() {
    const tools = [
      { name: 'ManyChat',    ease: '⭐⭐⭐⭐⭐', power: '⭐⭐⭐',   price: 'No $15/mēn', ai: true,  code: false, best: 'Iesācējiem, maziem biznesiem' },
      { name: 'n8n',         ease: '⭐⭐⭐',     power: '⭐⭐⭐⭐⭐', price: 'Bezmaksas*', ai: true,  code: false, best: 'Jaudīgiem aģentiem, pilna kontrole' },
      { name: 'Make.com',    ease: '⭐⭐⭐⭐',   power: '⭐⭐⭐⭐',   price: 'No $9/mēn',  ai: true,  code: false, best: 'Vidēji sarežģītiem scenārijiem' },
      { name: 'Twilio',      ease: '⭐⭐',       power: '⭐⭐⭐⭐⭐', price: 'Pay-as-go',  ai: false, code: true,  best: 'Izstrādātājiem (API)' },
      { name: 'WATI',        ease: '⭐⭐⭐⭐',   power: '⭐⭐⭐',     price: 'No $39/mēn', ai: true,  code: false, best: 'CRM + WhatsApp apvienojums' },
    ];
    return (
      <View style={{ borderRadius: 12, borderWidth: 1, borderColor: C.border, overflow: 'hidden', marginVertical: 20 }}>
        <View style={{ flexDirection: 'row', backgroundColor: '#0f1720', paddingVertical: 10, paddingHorizontal: 12 }}>
          {['RĪKS', 'VIEGLUMS', 'JAUDA', 'CENA', 'AI', 'LABĀKAIS PRIEKŠ'].map((h, i) => (
            <Text key={i} style={{ color: C.muted, fontSize: 10, fontWeight: '700', letterSpacing: 0.5, flex: i === 0 ? 1 : i === 5 ? 2 : 0.9, textAlign: i > 0 && i < 5 ? 'center' : 'left' }}>{h}</Text>
          ))}
        </View>
        {tools.map((r, i) => (
          <View key={i} style={{ flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, borderTopColor: C.border, paddingVertical: 10, paddingHorizontal: 12, backgroundColor: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
            <Text style={{ flex: 1, color: r.name === 'ManyChat' || r.name === 'n8n' ? C.accent : C.text, fontWeight: r.name === 'ManyChat' ? '700' : '500', fontSize: 13 }}>{r.name}{r.name === 'ManyChat' ? ' ★' : ''}</Text>
            <Text style={{ flex: 0.9, textAlign: 'center', fontSize: 11 }}>{r.ease}</Text>
            <Text style={{ flex: 0.9, textAlign: 'center', fontSize: 11 }}>{r.power}</Text>
            <Text style={{ flex: 0.9, color: C.accent, fontSize: 11, fontWeight: '600', textAlign: 'center' }}>{r.price}</Text>
            <Text style={{ flex: 0.9, textAlign: 'center', fontSize: 13 }}>{r.ai ? '✓' : '–'}</Text>
            <Text style={{ flex: 2, color: C.muted, fontSize: 11 }}>{r.best}</Text>
          </View>
        ))}
        <View style={{ borderTopWidth: 1, borderTopColor: C.border, paddingVertical: 8, paddingHorizontal: 12 }}>
          <Text style={{ color: C.faint, fontSize: 11 }}>* n8n bezmaksas ir self-hosted; n8n.cloud — no $24/mēn vai bezmaksas 14 dienu izmēģinājums</Text>
        </View>
      </View>
    );
  }

  // Use-case cards
  function UseCaseGrid() {
    const cases = [
      { icon: 'storefront-outline' as const,      title: 'Veikals',          desc: 'Atbild par precēm, cenām, pieejamību. Pieņem pasūtījumus un nosūta apstiprinājumu.' },
      { icon: 'calendar-outline' as const,        title: 'Rezervācijas',     desc: 'Automātiski rezervē vizītes, sūta atgādinājumus, apstiprina vai pārceļ laikus.' },
      { icon: 'help-circle-outline' as const,     title: 'Klientu atbalsts', desc: 'Atbild uz biežākajiem jautājumiem 24/7. Sarežģītus nosūta cilvēkam.' },
      { icon: 'people-outline' as const,          title: 'Lead kvalifikācija',desc: 'Uzdod jautājumus, saprot klienta vajadzības, nodod tālāk pārdošanas komandai.' },
      { icon: 'receipt-outline' as const,         title: 'Pasūtījumi',       desc: 'Pieņem ēdiena vai produktu pasūtījumus tieši caur WhatsApp.' },
      { icon: 'school-outline' as const,          title: 'Mācību bots',      desc: 'Sūta lekcijas, uzdevumus, atgādinājumus. Atbild uz jautājumiem par kursa saturu.' },
    ];
    return (
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginVertical: 16 }}>
        {cases.map((c, i) => (
          <View key={i} style={{ flex: 1, minWidth: 180, backgroundColor: C.card, borderRadius: 12, borderWidth: 1, borderColor: C.border, padding: 16 }}>
            <View style={{ width: 36, height: 36, borderRadius: 9, backgroundColor: '#25d36622', borderWidth: 1, borderColor: '#25d36640', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
              <Ionicons name={c.icon} size={18} color="#25d366" />
            </View>
            <Text style={{ color: C.text, fontWeight: '700', fontSize: 14, marginBottom: 5 }}>{c.title}</Text>
            <Text style={{ color: C.muted, fontSize: 12, lineHeight: 19 }}>{c.desc}</Text>
          </View>
        ))}
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 80 }} showsVerticalScrollIndicator={false}>

      <TouchableOpacity onPress={onBack} style={lx.back}>
        <Ionicons name="arrow-back" size={16} color={C.muted} />
        <Text style={lx.backTxt}>Atpakaļ uz programmu</Text>
      </TouchableOpacity>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <View style={lx.hero}>
        <Image source={{ uri: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1400&q=90&fit=crop' }} style={lx.heroImg} resizeMode="cover" />
        <View style={lx.heroGrad} />
        <View style={lx.heroContent}>
          <View style={lx.heroBadge}>
            <Ionicons name="logo-whatsapp" size={12} color="#25d366" />
            <Text style={[lx.heroBadgeTxt, { color: '#25d366' }]}>PROGRAMMA 1 · LEKCIJA 2</Text>
          </View>
          <Text style={lx.heroTitle}>WhatsApp AI{'\n'}aģenti</Text>
          <View style={lx.heroMeta}>
            <View style={lx.metaChip}><Ionicons name="time-outline" size={13} color={C.muted} /><Text style={lx.metaTxt}>25 min</Text></View>
            <View style={lx.metaChip}><Ionicons name="construct-outline" size={13} color={C.muted} /><Text style={lx.metaTxt}>Praktisks</Text></View>
            <View style={[lx.metaChip, { backgroundColor: '#25d36622', borderWidth: 1, borderColor: '#25d36640' }]}>
              <Ionicons name="logo-whatsapp" size={13} color="#25d366" />
              <Text style={[lx.metaTxt, { color: '#25d366' }]}>WhatsApp</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={lx.intro}>
        <Text style={lx.introText}>
          WhatsApp ir visbiežāk lietotā ziņapmaiņas platforma Latvijā. Šajā lekcijā iemācīsies,
          kas ir WhatsApp AI aģents, kāpēc tas ir spēcīgāks par e-pastu vai čatbotu mājas lapā,
          un soli pa solim — kā uzbūvēt savu pirmo aģentu bez kodēšanas.
        </Text>
      </View>

      {/* ══════════════════════════════════════════════════════════════
          SADAĻA 1 — Kas ir WhatsApp AI aģents?
      ══════════════════════════════════════════════════════════════ */}
      <SectionHeading num="SADAĻA 01" title="Kas ir WhatsApp AI aģents?" />

      <LessonImage
        uri="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=85&fit=crop"
        caption="WhatsApp klientu apkalpošana — 24/7, bez papildu darbiniekiem."
        height={260}
      />

      <Body>
        <Em>WhatsApp AI aģents</Em> ir automatizēta programma, kas darbojas tavā WhatsApp Business
        kontā un spēj sarakstīties ar klientiem — atbildēt uz jautājumiem, pieņemt pasūtījumus,
        rezervēt laikus, sniegt informāciju — <Em>automātiski, 24 stundas diennaktī, 7 dienas nedēļā</Em>.
      </Body>

      <Body>
        Atšķirība no parastā WhatsApp: tu neraksti atbildes pats. Aģents to dara tevis vietā,
        izmantojot AI (ChatGPT, Claude). Klientam tas izskatās kā saruna ar reālu cilvēku —
        tikai daudz ātrāku un pieejamāku.
      </Body>

      <StatsBar stats={[
        { num: '2.9B',  label: 'WhatsApp lietotāji pasaulē', icon: 'globe-outline' },
        { num: '98%',   label: 'WhatsApp ziņu atveršanas rate', icon: 'mail-open-outline' },
        { num: '20%',   label: 'E-pasta atveršanas rate',     icon: 'mail-outline' },
        { num: '3 min', label: 'Vidējais atbildes laiks',     icon: 'timer-outline' },
      ]} />

      <Callout type="tip" title="Kāpēc WhatsApp, nevis e-pasts vai mājas lapas čatbots?">
        <Text style={{ color: C.muted, fontSize: 13, lineHeight: 21 }}>
          <Text style={{ color: C.text, fontWeight: '700' }}>E-pasts:</Text> 20% atveršanas rate, jāgaida dienas.{'\n'}
          <Text style={{ color: C.text, fontWeight: '700' }}>Mājas lapas čatbots:</Text> Klients jāaizved uz lapu, bieži ignorē.{'\n'}
          <Text style={{ color: C.text, fontWeight: '700' }}>WhatsApp aģents:</Text>{' '}
          <Text style={{ color: '#25d366', fontWeight: '700' }}>98% atveršanas rate</Text>, klients jau tur pavada laiku, personīgāks kanāls.
        </Text>
      </Callout>

      <WaFlow />

      <H3>Ar ko aģents atšķiras no vienkārša čatbota?</H3>

      <View style={{ gap: 10, marginVertical: 16 }}>
        {[
          { icon: 'git-branch-outline' as const, title: 'Konteksts', desc: 'AI aģents atceras iepriekšējo sarunu. Vienkāršs čatbots — nē.' },
          { icon: 'bulb-outline' as const,       title: 'Saprašana', desc: 'Aģents saprot dabisko valodu — kā rakstītu cilvēkam, ne tikai komandas.' },
          { icon: 'repeat-outline' as const,     title: 'Darbības',  desc: 'Aģents var veikt darbības: pievienot kalendārā, sūtīt PDF, pārbaudīt noliktavu.' },
          { icon: 'person-outline' as const,     title: 'Personalizācija', desc: 'Zina klienta vārdu, iepriekšējos pasūtījumus, preferences.' },
        ].map((item, i) => (
          <View key={i} style={{ flexDirection: 'row', gap: 12, backgroundColor: C.card, borderRadius: 10, borderWidth: 1, borderColor: C.border, padding: 14 }}>
            <View style={{ width: 36, height: 36, borderRadius: 9, backgroundColor: C.accentDim, borderWidth: 1, borderColor: C.accentBorder, alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Ionicons name={item.icon} size={17} color={C.accent} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: C.text, fontWeight: '700', fontSize: 14, marginBottom: 3 }}>{item.title}</Text>
              <Text style={{ color: C.muted, fontSize: 13, lineHeight: 19 }}>{item.desc}</Text>
            </View>
          </View>
        ))}
      </View>

      <Divider />

      {/* ══════════════════════════════════════════════════════════════
          SADAĻA 2 — Reāli lietojumi Latvijā
      ══════════════════════════════════════════════════════════════ */}
      <SectionHeading num="SADAĻA 02" title="Reāli biznesa scenāriji — ko var automatizēt ar WhatsApp aģentu" />

      <Body>
        WhatsApp aģentus var pielietot gandrīz jebkurā biznesā. Šeit ir 6 biežākie
        scenāriji, kas darbojas Latvijas uzņēmumos šodien:
      </Body>

      <UseCaseGrid />

      <H3>Konkrēts piemērs — frizētavas aģents</H3>

      <Body>
        Iedomājies: klients raksta WhatsApp pulksten 23:00 — "Vai ir brīvs laiks sestdien
        plkst. 10?" Bez aģenta — tu neredzi līdz rītam. Ar aģentu:
      </Body>

      <View style={{ backgroundColor: C.card, borderRadius: 12, borderWidth: 1, borderColor: C.border, overflow: 'hidden', marginVertical: 16 }}>
        <View style={{ backgroundColor: '#0f1720', paddingHorizontal: 14, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Ionicons name="logo-whatsapp" size={14} color="#25d366" />
          <Text style={{ color: C.muted, fontSize: 11, fontWeight: '700', letterSpacing: 0.8 }}>SIMULĀCIJA — SARUNA AR AĢENTU</Text>
        </View>
        {[
          { from: 'client', msg: 'Labdien! Vai ir brīvs laiks sestdien plkst. 10:00?' },
          { from: 'agent',  msg: 'Labdien! Jā, sestdien 10:00 ir pieejams. Kādu pakalpojumu vēlaties? Mums ir: frizūra (no €15), krāsošana (no €35), skūšana (€12).' },
          { from: 'client', msg: 'frizūra pls. esmu pirmoreiz' },
          { from: 'agent',  msg: 'Lieliski! Rezervēju frizūru jums sestdien, 15. jūnijā plkst. 10:00. 🕙\n\nVārds un tālrunis apstiprināšanai?' },
          { from: 'client', msg: 'Kārlis, +371 2612 3456' },
          { from: 'agent',  msg: '✅ Rezervācija apstiprināta!\n📅 Sestdiena, 15. jūnijs, 10:00\n💈 Frizūra | Jūsu masters: Jānis\n📍 Brīvības 45, Rīga\n\nAtgādinājumu sūtīšu dienu iepriekš. Redzamies!' },
        ].map((msg, i) => (
          <View key={i} style={{ flexDirection: 'row', justifyContent: msg.from === 'client' ? 'flex-start' : 'flex-end', paddingHorizontal: 14, paddingVertical: 6 }}>
            <View style={{ maxWidth: '75%', backgroundColor: msg.from === 'client' ? '#1a2330' : '#1a3a2a', borderRadius: 10, padding: 10, borderWidth: 1, borderColor: msg.from === 'client' ? C.border : '#25d36633' }}>
              <Text style={{ color: msg.from === 'client' ? C.text : '#a0f0c0', fontSize: 8, fontWeight: '700', letterSpacing: 0.5, marginBottom: 4, opacity: 0.7 }}>
                {msg.from === 'client' ? 'KLIENTS' : '🤖 AI AĢENTS'}
              </Text>
              <Text style={{ color: C.text, fontSize: 13, lineHeight: 20 }}>{msg.msg}</Text>
            </View>
          </View>
        ))}
        <View style={{ paddingHorizontal: 14, paddingVertical: 10, borderTopWidth: 1, borderTopColor: C.border }}>
          <Text style={{ color: C.muted, fontSize: 11, textAlign: 'center' }}>
            Visa šī saruna notika automātiski — bez cilvēka iesaistīšanās · 2 min 14 sek
          </Text>
        </View>
      </View>

      <Callout type="info" title="Ko šis aģents izdarīja automātiski?">
        <Text style={{ color: C.muted, fontSize: 13, lineHeight: 21 }}>
          ✓ Pārbaudīja brīvos laikus kalendārā{'\n'}
          ✓ Piedāvāja pakalpojumu izvēlni{'\n'}
          ✓ Izveidoja rezervāciju sistēmā{'\n'}
          ✓ Nosūtīja apstiprinājumu ar visiem detaļiem{'\n'}
          ✓ Ieplānoja atgādinājumu nākamajai dienai
        </Text>
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════════════════════════════
          SADAĻA 3 — Rīku izvēle
      ══════════════════════════════════════════════════════════════ */}
      <SectionHeading num="SADAĻA 03" title="Kuru rīku izvēlēties? Salīdzinājums" />

      <Body>
        Ir vairāki veidi, kā izveidot WhatsApp AI aģentu. Izvēle atkarīga no tava
        budžeta, tehniskajām zināšanām un vajadzību sarežģītības.
      </Body>

      <WaToolsTable />

      <Callout type="tip" title="Mūsu ieteikums">
        <Text style={{ color: C.muted, fontSize: 13, lineHeight: 21 }}>
          <Text style={{ color: C.text, fontWeight: '700' }}>Iesācējiem → ManyChat:</Text> Visvienkāršākais, vizuāls redaktors, bezmaksas izmēģinājums.{'\n'}
          <Text style={{ color: C.text, fontWeight: '700' }}>Pilnai kontrolei → n8n:</Text> Var integrēt ar jebko, AI loģika bez ierobežojumiem, bezmaksas self-hosted versija.{'\n'}
          Sāc ar ManyChat, iepazīsti n8n, kad esi gatavs nākamajam līmenim.
        </Text>
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════════════════════════════
          SADAĻA 4 — ManyChat soli pa solim (iesācēji)
      ══════════════════════════════════════════════════════════════ */}
      <SectionHeading num="SADAĻA 04" title="Soli pa solim: ManyChat — vienkāršākais ceļš" />

      <LessonImage
        uri="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&q=85&fit=crop"
        caption="ManyChat — no-code platforma WhatsApp automatizācijai."
        height={240}
      />

      <Body>
        ManyChat ir vizuāla drag-and-drop platforma, kas ļauj izveidot WhatsApp automatizācijas
        <Em> bez nevienas koda rindiņas</Em>. To izmanto vairāk nekā 1 miljons biznesa visā pasaulē.
      </Body>

      <PhaseHeader num="1" title="WhatsApp Business konta iestatīšana" time="~20 min" icon="logo-whatsapp" />

      <SubStep num="1.1" title="Lejupielādē WhatsApp Business">
        <MiniList items={[
          'Google Play vai App Store — meklē "WhatsApp Business"',
          'Instalē un atver — tas ir atsevišķa lietotne no parastā WhatsApp',
          'Reģistrē ar tālruņa numuru (var būt tas pats, ko privātajam)',
          'Aizpildi biznesa profilu: uzņēmuma nosaukums, kategorija, apraksts, adrese, darba laiks',
          'Svarīgi: uzņēmuma nosaukums jāsakrīt ar reālo nosaukumu — Meta to verificē',
        ]} />
        <ScreenNote>
          WhatsApp Business ir bezmaksas maziem uzņēmumiem. Vairāk funkciju (API piekļuve, vairāki aģenti) pieprasa Meta Business Manager kontu.
        </ScreenNote>
      </SubStep>

      <SubStep num="1.2" title="Izveido Meta Business Manager kontu">
        <MiniList items={[
          'Dodies uz business.facebook.com → "Izveidot kontu"',
          'Ievadi uzņēmuma nosaukumu, savu vārdu, e-pastu',
          'Business Manager → "WhatsApp Accounts" → "Pievienot" → "Savienot WhatsApp numuru"',
          'Ievadi numuru, ko izmantoji WhatsApp Business',
          'Saņem verifikācijas kodu īsziņā → apstiprina',
        ]} />
      </SubStep>

      <PhaseHeader num="2" title="ManyChat konta izveide un savienošana" time="~15 min" icon="settings-outline" />

      <SubStep num="2.1" title="Reģistrācija ManyChat">
        <MiniList items={[
          'Dodies uz manychat.com → "Get Started Free"',
          'Pierakstīties ar Facebook kontu (vieglāk) vai e-pastu',
          'Izvēlies: "WhatsApp" kā platformu',
          'Noklikšķini "Connect WhatsApp Business Account"',
          'ManyChat prasīs Meta Business Manager piekļuvi — apstiprina visas atļaujas',
          'Izvēlies savu WhatsApp Business numuru no saraksta',
        ]} />
        <ScreenNote>
          Bezmaksas plānā ManyChat atļauj 1000 kontaktus. Maksas plāns no $15/mēn pieejams, kad aug auditorija.
        </ScreenNote>
      </SubStep>

      <PhaseHeader num="3" title="Pirmā automatizācijas plūsma" time="~30 min" icon="git-branch-outline" />

      <SubStep num="3.1" title="Izveidojam sveiciena ziņu (Welcome Message)">
        <MiniList items={[
          'ManyChat kreisajā panelī: "Automations" → "New Flow"',
          'Nosaukums: "Sveiciena ziņa"',
          'Triggeris: "User sends first message" (klients raksta pirmo reizi)',
          'Pievieno "Send Message" bloku',
          'Ievadi sveiciena tekstu: "Sveiki! Es esmu [Uzņēmums] AI asistents. Kā varu palīdzēt?"',
          'Pievieno "Quick Replies" (ātrās atbildes) pogas: "Cenas", "Rezervācija", "Kontakti"',
        ]} />
        <ScreenNote>
          Quick Replies ir pogas, ko klients redz zem ziņas. Tas padara saraksti daudz ērtāku — klients neklikšķina, neraksta, bet tikai piespiež pogu.
        </ScreenNote>
      </SubStep>

      <SubStep num="3.2" title="Pievienojam AI atbildes bloku">
        <Body>
          ManyChat ir iebūvēta ChatGPT integrācija — "AI Step". Tas ļauj aģentam atbildēt
          uz jebkuru klients jautājumu, nevis tikai uz iepriekš definētiem celiņiem.
        </Body>
        <MiniList items={[
          'Flow redaktorā nospied "+" → meklē "AI Step" vai "ChatGPT"',
          'Pievieno OpenAI API atslēgu (bezmaksas iegūt platform.openai.com → API Keys)',
          'Sistēmas promptā apraksti aģenta lomu un zināšanas',
          'Pielāgo Max Tokens: 300–500 (pietiekami atbildei, nepalielina izmaksas)',
          'Savieno AI Step ar nākamo bloku: vai nu "Human Takeover" vai citu atbildi',
        ]} />
        <PromptBox
          label="MANYCHAT AI STEP: Sistēmas promts"
          prompt={`Tu esi [Uzņēmuma nosaukums] WhatsApp AI asistents.

TAVS UZDEVUMS:
- Atbildēt uz jautājumiem par mūsu pakalpojumiem
- Palīdzēt klientiem rezervēt laikus
- Sniegt cenas un informāciju

PAR MUMS:
[Uzraksti sava biznesa aprakstu: ko dari, kur atrodas, darba laiks, cenas]

NOTEIKUMI:
- Atbildi latviski
- Esi draudzīgs un profesionāls
- Atbildes max 2-3 teikumi (WhatsApp nav e-pasts!)
- Ja nezini atbildi — saki: "Lai precīzāk atbildētu, nodošu jūs mūsu speciālistam."
- Nekad neizdomā cenas vai informāciju, ko nezini`}
        />
      </SubStep>

      <SubStep num="3.3" title="Human Takeover — kad cilvēkam jāpārņem">
        <Body>
          Ne visi gadījumi ir atrisināmi ar AI. Iestat noteikumus, kad aģents nodod sarunu
          reālam cilvēkam:
        </Body>
        <MiniList items={[
          'Pievieno "Condition" bloku pēc AI Step',
          'Conditions: "message contains" → sūdzība / atcelšana / "runāt ar cilvēku"',
          'Ja nosacījums izpildās → "Live Chat Takeover" (ManyChat paziņos tev)',
          'ManyChat mobilajā lietotnē saņemsi paziņojumu un varēsi pārņemt sarunu',
          'Klients nesajūt pāreju — saruna turpinās tajā pašā logā',
        ]} />
      </SubStep>

      <SubStep num="3.4" title="Testēšana un publicēšana">
        <MiniList items={[
          'ManyChat augšā nospied "Preview" — testē plūsmu no klienta skatpunkta',
          'Vai arī: nospied "Test this Flow" → ManyChat nosūtīs tev pašam WhatsApp ziņu',
          'Pārbaudīsi katru celiņu — pogas, AI atbildes, pārejas',
          'Kad apmierināts → nospied "Publish" — plūsma ir aktīva',
          'Sūti savam WhatsApp Business numuram testa ziņu no cita telefona',
        ]} />
        <Callout type="tip" title="Pirmā reize vienmēr ir nepilnīga">
          <Text style={{ color: C.muted, fontSize: 13, lineHeight: 20 }}>
            Nebaidies publicēt! ManyChat ļauj jebkurā brīdī rediģēt aktīvas plūsmas.
            Izmanto pirmos 10–20 reālos jautājumus, lai uzlabotu AI sistēmas promptu.
          </Text>
        </Callout>
      </SubStep>

      <Divider />

      {/* ══════════════════════════════════════════════════════════════
          SADAĻA 5 — n8n + WhatsApp API (jaudīgākais ceļš)
      ══════════════════════════════════════════════════════════════ */}
      <SectionHeading num="SADAĻA 05" title="Soli pa solim: n8n + WhatsApp Business API — pilna kontrole" />

      <LessonImage
        uri="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=85&fit=crop"
        caption="n8n — atvērtā koda automatizācijas platforma ar pilnu kontroli."
        height={240}
      />

      <Body>
        n8n ir spēcīgākais no-code automatizācijas rīks — atšķirībā no ManyChat, vari
        integrēt <Em>jebkuru API, datubāzi, Google Sheet, CRM</Em> — bez ierobežojumiem.
        Šī pieeja prasa vairāk laika, bet dod pilnīgu brīvību.
      </Body>

      <Callout type="warning" title="Priekšnosacījumi šai pieejai">
        <Text style={{ color: C.muted, fontSize: 13, lineHeight: 20 }}>
          • Meta Business Manager konts (iepriekšējā sadaļā){'\n'}
          • n8n.cloud konts vai pats-hostēts n8n (Docker/VPS){'\n'}
          • WhatsApp Business API piekļuve caur BSP (360dialog vai Twilio){'\n'}
          • OpenAI vai Anthropic (Claude) API atslēga
        </Text>
      </Callout>

      <PhaseHeader num="1" title="WhatsApp Business API piekļuve caur 360dialog" time="~30 min" icon="key-outline" />

      <Body>
        WhatsApp API nav publiski pieejams — vajadzīgs starpnieks (Business Solution Provider).
        <Em>360dialog</Em> ir Eiropā populārākais, pieejams Latvijā, no €49/mēn.
      </Body>

      <SubStep num="1.1" title="360dialog konta izveide">
        <MiniList items={[
          'Dodies uz 360dialog.com → "Get Started"',
          'Reģistrējies → "Add New Account" → "Connect WhatsApp Number"',
          'Ievadi savu WhatsApp Business numuru',
          '360dialog pieprasīs piekļuvi tavim Meta Business Manager → apstiprina',
          'Saņemsi API atslēgu (D360-XXXXXXXX) — saglabā to!',
          'Aktivizācija aizņem ~24 stundas pirmajam kontam',
        ]} />
      </SubStep>

      <SubStep num="1.2" title="Webhook URL iestatīšana">
        <Body>
          Webhook ir URL adrese, uz kuru WhatsApp nosūtīs datus katru reizi, kad kāds
          tev raksta. Šis URL būs tavs n8n workflow.
        </Body>
        <MiniList items={[
          '360dialog Dashboard → "Webhooks" → "Add Webhook"',
          'Webhook URL: pagaidām atstāj tukšu — to iegūsim no n8n',
          'Events: atzīmē "Messages" (saņemtās ziņas)',
          'Saglabā — atgriezīsimies pēc n8n iestatīšanas',
        ]} />
      </SubStep>

      <PhaseHeader num="2" title="n8n workflow izveide" time="~40 min" icon="git-network-outline" />

      <SubStep num="2.1" title="n8n konta izveide">
        <MiniList items={[
          'Dodies uz n8n.io → "Start for free" (14 dienu bezmaksas izmēģinājums)',
          'Vai: instalē lokāli ar npx n8n (ja ir Node.js) vai ar Docker',
          'Reģistrējies → nonāksi n8n Dashboard ar tukšu workflow sarakstu',
          'Nospied "New Workflow" → atvērsies vizuālais redaktors',
        ]} />
      </SubStep>

      <SubStep num="2.2" title="1. mezgls: Webhook — ziņu saņemšana">
        <MiniList items={[
          'n8n redaktorā nospied "+" → meklē "Webhook"',
          'Pievieno "Webhook" trigger mezglu',
          'HTTP Method: POST',
          'Path: whatsapp-incoming (vai jebkas)',
          'Nospied "Listen for Test Event" — n8n gaida pirmo testa ziņu',
          'Nokopē Webhook URL (izskatīsies kā: https://xxx.n8n.cloud/webhook/whatsapp-incoming)',
          'Atgriezies 360dialog → ielīmē Webhook URL → Saglabā',
        ]} />
        <ScreenNote>
          Nosūti testa ziņu uz savu WhatsApp numuru no cita telefona. n8n Webhook mezglā redzēsi JSON datus — tā ir tava pirmā saņemtā ziņa!
        </ScreenNote>
      </SubStep>

      <SubStep num="2.3" title="2. mezgls: Ziņas teksta izgūšana">
        <MiniList items={[
          'Pievieno "Code" mezglu (JavaScript)',
          'Šis mezgls izgūst klients ziņas tekstu no JSON',
          'Izvades dati: messageText (ko klients rakstīja) un from (klienta tālrunis)',
        ]} />
        <PromptBox
          label="n8n CODE MEZGLS — ziņas parsēšana"
          prompt={`// Šis kods izgūst WhatsApp ziņas datus
const body = $input.first().json.body;
const message = body.messages?.[0];

return [{
  json: {
    messageText: message?.text?.body || '',
    from: message?.from || '',
    messageId: message?.id || '',
    timestamp: message?.timestamp || '',
  }
}];`}
        />
      </SubStep>

      <SubStep num="2.4" title="3. mezgls: AI atbilde (Claude vai ChatGPT)">
        <Body>
          Tagad nosūtīsim ziņas tekstu AI un saņemsim atbildi. Vari izvēlēties
          OpenAI (ChatGPT) vai Anthropic (Claude).
        </Body>
        <MiniList items={[
          'Pievieno "HTTP Request" mezglu',
          'URL: https://api.anthropic.com/v1/messages (Claude) vai https://api.openai.com/v1/chat/completions (OpenAI)',
          'Method: POST',
          'Authentication: Header Auth → api-key: [tavs API atslēga]',
          'Body: JSON (aprakstīts zemāk)',
        ]} />
        <PromptBox
          label="n8n HTTP REQUEST — Claude API (pieprasījuma body)"
          prompt={`{
  "model": "claude-haiku-4-5-20251001",
  "max_tokens": 400,
  "system": "Tu esi [Uzņēmums] WhatsApp asistents. Atbildi latviski, īsi (max 3 teikumi). [Pievieno info par savu biznesu]",
  "messages": [
    {
      "role": "user",
      "content": "{{ $json.messageText }}"
    }
  ]
}`}
        />
        <ScreenNote>
          Claude Haiku ir ātrākais un lētākais modelis — ideāls WhatsApp atbildēm. 1000 atbildes izmaksā aptuveni €0.10–0.30. OpenAI GPT-4o-mini ir līdzīgas izmaksas.
        </ScreenNote>
      </SubStep>

      <SubStep num="2.5" title="4. mezgls: Atbildes nosūtīšana atpakaļ uz WhatsApp">
        <MiniList items={[
          'Pievieno vēl vienu "HTTP Request" mezglu',
          'URL: https://waba.360dialog.io/v1/messages',
          'Method: POST',
          'Header: D360-API-KEY: [tavs 360dialog API atslēga]',
          'Body: JSON (aprakstīts zemāk)',
        ]} />
        <PromptBox
          label="n8n HTTP REQUEST — WhatsApp ziņas sūtīšana"
          prompt={`{
  "to": "{{ $('Ziņas parsēšana').first().json.from }}",
  "type": "text",
  "text": {
    "body": "{{ $json.content[0].text }}"
  }
}`}
        />
      </SubStep>

      <SubStep num="2.6" title="Savieno mezglus un aktivizē workflow">
        <MiniList items={[
          'Savieno visus mezglus secībā: Webhook → Code → HTTP (Claude) → HTTP (WhatsApp)',
          'Nospied "Test Workflow" — pārbaudīsi visu ķēdi ar testa datiem',
          'Ja viss darbojas → nospied "Activate" (Toggle augšā labajā stūrī)',
          'Workflow ir aktīvs — tagad jebkura ziņa uz tavu WhatsApp numuru aktivizē aģentu!',
        ]} />
        <Callout type="tip" title="Pārbaude — nosūti ziņu">
          <Text style={{ color: C.muted, fontSize: 13, lineHeight: 20 }}>
            No cita telefona nosūti ziņu uz savu WhatsApp Business numuru.
            Dažu sekunžu laikā saņemsi AI atbildi. Ja nedarbojas — n8n Execution Log parāda,
            kurā mezglā radās kļūda.
          </Text>
        </Callout>
      </SubStep>

      <PhaseHeader num="3" title="Sarunu atmiņa — aģents atceras kontekstu" time="~20 min" icon="library-outline" />

      <Body>
        Pašlaik aģents katru ziņu apstrādā neatkarīgi — neatceras iepriekšējo sarunu.
        Lai aģents atcerētos kontekstu, jāsaglabā vēsture. Vienkāršākais veids — Google Sheets.
      </Body>

      <SubStep num="3.1" title="Google Sheets kā atmiņa">
        <MiniList items={[
          'Izveido Google Sheet ar kolonnām: from, role, message, timestamp',
          'n8n: pirms AI mezgla pievieno "Google Sheets" → "Read Rows" (filtrē pēc from)',
          'Iegūsi iepriekšējās ziņas — nosūti tās kā messages masyīvā AI API',
          'Pēc AI atbildes: "Google Sheets" → "Append Row" — saglabā gan klienta, gan AI ziņu',
          'AI tagad redz vēsturi un kontekstu — saka "kā jau minējāt..." u.tml.',
        ]} />
      </SubStep>

      <Divider />

      {/* ══════════════════════════════════════════════════════════════
          SADAĻA 6 — Bizness un cenas
      ══════════════════════════════════════════════════════════════ */}
      <SectionHeading num="SADAĻA 06" title="Ko pārdot — biznesa modelis un cenas" />

      <Body>
        Tagad tu vari uzbūvēt WhatsApp AI aģentus. Šī ir prasme, par kuru Latvijas
        uzņēmumi <Em>gatavi maksāt jau šodien</Em>. Lūk, reālistisks biznesa modelis:
      </Body>

      <View style={{ gap: 10, marginVertical: 16 }}>
        {[
          { title: 'Pamata WhatsApp aģents',         price: '€200–400',       desc: 'ManyChat iestatīšana, AI sistēmas promts, 3–5 automatizācijas plūsmas, 2 nedēļu atbalsts.', tag: 'IESĀCĒJIEM' },
          { title: 'n8n aģents ar integrācijām',     price: '€400–800',       desc: 'n8n workflow, API integrācija (kalendārs, CRM, noliktava), sarunu atmiņa, Human Takeover.', tag: 'POPULĀRS' },
          { title: 'Pilna automatizācijas sistēma',  price: '€800–2000',      desc: 'Vairāki kanāli (WA + e-pasts + web), CRM integrācija, analītika, ikmēneša optimizācija.', tag: '' },
          { title: 'Ikmēneša apkope',                price: '€50–150/mēn',   desc: 'AI promtu uzlabošana, jaunu plūsmu pievienošana, atskaites, atbalsts.', tag: 'PASĪVS IENĀKUMS' },
        ].map((p, i) => (
          <View key={i} style={{ backgroundColor: C.card, borderRadius: 12, borderWidth: 1, borderColor: C.border, padding: 18, flexDirection: 'row', alignItems: 'flex-start', gap: 14 }}>
            <Text style={{ color: C.accent, fontWeight: '800', fontSize: 18, minWidth: 90 }}>{p.price}</Text>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 5 }}>
                <Text style={{ color: C.text, fontWeight: '700', fontSize: 14 }}>{p.title}</Text>
                {p.tag ? <View style={{ backgroundColor: C.accentDim, borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2 }}><Text style={{ color: C.accent, fontSize: 9, fontWeight: '800' }}>{p.tag}</Text></View> : null}
              </View>
              <Text style={{ color: C.muted, fontSize: 12, lineHeight: 19 }}>{p.desc}</Text>
            </View>
          </View>
        ))}
      </View>

      <Callout type="info" title="Kā atrast pirmos klientus Latvijā?">
        <Text style={{ color: C.muted, fontSize: 13, lineHeight: 21 }}>
          <Text style={{ color: C.text, fontWeight: '700' }}>1. Bezmaksas demonstrācija:</Text> Uzbūvē demo aģentu kādam lokālam uzņēmumam (frizētava, autoserviss, zobārsts), parādi kā darbojas.{'\n'}
          <Text style={{ color: C.text, fontWeight: '700' }}>2. LinkedIn un Facebook grupas:</Text> Latvijas uzņēmēju grupas — publicē gadījumu izpēti.{'\n'}
          <Text style={{ color: C.text, fontWeight: '700' }}>3. Aukstais kontakts:</Text> Izraksti 20 vietējos uzņēmumus, kuriem nav atbildes uz WhatsApp — piedāvā risinājumu.
        </Text>
      </Callout>

      <CheckList items={[
        { ok: true, text: 'Vienmēr piedāvā bezmaksas 7 dienu izmēģinājumu — klients redz rezultātu pirms maksā' },
        { ok: true, text: 'Dokumentē katru klienta ietaupīto laiku — "ietaupīja 15h mēnesī" pārdod labāk nekā funkcijas' },
        { ok: true, text: 'Pirmajiem 3 klientiem piedāvā 50% atlaidi apmaiņā pret atsauksmi un case study' },
        { ok: false, text: 'Nekad nesol 100% automatizāciju — cilvēka iesaiste vienmēr vajadzīga sarežģītos gadījumos' },
        { ok: false, text: 'Neaizmirsti par GDPR — klientu dati jāapstrādā atbilstoši ES regulām' },
      ]} />

      {/* ── NOSLĒGUMS ─────────────────────────────────────────────── */}
      <Divider />
      <View style={lx.outro}>
        <Image source={{ uri: IMGS.team }} style={lx.outroImg} resizeMode="cover" />
        <View style={lx.outroOverlay} />
        <View style={lx.outroContent}>
          <Ionicons name="logo-whatsapp" size={36} color="#25d366" style={{ marginBottom: 12 }} />
          <Text style={lx.outroTitle}>Lekcija pabeigta!</Text>
          <Text style={lx.outroBody}>
            Tu tagad saproti, kas ir WhatsApp AI aģents, kā tas darbojas un kā to uzbūvēt
            ar ManyChat vai n8n. Nākamā lekcija: AI automatizācija ar n8n — veidosim sarežģītākas
            plūsmas un integrācijas ar Latvijas biznesa sistēmām.
          </Text>
          <View style={lx.outroMeta}>
            {['WA aģents', 'ManyChat', 'n8n workflow', 'Biznesa modelis'].map((txt, i) => (
              <View key={i} style={lx.outroBadge}>
                <Ionicons name="checkmark-circle" size={14} color="#25d366" />
                <Text style={[lx.outroBadgeTxt, { color: '#25d366' }]}>{txt}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity style={[lx.ctaBtn, { backgroundColor: '#25d366' }]}>
            <Text style={lx.ctaTxt}>Lekcija 3: Mājas lapas čatbots →</Text>
            <Ionicons name="arrow-forward" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

    </ScrollView>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// LEKCIJA 3 — Mājas lapas čatbots
// ═══════════════════════════════════════════════════════════════════════════════
function LessonThree({ onBack }: { onBack: () => void }) {
  const WEB_CLR = '#7c6af0';
  const WEB_DIM = 'rgba(124,106,240,0.12)';
  const WEB_BRD = 'rgba(124,106,240,0.28)';

  function WebChatFlow() {
    const steps = [
      { icon: 'person-outline' as const,              color: '#7cb8f0', label: 'Apmeklētājs\nnāk uz lapu' },
      { icon: 'chatbubble-ellipses-outline' as const, color: WEB_CLR,   label: 'Noklikšķina\nuz čatbotu' },
      { icon: 'globe-outline' as const,               color: C.gold,    label: 'Frontend\nwidgets' },
      { icon: 'hardware-chip-outline' as const,       color: C.accent,  label: 'AI (Claude /\nChatGPT)' },
      { icon: 'checkmark-circle-outline' as const,    color: WEB_CLR,   label: 'Atbilde\nbrowserā' },
    ];
    return (
      <View style={{ backgroundColor: C.card, borderRadius: 14, borderWidth: 1, borderColor: C.border, padding: 22, marginVertical: 20 }}>
        <Text style={{ color: C.muted, fontSize: 10, fontWeight: '800', letterSpacing: 1.5, marginBottom: 18, textAlign: 'center' }}>KĀ DARBOJAS MĀJAS LAPAS ČATBOTS</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 4 }}>
          {steps.map((s, i) => (
            <React.Fragment key={i}>
              <View style={{ alignItems: 'center', gap: 8, flex: 1, minWidth: 60 }}>
                <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: s.color + '22', borderWidth: 1.5, borderColor: s.color + '55', alignItems: 'center', justifyContent: 'center' }}>
                  <Ionicons name={s.icon} size={22} color={s.color} />
                </View>
                <Text style={{ color: C.muted, fontSize: 10, textAlign: 'center', lineHeight: 15 }}>{s.label}</Text>
              </View>
              {i < steps.length - 1 && (
                <View style={{ alignItems: 'center', marginBottom: 20 }}>
                  <Ionicons name="chevron-forward" size={16} color={C.faint} />
                </View>
              )}
            </React.Fragment>
          ))}
        </View>
      </View>
    );
  }

  function WebToolsTable() {
    const tools = [
      { name: 'Voiceflow',    ease: '⭐⭐⭐⭐⭐', power: '⭐⭐⭐⭐',   price: 'Bezmaksas*', ai: true,  code: false, best: 'Iesācējiem, ātrai palaišanai' },
      { name: 'Tidio',        ease: '⭐⭐⭐⭐⭐', power: '⭐⭐⭐',     price: 'No $29/mēn', ai: true,  code: false, best: 'E-veikaliem, maziem biznesiem' },
      { name: 'Crisp',        ease: '⭐⭐⭐⭐',   power: '⭐⭐⭐',     price: 'No $25/mēn', ai: true,  code: false, best: 'Live chat + čatbots apvienojums' },
      { name: 'Intercom',     ease: '⭐⭐⭐',     power: '⭐⭐⭐⭐⭐', price: 'No $74/mēn', ai: true,  code: false, best: 'Liela uzņēmuma klientu atbalsts' },
      { name: 'n8n (custom)', ease: '⭐⭐',       power: '⭐⭐⭐⭐⭐', price: 'Bezmaksas*', ai: true,  code: true,  best: 'Pilna kontrole, jebkura integrācija' },
    ];
    return (
      <View style={{ borderRadius: 12, borderWidth: 1, borderColor: C.border, overflow: 'hidden', marginVertical: 20 }}>
        <View style={{ flexDirection: 'row', backgroundColor: '#0f1720', paddingVertical: 10, paddingHorizontal: 12 }}>
          {['RĪKS', 'VIEGLUMS', 'JAUDA', 'CENA', 'AI', 'LABĀKAIS PRIEKŠ'].map((h, i) => (
            <Text key={i} style={{ color: C.muted, fontSize: 10, fontWeight: '700', letterSpacing: 0.5, flex: i === 0 ? 1 : i === 5 ? 2 : 0.9, textAlign: i > 0 && i < 5 ? 'center' : 'left' }}>{h}</Text>
          ))}
        </View>
        {tools.map((r, i) => (
          <View key={i} style={{ flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, borderTopColor: C.border, paddingVertical: 10, paddingHorizontal: 12, backgroundColor: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
            <Text style={{ flex: 1, color: r.name === 'Voiceflow' || r.name === 'n8n (custom)' ? WEB_CLR : C.text, fontWeight: r.name === 'Voiceflow' ? '700' : '500', fontSize: 13 }}>{r.name}{r.name === 'Voiceflow' ? ' ★' : ''}</Text>
            <Text style={{ flex: 0.9, textAlign: 'center', fontSize: 11 }}>{r.ease}</Text>
            <Text style={{ flex: 0.9, textAlign: 'center', fontSize: 11 }}>{r.power}</Text>
            <Text style={{ flex: 0.9, color: C.accent, fontSize: 11, fontWeight: '600', textAlign: 'center' }}>{r.price}</Text>
            <Text style={{ flex: 0.9, textAlign: 'center', fontSize: 13 }}>{r.ai ? '✓' : '–'}</Text>
            <Text style={{ flex: 2, color: C.muted, fontSize: 11 }}>{r.best}</Text>
          </View>
        ))}
        <View style={{ borderTopWidth: 1, borderTopColor: C.border, paddingVertical: 8, paddingHorizontal: 12 }}>
          <Text style={{ color: C.faint, fontSize: 11 }}>* Voiceflow bezmaksas — 2 aģenti, 1000 sesijas/mēn · n8n bezmaksas ir self-hosted</Text>
        </View>
      </View>
    );
  }

  function WebUseCaseGrid() {
    const cases = [
      { icon: 'cart-outline' as const,          title: 'E-veikals',              desc: 'Palīdz izvēlēties preci, atbild par pieejamību, cenām, piegādi un atgriešanu.' },
      { icon: 'calendar-outline' as const,      title: 'Rezervācijas',           desc: 'Rezervē laikus, apstiprina apmeklējumus, sūta atgādinājumus automātiski.' },
      { icon: 'help-circle-outline' as const,   title: 'FAQ atbalsts',           desc: 'Atbild uz biežākajiem jautājumiem 24/7, ietaupa atbalsta komandas laiku.' },
      { icon: 'briefcase-outline' as const,     title: 'Lead ģenerēšana',        desc: 'Ievāc apmeklētāja vārdu, e-pastu, vajadzības — nodod pārdošanas komandai.' },
      { icon: 'school-outline' as const,        title: 'Kursi / izglītība',      desc: 'Orientē jaunos studentus, atbild par saturu, palīdz ar tehnisku atbalstu.' },
      { icon: 'medical-outline' as const,       title: 'Medicīna / pakalpojumi', desc: 'Pirmsreģistrācija, jautājumi par pakalpojumiem, nosūtīšana uz pareizo speciālistu.' },
    ];
    return (
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginVertical: 16 }}>
        {cases.map((c, i) => (
          <View key={i} style={{ flex: 1, minWidth: 180, backgroundColor: C.card, borderRadius: 12, borderWidth: 1, borderColor: C.border, padding: 16 }}>
            <View style={{ width: 36, height: 36, borderRadius: 9, backgroundColor: WEB_DIM, borderWidth: 1, borderColor: WEB_BRD, alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
              <Ionicons name={c.icon} size={18} color={WEB_CLR} />
            </View>
            <Text style={{ color: C.text, fontWeight: '700', fontSize: 14, marginBottom: 5 }}>{c.title}</Text>
            <Text style={{ color: C.muted, fontSize: 12, lineHeight: 19 }}>{c.desc}</Text>
          </View>
        ))}
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 80 }} showsVerticalScrollIndicator={false}>

      <TouchableOpacity onPress={onBack} style={lx.back}>
        <Ionicons name="arrow-back" size={16} color={C.muted} />
        <Text style={lx.backTxt}>Atpakaļ uz programmu</Text>
      </TouchableOpacity>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <View style={lx.hero}>
        <Image source={{ uri: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1400&q=90&fit=crop' }} style={lx.heroImg} resizeMode="cover" />
        <View style={lx.heroGrad} />
        <View style={lx.heroContent}>
          <View style={[lx.heroBadge, { backgroundColor: WEB_DIM, borderColor: WEB_BRD }]}>
            <Ionicons name="globe-outline" size={12} color={WEB_CLR} />
            <Text style={[lx.heroBadgeTxt, { color: WEB_CLR }]}>PROGRAMMA 1 · LEKCIJA 3</Text>
          </View>
          <Text style={lx.heroTitle}>Mājas lapas{'\n'}čatbots</Text>
          <View style={lx.heroMeta}>
            <View style={lx.metaChip}><Ionicons name="time-outline" size={13} color={C.muted} /><Text style={lx.metaTxt}>25 min</Text></View>
            <View style={lx.metaChip}><Ionicons name="construct-outline" size={13} color={C.muted} /><Text style={lx.metaTxt}>Praktisks</Text></View>
            <View style={[lx.metaChip, { backgroundColor: WEB_DIM, borderWidth: 1, borderColor: WEB_BRD }]}>
              <Ionicons name="globe-outline" size={13} color={WEB_CLR} />
              <Text style={[lx.metaTxt, { color: WEB_CLR }]}>Web</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={lx.intro}>
        <Text style={lx.introText}>
          Mājas lapas čatbots ir spēcīgākais veids, kā pārvērst apmeklētājus par klientiem — 24/7,
          bez papildu darbinieka. Šajā lekcijā iemācīsies, kas ir web čatbots, kādus rīkus izmantot,
          un soli pa solim — kā uzstādīt savu pirmo čatbotu mājas lapā bez kodēšanas.
        </Text>
      </View>

      {/* ══════════════════════════════════════════════════════════════
          SADAĻA 1 — Kas ir mājas lapas čatbots?
      ══════════════════════════════════════════════════════════════ */}
      <SectionHeading num="SADAĻA 01" title="Kas ir mājas lapas čatbots?" />

      <LessonImage
        uri="https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=1200&q=85&fit=crop"
        caption="Mājas lapas čatbots — tūlītēja atbilde apmeklētājam jebkurā diennakts laikā."
        height={260}
      />

      <Body>
        <Em>Mājas lapas čatbots</Em> ir logs apakšējā lapas stūrī, kurā apmeklētājs var uzrakstīt
        jautājumu un saņemt tūlītēju AI atbildi. Atšķirībā no kontaktformas — nav jāgaida
        e-pasta atbilde. Atšķirībā no telefona — nav jāzvana darba laikā.
      </Body>

      <Body>
        Mūsdienu čatbots ar AI spēj saprast <Em>dabisko valodu</Em> — klients var rakstīt
        "ko jūs pārdodat?" vai "kādas ir jūsu cenas?" un saņems precīzu atbildi no tavas
        mājas lapas satura. Nav jādefinē precīzi atslēgvārdi — AI saprot domu.
      </Body>

      <StatsBar stats={[
        { num: '67%',  label: 'Lietotāju izmantotu čatbotu, ja pieejams', icon: 'chatbubbles-outline' },
        { num: '3×',   label: 'Lielāka iesaiste nekā kontaktformā',       icon: 'trending-up-outline' },
        { num: '80%',  label: 'Biežāko jautājumu atbild bez cilvēka',     icon: 'checkmark-circle-outline' },
        { num: '24/7', label: 'Pieejams — arī naktī un nedēļas nogalēs',  icon: 'moon-outline' },
      ]} />

      <Callout type="tip" title="Kāpēc čatbots, nevis tikai kontaktforma?">
        <Text style={{ color: C.muted, fontSize: 13, lineHeight: 21 }}>
          <Text style={{ color: C.text, fontWeight: '700' }}>Kontaktforma:</Text> apmeklētājs aizpilda, gaida atbildi stundas vai dienas — bieži zaudē interesi.{'\n'}
          <Text style={{ color: C.text, fontWeight: '700' }}>Telefons:</Text> tikai darba laikā, klients var justies neērti zvanīt.{'\n'}
          <Text style={{ color: WEB_CLR, fontWeight: '700' }}>Čatbots:</Text>{' '}
          <Text style={{ color: WEB_CLR, fontWeight: '700' }}>tūlītēja atbilde</Text>, klients paliek lapā, vairāk konversijas.
        </Text>
      </Callout>

      <WebChatFlow />

      <H3>Čatbots vs parasts pop-up — atšķirība</H3>
      <View style={{ gap: 10, marginVertical: 16 }}>
        {[
          { icon: 'git-branch-outline' as const, title: 'Konteksts',       desc: 'AI čatbots saprot un atceras sarunu kontekstu. Statisks pop-up — tikai rāda iepriekš ierakstītu tekstu.' },
          { icon: 'bulb-outline' as const,       title: 'Saprašana',       desc: 'Atbild uz jebkuru jautājumu dabiskā valodā — ne tikai uz iepriekš definētiem celiņiem.' },
          { icon: 'layers-outline' as const,     title: 'Zināšanu bāze',   desc: 'Čatbots var "apgūt" tavas lapas saturu, PDF, FAQ — un atbildēt balstoties uz tiem.' },
          { icon: 'person-outline' as const,     title: 'Lead ievākšana',  desc: 'Pirms atbildēt, var pajautāt vārdu un e-pastu — automātiska lead ģenerēšana.' },
        ].map((item, i) => (
          <View key={i} style={{ flexDirection: 'row', gap: 12, backgroundColor: C.card, borderRadius: 10, borderWidth: 1, borderColor: C.border, padding: 14 }}>
            <View style={{ width: 36, height: 36, borderRadius: 9, backgroundColor: WEB_DIM, borderWidth: 1, borderColor: WEB_BRD, alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Ionicons name={item.icon} size={17} color={WEB_CLR} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: C.text, fontWeight: '700', fontSize: 14, marginBottom: 3 }}>{item.title}</Text>
              <Text style={{ color: C.muted, fontSize: 13, lineHeight: 19 }}>{item.desc}</Text>
            </View>
          </View>
        ))}
      </View>

      <Divider />

      {/* ══════════════════════════════════════════════════════════════
          SADAĻA 2 — Reāli biznesa scenāriji
      ══════════════════════════════════════════════════════════════ */}
      <SectionHeading num="SADAĻA 02" title="Reāli biznesa scenāriji — ko var automatizēt ar mājas lapas čatbotu" />

      <Body>
        Web čatbotus var pielietot gandrīz jebkurā nišā. Šeit ir 6 biežākie
        scenāriji, kas darbojas Latvijas uzņēmumos jau šodien:
      </Body>

      <WebUseCaseGrid />

      <H3>Konkrēts piemērs — apģērbu e-veikals</H3>

      <Body>
        Apmeklētājs nāk uz e-veikala lapu vakarā, nezina, kādu izmēru izvēlēties.
        Bez čatbota — viņš aiziet. Ar čatbotu:
      </Body>

      <View style={{ backgroundColor: C.card, borderRadius: 12, borderWidth: 1, borderColor: C.border, overflow: 'hidden', marginVertical: 16 }}>
        <View style={{ backgroundColor: '#0f1720', paddingHorizontal: 14, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Ionicons name="globe-outline" size={14} color={WEB_CLR} />
          <Text style={{ color: C.muted, fontSize: 11, fontWeight: '700', letterSpacing: 0.8 }}>SIMULĀCIJA — SARUNA AR WEB ČATBOTU</Text>
        </View>
        {[
          { from: 'client', msg: 'Sveiki! Kāds izmērs man piemērotu? Es parasti valkāju M, bet šī jaka izskatās mazāka.' },
          { from: 'agent',  msg: 'Sveiki! Jā, šī jaka mēdz griezties nedaudz mazāka. Ja parasti valkājat M, iesaku ņemt L. 📏\n\nVai vēlaties, lai nosūtu izmēru tabulu ar precīziem centimetriem?' },
          { from: 'client', msg: 'Jā, lūdzu! Un vai ir brīva vēl zilajā krāsā?' },
          { from: 'agent',  msg: 'Izmēru tabula: M = 88–96 cm krūts apkārtmērs, L = 96–104 cm.\n\nZilā krāsā L izmērs — noliktavā ir 2 gabali. 🛍️\n\nPievienot grozam?' },
          { from: 'client', msg: 'Jā!' },
          { from: 'agent',  msg: '✅ Jaka (L, zila) pievienota grozam!\n\nPiegāde Latvijā — 1–3 darba dienas, €3.90.\nOmniva pakomāts — €2.50.\n\nVai turpinām iepirkties vai doties uz kasi? 🛒' },
        ].map((msg, i) => (
          <View key={i} style={{ flexDirection: 'row', justifyContent: msg.from === 'client' ? 'flex-start' : 'flex-end', paddingHorizontal: 14, paddingVertical: 6 }}>
            <View style={{ maxWidth: '75%', backgroundColor: msg.from === 'client' ? '#1a2330' : '#1e1a3a', borderRadius: 10, padding: 10, borderWidth: 1, borderColor: msg.from === 'client' ? C.border : WEB_BRD }}>
              <Text style={{ color: msg.from === 'client' ? C.text : WEB_CLR, fontSize: 8, fontWeight: '700', letterSpacing: 0.5, marginBottom: 4, opacity: 0.7 }}>
                {msg.from === 'client' ? 'APMEKLĒTĀJS' : '🤖 AI ČATBOTS'}
              </Text>
              <Text style={{ color: C.text, fontSize: 13, lineHeight: 20 }}>{msg.msg}</Text>
            </View>
          </View>
        ))}
        <View style={{ paddingHorizontal: 14, paddingVertical: 10, borderTopWidth: 1, borderTopColor: C.border }}>
          <Text style={{ color: C.muted, fontSize: 11, textAlign: 'center' }}>
            Visa šī saruna notika automātiski — konversija sasniegta · 1 min 47 sek
          </Text>
        </View>
      </View>

      <Callout type="info" title="Ko šis čatbots izdarīja automātiski?">
        <Text style={{ color: C.muted, fontSize: 13, lineHeight: 21 }}>
          ✓ Ieteica pareizo izmēru balstoties uz klienta informāciju{'\n'}
          ✓ Nosūtīja izmēru tabulu no zināšanu bāzes{'\n'}
          ✓ Pārbaudīja noliktavas pieejamību reāllaikā{'\n'}
          ✓ Pievienoja preci grozam{'\n'}
          ✓ Informēja par piegādes opcijām un cenām
        </Text>
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════════════════════════════
          SADAĻA 3 — Rīku izvēle
      ══════════════════════════════════════════════════════════════ */}
      <SectionHeading num="SADAĻA 03" title="Kuru rīku izvēlēties? Salīdzinājums" />

      <Body>
        Ir vairāki veidi, kā izveidot mājas lapas čatbotu. Izvēle atkarīga no tava
        budžeta, tehniskajām zināšanām un vajadzību sarežģītības.
      </Body>

      <WebToolsTable />

      <Callout type="tip" title="Mūsu ieteikums">
        <Text style={{ color: C.muted, fontSize: 13, lineHeight: 21 }}>
          <Text style={{ color: C.text, fontWeight: '700' }}>Iesācējiem → Voiceflow:</Text> Vizuāls redaktors, iebūvēta AI, bezmaksas plāns, ātri uzsākt.{'\n'}
          <Text style={{ color: C.text, fontWeight: '700' }}>Pilnai kontrolei → n8n + pašrakstīts widgets:</Text> Var integrēt ar jebkuru sistēmu, pilna datu kontrole.{'\n'}
          Sāc ar Voiceflow, pārcel uz n8n, kad vajadzīgas sarežģītas integrācijas.
        </Text>
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════════════════════════════
          SADAĻA 4 — Voiceflow soli pa solim
      ══════════════════════════════════════════════════════════════ */}
      <SectionHeading num="SADAĻA 04" title="Soli pa solim: Voiceflow — vienkāršākais ceļš" />

      <LessonImage
        uri="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=85&fit=crop"
        caption="Voiceflow — no-code platforma AI čatbotu izveidei mājas lapām."
        height={240}
      />

      <Body>
        Voiceflow ir vizuāla drag-and-drop platforma, kas ļauj izveidot mājas lapas čatbotu
        <Em> bez nevienas koda rindiņas</Em>. Iebūvēts AI un zināšanu bāzes atbalsts — uzstādi
        savā lapā 1 stundas laikā.
      </Body>

      <PhaseHeader num="1" title="Voiceflow konta izveide un projekts" time="~10 min" icon="globe-outline" />

      <SubStep num="1.1" title="Reģistrācija Voiceflow">
        <MiniList items={[
          'Dodies uz voiceflow.com → "Get Started Free"',
          'Pierakstīties ar Google kontu vai e-pastu',
          'Voiceflow uzdos: "What are you building?" → izvēlies "Chat Agent"',
          'Nospied "Create new project" → izvēlies "Chat Agent" (nevis Voice)',
          'Nosaukums: "[Tavs bizness] čatbots" → "Create Project"',
          'Tevi nogādās vizuālajā kanvassā ar tukšu plūsmu',
        ]} />
        <ScreenNote>
          Bezmaksas plānā Voiceflow atļauj 2 aģentus un 1000 sesijas mēnesī — vairāk nekā pietiekami, lai sāktu un uztestētu ar reāliem klientiem.
        </ScreenNote>
      </SubStep>

      <SubStep num="1.2" title="Voiceflow saskarnes iepazīšana">
        <MiniList items={[
          'Kreisais panelis: "Flows" (sarunu loģika), "KB" (zināšanu bāze), "Variables" (mainīgie)',
          'Vidus: vizuālais kanvass — te velc un nomet blokus ar peli',
          'Labais panelis: izvēlētā bloka iestatījumi parādās šeit',
          'Augša pa labi: "Preview" (testēšana) un "Publish" (publicēšana)',
          'Sākuma punkts: zaļais "Start" bloks — tas ir plūsmas sākums',
        ]} />
      </SubStep>

      <PhaseHeader num="2" title="Čatbota loģika un AI bloks" time="~30 min" icon="git-branch-outline" />

      <SubStep num="2.1" title="Sveiciena ziņa — pirmais solis">
        <MiniList items={[
          'Noklikšķini uz "Start" bloka → nospied "+" → pievieno "Speak" bloku',
          '"Speak" bloka tekstā ieraksti sveicienu: "Sveiki! Es esmu [Uzņēmums] AI asistents."',
          'Pievieno ātrās izvēles pogas — nospied "Add Button" blokā',
          'Izveidojam 3 pogas: "Par mums", "Cenas", "Sazināties"',
          'Katra poga ved uz savu zarošanās celiņu — klikšķini uz pogas, pievieno jaunu bloku',
        ]} />
        <ScreenNote>
          Pogas ir opcija — čatbots darbojas arī bez tām. Taču pogas palīdz apmeklētājam saprast, ko čatbots var darīt, un samazina nenoteiktības barjeru.
        </ScreenNote>
      </SubStep>

      <SubStep num="2.2" title="AI bloka pievienošana — galvenais elements">
        <Body>
          AI bloks ir Voiceflow spēcīgākā funkcija — tas ļauj čatbotam atbildēt uz
          jebkuru jautājumu, ne tikai uz iepriekš definētiem celiņiem.
        </Body>
        <MiniList items={[
          'Pievieno "AI Response" bloku (kreisajā paletē vai ar "+" taustiņu)',
          'Model: GPT-4o mini (ātrāks, lētāks) vai Claude Haiku',
          'System Prompt laukā apraksti čatbota lomu un zināšanas (skat. zemāk)',
          'Ieslēdz "Knowledge Base" (KB) — tad AI atbildēs no tavas lapas satura',
          'Max Tokens: 300–400 (pietiek atbildei, nepalēnina ielādi)',
          'Savieno AI bloku kā "noklusējuma" celiņu — kad nav konkrētas pogas',
        ]} />
        <PromptBox
          label="VOICEFLOW: Sistēmas promts AI blokam"
          prompt={`Tu esi [Uzņēmuma nosaukums] mājas lapas AI asistents.

TAVS UZDEVUMS:
- Atbildēt uz apmeklētāju jautājumiem par mūsu produktiem/pakalpojumiem
- Palīdzēt izvēlēties piemērotāko risinājumu
- Piedāvāt sazināšanās iespējas, ja jautājums sarežģītāks

PAR MUMS:
[Uzraksti sava biznesa aprakstu — ko dari, kādi pakalpojumi, cenas, atrašanās vieta, darba laiks]

NOTEIKUMI:
- Atbildi latviski (ja klients raksta latviski) vai angliski (ja angliski)
- Esi draudzīgs, profesionāls, lakonisks
- Atbildes maksimums 3–4 teikumi — čatbotā nav vietas romāniem
- Ja nezini precīzu atbildi — piedāvā sazināties: [e-pasts]
- Nekad neizdomā cenas vai informāciju, ko nezini`}
        />
      </SubStep>

      <SubStep num="2.3" title="Lead ievākšanas celiņš">
        <Body>
          Čatbots var automātiski ievākt apmeklētāja kontaktinformāciju, pirms atbildēt
          uz specifiskiem jautājumiem. Tas ir viens no vērtīgākajiem čatbota lietojumiem.
        </Body>
        <MiniList items={[
          'Pievieno "Capture" bloku — tas prasīs klienta ievadi un saglabās mainīgajā',
          'Jautājums: "Kā es varu jūs uzrunāt?" → saglabā mainīgajā {name}',
          'Otrais Capture: "Jūsu e-pasts (neobligāti)?" → saglabā mainīgajā {email}',
          'Pievieno "Integrations" → "Google Sheets" vai "Email" — nosūti savāktos datus',
          'Pēc ievākšanas turpinies ar AI bloku, kas atbildēs uz klienta jautājumu',
        ]} />
        <ScreenNote>
          Svarīgi: neuzdod pārāk daudz jautājumu uzreiz. Vispirms jāatbild uz klienta vajadzību — tad var lūgt kontaktinfo. Pretējā gadījumā apmeklētājs aiziet.
        </ScreenNote>
      </SubStep>

      <PhaseHeader num="3" title="Zināšanu bāze — čatbots apgūst tavu lapu" time="~15 min" icon="library-outline" />

      <SubStep num="3.1" title="Satura pievienošana Knowledge Base">
        <MiniList items={[
          'Kreisajā panelī: "KB" (Knowledge Base) → "Add Data Source"',
          'Izvēlne: "URL" (mājas lapas URL), "File" (PDF/TXT), "Text" (manuāls teksts)',
          'URL variants: ieraksti savas lapas adresi → Voiceflow automātiski izlasa saturu',
          'Vari pievienot vairākus avotus: mājas lapa + PDF cenrādis + FAQ dokuments',
          'Nospiežot "Sync" — Voiceflow atjauninās datus, ja mainīsi lapas saturu',
        ]} />
        <ScreenNote>
          Voiceflow Knowledge Base izmanto vector search — tas nozīmē, ka čatbots saprot jautājuma nozīmi, nevis tikai atrod atslēgvārdus. Klients var rakstīt netieši, un čatbots tomēr sapratīs.
        </ScreenNote>
      </SubStep>

      <SubStep num="3.2" title="Testēšana ar Knowledge Base">
        <MiniList items={[
          'Augšā labajā stūrī nospied "Preview" — atvērsies testa čatbota logs',
          'Uzraksti jautājumu par savu biznesu: "kādas ir jūsu cenas?" vai "kur jūs atrodaties?"',
          'Pārbaudi, vai AI atbildē izmanto Knowledge Base datus',
          'Ja atbilde nepareiza — uzlabo sistēmas promptu vai pārformulē KB saturu',
          'Testē vismaz 10 dažādus jautājumus, ko reāli klienti varētu uzdot',
        ]} />
        <Callout type="tip" title="Kā uzlabot KB kvalitāti?">
          <Text style={{ color: C.muted, fontSize: 13, lineHeight: 20 }}>
            Ja čatbots nevar atrast atbildi KB, problēma parasti ir tekstā — tas ir pārāk garš vai nestrukturēts.
            Risinājums: izveido atsevišķu FAQ dokumentu ar skaidriem Q&A paraugiem un pievieno to KB papildus mājas lapai.
          </Text>
        </Callout>
      </SubStep>

      <PhaseHeader num="4" title="Publicēšana un iegulšana mājas lapā" time="~10 min" icon="code-slash-outline" />

      <SubStep num="4.1" title="Čatbota publicēšana Voiceflow">
        <MiniList items={[
          'Voiceflow augšā pa labi: "Publish" → "Publish to production"',
          'Voiceflow parādīs "Web Chat" konfigurāciju',
          'Pielāgo izskatu: krāsa (izmanto savas lapas akcenta krāsu), nosaukums, avatars',
          'Position: "Bottom Right" (standarta pozīcija)',
          'Nospied "Get Embed Code" — iegūsi JavaScript koda fragmentu',
        ]} />
      </SubStep>

      <SubStep num="4.2" title="Embed koda iegulšana mājas lapā">
        <Body>
          Voiceflow embed kods ir viens JavaScript tags — to pievieno tieši pirms
          {'</body>'} taga savā mājas lapā.
        </Body>
        <MiniList items={[
          'Framer: "Site Settings" → "Custom Code" → "End of </body>" → ielīmē kodu',
          'WordPress: "Appearance" → "Theme Editor" → footer.php → pirms </body>',
          'Squarespace: "Settings" → "Advanced" → "Code Injection" → "Footer"',
          'Wix: "Settings" → "Custom Code" → "Body" → "End of body"',
          'Tīrs HTML: atver failu, atrod </body>, ielīmē kodu tieši virs tā',
        ]} />
        <PromptBox
          label="VOICEFLOW: Embed koda paraugs"
          prompt={`<script type="text/javascript">
  (function(d, t) {
    var v = d.createElement(t), s = d.getElementsByTagName(t)[0];
    v.onload = function() {
      window.voiceflow.chat.load({
        verify: { projectID: 'TAVS_PROJECT_ID' },
        url: 'https://general-runtime.voiceflow.com',
        versionID: 'production',
        render: { mode: 'bubble', bottom: 24, right: 24 },
      });
    }
    v.src = "https://cdn.voiceflow.com/widget/bundle.mjs";
    v.type = "text/javascript";
    s.parentNode.insertBefore(v, s);
  })(document, 'script');
</script>`}
        />
        <ScreenNote>
          Aizstāj TAVS_PROJECT_ID ar savu projekta ID — to atrodi Voiceflow URL: voiceflow.com/project/ŠEIT_IR_ID/...
        </ScreenNote>
      </SubStep>

      <Divider />

      {/* ══════════════════════════════════════════════════════════════
          SADAĻA 5 — Pielāgots čatbots ar n8n
      ══════════════════════════════════════════════════════════════ */}
      <SectionHeading num="SADAĻA 05" title="Soli pa solim: pielāgots čatbots ar n8n + Claude API — pilna kontrole" />

      <LessonImage
        uri="https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&q=85&fit=crop"
        caption="Pielāgots čatbots ar n8n — pilna kontrole pār datiem un loģiku."
        height={240}
      />

      <Body>
        Ja Voiceflow brīvais plāns ir par mazu vai vajadzīgas sarežģītas integrācijas
        (CRM, pasūtījumu sistēma, noliktava), vari veidot <Em>pilnīgi pielāgotu čatbotu</Em>
        ar n8n backend un savu JavaScript widgets mājas lapā.
      </Body>

      <Callout type="warning" title="Priekšnosacījumi šai pieejai">
        <Text style={{ color: C.muted, fontSize: 13, lineHeight: 20 }}>
          • n8n.cloud konts vai pats-hostēts n8n{'\n'}
          • Anthropic (Claude) vai OpenAI API atslēga{'\n'}
          • Piekļuve mājas lapas HTML kodam (Framer Custom Code, WordPress vai tīrs HTML){'\n'}
          • ~2 stundas pirmreizējai iestatīšanai
        </Text>
      </Callout>

      <PhaseHeader num="1" title="Frontend — čatbota widgets (HTML + JS)" time="~30 min" icon="code-slash-outline" />

      <SubStep num="1.1" title="Čatbota poga un dialoga logs">
        <Body>
          Čatbota frontend ir divi elementi: apļveida poga apakšā labajā stūrī un
          dialoga logs, kas atveras pēc klikšķa. Šos elementus pievieno lapas HTML.
        </Body>
        <PromptBox
          label="HTML: Čatbota widgets struktūra"
          prompt={`<!-- Čatbota poga -->
<div id="chat-bubble" onclick="toggleChat()" style="
  position:fixed; bottom:24px; right:24px; width:56px; height:56px;
  background:#7c6af0; border-radius:50%; cursor:pointer; z-index:9999;
  display:flex; align-items:center; justify-content:center;
  box-shadow: 0 4px 20px rgba(124,106,240,0.4);">
  <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
  </svg>
</div>

<!-- Čatbota logs -->
<div id="chat-window" style="
  display:none; position:fixed; bottom:92px; right:24px; width:360px; height:500px;
  background:#0f1720; border:1px solid rgba(255,255,255,0.08); border-radius:16px;
  z-index:9998; flex-direction:column; overflow:hidden;
  box-shadow: 0 8px 40px rgba(0,0,0,0.5);">
  <div style="padding:16px; background:#131e2a; border-bottom:1px solid rgba(255,255,255,0.06);">
    <div style="color:#e8f4ff; font-weight:700; font-size:15px;">AI Asistents</div>
    <div style="color:#8096ab; font-size:12px;">Parasti atbild uzreiz</div>
  </div>
  <div id="chat-messages" style="flex:1; overflow-y:auto; padding:16px; display:flex; flex-direction:column; gap:10px;"></div>
  <div style="padding:12px; border-top:1px solid rgba(255,255,255,0.06); display:flex; gap:8px;">
    <input id="chat-input" type="text" placeholder="Rakstiet jautājumu..."
      style="flex:1; background:#131e2a; border:1px solid rgba(255,255,255,0.1); border-radius:8px;
      padding:10px 14px; color:#e8f4ff; font-size:14px; outline:none;"
      onkeypress="if(event.key==='Enter') sendMessage()">
    <button onclick="sendMessage()" style="
      background:#7c6af0; border:none; border-radius:8px; padding:10px 14px;
      color:white; cursor:pointer; font-weight:600;">Sūtīt</button>
  </div>
</div>`}
        />
      </SubStep>

      <SubStep num="1.2" title="JavaScript — ziņu nosūtīšana uz n8n backend">
        <Body>
          JavaScript kods apstrādā čatbota loģiku klienta pusē: parāda/slēpj logu,
          attēlo ziņas un nosūta pieprasījumu uz tavu n8n webhook.
        </Body>
        <PromptBox
          label="JavaScript: Čatbota loģika"
          prompt={`const N8N_WEBHOOK = 'https://TAVS.n8n.cloud/webhook/chatbot';
const sessionId = 'session_' + Math.random().toString(36).substr(2, 9);
let chatHistory = [];

function toggleChat() {
  const win = document.getElementById('chat-window');
  win.style.display = win.style.display === 'none' ? 'flex' : 'none';
  if (win.style.display === 'flex' && chatHistory.length === 0) {
    addMessage('agent', 'Sveiki! Kā es varu palīdzēt šodien?');
  }
}

function addMessage(role, text) {
  const msgs = document.getElementById('chat-messages');
  const isAgent = role === 'agent';
  const div = document.createElement('div');
  div.style.cssText = 'max-width:80%; padding:10px 14px; border-radius:10px; font-size:13px; line-height:1.5;' +
    'align-self:' + (isAgent ? 'flex-start' : 'flex-end') + ';' +
    'background:' + (isAgent ? '#1a2330' : '#2a1a5e') + ';' +
    'color:#e8f4ff; border:1px solid ' + (isAgent ? 'rgba(255,255,255,0.06)' : 'rgba(124,106,240,0.3)') + ';';
  div.textContent = text;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
  chatHistory.push({ role: isAgent ? 'assistant' : 'user', content: text });
}

async function sendMessage() {
  const input = document.getElementById('chat-input');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  addMessage('user', text);

  try {
    const res = await fetch(N8N_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, sessionId, history: chatHistory.slice(-8) })
    });
    const data = await res.json();
    addMessage('agent', data.reply || 'Atvainojiet, radās kļūda.');
  } catch (e) {
    addMessage('agent', 'Savienojuma kļūda. Mēģiniet vēlreiz.');
  }
}`}
        />
        <ScreenNote>
          Mainīgo N8N_WEBHOOK aizstāj ar savu n8n webhook URL — to iegūsim nākamajā sadaļā. sessionId palīdz saglabāt sarunu kontekstu katram apmeklētājam atsevišķi.
        </ScreenNote>
      </SubStep>

      <PhaseHeader num="2" title="n8n backend — AI loģika un atbilde" time="~30 min" icon="git-network-outline" />

      <SubStep num="2.1" title="n8n webhook izveide">
        <MiniList items={[
          'n8n → "New Workflow" → pievieno "Webhook" trigger mezglu',
          'HTTP Method: POST | Path: chatbot',
          'Response Mode: "Respond to Webhook" (svarīgi — tas ļauj atbildēt tieši)',
          'Nospied "Listen for Test Event" → kopē Webhook URL',
          'Atjaunini JavaScript koda N8N_WEBHOOK mainīgo ar šo URL',
          'Nosūti testa pieprasījumu no lapas — n8n parādīs saņemtos datus',
        ]} />
      </SubStep>

      <SubStep num="2.2" title="Claude API mezgls — AI atbilde">
        <MiniList items={[
          'Pievieno "HTTP Request" mezglu aiz Webhook',
          'URL: https://api.anthropic.com/v1/messages',
          'Method: POST',
          'Header: x-api-key → [tavs Anthropic API atslēga] un anthropic-version → 2023-06-01',
          'Content-Type: application/json',
          'Body: JSON (aprakstīts zemāk)',
        ]} />
        <PromptBox
          label="n8n HTTP REQUEST — Claude API body"
          prompt={`{
  "model": "claude-haiku-4-5-20251001",
  "max_tokens": 500,
  "system": "Tu esi [Uzņēmums] mājas lapas asistents. Atbildi latviski, īsi un noderīgi. [Apraksti biznesu, pakalpojumus, cenas]",
  "messages": {{ JSON.stringify($json.body.history.concat([{role:'user',content:$json.body.message}])) }}
}`}
        />
        <ScreenNote>
          history masīvs satur iepriekšējo sarunu no frontend — tāpēc AI atceras kontekstu. Masīvs apgriezts līdz 8 ziņām, lai API izmaksas būtu zemas.
        </ScreenNote>
      </SubStep>

      <SubStep num="2.3" title="Atbildes nosūtīšana atpakaļ uz frontend">
        <MiniList items={[
          'Pievieno "Respond to Webhook" mezglu kā pēdējo',
          'Response Body: JSON formāts',
          'Ievadi: { "reply": "{{ $json.content[0].text }}" }',
          'Savieno: Webhook → HTTP Request (Claude) → Respond to Webhook',
          'Nospied "Test Workflow" — pārbaudīsi visu ķēdi',
          'Kad darbojas → "Activate" — workflow ir aktīvs un gatavs',
        ]} />
        <Callout type="tip" title="CORS — svarīgi web integrācijai">
          <Text style={{ color: C.muted, fontSize: 13, lineHeight: 20 }}>
            Ja mājas lapa un n8n ir dažādos domēnos (parasti tā ir), pārlūks var bloķēt pieprasījumu.
            n8n Webhook mezglā pievieno Header: "Access-Control-Allow-Origin: *" vai konkrētu domēnu.
            n8n Cloud parasti apstrādā CORS automātiski.
          </Text>
        </Callout>
      </SubStep>

      <PhaseHeader num="3" title="Sarunu atmiņa un biznesa dati" time="~20 min" icon="library-outline" />

      <SubStep num="3.1" title="Detalizēts sistēmas promts ar biznesa datiem">
        <Body>
          Jo detalizētāks sistēmas promts, jo precīzākas atbildes. Iekļauj visu svarīgo
          informāciju tieši promptā — pakalpojumi, cenas, darba laiks, kontakti.
        </Body>
        <PromptBox
          label="DETALIZĒTS sistēmas promts ar biznesa datiem"
          prompt={`Tu esi [Uzņēmums] mājas lapas AI asistents.

PAKALPOJUMI UN CENAS:
- Pakalpojums 1: apraksts, cena €X
- Pakalpojums 2: apraksts, cena €X–Y (atkarīgs no apjoma)
- Pakalpojums 3: cena pēc pieprasījuma

DARBA LAIKS: Pirmdiena–Piektdiena 9:00–18:00
ADRESE: [Adrese, Rīga] | E-pasts: [e-pasts] | Tel: [numurs]

SVARĪGI:
- Vizīšu rezervācija: [Calendly saite vai "zvanot"]
- Minimālais pasūtījums: €[summa]

UZVEDĪBAS NOTEIKUMI:
- Atbildi tajā valodā, kurā klients raksta (LV vai EN)
- Esam draudzīgi, neformāli, bet profesionāli
- Ja cena nav skaidra — piedāvā konsultāciju
- Nekad nesolīt atlaides, kuras nav šeit minētas`}
        />
      </SubStep>

      <SubStep num="3.2" title="Sarunu vēstures saglabāšana (Google Sheets)">
        <MiniList items={[
          'Izveido Google Sheet ar kolonnām: sessionId | role | message | timestamp',
          'n8n: pirms Claude mezgla → "Google Sheets" → "Read Rows" (filtrē pēc sessionId)',
          'Apvieno iegūto vēsturi ar history no frontend pieprasījuma',
          'Pēc Claude atbildes → "Google Sheets" → "Append Row" — saglabā abas ziņas',
          'Ieguvums: čatbots atceras sarunu pat ja klients aizver lapu un atgriežas vēlāk',
        ]} />
        <ScreenNote>
          sessionId saglabā localStorage klienta pārlūkā — klients saņems to pašu sesiju pēc lapas atsvaidzināšanas. Vēsture paliek Google Sheets uz visiem laikiem.
        </ScreenNote>
      </SubStep>

      <Divider />

      {/* ══════════════════════════════════════════════════════════════
          SADAĻA 6 — Biznesa modelis
      ══════════════════════════════════════════════════════════════ */}
      <SectionHeading num="SADAĻA 06" title="Ko pārdot — biznesa modelis un cenas" />

      <Body>
        Tagad tu vari uzbūvēt mājas lapu čatbotus. Latvijas uzņēmumi
        <Em> aktīvi meklē šos pakalpojumus</Em> — jo īpaši tie, kuriem ir daudz
        tipveida klientu jautājumu. Lūk, reālistisks biznesa modelis:
      </Body>

      <View style={{ gap: 10, marginVertical: 16 }}>
        {[
          { title: 'Pamata Voiceflow čatbots',         price: '€150–350',      desc: 'Voiceflow iestatīšana, sistēmas promts, Knowledge Base, iegulšana lapā, 1 nedēļas atbalsts.', tag: 'IESĀCĒJIEM' },
          { title: 'Pielāgots AI čatbots (n8n)',       price: '€350–700',      desc: 'n8n workflow, Claude/GPT integrācija, custom widgets ar zīmolstilu, lead ievākšana, CRM integrācija.', tag: 'POPULĀRS' },
          { title: 'Pilna klientu atbalsta sistēma',   price: '€700–1800',     desc: 'Vairākas lapas/valodas, CRM + čatbots integrācija, analītika, ātruma optimizācija, unikāla persona.', tag: '' },
          { title: 'Ikmēneša apkope un optimizācija',  price: '€50–120/mēn',  desc: 'Sistēmas promta uzlabošana pēc reālu sarunu analīzes, jaunu FAQ pievienošana, ikmēneša atskaites.', tag: 'PASĪVS IENĀKUMS' },
        ].map((p, i) => (
          <View key={i} style={{ backgroundColor: C.card, borderRadius: 12, borderWidth: 1, borderColor: C.border, padding: 18, flexDirection: 'row', alignItems: 'flex-start', gap: 14 }}>
            <Text style={{ color: WEB_CLR, fontWeight: '800', fontSize: 18, minWidth: 90 }}>{p.price}</Text>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 5 }}>
                <Text style={{ color: C.text, fontWeight: '700', fontSize: 14 }}>{p.title}</Text>
                {p.tag ? <View style={{ backgroundColor: WEB_DIM, borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2 }}><Text style={{ color: WEB_CLR, fontSize: 9, fontWeight: '800' }}>{p.tag}</Text></View> : null}
              </View>
              <Text style={{ color: C.muted, fontSize: 12, lineHeight: 19 }}>{p.desc}</Text>
            </View>
          </View>
        ))}
      </View>

      <Callout type="info" title="Kā atrast pirmos klientus Latvijā?">
        <Text style={{ color: C.muted, fontSize: 13, lineHeight: 21 }}>
          <Text style={{ color: C.text, fontWeight: '700' }}>1. Auditē mājas lapas:</Text> Atrodi 20 Latvijas uzņēmumus bez čatbota — restorāni, zobārsti, fitnesa klubi, juvelieri. Parādi, kā izskatītos viņu čatbots.{'\n'}
          <Text style={{ color: C.text, fontWeight: '700' }}>2. Bezmaksas demo:</Text> Uzbūvē demo čatbotu uzņēmuma lapai, ieguldi iframe — vienkārši parādi "skatieties, tas jau darbojas jūsu lapā".{'\n'}
          <Text style={{ color: C.text, fontWeight: '700' }}>3. LinkedIn video:</Text> Filmē ekrānu kā čatbots atbild uz reāliem jautājumiem — demonstrācija pārdod labāk nekā teksts.
        </Text>
      </Callout>

      <CheckList items={[
        { ok: true,  text: 'Vienmēr testē čatbotu ar reāliem klientu jautājumiem pirms nodod klientam — parādi testēšanas rezultātus' },
        { ok: true,  text: 'Piedāvā 14 dienu bezmaksas izmēģinājumu — pēc redzama rezultāta klients reti atsakās maksāt' },
        { ok: true,  text: 'Ikmēneša atskaitē rādi: cik sarunu, cik laika ietaupīts, cik leadu savākts — skaitļi pārliecina' },
        { ok: false, text: 'Nekad nesol, ka čatbots pilnībā aizstās klientu atbalstu — tas ir pirmā filtra rīks, ne aizstājējs' },
        { ok: false, text: 'Neaizmirsti par privātumu — informē lapas apmeklētājus, ka čatbots izmanto AI (GDPR prasība)' },
      ]} />

      {/* ── NOSLĒGUMS ─────────────────────────────────────────────── */}
      <Divider />
      <View style={lx.outro}>
        <Image source={{ uri: IMGS.future }} style={lx.outroImg} resizeMode="cover" />
        <View style={lx.outroOverlay} />
        <View style={lx.outroContent}>
          <Ionicons name="globe-outline" size={36} color={WEB_CLR} style={{ marginBottom: 12 }} />
          <Text style={lx.outroTitle}>Lekcija pabeigta!</Text>
          <Text style={lx.outroBody}>
            Tu tagad saproti, kas ir mājas lapas čatbots, kā to uzbūvēt ar Voiceflow vai n8n
            un kā no tā gūt ienākumus Latvijā. Nākamā lekcija: AI automatizācija — veidosim
            sarežģītākas darba plūsmas, kas ietaupa stundas katru nedēļu.
          </Text>
          <View style={lx.outroMeta}>
            {['Web čatbots', 'Voiceflow', 'n8n widgets', 'Biznesa modelis'].map((txt, i) => (
              <View key={i} style={[lx.outroBadge, { backgroundColor: WEB_DIM, borderWidth: 1, borderColor: WEB_BRD }]}>
                <Ionicons name="checkmark-circle" size={14} color={WEB_CLR} />
                <Text style={[lx.outroBadgeTxt, { color: WEB_CLR }]}>{txt}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity style={[lx.ctaBtn, { backgroundColor: WEB_CLR }]}>
            <Text style={lx.ctaTxt}>Lekcija 4: AI Automatizācija →</Text>
            <Ionicons name="arrow-forward" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

    </ScrollView>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// EXPORT
// ═══════════════════════════════════════════════════════════════════════════════
export default function ProgramsPanel() {
  const [view, setView] = useState<'list' | 'lesson1' | 'lesson2' | 'lesson3'>('list');
  if (view === 'lesson1') return <LessonOne onBack={() => setView('list')} />;
  if (view === 'lesson2') return <LessonTwo onBack={() => setView('list')} />;
  if (view === 'lesson3') return <LessonThree onBack={() => setView('list')} />;
  return <ProgramsList onOpenLesson1={() => setView('lesson1')} onOpenLesson2={() => setView('lesson2')} onOpenLesson3={() => setView('lesson3')} />;
}

// ─── Lesson page styles ───────────────────────────────────────────────────────
const lx = StyleSheet.create({
  back:        { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 24 },
  backTxt:     { color: C.muted, fontSize: 13 },
  hero:        { borderRadius: 16, overflow: 'hidden', height: 340, marginBottom: 32, position: 'relative' },
  heroImg:     { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' },
  heroGrad:    { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(8,13,18,0.72)' },
  heroContent: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 28 },
  heroBadge:   { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: C.accentDim, alignSelf: 'flex-start', borderRadius: 6, paddingHorizontal: 10, paddingVertical: 5, marginBottom: 14, borderWidth: 1, borderColor: C.accentBorder },
  heroBadgeTxt:{ color: C.accent, fontSize: 10, fontWeight: '800', letterSpacing: 1.2 },
  heroTitle:   { color: C.text, fontSize: 34, fontWeight: '800', lineHeight: 42, marginBottom: 14 },
  heroMeta:    { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  metaChip:    { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 6, paddingHorizontal: 10, paddingVertical: 5 },
  metaTxt:     { color: C.muted, fontSize: 12 },
  intro:       { backgroundColor: C.card, borderRadius: 12, padding: 20, marginBottom: 36, borderLeftWidth: 3, borderLeftColor: C.accent },
  introText:   { color: C.text, fontSize: 16, lineHeight: 26 },
  outro:       { borderRadius: 16, overflow: 'hidden', position: 'relative', minHeight: 360 },
  outroImg:    { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' },
  outroOverlay:{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(8,13,18,0.88)' },
  outroContent:{ position: 'relative', padding: 36, alignItems: 'flex-start' },
  outroTitle:  { color: C.text, fontSize: 26, fontWeight: '800', marginBottom: 12 },
  outroBody:   { color: C.muted, fontSize: 15, lineHeight: 24, maxWidth: 560, marginBottom: 20 },
  outroMeta:   { flexDirection: 'row', gap: 10, marginBottom: 24, flexWrap: 'wrap' },
  outroBadge:  { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: C.accentDim, borderRadius: 6, paddingHorizontal: 10, paddingVertical: 5 },
  outroBadgeTxt:{ color: C.accent, fontSize: 12, fontWeight: '600' },
  ctaBtn:      { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: C.accent, borderRadius: 10, paddingHorizontal: 22, paddingVertical: 13 },
  ctaTxt:      { color: '#fff', fontWeight: '700', fontSize: 15 },
});

// ─── Programs list styles ─────────────────────────────────────────────────────
const pl = StyleSheet.create({
  card:         { backgroundColor: C.card, borderRadius: 14, borderWidth: 1, borderColor: C.border, padding: 24, marginBottom: 14 },
  cardTop:      { flexDirection: 'row', justifyContent: 'space-between', gap: 16, marginBottom: 20, flexWrap: 'wrap' },
  cardLeft:     { flex: 1, minWidth: 200 },
  cardRight:    { alignItems: 'flex-end', minWidth: 100 },
  progLabel:    { color: C.accent, fontSize: 10, fontWeight: '800', letterSpacing: 1.5, marginBottom: 6 },
  progTitle:    { color: C.text, fontSize: 20, fontWeight: '700', marginBottom: 6 },
  progDesc:     { color: C.muted, fontSize: 13, lineHeight: 20, marginBottom: 12 },
  progTags:     { flexDirection: 'row', gap: 6, flexWrap: 'wrap' },
  tag:          { backgroundColor: C.surface, borderRadius: 5, paddingHorizontal: 8, paddingVertical: 4, borderWidth: 1, borderColor: C.border },
  tagTxt:       { color: C.muted, fontSize: 11 },
  pct:          { color: C.accent, fontSize: 30, fontWeight: '800' },
  pctSub:       { color: C.muted, fontSize: 11, marginBottom: 8 },
  progBar:      { width: 100, height: 5, backgroundColor: C.surface, borderRadius: 3, overflow: 'hidden' },
  progFill:     { height: 5, backgroundColor: C.accent, borderRadius: 3 },
  moduleSection:{ gap: 4 },
  moduleLabel:  { color: C.muted, fontSize: 11, fontWeight: '700', letterSpacing: 1, marginBottom: 8, marginTop: 4 },
  lessonRow:    { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: C.surface, borderRadius: 10, padding: 14, borderWidth: 1, borderColor: C.border, marginBottom: 4, cursor: 'pointer' as any },
  lessonLocked: { opacity: 0.45 },
  lessonIcon:   { width: 30, alignItems: 'center' },
  lessonInfo:   { flex: 1 },
  lessonTitle:  { color: C.text, fontSize: 14, fontWeight: '600', marginBottom: 4 },
  lessonMeta:   { flexDirection: 'row', alignItems: 'center', gap: 5 },
  lessonMetaTxt:{ color: C.muted, fontSize: 12 },
  dot:          { color: C.faint, fontSize: 12 },
  lockedCard:   { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  lockedLeft:   { flexDirection: 'row', alignItems: 'center', gap: 14, flex: 1 },
  lockedIconWrap:{ width: 40, height: 40, borderRadius: 10, backgroundColor: C.surface, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: C.border },
  lockedNum:    { color: C.faint, fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 3 },
  lockedTitle:  { color: C.muted, fontSize: 15, fontWeight: '600', marginBottom: 3 },
  lockedDesc:   { color: C.faint, fontSize: 12 },
});
