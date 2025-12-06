// stores/useSettingsStore.ts
// Store de Zustand para gestionar la configuración

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppSettings, FilterType, ThemeType } from '../types';

interface SettingsStore {
  settings: AppSettings;
  setTheme: (theme: ThemeType) => void;
  setDefaultOrder: (order: FilterType) => void;
  toggleShake: () => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      settings: {
        theme: 'ancestral',
        defaultOrder: 'alphabetical',
        shakeEnabled: true,
      },

      setTheme: (theme) => {
        set((state) => ({
          settings: { ...state.settings, theme },
        }));
      },

      setDefaultOrder: (order) => {
        set((state) => ({
          settings: { ...state.settings, defaultOrder: order },
        }));
      },

      toggleShake: () => {
        set((state) => ({
          settings: { ...state.settings, shakeEnabled: !state.settings.shakeEnabled },
        }));
      },
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);