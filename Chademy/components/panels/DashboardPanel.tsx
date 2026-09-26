import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DashboardPanel() {
  return (
    <View style={styles.container}>
      <View style={styles.greeting}>
        <Text style={styles.chademy}>CHAD<Text style={styles.chademyAccent}>EMY</Text></Text>
        <Text style={styles.name}>No nulles līdz savam <Text style={styles.nameAccent}>AI biznesam</Text></Text>
        <Text style={styles.sub}>Nevis tikai kurss — pilnvērtīga AI mācību aplikācija un biznesa platforma. Iemācies veidot AI risinājumus, saprast tirgu un sākt pārdot pakalpojumus Latvijā. Bez programmēšanas.</Text>
      </View>
      <View style={styles.grid}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Kopējais progress</Text>
          <Text style={styles.cardValue}>12%</Text>
          <View style={styles.progressBar}><View style={[styles.progressFill, {width: '12%' as any}]} /></View>
          <Text style={styles.cardSub}>3 / 27 nodaļas pabeigtas</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Streak 🔥</Text>
          <Text style={styles.cardValue}>3 dienas</Text>
          <Text style={styles.cardSub}>Turpini — nevienam nestāvi ceļā!</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Kopienas punkti</Text>
          <Text style={[styles.cardValue, {color: '#f5a623'}]}>120 pts</Text>
          <Text style={styles.cardSub}>Tu esi 8. vietā kopienā</Text>
        </View>
      </View>
      <View style={styles.statsRow}>
        <View style={styles.statBox}><Text style={styles.statNum}>3</Text><Text style={styles.statLabel}>programmas</Text></View>
        <View style={styles.statBox}><Text style={styles.statNum}>80k+</Text><Text style={styles.statLabel}>MVU Latvijā</Text></View>
        <View style={styles.statBox}><Text style={styles.statNum}>TOP 4</Text><Text style={styles.statLabel}>AI lietošana ES</Text></View>
        <View style={styles.statBox}><Text style={styles.statNum}>€0</Text><Text style={styles.statLabel}>Koda zināšanas</Text></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b1016',
    borderRadius: 18,
    padding: 32,
    minHeight: '100vh' as any,
  },
  chademy: {
    fontSize: 18,
    fontWeight: '700',
    color: '#eef6ff',
    marginBottom: 12,
    letterSpacing: 1.5,
  },
  chademyAccent: {
    color: '#22c7a5',
  },
  greeting: {
    marginBottom: 32,
  },
  name: {
    fontSize: 38,
    fontWeight: '700',
    color: '#eef6ff',
    marginBottom: 8,
  },
  nameAccent: {
    color: '#22c7a5',
    fontWeight: '700',
  },
  sub: {
    fontSize: 16,
    color: '#9fb1c7',
    marginTop: 4,
    marginBottom: 12,
    maxWidth: 600,
  },
  grid: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 32,
    flexWrap: 'wrap',
  },
  card: {
    backgroundColor: '#111926',
    borderColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderRadius: 16,
    padding: 28,
    minWidth: 220,
    flex: 1,
    marginRight: 12,
    marginBottom: 12,
    boxShadow: '0px 4px 12px rgba(0,0,0,0.12)',
  },
  cardTitle: {
    color: '#9fb1c7',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#22c7a5',
    marginBottom: 8,
  },
  cardSub: {
    color: '#9fb1c7',
    fontSize: 13,
    marginTop: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#1a2330',
    borderRadius: 4,
    marginTop: 8,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: 8,
    backgroundColor: '#22c7a5',
    borderRadius: 4,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 32,
    marginTop: 32,
    marginBottom: 8,
    justifyContent: 'flex-start',
  },
  statBox: {
    alignItems: 'center',
    marginRight: 32,
  },
  statNum: {
    color: '#22c7a5',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 2,
  },
  statLabel: {
    color: '#9fb1c7',
    fontSize: 13,
    fontWeight: '500',
  },
});
