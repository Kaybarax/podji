import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { View } from 'react-native';
import { fn } from 'storybook/test';

import { BottomTabNavigator } from '@/lib/components/BottomTabNavigator';

const meta = {
  title: 'Components/BottomTabNavigator',
  component: BottomTabNavigator,
  decorators: [
    Story => (
      <View style={{ flex: 1, padding: 20 }}>
        <Story />
      </View>
    ),
  ],
  tags: ['autodocs'],
  args: {
    onTabPress: fn(),
  },
} satisfies Meta<typeof BottomTabNavigator>;

export default meta;

type Story = StoryObj<typeof meta>;

const defaultTabs = [
  { key: 'home', label: 'Home', icon: '🏠' },
  { key: 'library', label: 'Library', icon: '🎧' },
  { key: 'mix', label: 'Mix', icon: '🎚️' },
  { key: 'profile', label: 'Profile', icon: '👤' },
  { key: 'chat', label: 'Chat', icon: '💬' },
];

export const Default: Story = {
  args: {
    tabs: defaultTabs,
    activeTab: 'home',
  },
};

export const LibraryActive: Story = {
  args: {
    tabs: defaultTabs,
    activeTab: 'library',
  },
};

export const MixActive: Story = {
  args: {
    tabs: defaultTabs,
    activeTab: 'mix',
  },
};

export const ProfileActive: Story = {
  args: {
    tabs: defaultTabs,
    activeTab: 'profile',
  },
};

export const ChatActive: Story = {
  args: {
    tabs: defaultTabs,
    activeTab: 'chat',
  },
};

export const CustomTabs: Story = {
  args: {
    tabs: [
      { key: 'feed', label: 'Feed', icon: '📱' },
      { key: 'search', label: 'Search', icon: '🔍' },
      { key: 'create', label: 'Create', icon: '➕' },
      { key: 'notifications', label: 'Notifications', icon: '🔔' },
      { key: 'settings', label: 'Settings', icon: '⚙️' },
    ],
    activeTab: 'feed',
  },
};
