// Tipos y interfaces principales de la aplicación

export type CreatureType = 'dragon' | 'hybrid' | 'other';

export type DangerLevel = 1 | 2 | 3 | 4 | 5;

export type FilterType = 'alphabetical' | 'danger' | 'recent' | 'favorites';

export type ThemeType = 'ancestral' | 'medieval' | 'arcano';

export interface Creature {
  id: string;
  name: string;
  type: CreatureType;
  description: string;
  imageUrl: string;
  abilities: string[];
  dangerLevel: DangerLevel;
  lastSeen: string;
  isFavorite: boolean;
  createdAt: number;
}

export interface AppSettings {
  theme: ThemeType;
  defaultOrder: FilterType;
  shakeEnabled: boolean;
}