import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TestButtonComponent from './TestButtonComponent.tsx';

describe('TestButtonComponent', () => {
  test('renders the button with default props', () => {
    render(<TestButtonComponent>Click me</TestButtonComponent>);
    const button = screen.getByRole('button', { name: /click me/i });

    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
    expect(button).toHaveClass('bg-color.ref.light.primary'); // primary variant
    expect(button).toHaveClass('px-4 py-2'); // medium size
  });

  test('renders the button with custom props', () => {
    render(
      <TestButtonComponent variant="secondary" size="large" disabled={true} className="custom-class">
        Secondary Button
      </TestButtonComponent>,
    );

    const button = screen.getByRole('button', { name: /secondary button/i });

    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
    expect(button).toHaveClass('bg-color.ref.light.secondary'); // secondary variant
    expect(button).toHaveClass('px-6 py-3'); // large size
    expect(button).toHaveClass('opacity-50'); // disabled
    expect(button).toHaveClass('custom-class'); // custom class
  });

  test('calls onClick when button is clicked', () => {
    const handleClick = jest.fn();

    render(<TestButtonComponent onClick={handleClick}>Clickable Button</TestButtonComponent>);

    const button = screen.getByRole('button', { name: /clickable button/i });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('does not call onClick when disabled button is clicked', () => {
    const handleClick = jest.fn();

    render(
      <TestButtonComponent onClick={handleClick} disabled={true}>
        Disabled Button
      </TestButtonComponent>,
    );

    const button = screen.getByRole('button', { name: /disabled button/i });
    fireEvent.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });

  test('renders tertiary variant correctly', () => {
    render(<TestButtonComponent variant="tertiary">Tertiary Button</TestButtonComponent>);

    const button = screen.getByRole('button', { name: /tertiary button/i });

    expect(button).toHaveClass('bg-transparent');
    expect(button).toHaveClass('border-color.ref.light.primary');
  });

  test('renders small size correctly', () => {
    render(<TestButtonComponent size="small">Small Button</TestButtonComponent>);

    const button = screen.getByRole('button', { name: /small button/i });

    expect(button).toHaveClass('px-3 py-1');
    expect(button).toHaveClass('text-sm');
  });
});
