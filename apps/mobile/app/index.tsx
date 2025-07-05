import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Home, Library, Mix, Profile, Chat } from './screens';

export default function Index() {
  const [activeTab, setActiveTab] = useState('home');

  const handleTabPress = (tabKey: string) => {
    // setActiveTab(tabKey);
  };

  // Render the appropriate screen based on the active tab
  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <Home activeTab={activeTab} onTabPress={handleTabPress} />;
      case 'library':
        return <Library activeTab={activeTab} onTabPress={handleTabPress} />;
      case 'mix':
        return <Mix activeTab={activeTab} onTabPress={handleTabPress} />;
      case 'profile':
        return <Profile activeTab={activeTab} onTabPress={handleTabPress} />;
      case 'chat':
        return <Chat activeTab={activeTab} onTabPress={handleTabPress} />;
      default:
        return <Home activeTab={activeTab} onTabPress={handleTabPress} />;
    }
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>{renderScreen()}</View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
