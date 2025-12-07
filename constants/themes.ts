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
      text: '#49291dff',
      textSecondary: '#000000ff',
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
    card: '#1b1200ff',
    cardBorder: '#8B7355',
    text: '#c99469ff',
    textSecondary: '#f8e0bbff',
    accent: '#A0522D',
    danger: '#fd0000ff',
    favorite: '#FFC107',
  },
},
  arcano: {
    id: 'arcano',
    name: 'Arcano',
    backgroundImage: require('../assets/backgrounds/arcano.jpg'),
    colors: {
      background: '#000000ff',
      card: '#2D2318',
      cardBorder: '#4A3829',
      text: '#ffffffff',
      textSecondary: '#fae6d8ff',
      accent: '#FF6B35',
      danger: '#FF5252',
      favorite: '#FFB300',
    },
  },
};