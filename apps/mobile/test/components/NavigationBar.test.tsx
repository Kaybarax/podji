import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import NavigationBar from '../../app/components/NavigationBar';

// Mock the useSafeAreaInsets hook
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: jest.fn(() => ({ top: 48 })),
}));

// Mock the UINavigationBar component
jest.mock('@podji/mobile-ui', () => ({
  NavigationBar: jest.fn(({ title, showNotification, showSearch, onNotificationPress, onSearchPress }) => (
    <div
      data-testid="ui-navigation-bar"
      data-title={title}
      data-show-notification={showNotification}
      data-show-search={showSearch}
    >
      <button
        data-testid="notification-button"
        onClick={onNotificationPress}
        style={{ display: showNotification ? 'block' : 'none' }}
      >
        Notification
      </button>
      <button data-testid="search-button" onClick={onSearchPress} style={{ display: showSearch ? 'block' : 'none' }}>
        Search
      </button>
    </div>
  )),
}));

describe('NavigationBar', () => {
  const mockOnNotificationPress = jest.fn();
  const mockOnSearchPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    const { getByTestId } = render(<NavigationBar title="Test Title" />);

    const navigationBar = getByTestId('ui-navigation-bar');
    expect(navigationBar).toBeTruthy();
    expect(navigationBar.props['data-title']).toBe('Test Title');
    expect(navigationBar.props['data-show-notification']).toBe(true);
    expect(navigationBar.props['data-show-search']).toBe(true);
  });

  it('renders correctly with custom props', () => {
    const { getByTestId } = render(
      <NavigationBar
        title="Custom Title"
        showNotification={false}
        showSearch={false}
        onNotificationPress={mockOnNotificationPress}
        onSearchPress={mockOnSearchPress}
      />,
    );

    const navigationBar = getByTestId('ui-navigation-bar');
    expect(navigationBar.props['data-title']).toBe('Custom Title');
    expect(navigationBar.props['data-show-notification']).toBe(false);
    expect(navigationBar.props['data-show-search']).toBe(false);
  });

  it('calls onNotificationPress when notification button is pressed', () => {
    const { getByTestId } = render(<NavigationBar title="Test Title" onNotificationPress={mockOnNotificationPress} />);

    fireEvent.press(getByTestId('notification-button'));
    expect(mockOnNotificationPress).toHaveBeenCalledTimes(1);
  });

  it('calls onSearchPress when search button is pressed', () => {
    const { getByTestId } = render(<NavigationBar title="Test Title" onSearchPress={mockOnSearchPress} />);

    fireEvent.press(getByTestId('search-button'));
    expect(mockOnSearchPress).toHaveBeenCalledTimes(1);
  });

  it('applies safe area insets to padding', () => {
    const { UNSAFE_getByType } = render(<NavigationBar title="Test Title" />);

    // The View should have paddingTop based on insets.top
    const view = UNSAFE_getByType('View');
    expect(view.props.style[0].paddingTop).toBe(40); // Math.max(insets.top - 8, 0) = Math.max(48 - 8, 0) = 40
  });
});
