import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SupportPanel() {
  return (
    <View>
      <Text style={styles.title}>Atbalsts</Text>
      <Text style={styles.placeholder}>Atbalsta saturs drīzumā...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#eef6ff',
    fontFamily: 'Clash Display',
    marginBottom: 24,
  },
  placeholder: {
    color: '#4a6070',
    fontSize: 16,
    marginTop: 40,
    textAlign: 'center',
  },
});
