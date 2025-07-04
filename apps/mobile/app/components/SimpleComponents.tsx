import React from 'react';
import { TextInput as RNTextInput, View, Text, StyleSheet } from 'react-native';

interface SimpleTextInputProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  style?: any;
}

export const SimpleTextInput: React.FC<SimpleTextInputProps> = ({ placeholder, value, onChangeText, style }) => {
  return (
    <View style={[styles.container, style]}>
      <RNTextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#666"
      />
    </View>
  );
};

interface SimpleDropdownProps {
  items: Array<{ label: string; value: string }>;
  selectedValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  width?: number;
}

export const SimpleDropdown: React.FC<SimpleDropdownProps> = ({
  items,
  selectedValue,
  onValueChange,
  placeholder,
  width,
}) => {
  return (
    <View style={[styles.dropdown, { width }]}>
      <Text style={styles.dropdownText}>
        {selectedValue ? items.find(item => item.value === selectedValue)?.label : placeholder}
      </Text>
    </View>
  );
};

interface SimpleModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const SimpleModal: React.FC<SimpleModalProps> = ({ visible, onClose, title, children }) => {
  if (!visible) return null;

  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        {title && <Text style={styles.modalTitle}>{title}</Text>}
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  input: {
    fontSize: 16,
    color: '#333',
    padding: 0,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    margin: 20,
    minWidth: 300,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
});
