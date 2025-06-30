import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Animated, StyleSheet, Text, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { getMobileTheme } from '@podji/design-tokens';

export interface ToggleProps {
  /**
   * Whether the toggle is on
   */
  value: boolean;
  /**
   * Toggle change handler
   */
  onValueChange: (value: boolean) => void;
  /**
   * Label for the toggle
   */
  label?: string;
  /**
   * Label position
   */
  labelPosition?: 'left' | 'right';
  /**
   * Whether the toggle is disabled
   */
  disabled?: boolean;
  /**
   * Additional container style
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Additional toggle style
   */
  toggleStyle?: StyleProp<ViewStyle>;
  /**
   * Additional label style
   */
  labelStyle?: StyleProp<TextStyle>;
  /**
   * Test ID for testing
   */
  testID?: string;
}

/**
 * Toggle/Switch component for boolean inputs
 */
export const Toggle: React.FC<ToggleProps> = ({
  value,
  onValueChange,
  label,
  labelPosition = 'right',
  disabled = false,
  containerStyle,
  toggleStyle,
  labelStyle,
  testID,
}) => {
  const [themeStyles, setThemeStyles] = useState({
    container: {},
    toggle: {},
    toggleOn: {},
    toggleOff: {},
    toggleDisabled: {},
    thumb: {},
    thumbOn: {},
    thumbOff: {},
    label: {},
    labelDisabled: {},
  });

  // Animation value for the thumb position
  const [thumbPosition] = useState(new Animated.Value(value ? 1 : 0));

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const theme = await getMobileTheme();
        setThemeStyles({
          container: {
            flexDirection: labelPosition === 'left' ? 'row-reverse' : 'row',
            alignItems: 'center',
            opacity: disabled ? 0.6 : 1,
          },
          toggle: {
            width: 50,
            height: 30,
            borderRadius: 15,
            padding: 2,
            justifyContent: 'center',
          },
          toggleOn: {
            backgroundColor: theme.light.color.theme.primary,
          },
          toggleOff: {
            backgroundColor: theme.light.color.primitive.grey[300],
          },
          toggleDisabled: {
            backgroundColor: theme.light.color.primitive.grey[200],
          },
          thumb: {
            width: 26,
            height: 26,
            borderRadius: 13,
            backgroundColor: theme.light.color.primitive.white,
            shadowColor: theme.light.color.primitive.black,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 2,
            elevation: 2,
          },
          thumbOn: {},
          thumbOff: {},
          label: {
            fontSize: theme.light.typography.fontSize.md,
            color: theme.light.color.semantic.text.primary,
            marginLeft: labelPosition === 'right' ? theme.light.spacing.sm : 0,
            marginRight: labelPosition === 'left' ? theme.light.spacing.sm : 0,
          },
          labelDisabled: {
            color: theme.light.color.semantic.text.disabled,
          },
        });
      } catch (error) {
        console.error('Failed to load theme:', error);
      }
    };

    loadTheme();
  }, [labelPosition]);

  // Update animation when value changes
  useEffect(() => {
    Animated.timing(thumbPosition, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [value, thumbPosition]);

  const handleToggle = () => {
    if (!disabled) {
      onValueChange(!value);
    }
  };

  // Calculate the position of the thumb based on the animation value
  const thumbLeft = thumbPosition.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 22], // Left position when off, right position when on
  });

  return (
    <View style={[themeStyles.container, containerStyle]}>
      {label && (
        <Text style={[themeStyles.label, disabled && themeStyles.labelDisabled, labelStyle]}>
          {label}
        </Text>
      )}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleToggle}
        disabled={disabled}
        testID={testID}
      >
        <View
          style={[
            themeStyles.toggle,
            value ? themeStyles.toggleOn : themeStyles.toggleOff,
            disabled && themeStyles.toggleDisabled,
            toggleStyle,
          ]}
        >
          <Animated.View
            style={[
              themeStyles.thumb,
              value ? themeStyles.thumbOn : themeStyles.thumbOff,
              { left: thumbLeft },
            ]}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};
