import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle, TextStyle, PanResponder, Animated } from 'react-native';
import { getMobileTheme } from '@podji/design-tokens';

export interface SliderProps {
  /**
   * Current value of the slider
   */
  value: number;
  /**
   * Minimum value of the slider
   */
  minimumValue?: number;
  /**
   * Maximum value of the slider
   */
  maximumValue?: number;
  /**
   * Step value of the slider
   */
  step?: number;
  /**
   * Callback when the value changes
   */
  onValueChange?: (value: number) => void;
  /**
   * Callback when sliding starts
   */
  onSlidingStart?: (value: number) => void;
  /**
   * Callback when sliding completes
   */
  onSlidingComplete?: (value: number) => void;
  /**
   * Whether to show the minimum and maximum labels
   */
  showLabels?: boolean;
  /**
   * Custom minimum label
   */
  minimumLabel?: string;
  /**
   * Custom maximum label
   */
  maximumLabel?: string;
  /**
   * Whether to show the current value
   */
  showValue?: boolean;
  /**
   * Format function for the value label
   */
  valueFormatter?: (value: number) => string;
  /**
   * Whether the slider is disabled
   */
  disabled?: boolean;
  /**
   * Minimum track color
   */
  minimumTrackTintColor?: string;
  /**
   * Maximum track color
   */
  maximumTrackTintColor?: string;
  /**
   * Thumb color
   */
  thumbTintColor?: string;
  /**
   * Additional container style
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Additional track style
   */
  trackStyle?: StyleProp<ViewStyle>;
  /**
   * Additional thumb style
   */
  thumbStyle?: StyleProp<ViewStyle>;
  /**
   * Additional label style
   */
  labelStyle?: StyleProp<TextStyle>;
  /**
   * Test ID for testing
   */
  testID?: string;
}

/**
 * Slider component for selecting a value from a range
 */
