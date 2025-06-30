import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProfileList from './ProfileList';

/**
 * ProfileScreen component
 *
 * This is the main profile screen route that will display fetched user images and data.
 * This screen uses a client component with React Query to fetch and display profiles with infinite scrolling.
 */
export default function ProfileScreen() {
  // Header component to be passed to ProfileList
  const Header = () => (
    <View style={styles.header}>
      <Text style={styles.title}>User Profiles</Text>
      <Text style={styles.subtitle}>View user profiles and their information</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* ProfileList handles the data fetching, display, and scrolling */}
      <ProfileList HeaderComponent={Header} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});
