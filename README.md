# Draconic Codex

Aplicación móvil multiplataforma para documentar y catalogar dragones, híbridos y criaturas mitológicas, desarrollada con Expo + React Native + TypeScript.

## Integrantes

- **Alejandro Mejias Ramirez**
- **Samuel Moran Hernandez**

## Tecnologías Utilizadas

- **Expo** (~54.0)
- **React Native**
- **TypeScript**
- **Expo Router** (navegación basada en archivos)
- **Zustand** (gestión de estado global)
- **AsyncStorage** (persistencia de datos)
- **expo-image-picker** (cámara y galería)
- **expo-sensors** (acelerómetro para shake)

## Instalación

### Prerrequisitos

- Node.js (v18 o superior)
- npm o yarn
- Expo Go en tu dispositivo móvil (Android/iOS)

### Pasos

1. **Clonar el repositorio:**
```bash
   git clone https://github.com/Zyroks0906/ut3-expo-proyecto-alejandro-samuel.git
   
   cd ut3-expo-proyecto-alejandro-samuel
```

2. **Instalar dependencias:**
```bash
   npm install
```

3. **Iniciar el servidor de desarrollo:**
```bash
   npx expo start
```

4. **Escanear el código QR** con Expo Go desde tu móvil.

## Funcionalidades Principales

### Implementadas

- **Navegación con Expo Router:**
  - 4 pestañas: Dragones, Híbridos, Criaturas, Scriptorium
  - Pantalla de detalle/edición por ID
  - Pantalla de creación de nuevas criaturas

- **UI y Multimedia:**
  - Tarjetas visuales con imágenes
  - 3 temas de pergamino intercambiables (Ancestral, Medieval, Arcano)
  - Animaciones y feedback visual
  - Componentes estilizados con StyleSheet

- **Estado Global y Persistencia:**
  - Zustand para gestión de estado
  - CRUD completo de criaturas
  - Marcado de favoritos
  - Filtros: Alfabético, Peligrosidad, Recientes, Favoritos
  - AsyncStorage para persistir datos

- **API Externa:**
  - Integración con DnD 5e API para importar criaturas
  - Estados de carga y error

- **Permisos:**
  - Acceso a cámara (tomar fotos)
  - Acceso a galería (seleccionar imágenes)
  - Opción de añadir imágenes por URL

- **Sensores:**
  - Acelerómetro para detectar "shake" y mostrar criatura aleatoria
  - Toggle en configuración para activar/desactivar

## API Externa Utilizada

**DnD 5e API**
- **URL Base:** `https://www.dnd5eapi.co/`
- **Endpoint usado:** `/api/monsters`
- **Uso:** Importar criaturas aleatorias con datos predefinidos (nombre, descripción, habilidades)

## Permisos

La aplicación solicita los siguientes permisos en tiempo de ejecución:

- **Cámara:** Para tomar fotos de nuevas criaturas
- **Galería/Biblioteca de medios:** Para seleccionar imágenes existentes
- **Acelerómetro:** Para detectar el gesto de "shake"

Todos los permisos se solicitan solo cuando son necesarios y pueden ser denegados sin afectar al funcionamiento básico de la app.

## Capturas de Pantalla

> _(Añadir capturas cuando la app esté completada)_

## Temas Disponibles

1. **Ancestral:** Pergamino beige claro, estilo clásico
2. **Medieval:** Pergamino marrón medio, tonos cálidos
3. **Arcano:** Pergamino oscuro quemado, aspecto místico

## Reflexión: Expo/React Native vs Jetpack Compose

### Similitudes:
- Ambos usan componentes declarativos
- Ambos tienen gestión de estado reactiva
- Ambos permiten crear UIs modernas y fluidas

### Diferencias percibidas:

**Expo/React Native:**
- Multiplataforma real (Android, iOS, Web) con una sola base de código
- Ecosistema JavaScript/TypeScript muy maduro
- Hot reload extremadamente rápido
- Fácil integración con APIs web
- Depende de JavaScript, puede ser más lento en operaciones pesadas
- Algunos componentes nativos requieren módulos adicionales

**Jetpack Compose:**
- Totalmente nativo para Android, rendimiento óptimo
- Integración perfecta con el ecosistema Android
- Type-safety completo con Kotlin
- Solo para Android (aunque existe Compose Multiplatform)
- Curva de aprendizaje más pronunciada

**Conclusión personal:**
Expo es ideal para prototipar rápido y llegar a múltiples plataformas. Jetpack Compose es mejor cuando necesitas máximo rendimiento y funcionalidades Android específicas.

## Notas de Desarrollo

- La app usa Expo Router con el sistema de archivos para la navegación
- Los datos se persisten localmente con AsyncStorage
- Las imágenes pueden ser locales, remotas o tomadas con la cámara
- El sensor de shake tiene un threshold configurable internamente

---

**Proyecto desarrollado para la asignatura de Programación Multimedia y Dispositivos Móviles**