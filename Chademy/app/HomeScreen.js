import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import HomeHero from '../components/HomeHero';
import RegCard from '../components/RegCard';
import AppBlocks from '../components/AppBlocks';
import ProgramsSection from '../components/ProgramsSection';
import OnboardingSection from '../components/OnboardingSection';
import ResultsRoad from '../components/ResultsRoad';
import BundleSection from '../components/BundleSection';
import ReferralSection from '../components/ReferralSection';
import TrustSection from '../components/TrustSection';
import Footer from '../components/Footer';

export default function HomeScreen({ onOpenApp }) {
  return (
    <ScrollView style={styles.container}>
      {/* Navigācija */}
      <View style={styles.nav}>
        <Text style={styles.logo}>Chad<Text style={styles.logoAccent}>emy</Text></Text>
        <View style={styles.navLinks}>
          <TouchableOpacity><Text style={styles.navLink}>Programmas</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.navLink}>Aplikācija</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.navLink}>Cenas</Text></TouchableOpacity>
          <TouchableOpacity style={styles.navCta} onPress={onOpenApp}><Text style={styles.navCtaText}>Pieteikties →</Text></TouchableOpacity>
        </View>
      </View>
      {/* Hero sadaļa */}
      <HomeHero onOpenApp={onOpenApp} />
      {/* Reģistrācijas kartiņa */}
      <RegCard onOpenApp={onOpenApp} />
      {/* Aplikācijas bloki */}
      <AppBlocks onOpenApp={onOpenApp} />
      {/* Programmu pārskats */}
      <ProgramsSection />
      {/* Personalizētais ceļš */}
      <OnboardingSection />
      {/* Rezultātu ceļš */}
      <ResultsRoad />
      {/* Pilnais komplekts */}
      <BundleSection />
      {/* Referral programma */}
      <ReferralSection />
      {/* Uzticības sadaļa */}
      <TrustSection />
      {/* Kājene */}
      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b1016' },
  nav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, backgroundColor: 'rgba(8,11,16,0.88)' },
  logo: { fontSize: 22, fontWeight: '700', color: '#eef6ff', letterSpacing: -0.5 },
  logoAccent: { color: '#22c7a5' },
  navLinks: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  navLink: { fontSize: 13, color: '#9fb1c7', marginHorizontal: 8 },
  navCta: { backgroundColor: '#22c7a5', borderRadius: 7, paddingVertical: 8, paddingHorizontal: 20, marginLeft: 8 },
  navCtaText: { color: '#0b1016', fontWeight: '700' },
});
