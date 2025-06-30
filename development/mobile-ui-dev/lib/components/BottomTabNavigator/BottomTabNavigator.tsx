import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { getMobileTheme } from '@podji/design-tokens';

export interface TabItem {
  /**
   * Key for the tab
   */
  key: string;
  /**
   * Label for the tab
   */
  label: string;
  /**
   * Icon for the tab (emoji or component)
   */
  icon: React.ReactNode;
}

export interface BottomTabNavigatorProps {
  /**
   * Tabs to display
   */
  tabs: TabItem[];
  /**
   * Currently active tab key
   */
  activeTab: string;
  /**
   * Tab press handler
   */
  onTabPress: (tabKey: string) => void;
  /**
   * Additional style
   */
  style?: StyleProp<ViewStyle>;
}

/**
 * Bottom tab navigation component for mobile app
 */
export const BottomTabNavigator = ({ tabs, activeTab, onTabPress, style }: BottomTabNavigatorProps) => {
  const [themeStyles, setThemeStyles] = useState({
    container: {},
    tabBar: {},
    tab: {},
    activeTab: {},
    tabContent: {},
    tabIcon: {},
    tabLabel: {},
    activeTabLabel: {},
  });

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const theme = await getMobileTheme();
        setThemeStyles({
          container: {
            width: '100%',
          },
          tabBar: {
            flexDirection: 'row',
            backgroundColor: theme.light.color.semantic.background.surface,
            borderTopColor: theme.light.color.semantic.border.base,
            borderTopWidth: 1,
            height: 60,
            justifyContent: 'space-around',
            alignItems: 'center',
          },
          tab: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: theme.light.spacing.xs,
          },
          activeTab: {
            borderTopWidth: 2,
            borderTopColor: theme.light.color.theme.primary,
          },
          tabContent: {
            alignItems: 'center',
            justifyContent: 'center',
          },
          tabIcon: {
            fontSize: 24,
            marginBottom: 4,
          },
          tabLabel: {
            fontSize: theme.light.typography.fontSize.sm,
            color: theme.light.color.semantic.text.secondary,
          },
          activeTabLabel: {
            color: theme.light.color.theme.primary,
            fontWeight: theme.light.typography.fontWeight.bold,
          },
        });
      } catch (error) {
        console.error('Failed to load theme:', error);
      }
    };

    loadTheme();
  }, []);

  return (
    <View style={[themeStyles.container, style]}>
      <View style={themeStyles.tabBar}>
        {tabs.map(tab => {
          const isActive = tab.key === activeTab;
          return (
            <TouchableOpacity
              key={tab.key}
              style={[themeStyles.tab, isActive && themeStyles.activeTab]}
              onPress={() => onTabPress(tab.key)}
              activeOpacity={0.7}
            >
              <View style={themeStyles.tabContent}>
                {typeof tab.icon === 'string' ? <Text style={themeStyles.tabIcon}>{tab.icon}</Text> : <>{tab.icon}</>}
                <Text style={[themeStyles.tabLabel, isActive && themeStyles.activeTabLabel]}>{tab.label}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
