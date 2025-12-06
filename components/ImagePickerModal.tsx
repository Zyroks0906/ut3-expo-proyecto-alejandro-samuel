// components/ImagePickerModal.tsx
// Modal para elegir cómo añadir una imagen (Galería, Cámara o URL)

import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  Pressable,
  TextInput,
  Alert,
  StyleSheet,
  Platform,
} from 'react-native';
import { useImagePicker } from '../hooks/useImagePicker';

interface ImagePickerModalProps {
  visible: boolean;
  onClose: () => void;
  onImageSelected: (imageUri: string) => void;
  themeColors: {
    card: string;
    cardBorder: string;
    text: string;
    textSecondary: string;
    accent: string;
  };
}

export default function ImagePickerModal({
  visible,
  onClose,
  onImageSelected,
  themeColors,
}: ImagePickerModalProps) {
  const { pickFromGallery, takePhoto, isLoading } = useImagePicker();
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInput, setUrlInput] = useState('');

  const handleGallery = async () => {
    const imageUri = await pickFromGallery();
    if (imageUri) {
      onImageSelected(imageUri);
      onClose();
    }
  };

  const handleCamera = async () => {
    const imageUri = await takePhoto();
    if (imageUri) {
      onImageSelected(imageUri);
      onClose();
    }
  };

  const handleUrlSubmit = () => {
    if (!urlInput.trim()) {
      Alert.alert('Error', 'Por favor ingresa una URL válida');
      return;
    }

    if (!urlInput.startsWith('http://') && !urlInput.startsWith('https://')) {
      Alert.alert('Error', 'La URL debe comenzar con http:// o https://');
      return;
    }

    onImageSelected(urlInput.trim());
    setUrlInput('');
    setShowUrlInput(false);
    onClose();
  };

  const handleClose = () => {
    setShowUrlInput(false);
    setUrlInput('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <Pressable style={styles.overlay} onPress={handleClose}>
        <Pressable
          style={[
            styles.modalContent,
            {
              backgroundColor: themeColors.card,
              borderColor: themeColors.cardBorder,
            },
          ]}
          onPress={(e) => e.stopPropagation()}
        >
          <Text style={[styles.title, { color: themeColors.text }]}>
            Añadir Imagen
          </Text>

          {!showUrlInput ? (
            <>
              {/* Botón: Galería */}
              <Pressable
                style={[
                  styles.option,
                  {
                    backgroundColor: themeColors.card,
                    borderColor: themeColors.cardBorder,
                  },
                ]}
                onPress={handleGallery}
                disabled={isLoading}
              >
                <Text style={styles.optionIcon}>🖼️</Text>
                <View style={styles.optionTextContainer}>
                  <Text style={[styles.optionTitle, { color: themeColors.text }]}>
                    Elegir de Galería
                  </Text>
                  <Text style={[styles.optionDescription, { color: themeColors.textSecondary }]}>
                    Selecciona una imagen de tu dispositivo
                  </Text>
                </View>
              </Pressable>

              {/* Botón: Cámara */}
              <Pressable
                style={[
                  styles.option,
                  {
                    backgroundColor: themeColors.card,
                    borderColor: themeColors.cardBorder,
                  },
                ]}
                onPress={handleCamera}
                disabled={isLoading}
              >
                <Text style={styles.optionIcon}>📷</Text>
                <View style={styles.optionTextContainer}>
                  <Text style={[styles.optionTitle, { color: themeColors.text }]}>
                    Tomar Foto
                  </Text>
                  <Text style={[styles.optionDescription, { color: themeColors.textSecondary }]}>
                    Usa la cámara para capturar una imagen
                  </Text>
                </View>
              </Pressable>

              {/* Botón: URL */}
              <Pressable
                style={[
                  styles.option,
                  {
                    backgroundColor: themeColors.card,
                    borderColor: themeColors.cardBorder,
                  },
                ]}
                onPress={() => setShowUrlInput(true)}
                disabled={isLoading}
              >
                <Text style={styles.optionIcon}>🌐</Text>
                <View style={styles.optionTextContainer}>
                  <Text style={[styles.optionTitle, { color: themeColors.text }]}>
                    URL de Internet
                  </Text>
                  <Text style={[styles.optionDescription, { color: themeColors.textSecondary }]}>
                    Pega un enlace desde la web
                  </Text>
                </View>
              </Pressable>
            </>
          ) : (
            <>
              {/* Input de URL */}
              <Text style={[styles.urlLabel, { color: themeColors.text }]}>
                Ingresa la URL de la imagen:
              </Text>
              <TextInput
                style={[
                  styles.urlInput,
                  {
                    color: themeColors.text,
                    backgroundColor: themeColors.card,
                    borderColor: themeColors.cardBorder,
                  },
                ]}
                value={urlInput}
                onChangeText={setUrlInput}
                placeholder="https://ejemplo.com/imagen.jpg"
                placeholderTextColor={themeColors.textSecondary}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="url"
              />

              <View style={styles.urlButtons}>
                <Pressable
                  style={[styles.urlButton, { backgroundColor: themeColors.accent }]}
                  onPress={handleUrlSubmit}
                >
                  <Text style={styles.urlButtonText}>✓ Aceptar</Text>
                </Pressable>
                <Pressable
                  style={[styles.urlButton, { backgroundColor: '#666' }]}
                  onPress={() => {
                    setShowUrlInput(false);
                    setUrlInput('');
                  }}
                >
                  <Text style={styles.urlButtonText}>← Volver</Text>
                </Pressable>
              </View>
            </>
          )}

          {/* Botón: Cancelar */}
          {!showUrlInput && (
            <Pressable style={styles.cancelButton} onPress={handleClose}>
              <Text style={[styles.cancelText, { color: themeColors.textSecondary }]}>
                Cancelar
              </Text>
            </Pressable>
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
    gap: 12,
  },
  optionIcon: {
    fontSize: 32,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  optionDescription: {
    fontSize: 12,
  },
  urlLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  urlInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    marginBottom: 16,
  },
  urlButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  urlButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  urlButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  cancelButton: {
    marginTop: 8,
    padding: 12,
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 14,
    fontWeight: '600',
  },
});