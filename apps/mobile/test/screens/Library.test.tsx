import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Library from '../../app/screens/Library';

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
      <button data-testid="tab-home" onClick={() => onTabPress('home')}>Home</button>
      <button data-testid="tab-library" onClick={() => onTabPress('library')}>Library</button>
      <button data-testid="tab-mix" onClick={() => onTabPress('mix')}>Mix</button>
    </div>
  ));
});

// Mock the UI components from @podji/mobile-ui
jest.mock('@podji/mobile-ui', () => ({
  TextInput: jest.fn(({ placeholder, value, onChangeText }) => (
    <input 
      data-testid="text-input" 
      placeholder={placeholder} 
      value={value} 
      onChange={(e) => onChangeText(e.target.value)} 
    />
  )),
  Dropdown: jest.fn(({ options, selectedValue, onValueChange, placeholder }) => (
    <select 
      data-testid="dropdown" 
      value={selectedValue} 
      onChange={(e) => onValueChange(e.target.value)}
    >
      <option value="" disabled>{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  )),
  Modal: jest.fn(({ visible, onClose, title, children }) => (
    visible ? (
      <div data-testid="modal" data-title={title}>
        <button data-testid="modal-close" onClick={onClose}>Close</button>
        <div data-testid="modal-content">{children}</div>
      </div>
    ) : null
  )),
  Slider: jest.fn(({ value, minimumValue, maximumValue, onValueChange, disabled }) => (
    <input 
      data-testid="slider" 
      type="range" 
      min={minimumValue} 
      max={maximumValue} 
      value={value} 
      onChange={(e) => onValueChange(parseFloat(e.target.value))}
      disabled={disabled}
    />
  )),
}));

// Mock ScrollView to add testID
jest.mock('react-native', () => {
  const rn = jest.requireActual('react-native');
  return {
    ...rn,
    ScrollView: jest.fn(({ children, ...props }) => (
      <div data-testid="scroll-view" {...props}>
        {children}
      </div>
    )),
    TouchableOpacity: jest.fn(({ children, onPress, style, ...props }) => (
      <button data-testid="touchable-opacity" onClick={onPress} style={style} {...props}>
        {children}
      </button>
    )),
    View: 'View',
    Text: 'Text',
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

describe('Library', () => {
  const mockOnTabPress = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with the active tab', () => {
    const { getByTestId } = render(
      <Library activeTab="library" onTabPress={mockOnTabPress} />
    );
    
    expect(getByTestId('navigation-bar')).toBeTruthy();
    expect(getByTestId('text-input')).toBeTruthy();
    expect(getByTestId('dropdown')).toBeTruthy();
    expect(getByTestId('scroll-view')).toBeTruthy();
    expect(getByTestId('bottom-navigation')).toBeTruthy();
    expect(getByTestId('bottom-navigation').props['data-active-tab']).toBe('library');
  });

  it('handles search input correctly', () => {
    const { getByTestId } = render(
      <Library activeTab="library" onTabPress={mockOnTabPress} />
    );
    
    const searchInput = getByTestId('text-input');
    fireEvent.change(searchInput, { target: { value: 'test search' } });
    
    // Re-render to get updated component
    const { getByTestId: getByTestIdAfterUpdate } = render(
      <Library activeTab="library" onTabPress={mockOnTabPress} />
    );
    
    // Check if the input value is updated
    const updatedSearchInput = getByTestIdAfterUpdate('text-input');
    expect(updatedSearchInput.props.value).toBe('test search');
  });

  it('handles filter dropdown correctly', () => {
    const { getByTestId } = render(
      <Library activeTab="library" onTabPress={mockOnTabPress} />
    );
    
    const dropdown = getByTestId('dropdown');
    fireEvent.change(dropdown, { target: { value: 'bpm' } });
    
    // Re-render to get updated component
    const { getByTestId: getByTestIdAfterUpdate } = render(
      <Library activeTab="library" onTabPress={mockOnTabPress} />
    );
    
    // Check if the dropdown value is updated
    const updatedDropdown = getByTestIdAfterUpdate('dropdown');
    expect(updatedDropdown.props.value).toBe('bpm');
  });

  it('handles track selection and shows action sheet', () => {
    const { getAllByTestId, queryByTestId } = render(
      <Library activeTab="library" onTabPress={mockOnTabPress} />
    );
    
    // Modal should not be visible initially
    expect(queryByTestId('modal')).toBeNull();
    
    // Find all track items and click the first one
    const trackItems = getAllByTestId('touchable-opacity');
    fireEvent.press(trackItems[0]); // First track item
    
    // Modal should now be visible
    expect(queryByTestId('modal')).toBeTruthy();
    expect(queryByTestId('modal').props['data-title']).toBe('Track Options');
  });

  it('handles add to playlist action', () => {
    const { getAllByTestId, queryByTestId, getByText } = render(
      <Library activeTab="library" onTabPress={mockOnTabPress} />
    );
    
    // Select a track to show the action sheet
    const trackItems = getAllByTestId('touchable-opacity');
    fireEvent.press(trackItems[0]);
    
    // Find and click the "Add to Playlist" button
    const addToPlaylistButton = getByText('Add to Playlist');
    fireEvent.press(addToPlaylistButton);
    
    // Modal should be closed
    expect(queryByTestId('modal')).toBeNull();
    
    // Console.log should have been called with the selected track
    expect(console.log).toHaveBeenCalledWith('Add to playlist:', expect.anything());
  });

  it('handles add to queue action', () => {
    const { getAllByTestId, queryByTestId, getByText } = render(
      <Library activeTab="library" onTabPress={mockOnTabPress} />
    );
    
    // Select a track to show the action sheet
    const trackItems = getAllByTestId('touchable-opacity');
    fireEvent.press(trackItems[0]);
    
    // Find and click the "Add to Queue" button
    const addToQueueButton = getByText('Add to Queue');
    fireEvent.press(addToQueueButton);
    
    // Modal should be closed
    expect(queryByTestId('modal')).toBeNull();
    
    // Console.log should have been called with the selected track
    expect(console.log).toHaveBeenCalledWith('Add to queue:', expect.anything());
  });

  it('closes the action sheet when clicking close button', () => {
    const { getAllByTestId, queryByTestId, getByTestId } = render(
      <Library activeTab="library" onTabPress={mockOnTabPress} />
    );
    
    // Select a track to show the action sheet
    const trackItems = getAllByTestId('touchable-opacity');
    fireEvent.press(trackItems[0]);
    
    // Modal should be visible
    expect(queryByTestId('modal')).toBeTruthy();
    
    // Click the close button
    fireEvent.press(getByTestId('modal-close'));
    
    // Modal should be closed
    expect(queryByTestId('modal')).toBeNull();
  });

  it('calls onTabPress when a tab is pressed', () => {
    const { getByTestId } = render(
      <Library activeTab="library" onTabPress={mockOnTabPress} />
    );
    
    fireEvent.press(getByTestId('tab-home'));
    expect(mockOnTabPress).toHaveBeenCalledWith('home');
  });
});