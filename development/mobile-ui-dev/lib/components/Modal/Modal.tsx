import React, { useEffect, useState } from 'react';
import {
  View,
  Modal as RNModal,
  TouchableWithoutFeedback,
  StyleProp,
  ViewStyle,
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { getMobileTheme } from '@podji/design-tokens';

export interface ModalProps {
  /**
   * Whether the modal is visible
   */
  visible: boolean;
  /**
   * Callback when the modal is closed
   */
  onClose: () => void;
  /**
   * Modal content
   */
  children: React.ReactNode;
  /**
   * Whether to close the modal when clicking outside
   */
  closeOnBackdropPress?: boolean;
  /**
   * Animation type
   */
  animationType?: 'fade' | 'slide' | 'none';
  /**
   * Position of the modal
   */
  position?: 'center' | 'bottom';
  /**
   * Whether the modal has a backdrop
   */
  hasBackdrop?: boolean;
  /**
   * Backdrop opacity
   */
  backdropOpacity?: number;
  /**
   * Whether the modal is scrollable
   */
  scrollable?: boolean;
  /**
   * Whether to avoid keyboard
   */
  avoidKeyboard?: boolean;
  /**
   * Additional container style
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Additional content style
   */
  contentStyle?: StyleProp<ViewStyle>;
  /**
   * Test ID for testing
   */
  testID?: string;
}

/**
 * Modal component for displaying content in a layer above the app
 */
export const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  children,
  closeOnBackdropPress = true,
  position = 'center',
  hasBackdrop = true,
  backdropOpacity = 0.5,
  scrollable = false,
  avoidKeyboard = true,
  containerStyle,
  contentStyle,
  testID,
}) => {
  const [themeStyles, setThemeStyles] = useState({
    backdrop: {},
    container: {},
    contentCenter: {},
    contentBottom: {},
  });

  const [animation] = useState(new Animated.Value(0));
  const { height: windowHeight } = Dimensions.get('window');

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const theme = await getMobileTheme();
        setThemeStyles({
          backdrop: {
            flex: 1,
            backgroundColor: `rgba(0, 0, 0, ${backdropOpacity})`,
            justifyContent: 'center',
            alignItems: 'center',
          },
          container: {
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          },
          contentCenter: {
            backgroundColor: theme.light.color.semantic.background.surface,
            borderRadius: theme.light.borderRadius.md,
            padding: theme.light.spacing.lg,
            width: '90%',
            maxHeight: '80%',
            shadowColor: theme.light.color.primitive.black,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          },
          contentBottom: {
            backgroundColor: theme.light.color.semantic.background.surface,
            borderTopLeftRadius: theme.light.borderRadius.md,
            borderTopRightRadius: theme.light.borderRadius.md,
            padding: theme.light.spacing.lg,
            width: '100%',
            maxHeight: '80%',
            shadowColor: theme.light.color.primitive.black,
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            position: 'absolute',
            bottom: 0,
          },
        });
      } catch (error) {
        console.error('Failed to load theme:', error);
      }
    };

    loadTheme();
  }, [backdropOpacity]);

  useEffect(() => {
    if (visible) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, animation]);

  const backdropAnimatedStyle = {
    opacity: animation,
  };

  const contentAnimatedStyle =
    position === 'bottom'
      ? {
          transform: [
            {
              translateY: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [windowHeight, 0],
              }),
            },
          ],
        }
      : {
          opacity: animation,
          transform: [
            {
              scale: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0.9, 1],
              }),
            },
          ],
        };

  const handleBackdropPress = () => {
    if (closeOnBackdropPress) {
      onClose();
    }
  };

  const renderContent = () => {
    const contentPositionStyle = position === 'bottom' ? themeStyles.contentBottom : themeStyles.contentCenter;

    const content = (
      <Animated.View style={[contentPositionStyle, contentAnimatedStyle, contentStyle]} testID={testID}>
        {scrollable ? <ScrollView><>{children}</></ScrollView> : <>{children}</>}
      </Animated.View>
    );

    if (avoidKeyboard) {
      return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
          {content}
        </KeyboardAvoidingView>
      );
    }

    return content;
  };

  return (
    <RNModal transparent visible={visible} onRequestClose={onClose} animationType="none">
      <View style={[themeStyles.container, containerStyle]}>
        {hasBackdrop && (
          <TouchableWithoutFeedback onPress={handleBackdropPress}>
            <Animated.View style={[themeStyles.backdrop, backdropAnimatedStyle]} />
          </TouchableWithoutFeedback>
        )}
        {renderContent()}
      </View>
    </RNModal>
  );
};
