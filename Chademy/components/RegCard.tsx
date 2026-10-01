import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Toast from './Toast';

export default function RegCard({ onOpenApp }: { onOpenApp?: () => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [goal, setGoal] = useState('');
  const [promo, setPromo] = useState('');
  const [promoResult, setPromoResult] = useState('');
  const [showPromoResult, setShowPromoResult] = useState(false);
  const [showPromoPrice, setShowPromoPrice] = useState(false);
  const [finalPrice, setFinalPrice] = useState('€79');
  const [discountLine, setDiscountLine] = useState('−10%');
  const [origPrice, setOrigPrice] = useState('€79');
  const [toast, setToast] = useState(false);

  function applyPromo() {
    if (promo.trim().toLowerCase() === 'kalvis10') {
      setPromoResult('Kods pieņemts! Atlaide 10%.');
      setShowPromoResult(true);
      setShowPromoPrice(true);
      setOrigPrice('€79');
      setDiscountLine('−10%');
      setFinalPrice('€71');
    } else if (promo.trim()) {
      setPromoResult('Kods nav derīgs.');
      setShowPromoResult(true);
      setShowPromoPrice(false);
    } else {
      setShowPromoResult(false);
      setShowPromoPrice(false);
    }
  }

  function handleReg() {
    setToast(true);
    setTimeout(() => setToast(false), 2500);
  }

  return (
    <View style={styles.card}>
      <Toast visible={toast} message="Reģistrācija veiksmīga!" />
      <Text style={styles.title}>Sāc jau šodien</Text>
      <Text style={styles.sub}>Pievienojies Chademy platformai</Text>
      <View style={styles.priceRow}>
        <View>
          <Text style={styles.priceOld}>€147</Text>
          <Text style={styles.priceNew}>{finalPrice}</Text>
        </View>
        <Text style={styles.priceSave}>IETAUPA €68</Text>
      </View>
      <Text style={styles.label}>Vārds</Text>
      <TextInput style={styles.input} placeholder="Tavs vārds" placeholderTextColor="#4a6070" value={name} onChangeText={setName} />
      <Text style={styles.label}>E-pasts</Text>
      <TextInput style={styles.input} placeholder="tavs@epasts.lv" placeholderTextColor="#4a6070" keyboardType="email-address" value={email} onChangeText={setEmail} />
      <Text style={styles.label}>Mērķis</Text>
      <TextInput style={styles.input} placeholder="Izvēlies savu mērķi" placeholderTextColor="#4a6070" value={goal} onChangeText={setGoal} />
      {/* Promo code */}
      <Text style={styles.label}>Ir promo kods?</Text>
      <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center', marginBottom: 8 }}>
        <TextInput
          style={[styles.input, { flex: 1, marginBottom: 0 }]}
          placeholder="Ievadi influencera kodu"
          placeholderTextColor="#4a6070"
          value={promo}
          onChangeText={setPromo}
        />
        <TouchableOpacity onPress={applyPromo} style={{ paddingHorizontal: 16, backgroundColor: '#1a2838', borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)', borderRadius: 8 }}>
          <Text style={{ color: '#9fb1c7', fontSize: 13 }}>Pielietot</Text>
        </TouchableOpacity>
      </View>
      {showPromoResult && (
        <View style={{ marginTop: 8, padding: 9, backgroundColor: '#141f2d', borderRadius: 7 }}>
          <Text style={{ color: promoResult.includes('nav derīgs') ? '#ff4d6d' : '#22c7a5', fontFamily: 'JetBrains Mono', fontSize: 12 }}>{promoResult}</Text>
        </View>
      )}
      {showPromoPrice && (
        <View style={{ marginTop: 10, padding: 12, backgroundColor: '#141f2d', borderRadius: 8, borderWidth: 1, borderColor: 'rgba(24,194,156,0.25)' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontSize: 12, color: '#9fb1c7' }}>Sākotnējā cena:</Text>
            <Text style={{ fontFamily: 'JetBrains Mono', fontSize: 13, color: '#4a6070', textDecorationLine: 'line-through' }}>{origPrice}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
            <Text style={{ fontSize: 12, color: '#22c7a5' }}>Atlaide:</Text>
            <Text style={{ fontFamily: 'JetBrains Mono', fontSize: 13, color: '#22c7a5' }}>{discountLine}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 6, paddingTop: 6, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.06)' }}>
            <Text style={{ fontSize: 13, fontWeight: '600', color: '#eef6ff' }}>Gala cena:</Text>
            <Text style={{ fontFamily: 'Clash Display', fontSize: 22, fontWeight: '700', color: '#73e7d0' }}>{finalPrice}</Text>
          </View>
          <Text style={{ fontSize: 10, color: '#4a6070', marginTop: 4 }}>Kods no mūsu partnera</Text>
        </View>
      )}
      <TouchableOpacity style={styles.btnReg} onPress={() => { handleReg(); onOpenApp && onOpenApp(); }}>
        <Text style={styles.btnRegText}>Reģistrēties un sākt →</Text>
      </TouchableOpacity>
      <Text style={styles.secure}>Droša reģistrācija · 7 dienu garantija</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#111926',
    borderColor: 'rgba(24,194,156,0.2)',
    borderWidth: 1,
    borderRadius: 18,
    padding: 28,
    margin: 24,
    marginTop: 0,
    boxShadow: '0px 4px 12px rgba(0,0,0,0.08)',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#eef6ff',
    marginBottom: 4,
  },
  sub: {
    fontSize: 13,
    color: '#9fb1c7',
    marginBottom: 16,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#141f2d',
    borderRadius: 9,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    padding: 12,
    marginBottom: 16,
  },
  priceOld: {
    fontSize: 14,
    color: '#4a6070',
    textDecorationLine: 'line-through',
    fontFamily: 'JetBrains Mono',
  },
  priceNew: {
    fontSize: 32,
    color: '#73e7d0',
    fontWeight: '700',
    fontFamily: 'Clash Display',
    lineHeight: 36,
  },
  priceSave: {
    marginLeft: 'auto',
    fontSize: 11,
    color: '#22c7a5',
    backgroundColor: 'rgba(24,194,156,0.1)',
    borderColor: 'rgba(24,194,156,0.2)',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 100,
    fontFamily: 'JetBrains Mono',
  },
  label: {
    fontSize: 10,
    color: '#4a6070',
    fontFamily: 'JetBrains Mono',
    letterSpacing: 1,
    marginBottom: 3,
    marginTop: 8,
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: '#141f2d',
    borderColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: '#eef6ff',
    fontSize: 14,
    marginBottom: 8,
  },
  btnReg: {
    backgroundColor: '#22c7a5',
    borderRadius: 9,
    paddingVertical: 14,
    marginTop: 10,
    alignItems: 'center',
  },
  btnRegText: {
    color: '#0b1016',
    fontWeight: '700',
    fontSize: 15,
  },
  secure: {
    textAlign: 'center',
    marginTop: 12,
    fontSize: 11,
    color: '#4a6070',
    fontFamily: 'JetBrains Mono',
  },
});
