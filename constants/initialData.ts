// constants/initialData.ts
// Datos iniciales de ejemplo para la aplicación

import { Creature } from '../types';

export const INITIAL_CREATURES: Creature[] = [
    {
        id: '1',
        name: 'Smaug el Dorado',
        type: 'dragon',
        description: 'Un dragón de fuego legendario que custodiaba la Montaña Solitaria. Conocido por su codicia insaciable y su escama dorada. Su aliento de fuego puede derretir el metal más resistente.',
        imageUrl: 'https://i.pinimg.com/1200x/d3/51/89/d35189adc8882804c50d6b3063cea286.jpg',
        abilities: ['Aliento de fuego', 'Vuelo', 'Escamas impenetrables', 'Hipnosis con la mirada'],
        dangerLevel: 5,
        lastSeen: 'Montaña Solitaria, Erebor',
        isFavorite: false,
        createdAt: Date.now() - 86400000,
    },
    {
        id: '2',
        name: 'Desdentao',
        type: 'dragon',
        description: 'Furia Nocturna, una de las especies de dragón más raras y veloces. A pesar de su apariencia temible, es leal y forma vínculos profundos con aquellos en quienes confía.',
        imageUrl: 'https://ca-times.brightspotcdn.com/dims4/default/16c944d/2147483647/strip/true/crop/1782x1188+1025+0/resize/2000x1333!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F7a%2Fa8%2Fc682731b4f11a07a3ff3a7632c37%2F2569-st-2400-comp-ldn-v0240-1007grad-copy.jpg',
        abilities: ['Plasma explosivo', 'Vuelo supersónico', 'Camuflaje nocturno', 'Ecolocalización'],
        dangerLevel: 4,
        lastSeen: 'Isla de Berk',
        isFavorite: true,
        createdAt: Date.now() - 172800000,
    },
    {
        id: '3',
        name: 'Dracarys',
        type: 'hybrid',
        description: 'Híbrido dragón-humano nacido de antigua magia de sangre. Conserva la capacidad de exhalar fuego en forma humana y puede manifestar alas parcialmente. Su naturaleza dual le otorga una perspectiva única de ambos mundos.',
        imageUrl: 'https://i.pinimg.com/736x/04/25/8f/04258f57100718ae085b3c8cae46854c.jpg',
        abilities: ['Aliento de fuego', 'Transformación parcial', 'Resistencia al calor', 'Comunicación con dragones'],
        dangerLevel: 3,
        lastSeen: 'Tierras del Este',
        isFavorite: false,
        createdAt: Date.now() - 259200000,
    },
    {
        id: '4',
        name: 'Fénix Carmesí',
        type: 'other',
        description: 'Ave mítica inmortal que renace de sus propias cenizas cada 500 años. Sus lágrimas tienen propiedades curativas y su canto puede fortalecer a los puros de corazón. Sus plumas arden con un fuego eterno que no consume.',
        imageUrl: 'https://i.pinimg.com/736x/a9/0b/39/a90b3966f21a98e7d6f6eef5d9287310.jpg',
        abilities: ['Renacimiento', 'Lágrimas curativas', 'Canto mágico', 'Fuego regenerativo'],
        dangerLevel: 2,
        lastSeen: 'Bosque Eterno',
        isFavorite: true,
        createdAt: Date.now() - 345600000,
    },
];