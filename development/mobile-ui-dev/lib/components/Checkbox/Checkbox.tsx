import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { getMobileTheme } from '@podji/design-tokens';

export interface CheckboxProps {
  /**
   * Whether the checkbox is checked
   */
  checked: boolean;
  /**
   * Checkbox change handler
   */
  onValueChange: (checked: boolean) => void;
  /**
   * Label for the checkbox
   */
  label?: string;
  /**
   * Label position
   */
  labelPosition?: 'left' | 'right';
  /**
   * Whether the checkbox is disabled
   */
  disabled?: boolean;
  /**
   * Additional container style
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Additional checkbox style
   */
  checkboxStyle?: StyleProp<ViewStyle>;
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
 * Checkbox component for boolean inputs
 */
export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onValueChange,
  label,
  labelPosition = 'right',
  disabled = false,
  containerStyle,
  checkboxStyle,
  labelStyle,
  testID,
}) => {
  const [themeStyles, setThemeStyles] = useState({
    container: {},
    checkbox: {},
    checkboxChecked: {},
    checkboxUnchecked: {},
    checkboxDisabled: {},
    checkmark: {},
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
          checkbox: {
            width: 24,
            height: 24,
            borderRadius: theme.light.borderRadius.sm,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 2,
          },
          checkboxChecked: {
            backgroundColor: theme.light.color.theme.primary,
            borderColor: theme.light.color.theme.primary,
          },
          checkboxUnchecked: {
            backgroundColor: 'transparent',
            borderColor: theme.light.color.semantic.border.base,
          },
          checkboxDisabled: {
            backgroundColor: theme.light.color.primitive.grey[200],
            borderColor: theme.light.color.primitive.grey[300],
          },
          checkmark: {
            color: theme.light.color.primitive.white,
            fontSize: 16,
            fontWeight: 'bold',
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
    if (!disabled) {
      onValueChange(!checked);
    }
  };

  return (
    <View style={[themeStyles.container, containerStyle]}>
      <TouchableOpacity activeOpacity={0.8} onPress={handleToggle} disabled={disabled} testID={testID}>
        <View
          style={[
            themeStyles.checkbox,
            checked ? themeStyles.checkboxChecked : themeStyles.checkboxUnchecked,
            disabled && themeStyles.checkboxDisabled,
            checkboxStyle,
          ]}
        >
          {checked && <Text style={themeStyles.checkmark}>✓</Text>}
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
