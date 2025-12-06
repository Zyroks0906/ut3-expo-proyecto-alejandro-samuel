// hooks/useShakeDetector.ts
// Hook para detectar el gesto de agitar el dispositivo

import { useEffect, useState } from 'react';
import { Accelerometer } from 'expo-sensors';

const SHAKE_THRESHOLD = 1.5; // Umbral de sensibilidad
const SHAKE_INTERVAL = 1000; // Tiempo mínimo entre shakes (ms)

export function useShakeDetector(onShake: () => void, enabled: boolean = true) {
  const [subscription, setSubscription] = useState<any>(null);
  const [lastShake, setLastShake] = useState<number>(0);

  useEffect(() => {
    if (!enabled) {
      if (subscription) {
        subscription.remove();
        setSubscription(null);
      }
      return;
    }

    const subscribe = () => {
      const sub = Accelerometer.addListener((accelerometerData) => {
        const { x, y, z } = accelerometerData;
        const acceleration = Math.sqrt(x * x + y * y + z * z);

        const now = Date.now();
        
        // Detectar shake si la aceleración supera el umbral
        if (acceleration > SHAKE_THRESHOLD && now - lastShake > SHAKE_INTERVAL) {
          setLastShake(now);
          onShake();
        }
      });

      // Configurar frecuencia de actualización (en ms)
      Accelerometer.setUpdateInterval(100);
      setSubscription(sub);
    };

    subscribe();

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [enabled, onShake, lastShake]);

  return null;
}