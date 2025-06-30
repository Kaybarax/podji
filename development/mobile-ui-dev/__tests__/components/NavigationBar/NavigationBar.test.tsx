import { render, fireEvent } from '@testing-library/react-native';
import { NavigationBar } from '@/lib/components/NavigationBar/NavigationBar';

// Mock the getMobileTheme function from @podji/design-tokens
jest.mock('@podji/design-tokens', () => ({
  getMobileTheme: jest.fn().mockResolvedValue({
    light: {
      color: {
        semantic: {
          background: {
            surface: '#FFFFFF',
          },
          border: {
            base: '#E0E0E0',
          },
          text: {
            primary: '#000000',
          },
        },
      },
      spacing: {
        sm: 8,
        md: 16,
      },
      typography: {
        fontSize: {
          lg: 18,
        },
        fontWeight: {
          bold: '700',
        },
      },
    },
    dark: {
      // Dark theme values would go here
    },
  }),
}));

describe('NavigationBar', () => {
  it('renders correctly with title', () => {
    const { getByText } = render(<NavigationBar title="Test Title" />);
    expect(getByText('Test Title')).toBeTruthy();
  });

  it('renders notification icon when showNotification is true', () => {
    const { getByText } = render(<NavigationBar showNotification />);
    expect(getByText('🔔')).toBeTruthy();
  });

  it('renders search icon when showSearch is true', () => {
    const { getByText } = render(<NavigationBar showSearch />);
    expect(getByText('🔍')).toBeTruthy();
  });

  it('calls onNotificationPress when notification icon is pressed', () => {
    const onNotificationPress = jest.fn();
    const { getByText } = render(
      <NavigationBar showNotification onNotificationPress={onNotificationPress} />
    );
    
    fireEvent.press(getByText('🔔'));
    expect(onNotificationPress).toHaveBeenCalledTimes(1);
  });

  it('calls onSearchPress when search icon is pressed', () => {
    const onSearchPress = jest.fn();
    const { getByText } = render(
      <NavigationBar showSearch onSearchPress={onSearchPress} />
    );
    
    fireEvent.press(getByText('🔍'));
    expect(onSearchPress).toHaveBeenCalledTimes(1);
  });
});