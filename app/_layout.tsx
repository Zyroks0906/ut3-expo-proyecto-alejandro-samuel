// app/_layout.tsx
// Layout raíz de la aplicación

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen 
          name="detalle/[id]" 
          options={{
            headerShown: true,
            headerTitle: 'Detalle de Criatura',
            headerBackTitle: 'Volver',
          }}
        />
        <Stack.Screen 
          name="nueva-criatura" 
          options={{
            headerShown: true,
            headerTitle: 'Nueva Criatura',
            headerBackTitle: 'Cancelar',
          }}
        />
      </Stack>
    </>
  );
}