// components/PergaminoBackground.tsx
// Wrapper que aplica el fondo de pergamino según el tema seleccionado

import React from 'react';
import { ImageBackground, StyleSheet, ViewStyle } from 'react-native';
import { useSettingsStore } from '../stores/useSettingsStore';
import { THEMES } from '../constants/themes';

interface PergaminoBackgroundProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export default function PergaminoBackground({ children, style }: PergaminoBackgroundProps) {
  const { settings } = useSettingsStore();
  const currentTheme = THEMES[settings.theme];

  return (
    <ImageBackground
      source={currentTheme.backgroundImage}
      style={[styles.background, style]}
      resizeMode="cover"
    >
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});