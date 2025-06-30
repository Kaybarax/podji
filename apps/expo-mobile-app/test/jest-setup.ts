import '@testing-library/jest-dom';

// Define __DEV__ global variable
global.__DEV__ = true;

// Mock React Query
jest.mock('@tanstack/react-query', () => {
  const original = jest.requireActual('@tanstack/react-query');
  return {
    ...original,
    QueryClient: jest.fn().mockImplementation(() => ({
      ...original.QueryClient.prototype,
      setDefaultOptions: jest.fn(),
      mount: jest.fn(),
      unmount: jest.fn(),
    })),
    QueryClientProvider: ({ children }) => children,
  };
});

// Mock React Native components
jest.mock('react-native', () => {
  // Create a mock implementation instead of requiring the actual module
  return {
    // Basic components
    View: 'View',
    Text: 'Text',
    TextInput: 'TextInput',
    ScrollView: 'ScrollView',
    TouchableOpacity: 'TouchableOpacity',
    Image: 'Image',

    // Mock UIManager
    UIManager: {
      RCTView: {
        Constants: {},
      },
      getViewManagerConfig: jest.fn(() => ({
        Commands: {},
      })),
    },

    // Mock Animated
    Animated: {
      View: 'Animated.View',
      Text: 'Animated.Text',
      Image: 'Animated.Image',
      createAnimatedComponent: jest.fn(component => component),
      timing: jest.fn(() => ({
        start: jest.fn(callback => callback && callback({ finished: true })),
      })),
      spring: jest.fn(() => ({
        start: jest.fn(callback => callback && callback({ finished: true })),
      })),
      Value: jest.fn(() => ({
        setValue: jest.fn(),
        interpolate: jest.fn(() => ({
          interpolate: jest.fn(),
        })),
      })),
    },

    // Mock NativeAnimatedHelper
    NativeAnimatedHelper: {
      API: null,
      addListener: jest.fn(),
      removeListeners: jest.fn(),
    },

    // Mock StyleSheet
    StyleSheet: {
      create: jest.fn(styles => styles),
      flatten: jest.fn(styles => styles),
    },

    // Mock Platform
    Platform: {
      OS: 'ios',
      select: jest.fn(obj => obj.ios),
    },

    // Mock Dimensions
    Dimensions: {
      get: jest.fn(() => ({ width: 375, height: 667 })),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    },
  };
});

// Mock Expo modules if needed
jest.mock('expo-constants', () => ({
  manifest: {
    extra: {
      apiUrl: 'https://test-api.example.com',
    },
  },
}));

// Add any global test setup here

// Mock the Index component
jest.mock('../app/index', () => {
  return {
    __esModule: true,
    default: function Index() {
      return require('react').createElement(
        require('react-native').View,
        null,
        require('react').createElement(require('react-native').Text, null, 'Edit app/index.tsx to edit this screen.'),
      );
    },
  };
});
