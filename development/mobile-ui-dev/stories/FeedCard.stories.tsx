import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { View } from 'react-native';
import { fn } from 'storybook/test';

import { FeedCard } from '@/lib/components/FeedCard';

const meta = {
  title: 'Components/FeedCard',
  component: FeedCard,
  decorators: [
    Story => (
      <View style={{ flex: 1, padding: 20, maxWidth: 400 }}>
        <Story />
      </View>
    ),
  ],
  tags: ['autodocs'],
  args: {
    onPress: fn(),
    onLikePress: fn(),
    onCommentPress: fn(),
    onSharePress: fn(),
  },
} satisfies Meta<typeof FeedCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Summer Vibes Mix',
    creator: 'DJ Cool',
    coverImage: { uri: 'https://picsum.photos/400/200' },
    likes: 42,
    comments: 7,
    shares: 3,
  },
};

export const Liked: Story = {
  args: {
    title: 'Summer Vibes Mix',
    creator: 'DJ Cool',
    coverImage: { uri: 'https://picsum.photos/400/200' },
    likes: 43,
    comments: 7,
    shares: 3,
    isLiked: true,
  },
};

export const LongTitle: Story = {
  args: {
    title: 'This is a very long mix title that should wrap to multiple lines when displayed in the card',
    creator: 'DJ Cool',
    coverImage: { uri: 'https://picsum.photos/400/200' },
    likes: 42,
    comments: 7,
    shares: 3,
  },
};

export const HighEngagement: Story = {
  args: {
    title: 'Viral Hit Mix',
    creator: 'DJ Popular',
    coverImage: { uri: 'https://picsum.photos/400/200?random=1' },
    likes: 1542,
    comments: 328,
    shares: 89,
  },
};

export const NoEngagement: Story = {
  args: {
    title: 'New Mix',
    creator: 'DJ Newbie',
    coverImage: { uri: 'https://picsum.photos/400/200?random=2' },
    likes: 0,
    comments: 0,
    shares: 0,
  },
};
