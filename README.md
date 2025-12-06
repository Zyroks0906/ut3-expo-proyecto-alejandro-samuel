# 🐉 Draconic Codex

Aplicación móvil multiplataforma para documentar y catalogar dragones, híbridos dragón-humano y otras criaturas míticas del mundo, desarrollada con Expo + React Native + TypeScript.

## 👥 Integrantes

- **Alejandro Mejias Ramirez**
- **Samuel Moran Hernandez**

## 🛠️ Tecnologías Utilizadas

- **Expo** (~54.0)
- **React Native** (0.81.5)
- **TypeScript** (5.3.3)
- **Expo Router** (navegación basada en archivos)
- **Zustand** (5.0.2) - Gestión de estado global
- **AsyncStorage** (2.1.0) - Persistencia de datos
- **expo-image-picker** (17.0.9) - Acceso a cámara y galería
- **expo-sensors** (15.0.8) - Acelerómetro para detección de shake

## 📦 Instalación

### Prerrequisitos

- Node.js (v18 o superior)
- npm o yarn
- Expo Go en tu dispositivo móvil (Android/iOS)

### Pasos

1. **Clonar el repositorio:**
```bash
   git clone https://github.com/TU-USUARIO/ut3-expo-proyecto-alejandro-samuel.git
   cd ut3-expo-proyecto-alejandro-samuel
```

2. **Instalar dependencias:**
```bash
   npm install --legacy-peer-deps
```

3. **Iniciar el servidor de desarrollo:**
```bash
   npx expo start
```
   
   O con tunnel para acceso remoto:
```bash
   npx expo start --tunnel
```

4. **Escanear el código QR** con Expo Go desde tu móvil.

## 🎯 Funcionalidades Principales

### ✅ Implementadas

#### **1. Navegación (Expo Router)**
- Pantalla inicial con redirección automática
- 4 pestañas principales:
  - 🐉 **Dragones:** Catálogo de dragones puros
  - 🧬 **Híbridos:** Seres mitad dragón, mitad humano
  - 🦅 **Criaturas:** Otras bestias míticas (fénix, grifos, etc.)
  - ⚙️ **Scriptorium:** Configuración y ajustes
- Pantalla de detalle/edición por ID con parámetros dinámicos
- Pantalla de creación de nuevas criaturas
- Navegación fluida con botón de volver funcional

#### **2. UI y Multimedia**
- Componentes nativos: View, Text, Image, TextInput, Pressable, FlatList, ScrollView, SafeAreaView
- Sistema de tarjetas visuales con imágenes prominentes
- **3 temas de pergamino intercambiables:**
  - 📜 **Ancestral:** Beige claro, estilo clásico
  - 📜 **Medieval:** Marrón medio, tonos cálidos
  - 📜 **Arcano:** Oscuro quemado, aspecto místico
- Fondos con ImageBackground usando texturas reales de pergamino
- Animaciones y transiciones suaves en tarjetas y botones
- Feedback visual en todas las interacciones
- Componentes estilizados con StyleSheet.create()
- Iconos emoji para una estética única

#### **3. Estado Global y Persistencia**
- **Zustand** como solución de estado global
- **CRUD completo de criaturas:**
  - ✅ Crear nuevas criaturas
  - ✅ Editar criaturas existentes
  - ✅ Eliminar con confirmación
  - ✅ Marcar/desmarcar favoritos
- **Sistema de filtros:**
  - Alfabético (A-Z)
  - Por nivel de peligrosidad
  - Por fecha de creación (recientes primero)
  - Solo favoritos
- **Configuración persistente:**
  - Tema de pergamino seleccionado
  - Orden de visualización por defecto
  - Toggle de shake habilitado/deshabilitado
- **AsyncStorage** con middleware persist de Zustand
- Datos guardados automáticamente al cerrar la app

