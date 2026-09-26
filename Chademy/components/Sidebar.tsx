import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const items = [
  { key: 'home', icon: '🏠', label: 'Sākums' },
  { key: 'programs', icon: '📚', label: 'Mana programma' },
  { key: 'resources', icon: '🛠️', label: 'Resursi', badge: 12 },
  { key: 'community', icon: '👥', label: 'Kopiena', badge: 3 },
  { key: 'support', icon: '🎯', label: 'Atbalsts' },
  { key: 'profile', icon: '👤', label: 'Profils' },
  { key: 'notifications', icon: '🔔', label: 'Paziņojumi', badge: 2 },
  { key: 'partner', icon: '💛', label: 'Partneru panelis', badge: 'PELNI', highlight: true },
  { key: 'admin', icon: '⚙️', label: 'Admin' },
];

export default function Sidebar({ active, onSelect }: { active: string; onSelect: (key: string) => void }) {
  return (
    <View style={styles.sidebar}>
      <Text style={styles.logo}>Chad<Text style={styles.logoAccent}>emy</Text></Text>
      <View style={styles.menu}>
        {items.map(item => (
          <TouchableOpacity
            key={item.key}
            style={[
              styles.item,
              active === item.key && styles.active,
              item.highlight && styles.partner,
            ]}
            onPress={() => onSelect(item.key)}
          >
            <Text style={styles.icon}>{item.icon}</Text>
            <Text style={[styles.label, active === item.key && styles.activeLabel]}>{item.label}</Text>
            {item.badge && (
              <Text style={[styles.badge, item.badge === 'PELNI' && styles.badgePelni]}>{item.badge}</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    backgroundColor: '#111926',
    borderRightWidth: 1,
    borderRightColor: 'rgba(255,255,255,0.08)',
    paddingVertical: 32,
    paddingHorizontal: 0,
    width: 240,
    minHeight: '100vh' as any,
    alignItems: 'flex-start',
    gap: 12,
  },
  logo: {
    fontSize: 22,
    fontWeight: '700',
    color: '#eef6ff',
    marginLeft: 24,
    marginBottom: 32,
    letterSpacing: 1.5,
  },
  logoAccent: {
    color: '#22c7a5',
  },
  menu: {
    width: '100%',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginBottom: 4,
    minWidth: 180,
    marginRight: 8,
  },
  active: {
    backgroundColor: 'rgba(24,194,156,0.13)',
  },
  activeLabel: {
    color: '#22c7a5',
    fontWeight: '700',
  },
  partner: {
    backgroundColor: 'rgba(255, 221, 51, 0.08)',
    borderLeftWidth: 4,
    borderLeftColor: '#f5a623',
  },
  icon: {
    fontSize: 20,
    marginRight: 2,
  },
  label: {
    fontSize: 15,
    color: '#9fb1c7',
    fontWeight: '500',
  },
  badge: {
    backgroundColor: '#1a2330',
    color: '#22c7a5',
    fontSize: 12,
    fontWeight: '700',
    borderRadius: 8,
    paddingHorizontal: 8,
    marginLeft: 'auto' as any,
    alignSelf: 'center',
  },
  badgePelni: {
    backgroundColor: '#22c7a5',
    color: '#fff',
    fontWeight: '700',
  },
});
