import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AdminPanel() {
  return (
    <View>
      <Text style={styles.title}>Admin</Text>
      <Text style={styles.placeholder}>Admin saturs drīzumā...</Text>
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
