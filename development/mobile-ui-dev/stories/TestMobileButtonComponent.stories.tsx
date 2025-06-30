import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { View } from 'react-native';
import { fn } from 'storybook/test';

import { TestMobileButtonComponent } from '@/lib';

const meta = {
  title: 'Components/TestMobileButtonComponent',
  component: TestMobileButtonComponent,
  decorators: [
    Story => (
      <View style={{ flex: 1, alignItems: 'flex-start', padding: 20 }}>
        <Story />
      </View>
    ),
  ],
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // Use `fn` to spy on the onPress arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onPress: fn() },
} satisfies Meta<typeof TestMobileButtonComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    children: 'Tertiary Button',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    variant: 'primary',
    children: 'Small Button',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
    variant: 'primary',
    children: 'Medium Button',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    variant: 'primary',
    children: 'Large Button',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    variant: 'primary',
    children: 'Disabled Button',
  },
};
