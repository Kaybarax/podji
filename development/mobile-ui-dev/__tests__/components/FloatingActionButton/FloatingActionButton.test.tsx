import { render, fireEvent } from '@testing-library/react-native';
import { FloatingActionButton } from '@/lib/components/FloatingActionButton';

// Mock the getMobileTheme function from @podji/design-tokens
jest.mock('@podji/design-tokens', () => ({
  getMobileTheme: jest.fn().mockResolvedValue({
    light: {
      color: {
        primitive: {
          black: '#000000',
        },
        semantic: {
          text: {
            primary: '#FFFFFF',
          },
        },
        theme: {
          primary: '#ACEEF3',
        },
      },
      spacing: {
        lg: 24,
      },
    },
    dark: {
      // Dark theme values would go here
    },
  }),
}));

describe('FloatingActionButton', () => {
  it('renders correctly with string icon', () => {
    const { getByText } = render(
      <FloatingActionButton icon="+" onPress={() => {}} />
    );
    
    expect(getByText('+')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <FloatingActionButton icon="+" onPress={onPressMock} />
    );
    
    fireEvent.press(getByText('+'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('renders with different sizes', () => {
    const { rerender, getByText } = render(
      <FloatingActionButton icon="+" size="small" onPress={() => {}} />
    );
    
    // We can't directly test the styles in this test environment,
    // but we can at least verify the component renders with different sizes
    expect(getByText('+')).toBeTruthy();
    
    rerender(
      <FloatingActionButton icon="+" size="medium" onPress={() => {}} />
    );
    
    expect(getByText('+')).toBeTruthy();
    
    rerender(
      <FloatingActionButton icon="+" size="large" onPress={() => {}} />
    );
    
    expect(getByText('+')).toBeTruthy();
  });

  it('renders with different positions', () => {
    const { rerender, getByText } = render(
      <FloatingActionButton icon="+" position="bottomRight" onPress={() => {}} />
    );
    
    // We can't directly test the styles in this test environment,
    // but we can at least verify the component renders with different positions
    expect(getByText('+')).toBeTruthy();
    
    rerender(
      <FloatingActionButton icon="+" position="bottomLeft" onPress={() => {}} />
    );
    
    expect(getByText('+')).toBeTruthy();
    
    rerender(
      <FloatingActionButton icon="+" position="topRight" onPress={() => {}} />
    );
    
    expect(getByText('+')).toBeTruthy();
    
    rerender(
      <FloatingActionButton icon="+" position="topLeft" onPress={() => {}} />
    );
    
    expect(getByText('+')).toBeTruthy();
  });
});