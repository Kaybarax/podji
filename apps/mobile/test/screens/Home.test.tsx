import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import Home from '../../app/screens/Home';

// Mock the useSafeAreaInsets hook
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: jest.fn(() => ({ top: 48, bottom: 34 })),
}));

// Mock the NavigationBar component
jest.mock('../../app/components/NavigationBar', () => {
  return jest.fn(({ title, onNotificationPress, onSearchPress }) => (
    <div data-testid="navigation-bar" data-title={title}>
      <button data-testid="notification-button" onClick={onNotificationPress}>
        Notification
      </button>
      <button data-testid="search-button" onClick={onSearchPress}>
        Search
      </button>
    </div>
  ));
});

// Mock the BottomNavigation component
jest.mock('../../app/components/BottomNavigation', () => {
  return jest.fn(({ activeTab, onTabPress }) => (
    <div data-testid="bottom-navigation" data-active-tab={activeTab}>
      <button data-testid="tab-home" onClick={() => onTabPress('home')}>
        Home
      </button>
      <button data-testid="tab-library" onClick={() => onTabPress('library')}>
        Library
      </button>
      <button data-testid="tab-mix" onClick={() => onTabPress('mix')}>
        Mix
      </button>
    </div>
  ));
});

// Mock the FeedCard component
jest.mock('@podji/mobile-ui', () => ({
  FeedCard: jest.fn(({ title, creator, onPress, onLikePress, onCommentPress, onSharePress }) => (
    <div data-testid={`feed-card-${title}`} data-creator={creator}>
      <button data-testid={`card-press-${title}`} onClick={onPress}>
        {title}
      </button>
      <button data-testid={`like-press-${title}`} onClick={onLikePress}>
        Like
      </button>
      <button data-testid={`comment-press-${title}`} onClick={onCommentPress}>
        Comment
      </button>
      <button data-testid={`share-press-${title}`} onClick={onSharePress}>
        Share
      </button>
    </div>
  )),
  FloatingActionButton: jest.fn(({ icon, onPress }) => (
    <button data-testid="floating-action-button" data-icon={icon} onClick={onPress}>
      {icon}
    </button>
  )),
}));

// Mock ScrollView to add testID
jest.mock('react-native', () => {
  const rn = jest.requireActual('react-native');
  return {
    ...rn,
    ScrollView: jest.fn(({ children, refreshControl, ...props }) => (
      <div data-testid="scroll-view" {...props} refreshControl={refreshControl}>
        {children}
      </div>
    )),
  };
});

// Mock console.log to prevent noise in test output
const originalConsoleLog = console.log;
beforeAll(() => {
  console.log = jest.fn();
});

afterAll(() => {
  console.log = originalConsoleLog;
});

describe('Home', () => {
  const mockOnTabPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders correctly with the active tab', () => {
    const { getByTestId } = render(<Home activeTab="home" onTabPress={mockOnTabPress} />);

    expect(getByTestId('navigation-bar')).toBeTruthy();
    expect(getByTestId('bottom-navigation')).toBeTruthy();
    expect(getByTestId('bottom-navigation').props['data-active-tab']).toBe('home');
    expect(getByTestId('floating-action-button')).toBeTruthy();
  });

  it('renders all feed cards', () => {
    const { getByTestId } = render(<Home activeTab="home" onTabPress={mockOnTabPress} />);

    // Check if all 4 feed cards are rendered
    expect(getByTestId('feed-card-Summer Vibes Mix')).toBeTruthy();
    expect(getByTestId('feed-card-Chill Lounge Beats')).toBeTruthy();
    expect(getByTestId('feed-card-Hip Hop Classics')).toBeTruthy();
    expect(getByTestId('feed-card-Electronic Dance Party')).toBeTruthy();
  });

  it('handles refresh correctly', () => {
    const { getByTestId } = render(<Home activeTab="home" onTabPress={mockOnTabPress} />);

    const scrollView = getByTestId('scroll-view');

    // Trigger refresh
    fireEvent(scrollView, 'refresh');

    // Check if refreshing is true
    expect(scrollView.props.refreshControl.props.refreshing).toBe(true);

    // Fast-forward timer to complete the refresh
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    // Check if refreshing is false after timeout
    expect(scrollView.props.refreshControl.props.refreshing).toBe(false);
  });

  it('calls onTabPress when a tab is pressed', () => {
    const { getByTestId } = render(<Home activeTab="home" onTabPress={mockOnTabPress} />);

    fireEvent.press(getByTestId('tab-library'));
    expect(mockOnTabPress).toHaveBeenCalledWith('library');
  });

  it('handles FAB press correctly', () => {
    const { getByTestId } = render(<Home activeTab="home" onTabPress={mockOnTabPress} />);

    fireEvent.press(getByTestId('floating-action-button'));
    expect(console.log).toHaveBeenCalledWith('FAB pressed');
  });

  it('handles card interactions correctly', () => {
    const { getByTestId } = render(<Home activeTab="home" onTabPress={mockOnTabPress} />);

    // Test card press
    fireEvent.press(getByTestId('card-press-Summer Vibes Mix'));
    expect(console.log).toHaveBeenCalledWith('Card 1 pressed');

    // Test like press
    fireEvent.press(getByTestId('like-press-Summer Vibes Mix'));
    expect(console.log).toHaveBeenCalledWith('Like 1 pressed');

    // Test comment press
    fireEvent.press(getByTestId('comment-press-Summer Vibes Mix'));
    expect(console.log).toHaveBeenCalledWith('Comment 1 pressed');

    // Test share press
    fireEvent.press(getByTestId('share-press-Summer Vibes Mix'));
    expect(console.log).toHaveBeenCalledWith('Share 1 pressed');
  });
});
