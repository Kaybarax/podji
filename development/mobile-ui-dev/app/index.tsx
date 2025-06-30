import { useState, useRef, JSX } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { TestMobileButtonComponent } from '../lib/components/Button/TestMobileButtonComponent';
import { Checkbox } from '../lib/components/Checkbox/Checkbox';
import { RadioButton } from '../lib/components/RadioButton/RadioButton';
import { TextInput } from '../lib/components/TextInput/TextInput';
import { Toggle } from '../lib/components/Toggle/Toggle';
import { Slider } from '../lib/components/Slider/Slider';
import { Dropdown } from '../lib/components/Dropdown/Dropdown';
import { FloatingActionButton } from '../lib/components/FloatingActionButton/FloatingActionButton';
import { ComponentType, ReactNode } from 'react';

// Define types for component props
interface ComponentProps {
  [key: string]: any;
}

// Define types for component variants and sizes
interface ComponentVariant {
  [size: string]: ComponentProps;
}

// Define types for component props by variant
interface ComponentPropsByVariant {
  [variant: string]: ComponentProps | ComponentVariant;
}

// Define the structure for a component in the COMPONENTS array
interface ComponentItem {
  id: string;
  name: string;
  component: ComponentType<any>;
  variants: string[];
  sizes: string[];
  props?: ComponentPropsByVariant;
}

// List of available components
const COMPONENTS: ComponentItem[] = [
  {
    id: 'button',
    name: 'TestMobileButtonComponent',
    component: TestMobileButtonComponent,
    variants: ['primary', 'secondary', 'tertiary'],
    sizes: ['small', 'medium', 'large'],
    props: {
      primary: {
        small: { variant: 'primary', size: 'small', children: 'Primary Small' },
        medium: { variant: 'primary', size: 'medium', children: 'Primary Medium' },
        large: { variant: 'primary', size: 'large', children: 'Primary Large' },
      },
      secondary: {
        small: { variant: 'secondary', size: 'small', children: 'Secondary Small' },
        medium: { variant: 'secondary', size: 'medium', children: 'Secondary Medium' },
        large: { variant: 'secondary', size: 'large', children: 'Secondary Large' },
      },
      tertiary: {
        small: { variant: 'tertiary', size: 'small', children: 'Tertiary Small' },
        medium: { variant: 'tertiary', size: 'medium', children: 'Tertiary Medium' },
        large: { variant: 'tertiary', size: 'large', children: 'Tertiary Large' },
      },
    },
  },
  {
    id: 'checkbox',
    name: 'Checkbox',
    component: Checkbox,
    variants: ['default', 'disabled'],
    sizes: ['default'],
    props: {
      default: { checked: true, onValueChange: () => {}, label: 'Checkbox' },
      disabled: { checked: true, onValueChange: () => {}, label: 'Disabled Checkbox', disabled: true },
    },
  },
  {
    id: 'radioButton',
    name: 'RadioButton',
    component: RadioButton,
    variants: ['default', 'disabled'],
    sizes: ['default'],
    props: {
      default: { selected: true, onValueChange: () => {}, label: 'Radio Button' },
      disabled: { selected: true, onValueChange: () => {}, label: 'Disabled Radio Button', disabled: true },
    },
  },
  {
    id: 'textInput',
    name: 'TextInput',
    component: TextInput,
    variants: ['outlined', 'filled', 'underlined'],
    sizes: ['default'],
    props: {
      outlined: { label: 'Outlined Input', placeholder: 'Type here...' },
      filled: { label: 'Filled Input', placeholder: 'Type here...', variant: 'filled' },
      underlined: { label: 'Underlined Input', placeholder: 'Type here...', variant: 'underlined' },
    },
  },
  {
    id: 'toggle',
    name: 'Toggle',
    component: Toggle,
    variants: ['default', 'disabled'],
    sizes: ['default'],
    props: {
      default: { value: true, onValueChange: () => {}, label: 'Toggle' },
      disabled: { value: true, onValueChange: () => {}, label: 'Disabled Toggle', disabled: true },
    },
  },
  {
    id: 'slider',
    name: 'Slider',
    component: Slider,
    variants: ['default', 'disabled'],
    sizes: ['default'],
    props: {
      default: { value: 50, onValueChange: () => {}, minimumValue: 0, maximumValue: 100 },
      disabled: { value: 50, onValueChange: () => {}, minimumValue: 0, maximumValue: 100, disabled: true },
    },
  },
  {
    id: 'dropdown',
    name: 'Dropdown',
    component: Dropdown,
    variants: ['default', 'disabled'],
    sizes: ['default'],
    props: {
      default: {
        items: [
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
        ],
        selectedValue: '1',
        onValueChange: () => {},
      },
      disabled: {
        items: [
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
        ],
        selectedValue: '1',
        onValueChange: () => {},
        disabled: true,
      },
    },
  },
  {
    id: 'floatingActionButton',
    name: 'FloatingActionButton',
    component: FloatingActionButton,
    variants: ['primary', 'secondary'],
    sizes: ['default'],
    props: {
      primary: { icon: '➕' },
      secondary: { icon: '➕', variant: 'secondary' },
    },
  },
  // More complex components like Modal, Toast, FeedCard, NavigationBar, BottomTabNavigator
  // may require special handling and are not included in the basic display
];

