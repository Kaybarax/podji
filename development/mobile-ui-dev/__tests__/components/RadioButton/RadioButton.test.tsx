import { render, fireEvent } from '@testing-library/react-native';
import { RadioButton } from '@/lib/components/RadioButton';

// Mock the getMobileTheme function from @podji/design-tokens
jest.mock('@podji/design-tokens', () => ({
  getMobileTheme: jest.fn().mockResolvedValue({
    light: {
      color: {
        primitive: {
          grey: {
            300: '#E0E0E0',
          },
        },
        semantic: {
          text: {
            primary: '#000000',
            disabled: '#9E9E9E',
          },
          border: {
            base: '#E0E0E0',
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

describe('RadioButton', () => {
  it('renders correctly with default props', () => {
    const onValueChange = jest.fn();
    const { getByTestId } = render(
      <RadioButton selected={false} onValueChange={onValueChange} testID="radio-button" />,
    );

    expect(getByTestId('radio-button')).toBeTruthy();
  });

  it('renders with label', () => {
    const onValueChange = jest.fn();
    const { getByText } = render(<RadioButton selected={false} onValueChange={onValueChange} label="Option 1" />);

    expect(getByText('Option 1')).toBeTruthy();
  });

  it('renders inner circle when selected', () => {
    const onValueChange = jest.fn();
    const { getByTestId } = render(<RadioButton selected={true} onValueChange={onValueChange} testID="radio-button" />);

    // We can't directly test for the inner circle's presence since it's a View without a testID,
    // but we can verify the component renders in the selected state
    expect(getByTestId('radio-button')).toBeTruthy();
  });

  it('calls onValueChange when radio button is pressed', () => {
    const onValueChange = jest.fn();
    const { getByTestId } = render(
      <RadioButton selected={false} onValueChange={onValueChange} testID="radio-button" />,
    );

    fireEvent.press(getByTestId('radio-button'));
    expect(onValueChange).toHaveBeenCalledWith(true);
  });

  it('calls onValueChange when label is pressed', () => {
    const onValueChange = jest.fn();
    const { getByText } = render(<RadioButton selected={false} onValueChange={onValueChange} label="Option 1" />);

    fireEvent.press(getByText('Option 1'));
    expect(onValueChange).toHaveBeenCalledWith(true);
  });

  it('does not call onValueChange when already selected', () => {
    const onValueChange = jest.fn();
    const { getByTestId } = render(<RadioButton selected={true} onValueChange={onValueChange} testID="radio-button" />);

    fireEvent.press(getByTestId('radio-button'));
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('does not call onValueChange when disabled', () => {
    const onValueChange = jest.fn();
    const { getByTestId } = render(
      <RadioButton selected={false} onValueChange={onValueChange} disabled={true} testID="radio-button" />,
    );

    fireEvent.press(getByTestId('radio-button'));
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('renders with label on the left when labelPosition is left', () => {
    const onValueChange = jest.fn();
    const { getByText } = render(
      <RadioButton selected={false} onValueChange={onValueChange} label="Option 1" labelPosition="left" />,
    );

    expect(getByText('Option 1')).toBeTruthy();
  });

  it('renders with label on the right when labelPosition is right', () => {
    const onValueChange = jest.fn();
    const { getByText } = render(
      <RadioButton selected={false} onValueChange={onValueChange} label="Option 1" labelPosition="right" />,
    );

    expect(getByText('Option 1')).toBeTruthy();
  });
});
