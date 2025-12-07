// app/index.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Redirect } from 'expo-router';
import { useEffect } from 'react';

export default function Index() {
  useEffect(() => {
    AsyncStorage.clear();
  }, []);

  return <Redirect href="/(tabs)/dragones" />;
}