#### **4. API Externa**
- **DnD 5e API** (https://www.dnd5eapi.co/)
- **Endpoint usado:** `/api/monsters`
- **Funcionalidad:** Botón "Importar desde Archivos Arcanos"
  - Obtiene lista completa de monstruos
  - Filtra criaturas relacionadas con dragones
  - Selecciona una aleatoria
  - Obtiene detalles completos (habilidades, challenge rating, tipo)
  - Convierte challenge rating a escala de peligrosidad 1-5
  - Rellena automáticamente el formulario de nueva criatura
- **Estados de carga:** Indicador visual mientras se obtienen datos
- **Manejo de errores:** Alertas comprensibles si falla la conexión

#### **5. Permisos en Tiempo de Ejecución**
- **Cámara:** Para tomar fotos de criaturas
- **Galería:** Para seleccionar imágenes existentes del dispositivo
- **Acelerómetro:** Para detectar el gesto de shake
- Todos los permisos se solicitan solo cuando son necesarios
- Mensajes claros explicando por qué se necesita cada permiso
- Modal con 3 opciones para añadir imágenes:
  - 📷 Tomar foto con la cámara
  - 🖼️ Seleccionar de galería
  - 🌐 Pegar URL de internet

#### **6. Sensores (Acelerómetro)**
- **Funcionalidad:** Detectar "shake" para mostrar criatura aleatoria
- **Implementación:** Hook personalizado `useShakeDetector`
- **Configuración:**
  - Umbral de sensibilidad ajustable
  - Intervalo mínimo entre shakes (evita disparos múltiples)
  - Frecuencia de actualización de 100ms
- **Toggle en ajustes:** El usuario puede activar/desactivar la función
- **Integrado en todas las tabs de contenido** (Dragones, Híbridos, Criaturas)
- **Experiencia de usuario:** Al agitar, muestra alerta con:
  - Nombre de la criatura
  - Descripción corta
  - Botón para ver detalles completos

## 🌐 API Externa Utilizada

### **DnD 5e API**
- **URL Base:** `https://www.dnd5eapi.co/`
- **Endpoints usados:**
  - `GET /api/monsters` - Lista de todos los monstruos
  - `GET /api/monsters/{index}` - Detalles de un monstruo específico
- **Uso en la app:**
  - Importar criaturas automáticamente con un botón
  - Filtrado inteligente de monstruos relacionados con dragones
  - Conversión de datos de D&D a formato de la app
- **Ventajas:**
  - API pública, no requiere autenticación
  - Datos ricos y detallados sobre criaturas fantásticas
  - Perfecto para poblar la app con contenido interesante

## 🔐 Permisos

La aplicación solicita los siguientes permisos en tiempo de ejecución:

### **Android:**
- `CAMERA` - Tomar fotos de criaturas
- `READ_EXTERNAL_STORAGE` - Acceder a la galería
- `WRITE_EXTERNAL_STORAGE` - (Android <10) Guardar imágenes
- `READ_MEDIA_IMAGES` - (Android 13+) Acceso moderno a galería

### **iOS:**
- **NSCameraUsageDescription:** "La app necesita acceso a la cámara para tomar fotos de criaturas."
- **NSPhotoLibraryUsageDescription:** "La app necesita acceso a tus fotos para añadir imágenes de criaturas."

### **Justificación:**
Todos los permisos son opcionales y solo se solicitan al intentar usar la funcionalidad correspondiente. La app funciona perfectamente sin conceder estos permisos, permitiendo:
- Usar URLs de internet para imágenes (sin permisos de cámara/galería)
- Desactivar el shake en ajustes (sin usar acelerómetro)

## 📱 Capturas de Pantalla

> _(Añadir capturas cuando la app esté completada)_
> - Pantalla de Dragones con tarjetas
> - Detalle de una criatura
> - Formulario de nueva criatura
> - Pantalla de configuración (Scriptorium)
> - Modal de selección de imagen
> - Los 3 temas de pergamino

## 🎨 Temas Disponibles

### 1. **Ancestral** 📜
- Fondo: Pergamino beige claro
- Estilo: Clásico y legible
- Ideal para: Uso diurno

### 2. **Medieval** 📜
- Fondo: Pergamino marrón medio
- Estilo: Tonos cálidos tradicionales
- Ideal para: Ambiente medieval auténtico

### 3. **Arcano** 📜
- Fondo: Pergamino oscuro quemado
- Estilo: Místico y dramático
- Ideal para: Uso nocturno, máxima inmersión

## 🎮 Cómo Usar la App

### **Añadir una criatura:**
1. Toca el botón `+` flotante en cualquier tab
2. Opción A: Rellena el formulario manualmente
3. Opción B: Usa "Importar desde Archivos Arcanos" para obtener una criatura de la API
4. Añade una imagen (cámara, galería o URL)
5. Toca "Crear Criatura"

### **Editar una criatura:**
1. Toca una tarjeta para ver detalles
2. Toca el botón "Editar"
3. Modifica los campos que desees
4. Toca "Guardar Cambios"

### **Usar el shake:**
1. Ve a Scriptorium (⚙️)
2. Activa "Agitar para criatura aleatoria"
3. Agita tu dispositivo en cualquier tab de contenido
4. Aparecerá una criatura aleatoria del códice

### **Cambiar el tema:**
1. Ve a Scriptorium (⚙️)
2. En "Apariencia del Pergamino"
3. Selecciona: Ancestral, Medieval o Arcano

## 🤔 Reflexión: Expo/React Native vs Jetpack Compose

### **Similitudes:**
- Ambos usan **componentes declarativos** y composición
- Ambos tienen **gestión de estado reactiva**
- Ambos permiten crear UIs modernas y fluidas
- Estructura de proyecto basada en componentes reutilizables

### **Diferencias Clave:**

#### **Expo/React Native:**
✅ **Ventajas:**
- Multiplataforma REAL (Android, iOS, Web) con una sola base de código
- Ecosistema JavaScript/TypeScript muy maduro
- Hot reload extremadamente rápido (~2 segundos)
- Fácil integración con APIs web y servicios externos
- Gran comunidad y cantidad de librerías disponibles
- Expo facilita enormemente el desarrollo (no necesitas Xcode/Android Studio)
- Desarrollo más ágil para prototipos y MVPs

⚠️ **Desventajas:**
- Depende de JavaScript, puede ser más lento en operaciones muy pesadas
- Algunos componentes nativos requieren módulos adicionales
- Debugging más complejo en errores nativos
- Mayor tamaño de la app final

#### **Jetpack Compose:**
✅ **Ventajas:**
- Totalmente nativo para Android, rendimiento óptimo
- Integración perfecta con el ecosistema Android (Material Design 3, etc.)
- Type-safety completo con Kotlin
- Acceso directo a todas las APIs de Android sin wrappers
- Mejor para apps que requieren máximo rendimiento

⚠️ **Desventajas:**
- Solo para Android (aunque existe Compose Multiplatform, es menos maduro)
- Curva de aprendizaje más pronunciada
- Tooling menos ágil que hot reload de Expo
- Compilaciones más lentas

### **Conclusión Personal:**

**Expo/React Native es ideal cuando:**
- Necesitas llegar a múltiples plataformas rápido
- El equipo ya conoce JavaScript/TypeScript
- La app no requiere funcionalidades Android/iOS muy específicas
- Quieres iterar rápido en prototipos y features

**Jetpack Compose es mejor cuando:**
- Solo necesitas Android
- Requieres máximo rendimiento nativo
- Necesitas integración profunda con hardware/APIs de Android
- El equipo prefiere Kotlin y desarrollo nativo

Para este proyecto, **Expo fue la elección correcta** porque:
1. Permite que cualquiera pruebe la app en segundos (Expo Go)
2. Hot reload aceleró enormemente el desarrollo
3. La integración con APIs externas fue trivial
4. Zustand + AsyncStorage funcionan perfectamente
5. El resultado es multiplataforma sin esfuerzo extra

## 📊 Estadísticas del Proyecto

- **Lenguaje principal:** TypeScript (100%)
- **Total de archivos:** ~30 archivos de código
- **Componentes creados:** 5 componentes reutilizables
- **Pantallas:** 7 pantallas principales
- **Hooks personalizados:** 2 (useImagePicker, useShakeDetector)
- **Stores Zustand:** 2 (creatures, settings)
- **Líneas de código:** ~2000 líneas aproximadamente

## 🐛 Problemas Conocidos

- En iOS, el shake puede ser muy sensible en algunos dispositivos (ajustable en el código)
- Las imágenes de URLs externas dependen de conexión a internet
- AsyncStorage tiene límite de ~10MB (suficiente para cientos de criaturas)

## 📝 Notas de Desarrollo

- La app usa Expo Router con sistema de archivos para navegación
- Los datos se persisten localmente con AsyncStorage
- Las imágenes pueden ser locales (file://), remotas (https://) o tomadas con la cámara
- El sensor de shake tiene un threshold de 1.5G y cooldown de 1 segundo
- La API de D&D 5e no requiere autenticación ni API key

## 👨‍💻 Autores

**Alejandro Mejias Ramirez**
- Responsable de: Setup inicial, tipos TypeScript, stores Zustand, componentes base, pantalla de dragones, README base

**Samuel Moran Hernandez**
- Responsable de: Pantallas de híbridos/criaturas/configuración, detalle/edición, nueva criatura, integración con API, image picker, detector de shake, README final

---

**Proyecto desarrollado para la asignatura de Programación Multimedia y Dispositivos Móviles**

*Versión 1.0.0 - Diciembre 2024*

🐉 *"El conocimiento de los dragones debe preservarse para las futuras generaciones"*