export const Slider: React.FC<SliderProps> = ({
  value,
  minimumValue = 0,
  maximumValue = 100,
  step = 1,
  onValueChange,
  onSlidingStart,
  onSlidingComplete,
  showLabels = false,
  minimumLabel,
  maximumLabel,
  showValue = false,
  valueFormatter = (value: number) => value.toString(),
  disabled = false,
  minimumTrackTintColor,
  maximumTrackTintColor,
  thumbTintColor,
  containerStyle,
  trackStyle,
  thumbStyle,
  labelStyle,
  testID,
}) => {
  const [themeStyles, setThemeStyles] = useState({
    container: {},
    track: {},
    minimumTrack: {},
    maximumTrack: {},
    thumb: {},
    disabledThumb: {},
    label: {},
    valueLabel: {},
    labelsContainer: {},
  });

  // Animated value for the position of the thumb
  const [thumbPosition] = useState(new Animated.Value(0));
  const [currentValue, setCurrentValue] = useState(value);
  const [trackWidth, setTrackWidth] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const theme = await getMobileTheme();
        setThemeStyles({
          container: {
            width: '100%',
            height: 40,
            justifyContent: 'center',
            opacity: disabled ? 0.6 : 1,
          },
          track: {
            height: 4,
            borderRadius: 2,
            backgroundColor: theme.light.color.primitive.grey[300],
          },
          minimumTrack: {
            position: 'absolute',
            height: 4,
            borderRadius: 2,
            backgroundColor: theme.light.color.theme.primary,
          },
          maximumTrack: {
            position: 'absolute',
            height: 4,
            borderRadius: 2,
            backgroundColor: theme.light.color.primitive.grey[300],
          },
          thumb: {
            position: 'absolute',
            width: 20,
            height: 20,
            borderRadius: 10,
            backgroundColor: theme.light.color.theme.primary,
            shadowColor: theme.light.color.primitive.black,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 2,
            elevation: 2,
          },
          disabledThumb: {
            backgroundColor: theme.light.color.primitive.grey[400],
          },
          label: {
            fontSize: theme.light.typography.fontSize.sm,
            color: theme.light.color.semantic.text.secondary,
          },
          valueLabel: {
            fontSize: theme.light.typography.fontSize.md,
            color: theme.light.color.semantic.text.primary,
            marginBottom: theme.light.spacing.xs,
            textAlign: 'center',
          },
          labelsContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: theme.light.spacing.xs,
          },
        });
      } catch (error) {
        console.error('Failed to load theme:', error);
      }
    };

    loadTheme();
  }, [disabled]);

  // Update the thumb position when the value changes
  useEffect(() => {
    if (!isSliding) {
      setCurrentValue(value);
      const percentage = (value - minimumValue) / (maximumValue - minimumValue);
      thumbPosition.setValue(percentage);
    }
  }, [value, minimumValue, maximumValue, thumbPosition, isSliding]);

  // Create a pan responder to handle the sliding gesture
  const panResponder = React.useMemo(() => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (_, gestureState) => {
        if (disabled) return;

        setIsSliding(true);
        const newValue = valueFromPosition(gestureState.x0);
        onSlidingStart?.(newValue);
      },
      onPanResponderMove: (_, gestureState) => {
        if (disabled) return;

        const newValue = valueFromPosition(gestureState.moveX);
        setCurrentValue(newValue);
        thumbPosition.setValue((newValue - minimumValue) / (maximumValue - minimumValue));
        onValueChange?.(newValue);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (disabled) return;

        setIsSliding(false);
        const newValue = valueFromPosition(gestureState.moveX);
        onSlidingComplete?.(newValue);
      },
    });
  }, [disabled, minimumValue, maximumValue, step, trackWidth, onValueChange, onSlidingStart, onSlidingComplete]);

  // Calculate the value from the position on the track
  const valueFromPosition = (position: number) => {
    if (trackWidth === 0) return minimumValue;

    // Get the element position
    const trackRef = (panResponder.panHandlers as any).ref?.current;
    if (!trackRef) return minimumValue;

    // Calculate the position relative to the track
    trackRef.measure((_: number, __: number, ___: number, ____: number, pageX: number, _____: number) => {
      position = position - pageX;
    });

    // Ensure the position is within the track bounds
    position = Math.max(0, Math.min(position, trackWidth));

    // Calculate the percentage and value
    const percentage = position / trackWidth;
    let newValue = minimumValue + percentage * (maximumValue - minimumValue);

    // Apply step if provided
    if (step > 0) {
      newValue = Math.round(newValue / step) * step;
    }

    // Ensure the value is within the bounds
    return Math.max(minimumValue, Math.min(newValue, maximumValue));
  };

  // Calculate the left position of the thumb
  const thumbLeft = thumbPosition.interpolate({
    inputRange: [0, 1],
    outputRange: [0, trackWidth - 20], // 20 is the width of the thumb
    extrapolate: 'clamp',
  });

  // Calculate the width of the minimum track
  const minimumTrackWidth = thumbPosition.interpolate({
    inputRange: [0, 1],
    outputRange: [0, trackWidth],
    extrapolate: 'clamp',
  });

  return (
    <View style={[themeStyles.container, containerStyle]} testID={testID}>
      {showValue && <Text style={[themeStyles.valueLabel, labelStyle]}>{valueFormatter(currentValue)}</Text>}

      <View
        style={[themeStyles.track, trackStyle]}
        onLayout={event => {
          setTrackWidth(event.nativeEvent.layout.width);
        }}
        {...panResponder.panHandlers}
      >
        <Animated.View
          style={[
            themeStyles.minimumTrack,
            { width: minimumTrackWidth },
            minimumTrackTintColor ? { backgroundColor: minimumTrackTintColor } : null,
          ]}
        />
        <Animated.View
          style={[
            themeStyles.thumb,
            { left: thumbLeft },
            disabled && themeStyles.disabledThumb,
            thumbTintColor ? { backgroundColor: thumbTintColor } : null,
            thumbStyle,
          ]}
        />
      </View>

      {showLabels && (
        <View style={themeStyles.labelsContainer}>
          <Text style={[themeStyles.label, labelStyle]}>{minimumLabel || minimumValue.toString()}</Text>
          <Text style={[themeStyles.label, labelStyle]}>{maximumLabel || maximumValue.toString()}</Text>
        </View>
      )}
    </View>
  );
};
