import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to React Native!</Text>
      <Text style={styles.subtitle}>Edit app/index.tsx to edit this screen.</Text>

      <View style={styles.button}>
        <Text style={styles.buttonText}>Styled with React Native StyleSheet</Text>
      </View>

      <Link href="/profile" asChild>
        <TouchableOpacity style={styles.profileButton}>
          <Text style={styles.profileButtonText}>View User Profiles</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    color: '#666',
    marginTop: 8,
  },
  button: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#3b82f6',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  profileButton: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#10b981',
    borderRadius: 8,
  },
  profileButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
