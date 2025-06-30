import { render, fireEvent } from '@testing-library/react-native';
import { TextInput } from '@/lib/components/TextInput';

// Mock the getMobileTheme function from @podji/design-tokens
jest.mock('@podji/design-tokens', () => ({
  getMobileTheme: jest.fn().mockResolvedValue({
    light: {
      color: {
        primitive: {
          grey: {
            100: '#F5F5F5',
            200: '#EEEEEE',
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
        },
        theme: {
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

describe('TextInput', () => {
  it('renders correctly with label', () => {
    const { getByText } = render(<TextInput label="Username" />);
    expect(getByText('Username')).toBeTruthy();
  });

  it('renders with required asterisk when required is true', () => {
    const { getByText } = render(<TextInput label="Username" required />);
    expect(getByText('*')).toBeTruthy();
  });

  it('renders helper text when provided', () => {
    const { getByText } = render(<TextInput helperText="Enter your username" />);
    expect(getByText('Enter your username')).toBeTruthy();
  });

  it('renders error message when provided', () => {
    const { getByText } = render(<TextInput error="Username is required" />);
    expect(getByText('Username is required')).toBeTruthy();
  });

  it('prioritizes error message over helper text', () => {
    const { getByText, queryByText } = render(
      <TextInput helperText="Enter your username" error="Username is required" />,
    );

    expect(getByText('Username is required')).toBeTruthy();
    expect(queryByText('Enter your username')).toBeNull();
  });

  it('calls onChangeText when text is entered', () => {
    const onChangeTextMock = jest.fn();
    const { getByPlaceholderText } = render(<TextInput placeholder="Enter username" onChangeText={onChangeTextMock} />);

    fireEvent.changeText(getByPlaceholderText('Enter username'), 'testuser');
    expect(onChangeTextMock).toHaveBeenCalledWith('testuser');
  });

  it('disables input when disabled prop is true', () => {
    const { getByPlaceholderText } = render(<TextInput placeholder="Enter username" disabled />);

    const input = getByPlaceholderText('Enter username');
    expect(input.props.editable).toBe(false);
  });

  it('renders with different variants', () => {
    const { rerender, getByPlaceholderText } = render(<TextInput placeholder="Outlined input" variant="outlined" />);

    // We can't directly test the styles in this test environment,
    // but we can at least verify the component renders with different variants
    expect(getByPlaceholderText('Outlined input')).toBeTruthy();

    rerender(<TextInput placeholder="Filled input" variant="filled" />);
    expect(getByPlaceholderText('Filled input')).toBeTruthy();

    rerender(<TextInput placeholder="Underlined input" variant="underlined" />);
    expect(getByPlaceholderText('Underlined input')).toBeTruthy();
  });
});
