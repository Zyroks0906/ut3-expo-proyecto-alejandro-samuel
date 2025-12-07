// hooks/useShakeDetector.ts
// Hook para detectar el gesto de agitar el dispositivo

import { useEffect, useRef } from 'react';
import { Accelerometer } from 'expo-sensors';

const SHAKE_THRESHOLD = 1.5; // Umbral de sensibilidad
const SHAKE_INTERVAL = 1000; // Tiempo mínimo entre shakes (ms)

export function useShakeDetector(onShake: () => void, enabled: boolean = true) {
  const lastShakeRef = useRef<number>(0);
  const subscriptionRef = useRef<any>(null);

  useEffect(() => {
    if (!enabled) {
      if (subscriptionRef.current) {
        subscriptionRef.current.remove();
        subscriptionRef.current = null;
      }
      return;
    }

    const subscription = Accelerometer.addListener((accelerometerData) => {
      const { x, y, z } = accelerometerData;
      const acceleration = Math.sqrt(x * x + y * y + z * z);

      const now = Date.now();

      // Detectar shake si la aceleración supera el umbral
      if (acceleration > SHAKE_THRESHOLD && now - lastShakeRef.current > SHAKE_INTERVAL) {
        lastShakeRef.current = now;
        onShake();
      }
    });

    // Configurar frecuencia de actualización (en ms)
    Accelerometer.setUpdateInterval(100);
    subscriptionRef.current = subscription;

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.remove();
        subscriptionRef.current = null;
      }
    };
  }, [enabled, onShake]);

  return null;
}