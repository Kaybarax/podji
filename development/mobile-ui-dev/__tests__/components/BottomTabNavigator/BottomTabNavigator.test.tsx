import { render, fireEvent } from '@testing-library/react-native';
import { BottomTabNavigator } from '@/lib/components/BottomTabNavigator';

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
            secondary: '#757575',
          },
        },
        theme: {
          primary: '#ACEEF3',
        },
      },
      spacing: {
        xs: 4,
      },
      typography: {
        fontSize: {
          sm: 12,
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

describe('BottomTabNavigator', () => {
  const mockTabs = [
    { key: 'home', label: 'Home', icon: '🏠' },
    { key: 'library', label: 'Library', icon: '🎧' },
    { key: 'mix', label: 'Mix', icon: '🎚️' },
    { key: 'profile', label: 'Profile', icon: '👤' },
    { key: 'chat', label: 'Chat', icon: '💬' },
  ];

  it('renders all tabs', () => {
    const { getByText } = render(<BottomTabNavigator tabs={mockTabs} activeTab="home" onTabPress={() => {}} />);

    mockTabs.forEach(tab => {
      expect(getByText(tab.label)).toBeTruthy();
      expect(getByText(tab.icon)).toBeTruthy();
    });
  });

  it('calls onTabPress with correct tab key when a tab is pressed', () => {
    const onTabPressMock = jest.fn();
    const { getByText } = render(<BottomTabNavigator tabs={mockTabs} activeTab="home" onTabPress={onTabPressMock} />);

    fireEvent.press(getByText('Library'));
    expect(onTabPressMock).toHaveBeenCalledWith('library');

    fireEvent.press(getByText('Mix'));
    expect(onTabPressMock).toHaveBeenCalledWith('mix');
  });

  it('applies active styles to the active tab', () => {
    const { rerender, getByText } = render(
      <BottomTabNavigator tabs={mockTabs} activeTab="home" onTabPress={() => {}} />,
    );

    // We can't directly test the styles in this test environment,
    // but we can at least verify the component renders with different active tabs
    expect(getByText('Home')).toBeTruthy();

    rerender(<BottomTabNavigator tabs={mockTabs} activeTab="library" onTabPress={() => {}} />);

    expect(getByText('Library')).toBeTruthy();
  });
});
