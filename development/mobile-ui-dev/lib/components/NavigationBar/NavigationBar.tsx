import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleProp, ViewStyle } from 'react-native';
import { getMobileTheme } from '@podji/design-tokens';

export interface NavigationBarProps {
  /**
   * Title to display in the navigation bar
   */
  title?: string;
  /**
   * Logo to display in the navigation bar
   */
  logo?: any;
  /**
   * Show notification icon
   */
  showNotification?: boolean;
  /**
   * Show search icon
   */
  showSearch?: boolean;
  /**
   * Notification press handler
   */
  onNotificationPress?: () => void;
  /**
   * Search press handler
   */
  onSearchPress?: () => void;
  /**
   * Additional style
   */
  style?: StyleProp<ViewStyle>;
}

/**
 * Top navigation bar component for mobile app
 */
export const NavigationBar: React.FC<NavigationBarProps> = ({
  title,
  logo,
  showNotification = false,
  showSearch = false,
  onNotificationPress,
  onSearchPress,
  style,
}) => {
  const [themeStyles, setThemeStyles] = useState({
    container: {},
    title: {},
    iconContainer: {},
    logo: {},
  });

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const theme = await getMobileTheme();
        setThemeStyles({
          container: {
            backgroundColor: theme.light.color.semantic.background.surface,
            borderBottomColor: theme.light.color.semantic.border.base,
            borderBottomWidth: 1,
            height: 60,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: theme.light.spacing.md,
          },
          title: {
            color: theme.light.color.semantic.text.primary,
            fontSize: theme.light.typography.fontSize.lg,
            fontWeight: theme.light.typography.fontWeight.bold,
          },
          iconContainer: {
            flexDirection: 'row',
            alignItems: 'center',
          },
          logo: {
            width: 40,
            height: 40,
            marginRight: theme.light.spacing.sm,
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
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {logo && <Image source={logo} style={themeStyles.logo} />}
        {title && <Text style={themeStyles.title}>{title}</Text>}
      </View>
      <View style={themeStyles.iconContainer}>
        {showNotification && (
          <TouchableOpacity onPress={onNotificationPress} style={{ marginRight: 16 }}>
            <Text>🔔</Text>
          </TouchableOpacity>
        )}
        {showSearch && (
          <TouchableOpacity onPress={onSearchPress}>
            <Text>🔍</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
