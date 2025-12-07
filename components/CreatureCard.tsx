// components/CreatureCard.tsx
// Tarjeta visual para mostrar una criatura en la lista

import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { Creature } from '../types';
import { useCreatureStore } from '../stores/useCreatureStore';
import DangerLevel from './DangerLevel';

interface CreatureCardProps {
    creature: Creature;
    onPress: () => void;
    themeColors: {
        card: string;
        cardBorder: string;
        text: string;
        textSecondary: string;
        accent: string;
        favorite: string;
    };
}

const TYPE_LABELS = {
    dragon: 'Dragón',
    hybrid: 'Híbrido',
    other: 'Criatura Mítica',
};

export default function CreatureCard({ creature, onPress, themeColors }: CreatureCardProps) {
    const toggleFavorite = useCreatureStore((state) => state.toggleFavorite);
    const creatures = useCreatureStore((state) => state.creatures);

    // Obtener criatura actualizada del store
    const currentCreature = creatures.find(c => c.id === creature.id) || creature;

    const handleFavoritePress = (e: any) => {
        e.stopPropagation();
        toggleFavorite(creature.id);
    };

    return (
        <Pressable
            style={({ pressed }) => [
                styles.card,
                {
                    backgroundColor: themeColors.card,
                    borderColor: themeColors.cardBorder,
                    opacity: pressed ? 0.7 : 1,
                },
            ]}
            onPress={onPress}
        >
            {/* Imagen de la criatura */}
            <Image
                source={typeof currentCreature.imageUrl === 'string'
                    ? { uri: currentCreature.imageUrl }
                    : currentCreature.imageUrl
                }
                style={styles.image}
            />

            {/* Información */}
            <View style={styles.content}>
                <View style={styles.header}>
                    <View style={styles.titleContainer}>
                        <Text style={[styles.name, { color: themeColors.text }]} numberOfLines={1}>
                            {currentCreature.name}
                        </Text>
                        <Text style={[styles.type, { color: themeColors.textSecondary }]}>
                            {TYPE_LABELS[currentCreature.type]}
                        </Text>
                    </View>

                    {/* Botón de favorito */}
                    <Pressable onPress={handleFavoritePress} style={styles.favoriteButton}>
                        <Text style={styles.favoriteIcon}>
                            {currentCreature.isFavorite ? '⭐' : '☆'}
                        </Text>
                    </Pressable>
                </View>

                {/* Nivel de peligrosidad - USAR currentCreature.dangerLevel */}
                <DangerLevel level={currentCreature.dangerLevel} color={themeColors.accent} />

                {/* Descripción corta */}
                <Text
                    style={[styles.description, { color: themeColors.textSecondary }]}
                    numberOfLines={2}
                >
                    {currentCreature.description}
                </Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        marginHorizontal: 16,
        marginVertical: 8,
        borderRadius: 12,
        borderWidth: 2,
        overflow: 'hidden',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    image: {
        width: '100%',
        height: 200,
        backgroundColor: '#DDD',
    },
    content: {
        padding: 12,
        gap: 8,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    titleContainer: {
        flex: 1,
        gap: 2,
    },
    name: {
        fontSize: 18,
        fontWeight: '700',
    },
    type: {
        fontSize: 12,
        fontWeight: '500',
        textTransform: 'uppercase',
    },
    favoriteButton: {
        padding: 4,
    },
    favoriteIcon: {
        fontSize: 24,
    },
    description: {
        fontSize: 13,
        lineHeight: 18,
    },
});