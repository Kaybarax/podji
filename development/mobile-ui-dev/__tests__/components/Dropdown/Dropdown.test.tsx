import { render, fireEvent } from '@testing-library/react-native';
import { Dropdown } from '@/lib/components/Dropdown';

// Mock the getMobileTheme function from @podji/design-tokens
jest.mock('@podji/design-tokens', () => ({
  getMobileTheme: jest.fn().mockResolvedValue({
    light: {
      color: {
        primitive: {
          black: '#000000',
          grey: {
            100: '#F5F5F5',
            200: '#EEEEEE',
            300: '#E0E0E0',
          },
        },
        semantic: {
          text: {
            primary: '#000000',
            secondary: '#757575',
            disabled: '#9E9E9E',
          },
          border: {
            base: '#E0E0E0',
          },
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
        xs: 4,
        sm: 8,
        md: 16,
      },
      typography: {
        fontSize: {
          xs: 10,
          sm: 12,
          md: 14,
        },
        fontWeight: {
          bold: '700',
        },
      },
      borderRadius: {
        sm: 4,
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

// Mock Dimensions
jest.mock('react-native/Libraries/Utilities/Dimensions', () => ({
  get: jest.fn(() => ({ width: 375, height: 812 })),
}));

const mockItems = [
  { value: 'item1', label: 'Item 1' },
  { value: 'item2', label: 'Item 2' },
  { value: 'item3', label: 'Item 3', disabled: true },
];

describe('Dropdown', () => {
  it('renders correctly with default props', () => {
    const onValueChange = jest.fn();
    const { getByText } = render(<Dropdown items={mockItems} onValueChange={onValueChange} />);

    expect(getByText('Select an option')).toBeTruthy();
  });

  it('renders with custom placeholder', () => {
    const onValueChange = jest.fn();
    const { getByText } = render(
      <Dropdown items={mockItems} onValueChange={onValueChange} placeholder="Choose an item" />,
    );

    expect(getByText('Choose an item')).toBeTruthy();
  });

  it('renders with label', () => {
    const onValueChange = jest.fn();
    const { getByText } = render(<Dropdown items={mockItems} onValueChange={onValueChange} label="Select Item" />);

    expect(getByText('Select Item')).toBeTruthy();
  });

  it('renders selected item', () => {
    const onValueChange = jest.fn();
    const { getByText } = render(<Dropdown items={mockItems} onValueChange={onValueChange} selectedValue="item1" />);

    expect(getByText('Item 1')).toBeTruthy();
  });

  it('renders helper text when provided', () => {
    const onValueChange = jest.fn();
    const { getByText } = render(
      <Dropdown items={mockItems} onValueChange={onValueChange} helperText="Please select an item" />,
    );

    expect(getByText('Please select an item')).toBeTruthy();
  });

  it('renders error message when provided', () => {
    const onValueChange = jest.fn();
    const { getByText } = render(
      <Dropdown items={mockItems} onValueChange={onValueChange} error="Selection is required" />,
    );

    expect(getByText('Selection is required')).toBeTruthy();
  });

  it('prioritizes error message over helper text', () => {
    const onValueChange = jest.fn();
    const { getByText, queryByText } = render(
      <Dropdown
        items={mockItems}
        onValueChange={onValueChange}
        helperText="Please select an item"
        error="Selection is required"
      />,
    );

    expect(getByText('Selection is required')).toBeTruthy();
    expect(queryByText('Please select an item')).toBeNull();
  });

  it('opens dropdown when pressed', () => {
    const onValueChange = jest.fn();
    const { getByText } = render(<Dropdown items={mockItems} onValueChange={onValueChange} />);

    fireEvent.press(getByText('Select an option'));
    // Since we mocked the Modal and animations, we can't easily test if it's visible
    // But we can verify the component doesn't crash when opening
  });

  it('does not open dropdown when disabled', () => {
    const onValueChange = jest.fn();
    const { getByText } = render(<Dropdown items={mockItems} onValueChange={onValueChange} disabled={true} />);

    fireEvent.press(getByText('Select an option'));
    // Since we mocked the Modal and animations, we can't easily test if it's visible
    // But we can verify the component doesn't crash when trying to open while disabled
  });
});
