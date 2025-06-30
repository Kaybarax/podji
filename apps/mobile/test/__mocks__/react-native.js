// Mock for react-native
const reactNative = jest.requireActual('react-native');

// Create a mock implementation
module.exports = {
  ...reactNative,
  // Add any specific mocks needed
};
