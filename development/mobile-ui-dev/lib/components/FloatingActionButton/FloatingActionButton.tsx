import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, StyleProp, ViewStyle } from 'react-native';
import { getMobileTheme } from '@podji/design-tokens';

export interface FloatingActionButtonProps {
  /**
   * Icon to display in the button (emoji or component)
   */
  icon: React.ReactNode;
  /**
   * Button press handler
   */
  onPress: () => void;
  /**
   * Position of the button
   */
  position?: 'bottomRight' | 'bottomLeft' | 'topRight' | 'topLeft';
  /**
   * Size of the button
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Additional style
   */
  style?: StyleProp<ViewStyle>;
}

/**
 * Floating action button component for quick actions
 */
export const FloatingActionButton = ({
  icon,
  onPress,
  position = 'bottomRight',
  size = 'medium',
  style,
}: FloatingActionButtonProps) => {
  const [themeStyles, setThemeStyles] = useState({
    button: {},
    sizes: {
      small: {},
      medium: {},
      large: {},
    },
    positions: {
      bottomRight: {},
      bottomLeft: {},
      topRight: {},
      topLeft: {},
    },
    icon: {},
  });

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const theme = await getMobileTheme();
        setThemeStyles({
          button: {
            backgroundColor: theme.light.color.theme.primary,
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 6,
            shadowColor: theme.light.color.primitive.black,
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.27,
            shadowRadius: 4.65,
            position: 'absolute',
          },
          sizes: {
            small: {
              width: 40,
              height: 40,
            },
            medium: {
              width: 56,
              height: 56,
            },
            large: {
              width: 72,
              height: 72,
            },
          },
          positions: {
            bottomRight: {
              bottom: theme.light.spacing.lg,
              right: theme.light.spacing.lg,
            },
            bottomLeft: {
              bottom: theme.light.spacing.lg,
              left: theme.light.spacing.lg,
            },
            topRight: {
              top: theme.light.spacing.lg,
              right: theme.light.spacing.lg,
            },
            topLeft: {
              top: theme.light.spacing.lg,
              left: theme.light.spacing.lg,
            },
          },
          icon: {
            fontSize: size === 'small' ? 18 : size === 'medium' ? 24 : 32,
            color: theme.light.color.semantic.text.primary,
          },
        });
      } catch (error) {
        console.error('Failed to load theme:', error);
      }
    };

    loadTheme();
  }, [size]);

  return (
    <TouchableOpacity
      style={[themeStyles.button, themeStyles.sizes[size], themeStyles.positions[position], style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {typeof icon === 'string' ? <Text style={themeStyles.icon}>{icon}</Text> : <>{icon}</>}
    </TouchableOpacity>
  );
};