export default function Index(): JSX.Element {
  const [selectedComponent, setSelectedComponent] = useState<ComponentItem>(COMPONENTS[0]);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(true);
  const drawerAnimation = useRef<Animated.Value>(new Animated.Value(1)).current;

  const toggleDrawer = (): void => {
    const toValue = isDrawerOpen ? 0 : 1;
    Animated.timing(drawerAnimation, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setIsDrawerOpen(!isDrawerOpen);
  };

  const renderComponentVariants = (): JSX.Element | null => {
    if (!selectedComponent) return null;

    const { component: Component, variants, sizes, props } = selectedComponent;

    return (
      <View style={styles.variantsContainer}>
        <Text style={styles.componentTitle}>{selectedComponent.name}</Text>

        {variants.map((variant: string) => (
          <View key={variant} style={styles.variantSection}>
            <Text style={styles.variantTitle}>{variant}</Text>
            <View style={styles.sizesRow}>
              {sizes.map((size: string) => {
                // Check if this component has nested props by size
                const hasNestedProps =
                  props && props[variant] && typeof props[variant] === 'object' && props[variant][size];
                const componentProps = hasNestedProps
                  ? props[variant][size]
                  : props
                  ? props[variant]
                  : { variant, size };

                return (
                  <View key={`${variant}-${size}`} style={styles.componentWrapper}>
                    <Text style={styles.sizeLabel}>{size}</Text>
                    <Component {...componentProps}>
                      {componentProps.children || (selectedComponent.id === 'button' ? `${variant} ${size}` : null)}
                    </Component>
                  </View>
                );
              })}
            </View>
          </View>
        ))}
      </View>
    );
  };

  // Calculate drawer width based on animation value
  const drawerWidth: Animated.AnimatedInterpolation<any> = drawerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 250],
  });

  return (
    <View style={styles.container}>
      {/* Left Drawer */}
      <Animated.View style={[styles.drawer, { width: drawerWidth }]}>
        <Text style={styles.drawerTitle}>Components</Text>
        <ScrollView>
          {COMPONENTS.map((comp: ComponentItem) => (
            <TouchableOpacity
              key={comp.id}
              style={[styles.componentItem, selectedComponent.id === comp.id && styles.selectedComponentItem]}
              onPress={() => setSelectedComponent(comp)}
            >
              <Text
                style={[styles.componentItemText, selectedComponent.id === comp.id && styles.selectedComponentItemText]}
              >
                {comp.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View>

      {/* Main Content Area */}
      <View style={styles.contentContainer}>
        <TouchableOpacity onPress={toggleDrawer} style={styles.drawerToggle}>
          <Text style={styles.drawerToggleText}>{isDrawerOpen ? '◀' : '▶'}</Text>
        </TouchableOpacity>
        <ScrollView style={styles.content}>{renderComponentVariants()}</ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
  },
  drawer: {
    backgroundColor: '#fff',
    borderRightWidth: 1,
    borderRightColor: '#e0e0e0',
    padding: 16,
    overflow: 'hidden',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  drawerToggle: {
    width: 30,
    height: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  drawerToggleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
  drawerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  componentItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedComponentItem: {
    backgroundColor: '#e6f7ff',
  },
  componentItemText: {
    fontSize: 16,
    color: '#333',
  },
  selectedComponentItemText: {
    color: '#1890ff',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    padding: 24,
    paddingLeft: 16,
  },
  componentTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
  },
  variantsContainer: {
    flex: 1,
  },
  variantSection: {
    marginBottom: 32,
  },
  variantTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
    textTransform: 'capitalize',
  },
  sizesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,
  },
  componentWrapper: {
    alignItems: 'center',
  },
  sizeLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    textTransform: 'capitalize',
  },
});
