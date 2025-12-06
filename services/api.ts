// services/api.ts
// Servicio para conectar con la API externa (DnD 5e API)

import { DangerLevel } from '../types';

const API_BASE_URL = 'https://www.dnd5eapi.co/api';

interface Monster {
  index: string;
  name: string;
  size: string;
  type: string;
  alignment: string;
  challenge_rating: number;
  desc?: string;
  special_abilities?: Array<{
    name: string;
    desc: string;
  }>;
}

interface MonsterData {
  name: string;
  description: string;
  abilities: string[];
  dangerLevel: DangerLevel;
  imageUrl: string;
}

// Lista de monstruos dragón/bestias para filtrar
const DRAGON_RELATED = [
  'dragon',
  'drake',
  'wyvern',
  'basilisk',
  'chimera',
  'griffin',
  'hydra',
  'phoenix',
  'sphinx',
];

export async function fetchRandomMonster(): Promise<MonsterData> {
  try {
    // 1. Obtener lista de todos los monstruos
    const listResponse = await fetch(`${API_BASE_URL}/monsters`);
    if (!listResponse.ok) {
      throw new Error('Error al obtener la lista de monstruos');
    }
    
    const listData = await listResponse.json();
    const monsters: { index: string; name: string }[] = listData.results;

    // 2. Filtrar monstruos relacionados con dragones/bestias
    const dragonMonsters = monsters.filter((monster) =>
      DRAGON_RELATED.some((keyword) =>
        monster.name.toLowerCase().includes(keyword)
      )
    );

    // 3. Si no hay dragones, usar monstruos aleatorios
    const selectedMonsters = dragonMonsters.length > 0 ? dragonMonsters : monsters;

    // 4. Elegir un monstruo aleatorio
    const randomIndex = Math.floor(Math.random() * selectedMonsters.length);
    const selectedMonster = selectedMonsters[randomIndex];

    // 5. Obtener detalles completos del monstruo
    const detailResponse = await fetch(`${API_BASE_URL}/monsters/${selectedMonster.index}`);
    if (!detailResponse.ok) {
      throw new Error('Error al obtener detalles del monstruo');
    }

    const monster: Monster = await detailResponse.json();

    // 6. Transformar datos al formato de nuestra app
    const abilities: string[] = [];
    
    if (monster.special_abilities && monster.special_abilities.length > 0) {
      monster.special_abilities.slice(0, 4).forEach((ability) => {
        abilities.push(ability.name);
      });
    } else {
      // Habilidades por defecto basadas en el tipo
      abilities.push('Ataque físico', 'Resistencia natural', 'Sentidos agudizados');
    }

    // Convertir challenge rating a danger level (1-5)
    const dangerLevel = calculateDangerLevel(monster.challenge_rating);

    // Descripción
    const description = monster.desc
      ? monster.desc
      : `${monster.name} es un${monster.size === 'Large' || monster.size === 'Huge' ? ' enorme' : ''} ${monster.type} de alineamiento ${monster.alignment}. Esta criatura representa un desafío significativo para cualquier aventurero que se cruce en su camino.`;

    // Imagen placeholder relacionada con dragones
    const imageUrl = getRandomDragonImage();

    return {
      name: monster.name,
      description,
      abilities,
      dangerLevel,
      imageUrl,
    };
  } catch (error) {
    console.error('Error fetching monster:', error);
    throw error;
  }
}

// Convertir challenge rating a escala de peligrosidad 1-5
function calculateDangerLevel(challengeRating: number): DangerLevel {
  if (challengeRating <= 2) return 1;
  if (challengeRating <= 5) return 2;
  if (challengeRating <= 10) return 3;
  if (challengeRating <= 15) return 4;
  return 5;
}

// Pool de imágenes de dragones/criaturas míticas
function getRandomDragonImage(): string {
  const images = [
    'https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?w=800', // Montañas místicas
    'https://images.unsplash.com/photo-1618944847828-82e943c3bdb7?w=800', // Cielo dramático
    'https://images.unsplash.com/photo-1589802829985-817e51171b92?w=800', // Fuego
    'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=800', // Ave mística
    'https://images.unsplash.com/photo-1570139808329-d4f1e8bb0a83?w=800', // Cueva oscura
    'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=800', // Bosque místico
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', // Montañas épicas
  ];

  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
}