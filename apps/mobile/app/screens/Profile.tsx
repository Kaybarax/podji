import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import NavigationBar from '../components/NavigationBar';
import BottomNavigation from '../components/BottomNavigation';

interface ProfileProps {
  activeTab: string;
  onTabPress: (tabKey: string) => void;
}

export const Profile: React.FC<ProfileProps> = ({ activeTab, onTabPress }) => {
  const handleTabPress = (tabKey?: string) => {
    if (tabKey) {
      onTabPress(tabKey);
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Navigation Bar */}
      <NavigationBar
        title="Profile"
        showNotification={true}
        showSearch={true}
        onNotificationPress={() => console.log('Notification pressed')}
        onSearchPress={() => console.log('Search pressed')}
      />

      {/* Profile Content */}
      <View style={styles.content}>
        <Text style={styles.placeholder}>Profile Screen - Coming Soon</Text>
      </View>

      {/* Bottom Tab Navigation */}
      <BottomNavigation activeTab={activeTab} onTabPress={handleTabPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    fontSize: 18,
    color: '#666',
  },
});

export default Profile;
