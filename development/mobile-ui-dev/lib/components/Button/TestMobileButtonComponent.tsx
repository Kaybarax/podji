import type { ReactNode } from 'react';
import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';

// import { getTheme } from '@podji/configs';

export interface TestMobileButtonComponentProps {
  /**
   * Button contents
   */
  children: ReactNode;
  /**
   * Optional press handler
   */
  onPress?: () => void;
  /**
   * Button variant
   */
  variant?: 'primary' | 'secondary' | 'tertiary';
  /**
   * Button size
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Is the button disabled?
   */
  disabled?: boolean;
  /**
   * Additional style
   */
  style?: object;
}

/**
 * Mobile UI component for user interaction
 */
export const TestMobileButtonComponent: React.FC<TestMobileButtonComponentProps> = ({
  children,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  style = {},
}) => {
  const [themeStyles, _setThemeStyles] = useState({
    button: {},
    sizes: {
      small: {},
      medium: {},
      large: {},
    },
    variants: {
      primary: {},
      secondary: {},
      tertiary: {},
    },
    text: {},
    textPrimary: {},
    textTertiary: {},
    disabled: {},
  });

  // Size styles
  const sizeStyles = {
    small: themeStyles.sizes.small,
    medium: themeStyles.sizes.medium,
    large: themeStyles.sizes.large,
  };

  // Variant styles
  const variantStyles = {
    primary: themeStyles.variants.primary,
    secondary: themeStyles.variants.secondary,
    tertiary: themeStyles.variants.tertiary,
  };

  // Disabled style
  const disabledStyle = disabled ? themeStyles.disabled : {};

  return (
    <TouchableOpacity
      style={[themeStyles.button, sizeStyles[size], variantStyles[variant], disabledStyle, style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={[themeStyles.text, variant === 'tertiary' ? themeStyles.textTertiary : themeStyles.textPrimary]}>
        {children as any}
      </Text>
    </TouchableOpacity>
  );
};
