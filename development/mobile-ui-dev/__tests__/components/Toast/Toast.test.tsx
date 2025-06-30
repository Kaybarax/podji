import { render, fireEvent, act } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Toast, ToastProvider, useToast } from '@/lib/components/Toast';

// Mock the getMobileTheme function from @podji/design-tokens
jest.mock('@podji/design-tokens', () => ({
  getMobileTheme: jest.fn().mockResolvedValue({
    light: {
      color: {
        primitive: {
          black: '#000000',
          white: '#FFFFFF',
        },
        semantic: {
          background: {
            surface: '#FFFFFF',
          },
        },
        theme: {
          primary: '#ACEEF3',
          secondary: '#FF7077',
        },
      },
      spacing: {
        sm: 8,
        md: 16,
      },
      typography: {
        fontSize: {
          md: 14,
        },
      },
      borderRadius: {
        md: 8,
      },
    },
    dark: {
      // Dark theme values would go here
    },
  }),
}));

// Mock Animated
jest.mock('react-native/Libraries/Animated/Animated', () => {
  const ActualAnimated = jest.requireActual('react-native/Libraries/Animated/Animated');
  return {
    ...ActualAnimated,
    Value: jest.fn(() => ({
      setValue: jest.fn(),
      interpolate: jest.fn(() => 0),
    })),
    timing: jest.fn(() => ({
      start: jest.fn(callback => callback && callback()),
    })),
    parallel: jest.fn(animations => ({
      start: jest.fn(callback => callback && callback()),
    })),
  };
});

// Mock setTimeout
jest.useFakeTimers();

describe('Toast', () => {
  it('renders correctly when visible', () => {
    const onClose = jest.fn();
    const { getByText } = render(
      <Toast message="This is a toast message" visible={true} onClose={onClose} testID="toast" />,
    );

    expect(getByText('This is a toast message')).toBeTruthy();
  });

  it('does not render when not visible', () => {
    const onClose = jest.fn();
    const { queryByText } = render(
      <Toast message="This is a toast message" visible={false} onClose={onClose} testID="toast" />,
    );

    expect(queryByText('This is a toast message')).toBeNull();
  });

  it('renders with success type', () => {
    const onClose = jest.fn();
    const { getByText } = render(
      <Toast message="Success message" type="success" visible={true} onClose={onClose} testID="toast" />,
    );

    expect(getByText('Success message')).toBeTruthy();
    expect(getByText('✓')).toBeTruthy(); // Success icon
  });

  it('renders with error type', () => {
    const onClose = jest.fn();
    const { getByText } = render(
      <Toast message="Error message" type="error" visible={true} onClose={onClose} testID="toast" />,
    );

    expect(getByText('Error message')).toBeTruthy();
    expect(getByText('✕')).toBeTruthy(); // Error icon (might be multiple if dismissible is true)
  });

  it('renders with warning type', () => {
    const onClose = jest.fn();
    const { getByText } = render(
      <Toast message="Warning message" type="warning" visible={true} onClose={onClose} testID="toast" />,
    );

    expect(getByText('Warning message')).toBeTruthy();
    expect(getByText('⚠')).toBeTruthy(); // Warning icon
  });

  it('renders with info type', () => {
    const onClose = jest.fn();
    const { getByText } = render(
      <Toast message="Info message" type="info" visible={true} onClose={onClose} testID="toast" />,
    );

    expect(getByText('Info message')).toBeTruthy();
    expect(getByText('ℹ')).toBeTruthy(); // Info icon
  });

  it('calls onClose when duration expires', () => {
    const onClose = jest.fn();
    render(<Toast message="This is a toast message" visible={true} duration={1000} onClose={onClose} testID="toast" />);

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // The onClose should be called after the animation completes
    expect(onClose).toHaveBeenCalled();
  });

  it('renders with dismiss button when dismissible is true', () => {
    const onClose = jest.fn();
    const { getAllByText } = render(
      <Toast message="Dismissible toast" visible={true} dismissible={true} onClose={onClose} testID="toast" />,
    );

    // There should be a close icon (✕) for the dismiss button
    const closeIcons = getAllByText('✕');
    expect(closeIcons.length).toBeGreaterThan(0);
  });

  it('does not render dismiss button when dismissible is false', () => {
    const onClose = jest.fn();
    const { queryAllByText } = render(
      <Toast message="Non-dismissible toast" visible={true} dismissible={false} onClose={onClose} testID="toast" />,
    );

    // There should not be a close icon (✕) for the dismiss button
    // Note: This might fail if the toast type is "error" which also uses ✕
    const closeIcons = queryAllByText('✕');
    expect(closeIcons.length).toBe(0);
  });

  it('calls onClose when dismiss button is pressed', () => {
    const onClose = jest.fn();
    const { getAllByText } = render(
      <Toast message="Dismissible toast" visible={true} dismissible={true} onClose={onClose} testID="toast" />,
    );

    // Find the dismiss button (close icon)
    const closeIcons = getAllByText('✕');
    fireEvent.press(closeIcons[0]);

    // The onClose should be called
    expect(onClose).toHaveBeenCalled();
  });

  // Test ToastProvider and useToast hook
  it('ToastProvider renders children', () => {
    const { getByText } = render(
      <ToastProvider>
        <Text>Child Component</Text>
      </ToastProvider>,
    );

    expect(getByText('Child Component')).toBeTruthy();
  });
});
