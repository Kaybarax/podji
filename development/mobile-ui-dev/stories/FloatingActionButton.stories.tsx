import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { View, Text } from 'react-native';
import { fn } from 'storybook/test';

import { FloatingActionButton } from '@/lib/components/FloatingActionButton';

const meta = {
  title: 'Components/FloatingActionButton',
  component: FloatingActionButton,
  decorators: [
    Story => (
      <View style={{ flex: 1, padding: 20, height: 300, position: 'relative' }}>
        <Story />
      </View>
    ),
  ],
  tags: ['autodocs'],
  args: {
    onPress: fn(),
  },
} satisfies Meta<typeof FloatingActionButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: '+',
    position: 'bottomRight',
    size: 'medium',
  },
};

export const Small: Story = {
  args: {
    icon: '+',
    position: 'bottomRight',
    size: 'small',
  },
};

export const Medium: Story = {
  args: {
    icon: '+',
    position: 'bottomRight',
    size: 'medium',
  },
};

export const Large: Story = {
  args: {
    icon: '+',
    position: 'bottomRight',
    size: 'large',
  },
};

export const BottomRight: Story = {
  args: {
    icon: '+',
    position: 'bottomRight',
    size: 'medium',
  },
};

export const BottomLeft: Story = {
  args: {
    icon: '+',
    position: 'bottomLeft',
    size: 'medium',
  },
};

export const TopRight: Story = {
  args: {
    icon: '+',
    position: 'topRight',
    size: 'medium',
  },
};

export const TopLeft: Story = {
  args: {
    icon: '+',
    position: 'topLeft',
    size: 'medium',
  },
};

export const WithEmojiIcon: Story = {
  args: {
    icon: '🎵',
    position: 'bottomRight',
    size: 'medium',
  },
};

export const WithComponentIcon: Story = {
  args: {
    icon: <Text style={{ fontSize: 24, color: 'white' }}>Mix</Text>,
    position: 'bottomRight',
    size: 'large',
  },
};
