import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import { fn } from 'storybook/test';

import { Link } from '../lib/components/Link';

const meta = {
  title: 'Components/Link',
  component: Link,
  decorators: [
    Story => (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <Story />
      </View>
    ),
  ],
  tags: ['autodocs'],
  args: { onPress: fn(), href: 'https://example.com' },
} satisfies Meta<typeof Link>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Primary Link',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Link',
    variant: 'secondary',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Link',
    disabled: true,
  },
};

export const WithCustomStyle: Story = {
  args: {
    children: 'Custom Styled Link',
    style: { fontSize: 20, color: 'purple' },
  },
};

export const LongText: Story = {
  args: {
    children: 'This is a link with a very long text that might wrap to multiple lines',
  },
};

export const WithExternalURL: Story = {
  args: {
    children: 'External Link',
    href: 'https://github.com',
  },
};
