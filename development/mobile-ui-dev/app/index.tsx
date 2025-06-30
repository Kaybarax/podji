import { useState, useRef } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Animated, Dimensions } from 'react-native';
import { TestMobileButtonComponent } from '../lib/components/Button/TestMobileButtonComponent';

// List of available components
const COMPONENTS = [
  {
    id: 'button',
    name: 'TestMobileButtonComponent',
    component: TestMobileButtonComponent,
    variants: ['primary', 'secondary', 'tertiary'],
    sizes: ['small', 'medium', 'large'],
  },
  // Add more components here as they are developed
];

export default function Index() {
  const [selectedComponent, setSelectedComponent] = useState(COMPONENTS[0]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const drawerAnimation = useRef(new Animated.Value(1)).current;

  const toggleDrawer = () => {
    const toValue = isDrawerOpen ? 0 : 1;
    Animated.timing(drawerAnimation, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setIsDrawerOpen(!isDrawerOpen);
  };

  const renderComponentVariants = () => {
    if (!selectedComponent) return null;

    const { component: Component, variants, sizes } = selectedComponent;

    return (
      <View style={styles.variantsContainer}>
        <Text style={styles.componentTitle}>{selectedComponent.name}</Text>

        {variants.map(variant => (
          <View key={variant} style={styles.variantSection}>
            <Text style={styles.variantTitle}>{variant}</Text>
            <View style={styles.sizesRow}>
              {sizes.map(size => (
                <View key={`${variant}-${size}`} style={styles.componentWrapper}>
                  <Text style={styles.sizeLabel}>{size}</Text>
                  <Component variant={variant} size={size}>
                    {`${variant} ${size}`}
                  </Component>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    );
  };

  // Calculate drawer width based on animation value
  const drawerWidth = drawerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 250],
  });

  return (
    <View style={styles.container}>
      {/* Left Drawer */}
      <Animated.View style={[styles.drawer, { width: drawerWidth }]}>
        <Text style={styles.drawerTitle}>Components</Text>
        <ScrollView>
          {COMPONENTS.map(comp => (
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
