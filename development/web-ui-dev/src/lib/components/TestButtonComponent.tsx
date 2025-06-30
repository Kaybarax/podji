import React from 'react';
// import { styledTheme } from '@podji/design-tokens';

export interface TestButtonComponentProps {
  /**
   * Button contents
   */
  children: React.ReactNode;
  /**
   * Optional click handler
   */
  onClick?: () => void;
  /**
   * Button variant
   */
  variant?: 'primary' | 'secondary' | 'tertiary';
  /**
   * Button size
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Is the button disabled?
   */
  disabled?: boolean;
  /**
   * Additional CSS class names
   */
  className?: string;
}

/**
 * Primary UI component for user interaction
 */
const TestButtonComponent: React.FC<TestButtonComponentProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  className = '',
}) => {
  // Base classes
  const baseClasses = 'font-medium rounded focus:outline-none transition-colors';

  // Size classes
  const sizeClasses = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-4 py-2',
    large: 'px-6 py-3 text-lg',
  };

  // Variant classes
  const variantClasses = {
    primary:
      'bg-color.ref.light.primary text-white hover:bg-color.ref.light.primary-dark active:bg-color.ref.light.primary-darker',
    secondary:
      'bg-color.ref.light.secondary text-white hover:bg-color.ref.light.secondary-dark active:bg-color.ref.light.secondary-darker',
    tertiary:
      'bg-transparent text-color.ref.light.primary border border-color.ref.light.primary hover:bg-color.ref.light.primary-lightest',
  };

  // Disabled classes
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  // Combine all classes
  const buttonClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${disabledClasses} ${className}`;

  return (
    <button type="button" className={buttonClasses} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default TestButtonComponent;
