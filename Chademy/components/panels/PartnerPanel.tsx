import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const stats = [
  { label: 'Klikšķi', value: '247', sub: 'šomēnes' },
  { label: 'Reģistrācijas', value: '31', sub: 'kopā' },
  { label: 'Maksājošie', value: '12', sub: 'klienti' },
  { label: 'Kopā earned', value: '€94.80', sub: 'ikmēneša' },
];

const history = [
  { date: '14.04.2025', client: 'andris@...', amount: '€7.90', status: 'Izmaksāts' },
  { date: '11.04.2025', client: 'liga@...', amount: '€7.90', status: 'Izmaksāts' },
  { date: '08.04.2025', client: 'maris@...', amount: '€7.90', status: 'Gaida' },
  { date: '03.04.2025', client: 'ilze@...', amount: '€7.90', status: 'Izmaksāts' },
];

const commission = [
  ['1. paka — AI pamati', '€79', '€7.90'],
  ['2. paka — AI aģenti', '€499', '€49.90'],
  ['3. paka — Voice AI', '€699', '€69.90'],
  ['Full bundle', '€897', '€89.70'],
];

export default function PartnerPanel() {
  const [copied, setCopied] = useState(false);
  const code = 'KALVIS10';
  const link = 'chademy.lv/?ref=kalvis10';

  function copyCode() {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(code);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <View>
      <Text style={styles.title}>Partneru panelis</Text>
      <Text style={styles.sub}>Pelni komisiju, ieteicot Chademy saviem sekotājiem.</Text>

      {/* Promo code card */}
      <View style={styles.codeCard}>
        <View style={styles.codeTop}>
          <View style={{ flex: 1 }}>
            <Text style={styles.codeLabel}>TAVS PROMO KODS</Text>
            <Text style={styles.codeValue}>{code}</Text>
            <Text style={styles.codeSub}>Klients ievada checkout laikā → saņem 10% atlaidi → Tu saņem 10% komisiju</Text>
          </View>
          <TouchableOpacity style={[styles.copyBtn, copied && styles.copyBtnDone]} onPress={copyCode}>
            <Text style={styles.copyBtnText}>{copied ? '✓ Nokopēts' : 'Kopēt kodu'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.linkRow}>
          <Text style={styles.linkLabel}>REFERRAL LINKS</Text>
          <Text style={styles.linkValue}>{link}</Text>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsGrid}>
        {stats.map((s, i) => (
          <View style={styles.statCard} key={i}>
            <Text style={styles.statValue}>{s.value}</Text>
            <Text style={styles.statLabel}>{s.label}</Text>
            <Text style={styles.statSub}>{s.sub}</Text>
          </View>
        ))}
      </View>

      {/* Commission table */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Komisiju modelis</Text>
        <View style={styles.commRow}>
          <View style={styles.commCell}><Text style={styles.commHead}>Paka</Text></View>
          <View style={styles.commCell}><Text style={styles.commHead}>Cena</Text></View>
          <View style={styles.commCell}><Text style={styles.commHead}>Tava komisija (10%)</Text></View>
        </View>
        {commission.map(([name, price, earn], i) => (
          <View style={[styles.commRow, styles.commRowData]} key={i}>
            <View style={styles.commCell}><Text style={styles.commText}>{name}</Text></View>
            <View style={styles.commCell}><Text style={styles.commText}>{price}</Text></View>
            <View style={styles.commCell}><Text style={styles.commEarn}>{earn}</Text></View>
          </View>
        ))}
      </View>

      {/* Transaction history */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pēdējie darījumi</Text>
        {history.map((h, i) => (
          <View style={styles.txRow} key={i}>
            <Text style={styles.txDate}>{h.date}</Text>
            <Text style={styles.txClient}>{h.client}</Text>
            <Text style={styles.txAmount}>{h.amount}</Text>
            <Text style={[styles.txStatus, h.status === 'Izmaksāts' ? styles.paid : styles.pending]}>
              {h.status}
            </Text>
          </View>
        ))}
      </View>

      {/* Payout note */}
      <View style={styles.note}>
        <Text style={styles.noteText}>
          💳 Izmaksas notiek automātiski katra mēneša 1. datumā uz Tavu bankas kontu vai PayPal. Min. izmaksa: €20.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 28, fontWeight: '700', color: '#eef6ff', marginBottom: 4 },
  sub: { fontSize: 14, color: '#9fb1c7', marginBottom: 24 },

  codeCard: {
    backgroundColor: '#111926', borderWidth: 1, borderColor: 'rgba(34,199,165,0.25)',
    borderRadius: 20, padding: 24, marginBottom: 20,
  },
  codeTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, gap: 16 },
  codeLabel: { fontSize: 10, color: '#22c7a5', fontFamily: 'JetBrains Mono', letterSpacing: 2, marginBottom: 6 },
  codeValue: { fontSize: 36, fontWeight: '800', color: '#73e7d0', letterSpacing: 4 },
  codeSub: { fontSize: 12, color: '#9fb1c7', marginTop: 6 },
  copyBtn: { backgroundColor: '#22c7a5', borderRadius: 10, paddingHorizontal: 18, paddingVertical: 10, alignSelf: 'flex-start' },
  copyBtnDone: { backgroundColor: '#2ad38b' },
  copyBtnText: { color: '#0b1016', fontWeight: '700', fontSize: 13 },
  linkRow: { borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.06)', paddingTop: 14 },
  linkLabel: { fontSize: 10, color: '#4a6070', fontFamily: 'JetBrains Mono', letterSpacing: 2, marginBottom: 4 },
  linkValue: { fontSize: 14, color: '#9fb1c7', fontFamily: 'JetBrains Mono' },

  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 24 },
  statCard: {
    flex: 1, minWidth: 130, backgroundColor: '#111926', borderWidth: 1,
    borderColor: '#26384c', borderRadius: 16, padding: 20, alignItems: 'center',
  },
  statValue: { fontSize: 28, fontWeight: '700', color: '#73e7d0', marginBottom: 4 },
  statLabel: { fontSize: 13, color: '#eef6ff', fontWeight: '600', marginBottom: 2 },
  statSub: { fontSize: 11, color: '#4a6070', fontFamily: 'JetBrains Mono' },

  section: {
    backgroundColor: '#111926', borderWidth: 1, borderColor: '#26384c',
    borderRadius: 16, padding: 20, marginBottom: 16,
  },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#eef6ff', marginBottom: 14 },
  commRow: { flexDirection: 'row', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#26384c' },
  commRowData: { borderBottomColor: 'rgba(38,56,76,0.5)' },
  commCell: { flex: 1 },
  commHead: { fontSize: 10, color: '#4a6070', fontFamily: 'JetBrains Mono', textTransform: 'uppercase', letterSpacing: 1 },
  commText: { fontSize: 13, color: '#9fb1c7' },
  commEarn: { fontSize: 13, color: '#22c7a5', fontWeight: '700', fontFamily: 'JetBrains Mono' },

  txRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#26384c' },
  txDate: { width: 90, fontSize: 12, color: '#4a6070', fontFamily: 'JetBrains Mono' },
  txClient: { flex: 1, fontSize: 13, color: '#9fb1c7' },
  txAmount: { width: 60, fontSize: 13, color: '#eef6ff', fontWeight: '600', textAlign: 'right', fontFamily: 'JetBrains Mono' },
  txStatus: { width: 80, fontSize: 11, textAlign: 'right', fontFamily: 'JetBrains Mono' },
  paid: { color: '#2ad38b' },
  pending: { color: '#ffd166' },

  note: {
    backgroundColor: 'rgba(34,199,165,0.08)', borderWidth: 1,
    borderColor: 'rgba(34,199,165,0.18)', borderRadius: 14, padding: 16,
  },
  noteText: { fontSize: 13, color: '#9fb1c7', lineHeight: 20 },
});
