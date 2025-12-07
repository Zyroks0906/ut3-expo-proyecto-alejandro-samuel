// app/detalle/[id].tsx
// Pantalla de detalle y edición de una criatura

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, Pressable, Image, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { useCreatureStore } from '../../stores/useCreatureStore';
import { useSettingsStore } from '../../stores/useSettingsStore';
import { THEMES } from '../../constants/themes';
import { CreatureType, DangerLevel } from '../../types';
import PergaminoBackground from '../../components/PergaminoBackground';
import DangerLevelComponent from '../../components/DangerLevel';
import ImagePickerModal from '../../components/ImagePickerModal';

const TYPE_OPTIONS: { value: CreatureType; label: string }[] = [
  { value: 'dragon', label: 'Dragón' },
  { value: 'hybrid', label: 'Híbrido' },
  { value: 'other', label: 'Otra Criatura' },
];

export default function DetalleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { settings } = useSettingsStore();
  const creatures = useCreatureStore((state) => state.creatures);
  const getById = useCreatureStore((state) => state.getById);
  const updateCreature = useCreatureStore((state) => state.updateCreature);
  const deleteCreature = useCreatureStore((state) => state.deleteCreature);
  const toggleFavorite = useCreatureStore((state) => state.toggleFavorite);

  // Obtener criatura actualizada cada vez que creatures cambie
  const creature = getById(id!);
  const theme = THEMES[settings.theme];

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedType, setEditedType] = useState<CreatureType>('dragon');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedImageUrl, setEditedImageUrl] = useState('');
  const [editedAbilities, setEditedAbilities] = useState('');
  const [editedDangerLevel, setEditedDangerLevel] = useState<DangerLevel>(1);
  const [editedLastSeen, setEditedLastSeen] = useState('');
  const [showImagePicker, setShowImagePicker] = useState(false);

  // Actualizar estados cuando creature cambie
  useEffect(() => {
    if (creature) {
      setEditedName(creature.name);
      setEditedType(creature.type);
      setEditedDescription(creature.description);
      setEditedImageUrl(creature.imageUrl);
      setEditedAbilities(creature.abilities.join(', '));
      setEditedDangerLevel(creature.dangerLevel);
      setEditedLastSeen(creature.lastSeen);
    }
  }, [creature]);

  if (!creature) {
    return (
      <PergaminoBackground>
        <SafeAreaView style={styles.container}>
          <View style={styles.errorContainer}>
            <Text style={[styles.errorText, { color: theme.colors.text }]}>
              Criatura no encontrada
            </Text>
            <Pressable
              style={[styles.button, { backgroundColor: theme.colors.accent }]}
              onPress={() => router.back()}
            >
              <Text style={styles.buttonText}>Volver</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </PergaminoBackground>
    );
  }

  const handleSave = () => {
    const abilitiesArray = editedAbilities
      .split(',')
      .map((ability) => ability.trim())
      .filter((ability) => ability.length > 0);

    console.log('🔥 GUARDANDO:');
    console.log('ID:', id);
    console.log('Danger Level ANTES:', creature.dangerLevel);
    console.log('Danger Level NUEVO:', editedDangerLevel);

    updateCreature(id!, {
      name: editedName,
      type: editedType,
      description: editedDescription,
      imageUrl: editedImageUrl,
      abilities: abilitiesArray,
      dangerLevel: editedDangerLevel,
      lastSeen: editedLastSeen,
    });

    // Verificar después de guardar
    setTimeout(() => {
      const updated = getById(id!);
      console.log('🔥 DESPUÉS DE GUARDAR:', updated?.dangerLevel);
    }, 100);

    setIsEditing(false);
    Alert.alert('✓ Guardado', 'Los cambios se han guardado correctamente');
  };

  const handleDelete = () => {
    Alert.alert(
      '⚠️ Confirmar eliminación',
      `¿Estás seguro de que quieres eliminar a ${creature.name}? Esta acción no se puede deshacer.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            deleteCreature(id!);
            router.back();
          },
        },
      ]
    );
  };

  const handleCancel = () => {
    setEditedName(creature.name);
    setEditedType(creature.type);
    setEditedDescription(creature.description);
    setEditedImageUrl(creature.imageUrl);
    setEditedAbilities(creature.abilities.join(', '));
    setEditedDangerLevel(creature.dangerLevel);
    setEditedLastSeen(creature.lastSeen);
    setIsEditing(false);
  };

  return (
    <PergaminoBackground>
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>

          {/* Imagen */}
          <View style={styles.imageContainer}>
            <Image
              source={typeof creature.imageUrl === 'string'
                ? { uri: creature.imageUrl }
                : creature.imageUrl
              }
              style={styles.image}
            />
            <Pressable
              style={[
                styles.favoriteButton,
                { backgroundColor: creature.isFavorite ? '#FFD700' : 'rgba(255,255,255,0.9)' }
              ]}
              onPress={() => toggleFavorite(id!)}
            >
              <Text style={styles.favoriteIcon}>
                {creature.isFavorite ? '⭐' : '☆'}
              </Text>
            </Pressable>
          </View>

          {/* Nombre */}
          {isEditing ? (
            <TextInput
              style={[styles.input, styles.nameInput, {
                color: theme.colors.text,
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.cardBorder,
              }]}
              value={editedName}
              onChangeText={setEditedName}
              placeholder="Nombre de la criatura"
              placeholderTextColor={theme.colors.textSecondary}
            />
          ) : (
            <Text style={[styles.name, { color: theme.colors.text }]}>
              {creature.name}
            </Text>
          )}

          {/* Tipo */}
          {isEditing ? (
            <View style={styles.typeButtons}>
              {TYPE_OPTIONS.map((option) => (
                <Pressable
                  key={option.value}
                  style={[
                    styles.typeButton,
                    {
                      backgroundColor: editedType === option.value
                        ? theme.colors.accent
                        : theme.colors.card,
                      borderColor: theme.colors.cardBorder,
                    },
                  ]}
                  onPress={() => setEditedType(option.value)}
                >
                  <Text
                    style={[
                      styles.typeButtonText,
                      { color: editedType === option.value ? '#FFF' : theme.colors.text },
                    ]}
                  >
                    {option.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          ) : (
            <Text style={[styles.type, { color: theme.colors.textSecondary }]}>
              {TYPE_OPTIONS.find((t) => t.value === creature.type)?.label}
            </Text>
          )}

          {/* Descripción */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Descripción:
            </Text>
            {isEditing ? (
              <TextInput
                style={[styles.input, styles.textArea, {
                  color: theme.colors.text,
                  backgroundColor: theme.colors.card,
                  borderColor: theme.colors.cardBorder,
                }]}
                value={editedDescription}
                onChangeText={setEditedDescription}
                placeholder="Descripción detallada..."
                placeholderTextColor={theme.colors.textSecondary}
                multiline
                numberOfLines={4}
              />
            ) : (
              <Text style={[styles.text, { color: theme.colors.textSecondary }]}>
                {creature.description}
              </Text>
            )}
          </View>

          {/* Habilidades */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Habilidades:
            </Text>
            {isEditing ? (
              <TextInput
                style={[styles.input, {
                  color: theme.colors.text,
                  backgroundColor: theme.colors.card,
                  borderColor: theme.colors.cardBorder,
                }]}
                value={editedAbilities}
                onChangeText={setEditedAbilities}
                placeholder="Habilidad 1, Habilidad 2, ..."
                placeholderTextColor={theme.colors.textSecondary}
              />
            ) : (
              <View style={styles.abilitiesList}>
                {creature.abilities.map((ability, index) => (
                  <Text
                    key={index}
                    style={[styles.abilityItem, { color: theme.colors.textSecondary }]}
                  >
                    • {ability}
                  </Text>
                ))}
              </View>
            )}
          </View>

          {/* Nivel de peligrosidad */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Nivel de Peligrosidad:
            </Text>
            {isEditing ? (
              <View style={styles.dangerButtons}>
                {[1, 2, 3, 4, 5].map((level) => (
                  <Pressable
                    key={level}
                    style={[
                      styles.dangerButton,
                      {
                        backgroundColor: editedDangerLevel >= level
                          ? theme.colors.accent
                          : theme.colors.card,
                        borderColor: theme.colors.cardBorder,
                      },
                    ]}
                    onPress={() => setEditedDangerLevel(level as DangerLevel)}
                  >
                    <Text style={styles.fireIcon}>🔥</Text>
                  </Pressable>
                ))}
              </View>
            ) : (
              <DangerLevelComponent level={creature.dangerLevel} color={theme.colors.accent} />
            )}
          </View>

          {/* Última aparición */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Última aparición conocida:
            </Text>
            {isEditing ? (
              <TextInput
                style={[styles.input, {
                  color: theme.colors.text,
                  backgroundColor: theme.colors.card,
                  borderColor: theme.colors.cardBorder,
                }]}
                value={editedLastSeen}
                onChangeText={setEditedLastSeen}
                placeholder="Ubicación..."
                placeholderTextColor={theme.colors.textSecondary}
              />
            ) : (
              <Text style={[styles.text, { color: theme.colors.textSecondary }]}>
                {creature.lastSeen}
              </Text>
            )}
          </View>

          {/* Cambiar imagen (solo en edición) */}
          {isEditing && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Cambiar imagen:
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
                  📷 Cambiar Imagen
                </Text>
              </Pressable>
              {editedImageUrl && (
                <Text style={[styles.imageUrlPreview, { color: theme.colors.textSecondary }]}>
                  ✓ Imagen actualizada
                </Text>
              )}
            </View>
          )}

          {/* Botones de acción */}
          <View style={styles.actions}>
            {isEditing ? (
              <>
                <Pressable
                  style={[styles.button, { backgroundColor: theme.colors.accent }]}
                  onPress={handleSave}
                >
                  <Text style={styles.buttonText}>💾 Guardar Cambios</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, { backgroundColor: '#666' }]}
                  onPress={handleCancel}
                >
                  <Text style={styles.buttonText}>✕ Cancelar</Text>
                </Pressable>
              </>
            ) : (
              <>
                <Pressable
                  style={[styles.button, { backgroundColor: theme.colors.accent }]}
                  onPress={() => setIsEditing(true)}
                >
                  <Text style={styles.buttonText}>✏️ Editar</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, { backgroundColor: theme.colors.danger }]}
                  onPress={handleDelete}
                >
                  <Text style={styles.buttonText}>🗑️ Eliminar</Text>
                </Pressable>
              </>
            )}
          </View>

        </ScrollView>

        {/* Modal de selección de imagen */}
        <ImagePickerModal
          visible={showImagePicker}
          onClose={() => setShowImagePicker(false)}
          onImageSelected={(uri) => setEditedImageUrl(uri)}
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  errorText: {
    fontSize: 18,
    fontWeight: '600',
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 250,
    backgroundColor: '#DDD',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    borderRadius: 20,
    padding: 8,
  },
  favoriteIcon: {
    fontSize: 28,
  },
  name: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  type: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
  },
  abilitiesList: {
    gap: 4,
  },
  abilityItem: {
    fontSize: 14,
    lineHeight: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
  },
  nameInput: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  typeButtons: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
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
    width: 50,
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fireIcon: {
    fontSize: 24,
  },
  imageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 8,
    borderWidth: 2,
  },
  imageButtonText: {
    fontSize: 15,
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
