import * as React from 'react';
import { Text, TouchableOpacity, StyleSheet, StyleProp, TextStyle } from 'react-native';
import { getMobileTheme } from '@podji/design-tokens';
import { LinkProps, defaultLinkProps } from './types';

/**
 * Link component for mobile applications
 */
export const Link = ({
  children,
  href,
  variant = defaultLinkProps.variant,
  disabled = defaultLinkProps.disabled,
  onPress,
  style,
  testID,
}: LinkProps) => {
  const [themeStyles, setThemeStyles] = React.useState<{
    link: StyleProp<TextStyle>;
    linkDisabled: StyleProp<TextStyle>;
  }>({
    link: {},
    linkDisabled: {},
  });

  React.useEffect(() => {
    const loadTheme = async () => {
      try {
        const theme = await getMobileTheme();
        setThemeStyles({
          link: {
            color: variant === 'primary' 
              ? theme.light.color.component.link.text.base
              : theme.light.color.semantic.text.secondary,
            textDecorationLine: 'underline',
            fontSize: theme.light.typography.fontSize.md,
          },
          linkDisabled: {
            color: theme.light.color.component.link.text.disabled,
            textDecorationLine: 'underline',
            fontSize: theme.light.typography.fontSize.md,
            opacity: 0.6,
          },
        });
      } catch (error) {
        console.error('Failed to load theme:', error);
      }
    };

    loadTheme();
  }, [variant]);

  const handlePress = () => {
    if (!disabled && onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity 
      onPress={handlePress} 
      disabled={disabled}
      accessibilityRole="link"
      accessibilityHint={`Navigate to ${href}`}
      testID={testID}
    >
      <Text 
        style={[
          disabled ? themeStyles.linkDisabled : themeStyles.link,
          style
        ]}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};