// app/(tabs)/scriptorium.tsx
// Pantalla de Configuración y Ajustes

import React from 'react';
import { View, Text, ScrollView, Pressable, Switch, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSettingsStore } from '../../stores/useSettingsStore';
import { THEMES } from '../../constants/themes';
import { FilterType, ThemeType } from '../../types';
import PergaminoBackground from '../../components/PergaminoBackground';

const ORDER_OPTIONS: { id: FilterType; label: string }[] = [
  { id: 'alphabetical', label: 'Alfabético (A-Z)' },
  { id: 'danger', label: 'Peligrosidad' },
  { id: 'recent', label: 'Más recientes' },
  { id: 'favorites', label: 'Favoritos primero' },
];

export default function ScriptoriumScreen() {
  const { settings, setTheme, setDefaultOrder, toggleShake } = useSettingsStore();
  const theme = THEMES[settings.theme];

  return (
    <PergaminoBackground>
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
          
          {/* Sección: Apariencia */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              📜 Apariencia del Pergamino
            </Text>
            <Text style={[styles.sectionSubtitle, { color: theme.colors.textSecondary }]}>
              Elige el estilo de pergamino para el códice
            </Text>
            
            <View style={styles.themesContainer}>
              {(Object.keys(THEMES) as ThemeType[]).map((themeKey) => {
                const themeOption = THEMES[themeKey];
                const isSelected = settings.theme === themeKey;
                
                return (
                  <Pressable
                    key={themeKey}
                    style={[
                      styles.themeButton,
                      {
                        backgroundColor: themeOption.colors.card,
                        borderColor: isSelected ? theme.colors.accent : themeOption.colors.cardBorder,
                        borderWidth: isSelected ? 3 : 2,
                      },
                    ]}
                    onPress={() => setTheme(themeKey)}
                  >
                    <Text
                      style={[
                        styles.themeButtonText,
                        {
                          color: themeOption.colors.text,
                          fontWeight: isSelected ? '700' : '500',
                        },
                      ]}
                    >
                      {themeOption.name}
                    </Text>
                    {isSelected && (
                      <Text style={styles.checkmark}>✓</Text>
                    )}
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* Sección: Preferencias */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              ⚙️ Preferencias
            </Text>
            
            {/* Orden por defecto */}
            <View style={styles.preferenceItem}>
              <Text style={[styles.preferenceLabel, { color: theme.colors.text }]}>
                Orden por defecto:
              </Text>
              <View style={styles.orderButtons}>
                {ORDER_OPTIONS.map((option) => (
                  <Pressable
                    key={option.id}
                    style={[
                      styles.orderButton,
                      {
                        backgroundColor: settings.defaultOrder === option.id 
                          ? theme.colors.accent 
                          : theme.colors.card,
                        borderColor: theme.colors.cardBorder,
                      },
                    ]}
                    onPress={() => setDefaultOrder(option.id)}
                  >
                    <Text
                      style={[
                        styles.orderButtonText,
                        {
                          color: settings.defaultOrder === option.id 
                            ? '#FFF' 
                            : theme.colors.text,
                        },
                      ]}
                    >
                      {option.label}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* Toggle Shake */}
            <View style={styles.preferenceItem}>
              <View style={styles.switchRow}>
                <View style={styles.switchLabel}>
                  <Text style={[styles.preferenceLabel, { color: theme.colors.text }]}>
                    Agitar para criatura aleatoria
                  </Text>
                  <Text style={[styles.switchDescription, { color: theme.colors.textSecondary }]}>
                    Agita el dispositivo para ver una criatura al azar
                  </Text>
                </View>
                <Switch
                  value={settings.shakeEnabled}
                  onValueChange={toggleShake}
                  trackColor={{ false: '#767577', true: theme.colors.accent }}
                  thumbColor={settings.shakeEnabled ? '#FFF' : '#f4f3f4'}
                />
              </View>
            </View>
          </View>

          {/* Sección: Acerca de */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              📖 Acerca del Códice Dracónico
            </Text>
            <Text style={[styles.aboutText, { color: theme.colors.textSecondary }]}>
              <Text style={{ fontWeight: '700' }}>Draconic Codex</Text> es una aplicación para documentar 
              y catalogar dragones, híbridos dragón-humano y otras criaturas míticas del mundo.
              {'\n\n'}
              Cada entrada puede incluir imágenes, descripciones detalladas, habilidades únicas 
              y nivel de peligrosidad. Marca tus criaturas favoritas y organízalas como prefieras.
              {'\n\n'}
              Los pergaminos arcanos han sido recopilados con sabiduría ancestral para preservar 
              el conocimiento de estas magníficas bestias para las generaciones venideras.
              {'\n\n'}
              <Text style={{ fontStyle: 'italic' }}>
                "El conocimiento es poder, pero la sabiduría es saber cuándo usarlo." - Anónimo
              </Text>
            </Text>
            
            <View style={styles.versionContainer}>
              <Text style={[styles.versionText, { color: theme.colors.textSecondary }]}>
                Versión 1.0.0
              </Text>
              <Text style={[styles.versionText, { color: theme.colors.textSecondary }]}>
                Desarrollado por Alejandro Mejias y Samuel Moran
              </Text>
            </View>
          </View>

        </ScrollView>
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
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    marginBottom: 16,
  },
  themesContainer: {
    gap: 12,
  },
  themeButton: {
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  themeButtonText: {
    fontSize: 16,
  },
  checkmark: {
    fontSize: 20,
    color: '#4CAF50',
  },
  preferenceItem: {
    marginBottom: 24,
  },
  preferenceLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  orderButtons: {
    gap: 8,
  },
  orderButton: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  orderButtonText: {
    fontSize: 14,
    textAlign: 'center',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
  },
  switchLabel: {
    flex: 1,
  },
  switchDescription: {
    fontSize: 12,
    marginTop: 4,
  },
  aboutText: {
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'justify',
  },
  versionContainer: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#CCC',
    alignItems: 'center',
    gap: 4,
  },
  versionText: {
    fontSize: 12,
  },
});
