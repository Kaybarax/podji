import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View, Text } from 'react-native';

import { Badge } from '../lib/components/Badge';

const meta = {
  title: 'UI/Badge',
  component: Badge,
  decorators: [
    Story => (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <Story />
      </View>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: 5,
    children: <View style={{ width: 40, height: 40, backgroundColor: '#e0e0e0', borderRadius: 4 }} />,
  },
};

export const WithDot: Story = {
  args: {
    dot: true,
    children: <View style={{ width: 40, height: 40, backgroundColor: '#e0e0e0', borderRadius: 4 }} />,
  },
};

export const Success: Story = {
  args: {
    content: 'New',
    variant: 'success',
    children: <View style={{ width: 40, height: 40, backgroundColor: '#e0e0e0', borderRadius: 4 }} />,
  },
};

export const Error: Story = {
  args: {
    content: 99,
    variant: 'error',
    children: <View style={{ width: 40, height: 40, backgroundColor: '#e0e0e0', borderRadius: 4 }} />,
  },
};

export const Warning: Story = {
  args: {
    content: '!',
    variant: 'warning',
    children: <View style={{ width: 40, height: 40, backgroundColor: '#e0e0e0', borderRadius: 4 }} />,
  },
};

export const Info: Story = {
  args: {
    content: 'i',
    variant: 'info',
    children: <View style={{ width: 40, height: 40, backgroundColor: '#e0e0e0', borderRadius: 4 }} />,
  },
};

export const MaxValue: Story = {
  args: {
    content: 150,
    max: 99,
    children: <View style={{ width: 40, height: 40, backgroundColor: '#e0e0e0', borderRadius: 4 }} />,
  },
};

export const Small: Story = {
  args: {
    content: 5,
    size: 'small',
    children: <View style={{ width: 40, height: 40, backgroundColor: '#e0e0e0', borderRadius: 4 }} />,
  },
};

export const Large: Story = {
  args: {
    content: 5,
    size: 'large',
    children: <View style={{ width: 40, height: 40, backgroundColor: '#e0e0e0', borderRadius: 4 }} />,
  },
};
