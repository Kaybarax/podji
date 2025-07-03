import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import { fn } from 'storybook/test';

import { Pagination } from '../lib/components/Pagination';

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  decorators: [
    Story => (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <Story />
      </View>
    ),
  ],
  tags: ['autodocs'],
  args: { onPageChange: fn() },
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    totalPages: 10,
    currentPage: 1,
  },
};

export const CurrentPageInMiddle: Story = {
  args: {
    totalPages: 10,
    currentPage: 5,
  },
};

export const LastPage: Story = {
  args: {
    totalPages: 10,
    currentPage: 10,
  },
};

export const WithFirstLastButtons: Story = {
  args: {
    totalPages: 20,
    currentPage: 10,
    showFirstLast: true,
  },
};

export const WithoutPrevNextButtons: Story = {
  args: {
    totalPages: 10,
    currentPage: 5,
    showPrevNext: false,
  },
};

export const FewPages: Story = {
  args: {
    totalPages: 3,
    currentPage: 2,
  },
};

export const ManyVisiblePages: Story = {
  args: {
    totalPages: 20,
    currentPage: 10,
    maxVisiblePages: 10,
  },
};

export const Disabled: Story = {
  args: {
    totalPages: 10,
    currentPage: 5,
    disabled: true,
  },
};