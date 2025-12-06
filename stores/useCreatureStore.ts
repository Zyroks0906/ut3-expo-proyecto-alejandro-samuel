// stores/useCreatureStore.ts
// Store de Zustand para gestionar las criaturas

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Creature, CreatureType, FilterType } from '../types';
import { INITIAL_CREATURES } from '../constants/initialData';

interface CreatureStore {
  creatures: Creature[];
  addCreature: (creature: Omit<Creature, 'id' | 'createdAt'>) => void;
  updateCreature: (id: string, data: Partial<Creature>) => void;
  deleteCreature: (id: string) => void;
  toggleFavorite: (id: string) => void;
  getByType: (type: CreatureType) => Creature[];
  getById: (id: string) => Creature | undefined;
  getFiltered: (type: CreatureType, filter: FilterType) => Creature[];
  getRandomCreature: () => Creature | undefined;
}

export const useCreatureStore = create<CreatureStore>()(
  persist(
    (set, get) => ({
      creatures: INITIAL_CREATURES,

      addCreature: (creature) => {
        const newCreature: Creature = {
          ...creature,
          id: Date.now().toString(),
          createdAt: Date.now(),
        };
        set((state) => ({
          creatures: [...state.creatures, newCreature],
        }));
      },

      updateCreature: (id, data) => {
        set((state) => ({
          creatures: state.creatures.map((creature) =>
            creature.id === id ? { ...creature, ...data } : creature
          ),
        }));
      },

      deleteCreature: (id) => {
        set((state) => ({
          creatures: state.creatures.filter((creature) => creature.id !== id),
        }));
      },

      toggleFavorite: (id) => {
        set((state) => ({
          creatures: state.creatures.map((creature) =>
            creature.id === id
              ? { ...creature, isFavorite: !creature.isFavorite }
              : creature
          ),
        }));
      },

      getByType: (type) => {
        return get().creatures.filter((creature) => creature.type === type);
      },

      getById: (id) => {
        return get().creatures.find((creature) => creature.id === id);
      },

      getFiltered: (type, filter) => {
        let filtered = get().creatures.filter((c) => c.type === type);

        switch (filter) {
          case 'alphabetical':
            return filtered.sort((a, b) => a.name.localeCompare(b.name));
          case 'danger':
            return filtered.sort((a, b) => b.dangerLevel - a.dangerLevel);
          case 'recent':
            return filtered.sort((a, b) => b.createdAt - a.createdAt);
          case 'favorites':
            return filtered.filter((c) => c.isFavorite);
          default:
            return filtered;
        }
      },

      getRandomCreature: () => {
        const creatures = get().creatures;
        if (creatures.length === 0) return undefined;
        const randomIndex = Math.floor(Math.random() * creatures.length);
        return creatures[randomIndex];
      },
    }),
    {
      name: 'creature-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);