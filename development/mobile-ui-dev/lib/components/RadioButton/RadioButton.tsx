import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { getMobileTheme } from '@podji/design-tokens';

export interface RadioButtonProps {
  /**
   * Whether the radio button is selected
   */
  selected: boolean;
  /**
   * Radio button change handler
   */
  onValueChange: (selected: boolean) => void;
  /**
   * Label for the radio button
   */
  label?: string;
  /**
   * Label position
   */
  labelPosition?: 'left' | 'right';
  /**
   * Whether the radio button is disabled
   */
  disabled?: boolean;
  /**
   * Additional container style
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Additional radio button style
   */
  radioStyle?: StyleProp<ViewStyle>;
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
 * Radio button component for selection inputs
 */
export const RadioButton: React.FC<RadioButtonProps> = ({
  selected,
  onValueChange,
  label,
  labelPosition = 'right',
  disabled = false,
  containerStyle,
  radioStyle,
  labelStyle,
  testID,
}) => {
  const [themeStyles, setThemeStyles] = useState({
    container: {},
    radio: {},
    radioSelected: {},
    radioUnselected: {},
    radioDisabled: {},
    innerCircle: {},
    label: {},
    labelDisabled: {},
  });

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
          radio: {
            width: 24,
            height: 24,
            borderRadius: 12,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 2,
          },
          radioSelected: {
            borderColor: theme.light.color.theme.primary,
          },
          radioUnselected: {
            borderColor: theme.light.color.semantic.border.base,
          },
          radioDisabled: {
            borderColor: theme.light.color.primitive.grey[300],
          },
          innerCircle: {
            width: 12,
            height: 12,
            borderRadius: 6,
            backgroundColor: theme.light.color.theme.primary,
          },
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

  const handleToggle = () => {
    if (!disabled && !selected) {
      onValueChange(true);
    }
  };

  return (
    <View style={[themeStyles.container, containerStyle]}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleToggle}
        disabled={disabled}
        testID={testID}
      >
        <View
          style={[
            themeStyles.radio,
            selected ? themeStyles.radioSelected : themeStyles.radioUnselected,
            disabled && themeStyles.radioDisabled,
            radioStyle,
          ]}
        >
          {selected && <View style={themeStyles.innerCircle} />}
        </View>
      </TouchableOpacity>
      {label && (
        <Text 
          style={[themeStyles.label, disabled && themeStyles.labelDisabled, labelStyle]}
          onPress={!disabled ? handleToggle : undefined}
        >
          {label}
        </Text>
      )}
    </View>
  );
};