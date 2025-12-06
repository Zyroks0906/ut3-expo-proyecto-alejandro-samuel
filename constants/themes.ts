// Configuración de los 3 temas visuales

export type ThemeType = 'ancestral' | 'medieval' | 'arcano';

export interface Theme {
  id: ThemeType;
  name: string;
  backgroundImage: any;
  colors: {
    background: string;
    card: string;
    cardBorder: string;
    text: string;
    textSecondary: string;
    accent: string;
    danger: string;
    favorite: string;
  };
}

export const THEMES: Record<ThemeType, Theme> = {
  ancestral: {
    id: 'ancestral',
    name: 'Ancestral',
    backgroundImage: require('../assets/backgrounds/ancestral.jpg'),
    colors: {
      background: '#F4E8D0',
      card: '#E8DCC4',
      cardBorder: '#A0826D',
      text: '#2C1810',
      textSecondary: '#5C4A3A',
      accent: '#8B4513',
      danger: '#D32F2F',
      favorite: '#FFD700',
    },
  },
  medieval: {
    id: 'medieval',
    name: 'Medieval',
    backgroundImage: require('../assets/backgrounds/medieval.jpg'),
    colors: {
      background: '#D4C4A8',
      card: '#C4B298',
      cardBorder: '#8B7355',
      text: '#1A1410',
      textSecondary: '#4A3829',
      accent: '#A0522D',
      danger: '#C62828',
      favorite: '#FFC107',
    },
  },
  arcano: {
    id: 'arcano',
    name: 'Arcano',
    backgroundImage: require('../assets/backgrounds/arcano.jpg'),
    colors: {
      background: '#1A1410',
      card: '#2D2318',
      cardBorder: '#4A3829',
      text: '#D4C4A8',
      textSecondary: '#A0826D',
      accent: '#FF6B35',
      danger: '#FF5252',
      favorite: '#FFB300',
    },
  },
};