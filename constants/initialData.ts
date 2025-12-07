// constants/initialData.ts
// Datos iniciales de ejemplo para la aplicación

import { Creature } from '../types';

export const INITIAL_CREATURES: Creature[] = [
    {
        id: '1',
        name: 'Smaug el Dorado',
        type: 'dragon',
        description: 'Un dragón de fuego legendario que custodiaba la Montaña Solitaria. Conocido por su codicia insaciable y su escama dorada. Su aliento de fuego puede derretir el metal más resistente.',
        imageUrl: require('../assets/images/smaug.jpg'),
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
        imageUrl: require('../assets/images/toothless.jpg'),
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
        imageUrl: require('../assets/images/dracarys.jpg'),
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
        imageUrl: require('../assets/images/phoenix.jpg'),
        abilities: ['Renacimiento', 'Lágrimas curativas', 'Canto mágico', 'Fuego regenerativo'],
        dangerLevel: 2,
        lastSeen: 'Bosque Eterno',
        isFavorite: true,
        createdAt: Date.now() - 345600000,
    },
];