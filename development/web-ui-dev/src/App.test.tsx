import { render, screen } from '@testing-library/react';
import App from './App.tsx';

describe('App component', () => {
  test('renders TestButtonComponent heading', () => {
    render(<App />);
    const headingElement = screen.getByText('TestButtonComponent');
    expect(headingElement).toBeInTheDocument();
  });

  test('renders Components sidebar', () => {
    render(<App />);
    const sidebarHeading = screen.getByText('Components');
    expect(sidebarHeading).toBeInTheDocument();

    const componentItem = screen.getByText('Test Button Component');
    expect(componentItem).toBeInTheDocument();
  });

  test('renders button variants', () => {
    render(<App />);
    const variantsHeading = screen.getByText('Button Variants');
    expect(variantsHeading).toBeInTheDocument();

    // Use getByRole with name to be more specific
    const primaryHeading = screen.getByRole('heading', { name: 'Primary', level: 3 });
    expect(primaryHeading).toBeInTheDocument();

    const secondaryHeading = screen.getByRole('heading', { name: 'Secondary', level: 3 });
    expect(secondaryHeading).toBeInTheDocument();

    const tertiaryHeading = screen.getByRole('heading', { name: 'Tertiary', level: 3 });
    expect(tertiaryHeading).toBeInTheDocument();

    const disabledHeading = screen.getByRole('heading', { name: 'Disabled', level: 3 });
    expect(disabledHeading).toBeInTheDocument();
  });
});
