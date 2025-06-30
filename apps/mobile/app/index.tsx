import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Home from './screens/Home';

export default function Index() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Home />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
