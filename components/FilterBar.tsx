// components/FilterBar.tsx
// Barra de filtros para ordenar las criaturas

import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { FilterType } from '../types';

interface FilterBarProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  themeColors: {
    card: string;
    cardBorder: string;
    text: string;
    accent: string;
  };
}

const FILTERS: { id: FilterType; label: string }[] = [
  { id: 'alphabetical', label: 'A-Z' },
  { id: 'danger', label: 'Peligro' },
  { id: 'recent', label: 'Reciente' },
  { id: 'favorites', label: '⭐ Favoritos' },
];

export default function FilterBar({ currentFilter, onFilterChange, themeColors }: FilterBarProps) {
  return (
    <View style={styles.container}>
      {FILTERS.map((filter) => (
        <Pressable
          key={filter.id}
          style={[
            styles.filterButton,
            {
              backgroundColor: currentFilter === filter.id ? themeColors.accent : themeColors.card,
              borderColor: themeColors.cardBorder,
            },
          ]}
          onPress={() => onFilterChange(filter.id)}
        >
          <Text
            style={[
              styles.filterText,
              {
                color: currentFilter === filter.id ? '#FFF' : themeColors.text,
                fontWeight: currentFilter === filter.id ? '700' : '500',
              },
            ]}
          >
            {filter.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  filterText: {
    fontSize: 13,
  },
});