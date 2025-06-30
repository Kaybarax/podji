import { Stack } from 'expo-router';
import Providers from './providers';

export default function RootLayout() {
  return (
    <Providers>
      <Stack />
    </Providers>
  );
}
