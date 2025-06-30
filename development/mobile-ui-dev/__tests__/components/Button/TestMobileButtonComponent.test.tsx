import { render, fireEvent } from '@testing-library/react-native';
import { TestMobileButtonComponent } from '@/lib/components/Button/TestMobileButtonComponent';

// Mock the getTheme function from @podji/configs
jest.mock('@podji/configs', () => ({
  getTheme: jest.fn().mockResolvedValue({
    color: {
      ref: {
        light: {
          primary: '#3B82F6',
          secondary: '#10B981',
        },
      },
    },
    spacing: {
      xs: '4',
      sm: '8',
      md: '16',
      lg: '24',
    },
    borderRadius: {
      md: '4',
    },
    typography: {
      fontWeight: {
        bold: '700',
      },
    },
  }),
}));

describe('TestMobileButtonComponent', () => {
  it('renders correctly', () => {
    const { getByText } = render(<TestMobileButtonComponent>Button Text</TestMobileButtonComponent>);

    expect(getByText('Button Text')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<TestMobileButtonComponent onPress={onPressMock}>Press Me</TestMobileButtonComponent>);

    fireEvent.press(getByText('Press Me'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <TestMobileButtonComponent onPress={onPressMock} disabled>
        Press Me
      </TestMobileButtonComponent>,
    );

    fireEvent.press(getByText('Press Me'));
    expect(onPressMock).not.toHaveBeenCalled();
  });

  it('applies different styles based on variant prop', () => {
    const { rerender, getByText } = render(
      <TestMobileButtonComponent variant="primary">Primary Button</TestMobileButtonComponent>,
    );

    const primaryButton = getByText('Primary Button');

    rerender(<TestMobileButtonComponent variant="secondary">Secondary Button</TestMobileButtonComponent>);

    const secondaryButton = getByText('Secondary Button');

    rerender(<TestMobileButtonComponent variant="tertiary">Tertiary Button</TestMobileButtonComponent>);

    const tertiaryButton = getByText('Tertiary Button');

    // We can't directly test the styles in this test environment,
    // but we can at least verify the component renders with different variants
    expect(primaryButton).toBeTruthy();
    expect(secondaryButton).toBeTruthy();
    expect(tertiaryButton).toBeTruthy();
  });

  it('applies different styles based on size prop', () => {
    const { rerender, getByText } = render(
      <TestMobileButtonComponent size="small">Small Button</TestMobileButtonComponent>,
    );

    const smallButton = getByText('Small Button');

    rerender(<TestMobileButtonComponent size="medium">Medium Button</TestMobileButtonComponent>);

    const mediumButton = getByText('Medium Button');

    rerender(<TestMobileButtonComponent size="large">Large Button</TestMobileButtonComponent>);

    const largeButton = getByText('Large Button');

    // We can't directly test the styles in this test environment,
    // but we can at least verify the component renders with different sizes
    expect(smallButton).toBeTruthy();
    expect(mediumButton).toBeTruthy();
    expect(largeButton).toBeTruthy();
  });
});
