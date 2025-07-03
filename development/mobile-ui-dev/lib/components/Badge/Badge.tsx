import * as React from 'react';
import { View, Text, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { getMobileTheme } from '@podji/design-tokens';
import { BadgeProps, defaultBadgeProps } from './types';

/**
 * Badge component for mobile applications
 */
export const Badge = ({
  variant = defaultBadgeProps.variant,
  size = defaultBadgeProps.size,
  content,
  visible = defaultBadgeProps.visible,
  max = defaultBadgeProps.max,
  dot = defaultBadgeProps.dot,
  style,
  testID,
}: // children prop is intentionally not used to avoid ReactNode type issues
BadgeProps) => {
  const [themeStyles, setThemeStyles] = React.useState<{
    badge: StyleProp<ViewStyle>;
    text: StyleProp<TextStyle>;
    container: StyleProp<ViewStyle>;
  }>({
    badge: {},
    text: {},
    container: {},
  });

  React.useEffect(() => {
    const loadTheme = async () => {
      try {
        const theme = await getMobileTheme();

        // Determine badge size
        const badgeSize = {
          small: 16,
          medium: 20,
          large: 24,
        }[size || 'medium'];

        // Determine font size
        const fontSize = {
          small: theme.light.typography.fontSize.xs,
          medium: theme.light.typography.fontSize.sm,
          large: theme.light.typography.fontSize.md,
        }[size || 'medium'];

        // Determine background color based on variant
        let backgroundColor;
        switch (variant) {
          case 'success':
            backgroundColor = theme.light.color.component.badge.background.success;
            break;
          case 'error':
            backgroundColor = theme.light.color.component.badge.background.error;
            break;
          case 'warning':
            backgroundColor = theme.light.color.component.badge.background.warning;
            break;
          case 'info':
            backgroundColor = theme.light.color.component.badge.background.info;
            break;
          default:
            backgroundColor = theme.light.color.component.badge.background.base;
        }

        setThemeStyles({
          badge: {
            backgroundColor,
            borderRadius: dot ? badgeSize / 2 : badgeSize / 2,
            minWidth: dot ? badgeSize : badgeSize,
            height: badgeSize,
            paddingHorizontal: dot ? 0 : 4,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: -badgeSize / 2,
            right: -badgeSize / 2,
            zIndex: 1,
          },
          text: {
            color: theme.light.color.component.badge.text.base,
            fontSize,
            fontWeight: 'bold',
            textAlign: 'center',
          },
          container: {
            position: 'relative',
            display: 'flex',
            flexDirection: 'row',
          },
        });
      } catch (error) {
        console.error('Failed to load theme:', error);
      }
    };

    loadTheme();
  }, [variant, size, dot]);

  if (!visible) {
    return <React.Fragment>{null /* This is a workaround for the ReactNode type issue */}</React.Fragment>;
  }

  // Format content if it's a number
  const formattedContent = () => {
    if (dot) return null;
    if (typeof content === 'number' && max && content > max) {
      return `${max}+`;
    }
    return content;
  };

  return (
    <View style={themeStyles.container} testID={testID}>
      <React.Fragment>{null /* This is a workaround for the ReactNode type issue */}</React.Fragment>
      <View style={[themeStyles.badge, style]}>
        {!dot && <Text style={themeStyles.text}>{String(formattedContent())}</Text>}
      </View>
    </View>
  );
};
