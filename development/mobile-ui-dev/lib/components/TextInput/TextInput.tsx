import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput as RNTextInput,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  TextInputProps as RNTextInputProps,
} from 'react-native';
import { getMobileTheme } from '@podji/design-tokens';

export interface TextInputProps extends Omit<RNTextInputProps, 'style'> {
  /**
   * Label for the input
   */
  label?: string;
  /**
   * Error message to display
   */
  error?: string;
  /**
   * Helper text to display
   */
  helperText?: string;
  /**
   * Whether the input is required
   */
  required?: boolean;
  /**
   * Whether the input is disabled
   */
  disabled?: boolean;
  /**
   * Input variant
   */
  variant?: 'outlined' | 'filled' | 'underlined';
  /**
   * Additional container style
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Additional input style
   */
  inputStyle?: StyleProp<TextStyle>;
  /**
   * Additional label style
   */
  labelStyle?: StyleProp<TextStyle>;
}

/**
 * Text input component for forms
 */
export const TextInput: React.FC<TextInputProps> = ({
  label,
  error,
  helperText,
  required = false,
  disabled = false,
  variant = 'outlined',
  containerStyle,
  inputStyle,
  labelStyle,
  ...rest
}) => {
  const [themeStyles, setThemeStyles] = useState({
    container: {},
    label: {},
    requiredAsterisk: {},
    input: {},
    outlinedInput: {},
    filledInput: {},
    underlinedInput: {},
    disabledInput: {},
    errorInput: {},
    helperText: {},
    errorText: {},
  });

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const theme = await getMobileTheme();
        setThemeStyles({
          container: {
            marginBottom: theme.light.spacing.md,
          },
          label: {
            fontSize: theme.light.typography.fontSize.sm,
            color: theme.light.color.semantic.text.primary,
            marginBottom: theme.light.spacing.xs,
          },
          requiredAsterisk: {
            color: theme.light.color.theme.secondary,
          },
          input: {
            fontSize: theme.light.typography.fontSize.md,
            color: theme.light.color.semantic.text.primary,
            paddingVertical: theme.light.spacing.sm,
            paddingHorizontal: theme.light.spacing.md,
          },
          outlinedInput: {
            borderWidth: 1,
            borderColor: theme.light.color.semantic.border.base,
            borderRadius: theme.light.borderRadius.sm,
          },
          filledInput: {
            backgroundColor: theme.light.color.primitive.grey[100],
            borderRadius: theme.light.borderRadius.sm,
            borderBottomWidth: 1,
            borderBottomColor: theme.light.color.semantic.border.base,
          },
          underlinedInput: {
            borderBottomWidth: 1,
            borderBottomColor: theme.light.color.semantic.border.base,
          },
          disabledInput: {
            backgroundColor: theme.light.color.primitive.grey[200],
            color: theme.light.color.semantic.text.disabled,
          },
          errorInput: {
            borderColor: theme.light.color.theme.secondary,
          },
          helperText: {
            fontSize: theme.light.typography.fontSize.xs,
            color: theme.light.color.semantic.text.secondary,
            marginTop: theme.light.spacing.xs,
          },
          errorText: {
            fontSize: theme.light.typography.fontSize.xs,
            color: theme.light.color.theme.secondary,
            marginTop: theme.light.spacing.xs,
          },
        });
      } catch (error) {
        console.error('Failed to load theme:', error);
      }
    };

    loadTheme();
  }, []);

  // Determine which variant style to use
  const getVariantStyle = () => {
    switch (variant) {
      case 'filled':
        return themeStyles.filledInput;
      case 'underlined':
        return themeStyles.underlinedInput;
      case 'outlined':
      default:
        return themeStyles.outlinedInput;
    }
  };

  return (
    <View style={[themeStyles.container, containerStyle]}>
      {label && (
        <Text style={[themeStyles.label, labelStyle]}>
          {label}
          {required && <Text style={themeStyles.requiredAsterisk}> *</Text>}
        </Text>
      )}
      <RNTextInput
        style={[
          themeStyles.input,
          getVariantStyle(),
          error && themeStyles.errorInput,
          disabled && themeStyles.disabledInput,
          inputStyle,
        ]}
        editable={!disabled}
        placeholderTextColor={disabled ? '#A0A0A0' : undefined}
        {...rest}
      />
      {helperText && !error && <Text style={themeStyles.helperText}>{helperText}</Text>}
      {error && <Text style={themeStyles.errorText}>{error}</Text>}
    </View>
  );
};
