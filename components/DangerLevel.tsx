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
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Peligrosidad:</Text>
            <View style={styles.flamesContainer}>
                {[1, 2, 3, 4, 5].map((num) => (
                    <Text key={num} style={styles.flame}>
                        {num <= level ? '🔥' : ''}
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