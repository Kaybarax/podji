import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { getMobileTheme } from '@podji/design-tokens';

export interface ToastProps {
  /**
   * Message to display in the toast
   */
  message: string;
  /**
   * Type of toast
   */
  type?: 'success' | 'error' | 'warning' | 'info';
  /**
   * Position of the toast
   */
  position?: 'top' | 'bottom';
  /**
   * Duration in milliseconds before the toast auto-dismisses
   */
  duration?: number;
  /**
   * Whether the toast can be dismissed by tapping
   */
  dismissible?: boolean;
  /**
   * Whether the toast is visible
   */
  visible?: boolean;
  /**
   * Callback when the toast is closed
   */
  onClose?: () => void;
  /**
   * Additional container style
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Additional text style
   */
  textStyle?: StyleProp<TextStyle>;
  /**
   * Test ID for testing
   */
  testID?: string;
}

export interface ToastOptions extends Omit<ToastProps, 'visible' | 'onClose'> {
  /**
   * ID for the toast (auto-generated if not provided)
   */
  id?: string;
}

interface ToastContextType {
  show: (options: ToastOptions) => string;
  hide: (id: string) => void;
  hideAll: () => void;
}

// Create context with a default value
const ToastContext = createContext<ToastContextType>({
  show: () => '',
  hide: () => {},
  hideAll: () => {},
});

/**
 * Toast component for displaying notifications
 */
export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  position = 'bottom',
  duration = 3000,
  dismissible = true,
  visible = false,
  onClose,
  style,
  textStyle,
  testID,
}) => {
  const [themeStyles, setThemeStyles] = useState({
    container: {},
    success: {},
    error: {},
    warning: {},
    info: {},
    message: {},
    icon: {},
    dismissButton: {},
  });

  // Animation value for opacity and translation
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateAnim = useRef(new Animated.Value(position === 'top' ? -100 : 100)).current;

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const theme = await getMobileTheme();
        setThemeStyles({
          container: {
            position: 'absolute',
            [position]: 20,
            left: 20,
            right: 20,
            backgroundColor: theme.light.color.semantic.background.surface,
            borderRadius: theme.light.borderRadius.md,
            padding: theme.light.spacing.md,
            flexDirection: 'row',
            alignItems: 'center',
            shadowColor: theme.light.color.primitive.black,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
            zIndex: 1000,
          },
          success: {
            backgroundColor: theme.light.color.theme.primary,
          },
          error: {
            backgroundColor: theme.light.color.theme.secondary,
          },
          warning: {
            backgroundColor: theme.light.color.primitive.orange,
          },
          info: {
            backgroundColor: theme.light.color.primitive.cyan,
          },
          message: {
            flex: 1,
            color: theme.light.color.primitive.black,
            fontSize: theme.light.typography.fontSize.md,
            marginLeft: theme.light.spacing.sm,
          },
          icon: {
            fontSize: 18,
            marginRight: theme.light.spacing.sm,
          },
          dismissButton: {
            marginLeft: theme.light.spacing.sm,
          },
        });
      } catch (error) {
        console.error('Failed to load theme:', error);
      }
    };

    loadTheme();
  }, [position]);

  useEffect(() => {
    if (visible) {
      // Show animation
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto-dismiss after duration
      const timer = setTimeout(() => {
        hideToast();
      }, duration);

      return () => clearTimeout(timer);
    } else {
      // Hide animation
      hideToast();
    }
  }, [visible, duration]);

  const hideToast = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateAnim, {
        toValue: position === 'top' ? -100 : 100,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (onClose) {
        onClose();
      }
    });
  };

  // Get icon based on type
  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      case 'info':
      default:
        return 'ℹ';
    }
  };

  // Get style based on type
  const getTypeStyle = () => {
    switch (type) {
      case 'success':
        return themeStyles.success;
      case 'error':
        return themeStyles.error;
      case 'warning':
        return themeStyles.warning;
      case 'info':
      default:
        return themeStyles.info;
    }
  };

  if (!visible) {
    return null;
  }

  return (
    <Animated.View
      style={[
        themeStyles.container,
        getTypeStyle(),
        style,
        {
          opacity: fadeAnim,
          transform: [{ translateY: translateAnim }],
        },
      ]}
      testID={testID}
    >
      <Text style={themeStyles.icon}>{getIcon()}</Text>
      <Text style={[themeStyles.message, textStyle]}>{message}</Text>
      {dismissible && (
        <TouchableOpacity style={themeStyles.dismissButton} onPress={hideToast}>
          <Text style={themeStyles.icon}>✕</Text>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

/**
 * Provider component for global toast management
 */
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Array<ToastOptions & { id: string; visible: boolean }>>([]);

  // Show a toast
  const show = (options: ToastOptions): string => {
    const id = options.id || Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { ...options, id, visible: true }]);
    return id;
  };

  // Hide a specific toast
  const hide = (id: string) => {
    setToasts(prev =>
      prev.map(toast =>
        toast.id === id ? { ...toast, visible: false } : toast
      )
    );
    
    // Remove the toast after animation completes
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 300);
  };

  // Hide all toasts
  const hideAll = () => {
    setToasts(prev => prev.map(toast => ({ ...toast, visible: false })));
    
    // Remove all toasts after animation completes
    setTimeout(() => {
      setToasts([]);
    }, 300);
  };

  // Handle toast close
  const handleClose = (id: string) => {
    hide(id);
  };

  return (
    <ToastContext.Provider value={{ show, hide, hideAll }}>
      {children}
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          position={toast.position}
          duration={toast.duration}
          dismissible={toast.dismissible}
          visible={toast.visible}
          onClose={() => handleClose(toast.id)}
          style={toast.style}
          textStyle={toast.textStyle}
        />
      ))}
    </ToastContext.Provider>
  );
};

/**
 * Hook for using toast from any component
 */
export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};