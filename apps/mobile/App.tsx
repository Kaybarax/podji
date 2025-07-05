import { registerRootComponent } from 'expo';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ExpoRoot } from 'expo-router';
import React from 'react';

// Must be exported as default
export default function App() {
  const ctx = require.context('./app');
  return (
    <SafeAreaProvider>
      <ExpoRoot context={ctx} />
    </SafeAreaProvider>
  );
}

registerRootComponent(App);
