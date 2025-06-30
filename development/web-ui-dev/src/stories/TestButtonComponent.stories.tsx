import type { Meta, StoryObj } from '@storybook/react-vite';
import TestButtonComponent from '../lib/components/TestButtonComponent.tsx';

const meta = {
  title: 'Components/TestButtonComponent',
  component: TestButtonComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof TestButtonComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

// Primary button (default)
export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
    size: 'medium',
  },
};

// Secondary button
export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
    size: 'medium',
  },
};

// Tertiary button
export const Tertiary: Story = {
  args: {
    children: 'Tertiary Button',
    variant: 'tertiary',
    size: 'medium',
  },
};

// Small button
export const Small: Story = {
  args: {
    children: 'Small Button',
    size: 'small',
  },
};

// Large button
export const Large: Story = {
  args: {
    children: 'Large Button',
    size: 'large',
  },
};

// Disabled button
export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
};

// All variants
export const AllVariants: Story = {
  args: {
    children: 'Button',
    size: 'medium',
  },
  render: () => (
    <div className="flex flex-col space-y-4">
      <TestButtonComponent variant="primary">Primary Button</TestButtonComponent>
      <TestButtonComponent variant="secondary">Secondary Button</TestButtonComponent>
      <TestButtonComponent variant="tertiary">Tertiary Button</TestButtonComponent>
    </div>
  ),
};

// All sizes
export const AllSizes: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
  },
  render: () => (
    <div className="flex flex-col space-y-4">
      <TestButtonComponent size="small">Small Button</TestButtonComponent>
      <TestButtonComponent size="medium">Medium Button</TestButtonComponent>
      <TestButtonComponent size="large">Large Button</TestButtonComponent>
    </div>
  ),
};
