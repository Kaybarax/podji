import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { View } from 'react-native';
import { fn } from 'storybook/test';

import { NavigationBar } from '@/lib/components/NavigationBar/NavigationBar';

const meta = {
  title: 'Components/NavigationBar',
  component: NavigationBar,
  decorators: [
    Story => (
      <View style={{ flex: 1, padding: 20 }}>
        <Story />
      </View>
    ),
  ],
  tags: ['autodocs'],
  args: {
    onNotificationPress: fn(),
    onSearchPress: fn(),
  },
} satisfies Meta<typeof NavigationBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Pocket DJ',
  },
};

export const WithNotification: Story = {
  args: {
    title: 'Pocket DJ',
    showNotification: true,
  },
};

export const WithSearch: Story = {
  args: {
    title: 'Pocket DJ',
    showSearch: true,
  },
};

export const WithBoth: Story = {
  args: {
    title: 'Pocket DJ',
    showNotification: true,
    showSearch: true,
  },
};

export const WithLogo: Story = {
  args: {
    logo: { uri: 'https://via.placeholder.com/40' },
    title: 'Pocket DJ',
  },
};

export const WithLogoAndIcons: Story = {
  args: {
    logo: { uri: 'https://via.placeholder.com/40' },
    title: 'Pocket DJ',
    showNotification: true,
    showSearch: true,
  },
};
