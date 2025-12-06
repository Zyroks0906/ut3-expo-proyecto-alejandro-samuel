// components/DangerLevel.tsx
// Componente para mostrar el nivel de peligrosidad

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DangerLevel as DangerLevelType } from '../types';

interface DangerLevelProps {
  level: DangerLevelType;
  color?: string;
}

export default function DangerLevel({ level, color = '#FF6B35' }: DangerLevelProps) {
  const flames = Array.from({ length: 5 }, (_, i) => i < level);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Peligrosidad:</Text>
      <View style={styles.flamesContainer}>
        {flames.map((active, index) => (
          <Text
            key={index}
            style={[
              styles.flame,
              { color: active ? color : '#CCC' },
            ]}
          >
            🔥
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
  flamesContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  flame: {
    fontSize: 16,
  },
});