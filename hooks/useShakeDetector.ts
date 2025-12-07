import { useEffect, useRef } from 'react';
import { Accelerometer } from 'expo-sensors';
import { Platform } from 'react-native';

const THRESHOLD = 1.78; // Shake sensitivity threshold

export const useShakeDetector = (onShake: () => void, enabled: boolean = true) => {
  // Use a ref to keep track of the last shake time to prevent multiple triggers
  const lastShakeTime = useRef<number>(0);
  const minShakeInterval = 1000; // Minimum time between shakes in ms

  useEffect(() => {
    if (!enabled || Platform.OS === 'web') {
      return;
    }

    Accelerometer.setUpdateInterval(100);

    const subscription = Accelerometer.addListener(({ x, y, z }) => {
      const acceleration = Math.sqrt(x * x + y * y + z * z);

      // Different platforms might need normalization, but usually > 1.78 is a good shake
      // On iOS 1g = 9.81 m/s^2, but Expo normalizes to 1g = 1.0 (approx)
      // Actually strictly speaking Expo docs say:
      // Android: values are in m/s^2 (so 9.81 is 1g)
      // iOS: values are in g (so 1.0 is 1g)
      // EXCEPT older versions? Let's double check standard behavior or just use a relative change.
      // Wait, Expo documentation says: "The values are in Gs (gravitational force)." for both since SDK 45+ I believe. 
      // Let's assume Gs.
      // If the device is still, it experiences 1g approx.
      // A shake adds acceleration.

      if (acceleration >= THRESHOLD) {
        const now = Date.now();
        if (now - lastShakeTime.current > minShakeInterval) {
          lastShakeTime.current = now;
          onShake();
        }
      }
    });

    return () => {
      subscription.remove();
    };
  }, [enabled, onShake]);
};
