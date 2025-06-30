import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomTabNavigator } from '@podji/mobile-ui';

// Tab items for bottom navigation
const tabItems = [
  { key: 'home', label: 'Home', icon: '🏠' },
  { key: 'mix', label: 'Mix', icon: '🎚️' },
  { key: 'library', label: 'Library', icon: '🎧' },
  { key: 'profile', label: 'Profile', icon: '👤' },
  { key: 'chat', label: 'Chat', icon: '💬' },
];

interface BottomNavigationProps {
  activeTab: string;
  onTabPress: (tabKey: string) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, onTabPress }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[{ paddingBottom: Math.max(insets.bottom - 16, 0) }]}>
      <BottomTabNavigator tabs={tabItems} activeTab={activeTab} onTabPress={onTabPress} />
    </View>
  );
};

export default BottomNavigation;
