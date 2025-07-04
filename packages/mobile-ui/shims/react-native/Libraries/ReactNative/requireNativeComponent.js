/**
 * Shim for react-native requireNativeComponent.js
 * This file is used to fix the import error in the codegenNativeComponent.js file
 */

// Export a fake function that matches the signature of the original
export default function requireNativeComponent(viewName, componentInterface, options) {
  return {
    __TYPE: 'NativeComponent',
    name: viewName,
    options: options || {},
  };
}
