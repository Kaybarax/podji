import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleProp,
  ViewStyle,
  TextStyle,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import { getMobileTheme } from '@podji/design-tokens';

export interface DropdownItem {
  /**
   * Unique identifier for the item
   */
  value: string | number;
  /**
   * Display label for the item
   */
  label: string;
  /**
   * Optional icon for the item
   */
  icon?: React.ReactNode;
  /**
   * Whether the item is disabled
   */
  disabled?: boolean;
}

export interface DropdownProps {
  /**
   * Array of items to display in the dropdown
   */
  items: DropdownItem[];
  /**
   * Currently selected item value
   */
  selectedValue?: string | number;
  /**
   * Callback when an item is selected
   */
  onValueChange: (value: string | number) => void;
  /**
   * Placeholder text when no item is selected
   */
  placeholder?: string;
  /**
   * Label for the dropdown
   */
  label?: string;
  /**
   * Whether the dropdown is disabled
   */
  disabled?: boolean;
  /**
   * Error message to display
   */
  error?: string;
  /**
   * Helper text to display
   */
  helperText?: string;
  /**
   * Additional container style
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Additional dropdown style
   */
  dropdownStyle?: StyleProp<ViewStyle>;
  /**
   * Additional label style
   */
  labelStyle?: StyleProp<TextStyle>;
  /**
   * Additional item style
   */
  itemStyle?: StyleProp<ViewStyle>;
  /**
   * Additional item text style
   */
  itemTextStyle?: StyleProp<TextStyle>;
  /**
   * Test ID for testing
   */
  testID?: string;
}

/**
 * Dropdown component for selecting an item from a list
 */
export const Dropdown: React.FC<DropdownProps> = ({
  items,
  selectedValue,
  onValueChange,
  placeholder = 'Select an option',
  label,
  disabled = false,
  error,
  helperText,
  containerStyle,
  dropdownStyle,
  labelStyle,
  itemStyle,
  itemTextStyle,
  testID,
}) => {
  const [themeStyles, setThemeStyles] = useState({
    container: {},
    label: {},
    dropdown: {},
    dropdownDisabled: {},
    dropdownError: {},
    selectedText: {},
    placeholderText: {},
    disabledText: {},
    icon: {},
    modalContainer: {},
    modalContent: {},
    itemContainer: {},
    itemText: {},
    selectedItemContainer: {},
    selectedItemText: {},
    disabledItemContainer: {},
    disabledItemText: {},
    helperText: {},
    errorText: {},
  });

  const [isOpen, setIsOpen] = useState(false);
  const [modalHeight] = useState(new Animated.Value(0));
  const [modalOpacity] = useState(new Animated.Value(0));
  const windowHeight = Dimensions.get('window').height;

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
          dropdown: {
            height: 48,
            borderWidth: 1,
            borderColor: theme.light.color.semantic.border.base,
            borderRadius: theme.light.borderRadius.sm,
            paddingHorizontal: theme.light.spacing.md,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          },
          dropdownDisabled: {
            backgroundColor: theme.light.color.primitive.grey[200],
            borderColor: theme.light.color.primitive.grey[300],
          },
          dropdownError: {
            borderColor: theme.light.color.theme.secondary,
          },
          selectedText: {
            fontSize: theme.light.typography.fontSize.md,
            color: theme.light.color.semantic.text.primary,
          },
          placeholderText: {
            color: theme.light.color.semantic.text.secondary,
          },
          disabledText: {
            color: theme.light.color.semantic.text.disabled,
          },
          icon: {
            fontSize: 16,
            color: theme.light.color.semantic.text.secondary,
          },
          modalContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          modalContent: {
            width: '90%',
            maxHeight: windowHeight * 0.7,
            backgroundColor: theme.light.color.semantic.background.surface,
            borderRadius: theme.light.borderRadius.md,
            overflow: 'hidden',
            shadowColor: theme.light.color.primitive.black,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          },
          itemContainer: {
            padding: theme.light.spacing.md,
            borderBottomWidth: 1,
            borderBottomColor: theme.light.color.semantic.border.base,
            flexDirection: 'row',
            alignItems: 'center',
          },
          itemText: {
            fontSize: theme.light.typography.fontSize.md,
            color: theme.light.color.semantic.text.primary,
            marginLeft: theme.light.spacing.sm,
          },
          selectedItemContainer: {
            backgroundColor: theme.light.color.primitive.grey[100],
          },
          selectedItemText: {
            color: theme.light.color.theme.primary,
            fontWeight: theme.light.typography.fontWeight.bold,
          },
          disabledItemContainer: {
            opacity: 0.5,
          },
          disabledItemText: {
            color: theme.light.color.semantic.text.disabled,
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
  }, [windowHeight]);

  const openDropdown = () => {
    if (disabled) return;

    setIsOpen(true);
    Animated.parallel([
      Animated.timing(modalHeight, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(modalOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const closeDropdown = () => {
    Animated.parallel([
      Animated.timing(modalHeight, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(modalOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start(() => {
      setIsOpen(false);
    });
  };

  const handleSelectItem = (item: DropdownItem) => {
    if (item.disabled) return;

    onValueChange(item.value);
    closeDropdown();
  };

  const selectedItem = items.find(item => item.value === selectedValue);

  const renderItem = ({ item }: { item: DropdownItem }) => {
    const isSelected = item.value === selectedValue;

    return (
      <TouchableOpacity
        style={[
          themeStyles.itemContainer,
          isSelected && themeStyles.selectedItemContainer,
          item.disabled && themeStyles.disabledItemContainer,
          itemStyle,
        ]}
        onPress={() => handleSelectItem(item)}
        disabled={item.disabled}
      >
        {item.icon && <>{item.icon}</>}
        <Text
          style={[
            themeStyles.itemText,
            isSelected && themeStyles.selectedItemText,
            item.disabled && themeStyles.disabledItemText,
            itemTextStyle,
          ]}
        >
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[themeStyles.container, containerStyle]} testID={testID}>
      {label && <Text style={[themeStyles.label, labelStyle]}>{label}</Text>}

      <TouchableOpacity
        style={[
          themeStyles.dropdown,
          disabled && themeStyles.dropdownDisabled,
          error && themeStyles.dropdownError,
          dropdownStyle,
        ]}
        onPress={openDropdown}
        disabled={disabled}
      >
        <Text
          style={[
            themeStyles.selectedText,
            !selectedItem && themeStyles.placeholderText,
            disabled && themeStyles.disabledText,
          ]}
        >
          {selectedItem ? selectedItem.label : placeholder}
        </Text>
        <Text style={themeStyles.icon}>▼</Text>
      </TouchableOpacity>

      {helperText && !error && <Text style={themeStyles.helperText}>{helperText}</Text>}

      {error && <Text style={themeStyles.errorText}>{error}</Text>}

      <Modal visible={isOpen} transparent animationType="none" onRequestClose={closeDropdown}>
        <TouchableWithoutFeedback onPress={closeDropdown}>
          <Animated.View style={[themeStyles.modalContainer, { opacity: modalOpacity }]}>
            <Animated.View
              style={[
                themeStyles.modalContent,
                {
                  transform: [
                    {
                      translateY: modalHeight.interpolate({
                        inputRange: [0, 1],
                        outputRange: [300, 0],
                      }),
                    },
                  ],
                },
              ]}
            >
              <FlatList data={items} renderItem={renderItem} keyExtractor={item => item.value.toString()} />
            </Animated.View>
          </Animated.View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};
