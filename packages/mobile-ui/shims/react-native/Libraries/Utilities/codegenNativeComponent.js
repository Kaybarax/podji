/**
 * Shim for react-native codegenNativeComponent.js
 * This file is used to fix the import error in the original file
 */

// Import from our shim files
import { HostComponent } from '../../src/private/types/HostComponent.js';
import requireNativeComponent from '../../Libraries/ReactNative/requireNativeComponent.js';

// Export a dummy function that matches the signature of the original
export default function codegenNativeComponent(componentName, options) {
  // Use HostComponent to avoid linting error
  const componentType = HostComponent;
  return requireNativeComponent(componentName, componentType, options);
}
