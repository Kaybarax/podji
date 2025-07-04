import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface NavigationBarProps {
  title: string;
  showNotification?: boolean;
  showSearch?: boolean;
  onNotificationPress?: () => void;
  onSearchPress?: () => void;
}

export const SimpleNavigationBar: React.FC<NavigationBarProps> = ({
  title,
  showNotification = true,
  showSearch = true,
  onNotificationPress,
  onSearchPress,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.actions}>
          {showSearch && (
            <TouchableOpacity onPress={onSearchPress} style={styles.actionButton}>
              <Text style={styles.actionText}>🔍</Text>
            </TouchableOpacity>
          )}
          {showNotification && (
            <TouchableOpacity onPress={onNotificationPress} style={styles.actionButton}>
              <Text style={styles.actionText}>🔔</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

interface BottomNavigationProps {
  activeTab: string;
  onTabPress: (tab: string) => void;
}

export const SimpleBottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, onTabPress }) => {
  const insets = useSafeAreaInsets();

  const tabs = [
    { key: 'home', label: 'Home', icon: '🏠' },
    { key: 'library', label: 'Library', icon: '📚' },
    { key: 'mix', label: 'Mix', icon: '🎚️' },
    { key: 'profile', label: 'Profile', icon: '👤' },
    { key: 'chat', label: 'Chat', icon: '💬' },
  ];

  return (
    <View style={[styles.bottomContainer, { paddingBottom: insets.bottom }]}>
      <View style={styles.bottomContent}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, activeTab === tab.key && styles.activeTab]}
            onPress={() => onTabPress(tab.key)}
          >
            <Text style={[styles.tabIcon, activeTab === tab.key && styles.activeTabText]}>{tab.icon}</Text>
            <Text style={[styles.tabLabel, activeTab === tab.key && styles.activeTabText]}>{tab.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  actions: {
    flexDirection: 'row',
  },
  actionButton: {
    marginLeft: 16,
    padding: 8,
  },
  actionText: {
    fontSize: 20,
  },
  bottomContainer: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  bottomContent: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  activeTab: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    margin: 2,
  },
  tabIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  tabLabel: {
    fontSize: 12,
    color: '#666',
  },
  activeTabText: {
    color: '#007AFF',
    fontWeight: '600',
  },
});
