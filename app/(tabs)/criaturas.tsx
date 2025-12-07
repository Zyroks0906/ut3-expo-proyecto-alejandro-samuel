// app/(tabs)/criaturas.tsx
// Pantalla de Otras Criaturas Míticas

import React, { useState } from 'react';
import { View, Text, FlatList, Pressable, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useCreatureStore } from '../../stores/useCreatureStore';
import { useSettingsStore } from '../../stores/useSettingsStore';
import { THEMES } from '../../constants/themes';
import { FilterType } from '../../types';
import PergaminoBackground from '../../components/PergaminoBackground';
import CreatureCard from '../../components/CreatureCard';
import FilterBar from '../../components/FilterBar';
import { useShakeDetector } from '../../hooks/useShakeDetector';

export default function CriaturasScreen() {
  const { settings } = useSettingsStore();
  const creatures = useCreatureStore((state) => state.creatures);
  const getFiltered = useCreatureStore((state) => state.getFiltered);
  const getRandomCreature = useCreatureStore((state) => state.getRandomCreature);
  const theme = THEMES[settings.theme];

  const [currentFilter, setCurrentFilter] = useState<FilterType>(settings.defaultOrder);

  const creaturesFiltered = getFiltered('other', currentFilter);

  // Detector de shake
  useShakeDetector(() => {
    const randomCreature = getRandomCreature();
    if (randomCreature) {
      Alert.alert(
        '🦅 Criatura Aleatoria',
        `${randomCreature.name} - ${randomCreature.description.substring(0, 100)}...`,
        [
          {
            text: 'Ver detalles',
            onPress: () => router.push(`/detalle/${randomCreature.id}`),
          },
          { text: 'Cerrar', style: 'cancel' },
        ]
      );
    }
  }, settings.shakeEnabled);

  const handleCreaturePress = (id: string) => {
    router.push(`/detalle/${id}`);
  };

  const handleNewCreature = () => {
    router.push('/nueva-criatura');
  };

  return (
    <PergaminoBackground>
      <SafeAreaView style={styles.container} edges={['bottom']}>
        {/* Barra de filtros */}
        <FilterBar
          currentFilter={currentFilter}
          onFilterChange={setCurrentFilter}
          themeColors={theme.colors}
        />

        {/* Lista de criaturas */}
        <FlatList
          data={creaturesFiltered}
          keyExtractor={(item) => item.id}
          extraData={creatures}
          renderItem={({ item }) => (
            <CreatureCard
              creature={item}
              onPress={() => handleCreaturePress(item.id)}
              themeColors={theme.colors}
            />
          )}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={[styles.emptyText, { color: theme.colors.text }]}>
                No hay criaturas míticas registradas
              </Text>
              <Text style={[styles.emptySubtext, { color: theme.colors.textSecondary }]}>
                Fénix, grifos, wyverns y otras bestias legendarias
              </Text>
            </View>
          }
        />

        {/* Botón flotante para añadir */}
        <Pressable
          style={[styles.fab, { backgroundColor: theme.colors.accent }]}
          onPress={handleNewCreature}
        >
          <Text style={styles.fabText}>+</Text>
        </Pressable>
      </SafeAreaView>
    </PergaminoBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 80,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    marginTop: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  fabText: {
    fontSize: 32,
    color: '#FFF',
    fontWeight: '300',
  },
});