import { render, fireEvent } from '@testing-library/react-native';
import { Toggle } from '@/lib/components/Toggle';

// Mock the getMobileTheme function from @podji/design-tokens
jest.mock('@podji/design-tokens', () => ({
  getMobileTheme: jest.fn().mockResolvedValue({
    light: {
      color: {
        primitive: {
          white: '#FFFFFF',
          black: '#000000',
          grey: {
            200: '#EEEEEE',
            300: '#E0E0E0',
          },
        },
        semantic: {
          text: {
            primary: '#000000',
            disabled: '#9E9E9E',
          },
        },
        theme: {
          primary: '#ACEEF3',
        },
      },
      spacing: {
        sm: 8,
      },
      typography: {
        fontSize: {
          md: 14,
        },
      },
    },
    dark: {
      // Dark theme values would go here
    },
  }),
}));

// Mock Animated.timing
jest.mock('react-native/Libraries/Animated/Animated', () => {
  const ActualAnimated = jest.requireActual('react-native/Libraries/Animated/Animated');
  return {
    ...ActualAnimated,
    timing: jest.fn(() => ({
      start: jest.fn(),
    })),
  };
});

describe('Toggle', () => {
  it('renders correctly with default props', () => {
    const onValueChange = jest.fn();
    const { getByTestId } = render(<Toggle value={false} onValueChange={onValueChange} testID="toggle" />);

    expect(getByTestId('toggle')).toBeTruthy();
  });

  it('renders with label', () => {
    const onValueChange = jest.fn();
    const { getByText } = render(<Toggle value={false} onValueChange={onValueChange} label="Dark Mode" />);

    expect(getByText('Dark Mode')).toBeTruthy();
  });

  it('calls onValueChange when pressed', () => {
    const onValueChange = jest.fn();
    const { getByTestId } = render(<Toggle value={false} onValueChange={onValueChange} testID="toggle" />);

    fireEvent.press(getByTestId('toggle'));
    expect(onValueChange).toHaveBeenCalledWith(true);
  });

  it('does not call onValueChange when disabled', () => {
    const onValueChange = jest.fn();
    const { getByTestId } = render(
      <Toggle value={false} onValueChange={onValueChange} disabled={true} testID="toggle" />,
    );

    fireEvent.press(getByTestId('toggle'));
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('renders with label on the left when labelPosition is left', () => {
    const onValueChange = jest.fn();
    const { getByText } = render(
      <Toggle value={false} onValueChange={onValueChange} label="Dark Mode" labelPosition="left" />,
    );

    expect(getByText('Dark Mode')).toBeTruthy();
  });

  it('renders with label on the right when labelPosition is right', () => {
    const onValueChange = jest.fn();
    const { getByText } = render(
      <Toggle value={false} onValueChange={onValueChange} label="Dark Mode" labelPosition="right" />,
    );

    expect(getByText('Dark Mode')).toBeTruthy();
  });
});
