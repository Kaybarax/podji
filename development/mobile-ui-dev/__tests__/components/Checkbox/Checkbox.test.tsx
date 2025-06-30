import { render, fireEvent } from '@testing-library/react-native';
import { Checkbox } from '@/lib/components/Checkbox';

// Mock the getMobileTheme function from @podji/design-tokens
jest.mock('@podji/design-tokens', () => ({
  getMobileTheme: jest.fn().mockResolvedValue({
    light: {
      color: {
        primitive: {
          white: '#FFFFFF',
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
      borderRadius: {
        sm: 4,
      },
    },
    dark: {
      // Dark theme values would go here
    },
  }),
}));

describe('Checkbox', () => {
  it('renders correctly with default props', () => {
    const onValueChange = jest.fn();
    const { getByTestId } = render(
      <Checkbox 
        checked={false} 
        onValueChange={onValueChange} 
        testID="checkbox"
      />
    );
    
    expect(getByTestId('checkbox')).toBeTruthy();
  });

  it('renders with label', () => {
    const onValueChange = jest.fn();
    const { getByText } = render(
      <Checkbox 
        checked={false} 
        onValueChange={onValueChange} 
        label="Accept terms"
      />
    );
    
    expect(getByText('Accept terms')).toBeTruthy();
  });

  it('renders checkmark when checked', () => {
    const onValueChange = jest.fn();
    const { getByText } = render(
      <Checkbox 
        checked={true} 
        onValueChange={onValueChange} 
      />
    );
    
    expect(getByText('✓')).toBeTruthy();
  });

  it('does not render checkmark when unchecked', () => {
    const onValueChange = jest.fn();
    const { queryByText } = render(
      <Checkbox 
        checked={false} 
        onValueChange={onValueChange} 
      />
    );
    
    expect(queryByText('✓')).toBeNull();
  });

  it('calls onValueChange when checkbox is pressed', () => {
    const onValueChange = jest.fn();
    const { getByTestId } = render(
      <Checkbox 
        checked={false} 
        onValueChange={onValueChange} 
        testID="checkbox"
      />
    );
    
    fireEvent.press(getByTestId('checkbox'));
    expect(onValueChange).toHaveBeenCalledWith(true);
  });

  it('calls onValueChange when label is pressed', () => {
    const onValueChange = jest.fn();
    const { getByText } = render(
      <Checkbox 
        checked={false} 
        onValueChange={onValueChange} 
        label="Accept terms"
      />
    );
    
    fireEvent.press(getByText('Accept terms'));
    expect(onValueChange).toHaveBeenCalledWith(true);
  });

  it('does not call onValueChange when disabled', () => {
    const onValueChange = jest.fn();
    const { getByTestId } = render(
      <Checkbox 
        checked={false} 
        onValueChange={onValueChange} 
        disabled={true}
        testID="checkbox"
      />
    );
    
    fireEvent.press(getByTestId('checkbox'));
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('renders with label on the left when labelPosition is left', () => {
    const onValueChange = jest.fn();
    const { getByText } = render(
      <Checkbox 
        checked={false} 
        onValueChange={onValueChange} 
        label="Accept terms"
        labelPosition="left"
      />
    );
    
    expect(getByText('Accept terms')).toBeTruthy();
  });

  it('renders with label on the right when labelPosition is right', () => {
    const onValueChange = jest.fn();
    const { getByText } = render(
      <Checkbox 
        checked={false} 
        onValueChange={onValueChange} 
        label="Accept terms"
        labelPosition="right"
      />
    );
    
    expect(getByText('Accept terms')).toBeTruthy();
  });
});