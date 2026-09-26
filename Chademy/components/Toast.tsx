import React, { useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

export default function Toast({ visible, message }) {
  if (!visible) return null;
  return (
    <Animated.View style={styles.toast}>
      <Text style={styles.icon}>✓</Text>
      <Text style={styles.text}>{message || 'Reģistrācija veiksmīga!'}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toast: {
    position: 'fixed',
    bottom: 24,
    right: 24,
    backgroundColor: '#111926',
    borderColor: 'rgba(24,194,156,0.25)',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    zIndex: 999,
    boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
  },
  icon: {
    color: '#22c7a5',
    fontSize: 16,
    marginRight: 6,
  },
  text: {
    color: '#9fb1c7',
    fontSize: 13,
  },
});
