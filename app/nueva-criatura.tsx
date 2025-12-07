// app/nueva-criatura.tsx
// Pantalla para crear una nueva criatura

import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, Pressable, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useCreatureStore } from '../stores/useCreatureStore';
import { useSettingsStore } from '../stores/useSettingsStore';
import { THEMES } from '../constants/themes';
import { CreatureType, DangerLevel } from '../types';
import PergaminoBackground from '../components/PergaminoBackground';
import ImagePickerModal from '../components/ImagePickerModal';
import { fetchRandomMonster } from '../services/api';

const TYPE_OPTIONS: { value: CreatureType; label: string }[] = [
  { value: 'dragon', label: 'Dragón' },
  { value: 'hybrid', label: 'Híbrido' },
  { value: 'other', label: 'Otra Criatura' },
];

export default function NuevaCreaturaScreen() {
  const { settings } = useSettingsStore();
  const addCreature = useCreatureStore((state) => state.addCreature);
  const theme = THEMES[settings.theme];

  const [name, setName] = useState('');
  const [type, setType] = useState<CreatureType>('dragon');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [abilities, setAbilities] = useState('');
  const [dangerLevel, setDangerLevel] = useState<DangerLevel>(1);
  const [lastSeen, setLastSeen] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showImagePicker, setShowImagePicker] = useState(false);

  const handleCreate = () => {
    // Validaciones
    if (!name.trim()) {
      Alert.alert('Error', 'El nombre es obligatorio');
      return;
    }

    if (!description.trim()) {
      Alert.alert('Error', 'La descripción es obligatoria');
      return;
    }

    const abilitiesArray = abilities
      .split(',')
      .map((ability) => ability.trim())
      .filter((ability) => ability.length > 0);

    if (abilitiesArray.length === 0) {
      Alert.alert('Error', 'Añade al menos una habilidad');
      return;
    }

    // Crear criatura
    addCreature({
      name: name.trim(),
      type,
      description: description.trim(),
      imageUrl: imageUrl.trim() || 'https://album.mediaset.es/eimg/2025/11/07/gremlins-16-9-aspect-ratio-default-0_da39.jpg',
      abilities: abilitiesArray,
      dangerLevel,
      lastSeen: lastSeen.trim() || 'Desconocido',
      isFavorite: false,
    });

    Alert.alert(
      '✓ Criatura creada',
      `${name} ha sido añadido al códice correctamente`,
      [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]
    );
  };

  const handleImportFromAPI = async () => {
    setIsLoading(true);
    try {
      const monsterData = await fetchRandomMonster();
      
      setName(monsterData.name);
      setDescription(monsterData.description);
      setAbilities(monsterData.abilities.join(', '));
      setDangerLevel(monsterData.dangerLevel);
      setImageUrl(monsterData.imageUrl);
      setLastSeen('Archivos Arcanos');

      Alert.alert(
        '✓ Importado',
        `Criatura "${monsterData.name}" importada desde los archivos arcanos`
      );
    } catch (error) {
      Alert.alert(
        'Error',
        'No se pudo importar desde los archivos arcanos. Verifica tu conexión.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PergaminoBackground>
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
          
          <Text style={[styles.title, { color: theme.colors.text }]}>
            📜 Nueva Entrada en el Códice
          </Text>

          {/* Botón de importar desde API */}
          <Pressable
            style={[
              styles.importButton,
              { 
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.accent,
              },
            ]}
            onPress={handleImportFromAPI}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={theme.colors.accent} />
            ) : (
              <>
                <Text style={[styles.importIcon, { color: theme.colors.accent }]}>📚</Text>
                <Text style={[styles.importText, { color: theme.colors.accent }]}>
                  Importar desde Archivos Arcanos
                </Text>
              </>
            )}
          </Pressable>

          {/* Nombre */}
          <View style={styles.field}>
            <Text style={[styles.label, { color: theme.colors.text }]}>
              Nombre: <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={[styles.input, { 
                color: theme.colors.text,
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.cardBorder,
              }]}
              value={name}
              onChangeText={setName}
              placeholder="Ej: Smaug el Dorado"
              placeholderTextColor={theme.colors.textSecondary}
            />
          </View>

          {/* Tipo */}
          <View style={styles.field}>
            <Text style={[styles.label, { color: theme.colors.text }]}>
              Tipo: <Text style={styles.required}>*</Text>
            </Text>
            <View style={styles.typeButtons}>
              {TYPE_OPTIONS.map((option) => (
                <Pressable
                  key={option.value}
                  style={[
                    styles.typeButton,
                    {
                      backgroundColor: type === option.value 
                        ? theme.colors.accent 
                        : theme.colors.card,
                      borderColor: theme.colors.cardBorder,
                    },
                  ]}
                  onPress={() => setType(option.value)}
                >
                  <Text
                    style={[
                      styles.typeButtonText,
                      { color: type === option.value ? '#FFF' : theme.colors.text },
                    ]}
                  >
                    {option.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Descripción */}
          <View style={styles.field}>
            <Text style={[styles.label, { color: theme.colors.text }]}>
              Descripción: <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={[styles.input, styles.textArea, { 
                color: theme.colors.text,
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.cardBorder,
              }]}
              value={description}
              onChangeText={setDescription}
              placeholder="Describe las características de la criatura..."
              placeholderTextColor={theme.colors.textSecondary}
              multiline
              numberOfLines={4}
            />
          </View>

          {/* Habilidades */}
          <View style={styles.field}>
            <Text style={[styles.label, { color: theme.colors.text }]}>
              Habilidades: <Text style={styles.required}>*</Text>
            </Text>
            <Text style={[styles.hint, { color: theme.colors.textSecondary }]}>
              Separa cada habilidad con una coma
            </Text>
            <TextInput
              style={[styles.input, { 
                color: theme.colors.text,
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.cardBorder,
              }]}
              value={abilities}
              onChangeText={setAbilities}
              placeholder="Aliento de fuego, Vuelo, Garras afiladas"
              placeholderTextColor={theme.colors.textSecondary}
            />
          </View>

          {/* Nivel de peligrosidad */}
          <View style={styles.field}>
            <Text style={[styles.label, { color: theme.colors.text }]}>
              Nivel de Peligrosidad: <Text style={styles.required}>*</Text>
            </Text>
            <View style={styles.dangerButtons}>
              {[1, 2, 3, 4, 5].map((level) => (
                <Pressable
                  key={level}
                  style={[
                    styles.dangerButton,
                    {
                      backgroundColor: dangerLevel >= level 
                        ? theme.colors.accent 
                        : theme.colors.card,
                      borderColor: theme.colors.cardBorder,
                    },
                  ]}
                  onPress={() => setDangerLevel(level as DangerLevel)}
                >
                  <Text style={styles.fireIcon}>🔥</Text>
                  <Text style={[
                    styles.dangerNumber,
                    { color: dangerLevel >= level ? '#FFF' : theme.colors.text }
                  ]}>
                    {level}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Última aparición */}
          <View style={styles.field}>
            <Text style={[styles.label, { color: theme.colors.text }]}>
              Última aparición conocida:
            </Text>
            <TextInput
              style={[styles.input, { 
                color: theme.colors.text,
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.cardBorder,
              }]}
              value={lastSeen}
              onChangeText={setLastSeen}
              placeholder="Ej: Montañas del Norte"
              placeholderTextColor={theme.colors.textSecondary}
            />
          </View>

          {/* Botón para cambiar imagen */}
          <View style={styles.field}>
            <Text style={[styles.label, { color: theme.colors.text }]}>
              Imagen de la criatura:
            </Text>
            <Pressable
              style={[
                styles.imageButton,
                {
                  backgroundColor: theme.colors.card,
                  borderColor: theme.colors.accent,
                },
              ]}
              onPress={() => setShowImagePicker(true)}
            >
              <Text style={[styles.imageButtonText, { color: theme.colors.accent }]}>
                📷 Añadir Imagen
              </Text>
            </Pressable>
            {imageUrl ? (
              <Text style={[styles.imageUrlPreview, { color: theme.colors.textSecondary }]}>
                ✓ Imagen seleccionada
              </Text>
            ) : null}
          </View>

          {/* Botones de acción */}
          <View style={styles.actions}>
            <Pressable
              style={[styles.button, { backgroundColor: theme.colors.accent }]}
              onPress={handleCreate}
            >
              <Text style={styles.buttonText}>✓ Crear Criatura</Text>
            </Pressable>
            <Pressable
              style={[styles.button, { backgroundColor: '#666' }]}
              onPress={() => router.back()}
            >
              <Text style={styles.buttonText}>✕ Cancelar</Text>
            </Pressable>
          </View>

        </ScrollView>

        {/* Modal de selección de imagen */}
        <ImagePickerModal
          visible={showImagePicker}
          onClose={() => setShowImagePicker(false)}
          onImageSelected={(uri) => setImageUrl(uri)}
          themeColors={theme.colors}
        />
      </SafeAreaView>
    </PergaminoBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
  importButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
    marginBottom: 24,
    gap: 8,
  },
  importIcon: {
    fontSize: 20,
  },
  importText: {
    fontSize: 16,
    fontWeight: '600',
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  required: {
    color: '#D32F2F',
  },
  hint: {
    fontSize: 12,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  typeButtons: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  typeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  typeButtonText: {
    fontSize: 13,
    fontWeight: '600',
  },
  dangerButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  dangerButton: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fireIcon: {
    fontSize: 20,
  },
  dangerNumber: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
  imageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
  },
  imageButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  imageUrlPreview: {
    fontSize: 12,
    marginTop: 8,
    textAlign: 'center',
  },
  actions: {
    gap: 12,
    marginTop: 8,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
