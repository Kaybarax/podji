import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import { fn } from 'storybook/test';

import { DatePicker } from '../lib/components/DatePicker';

const meta = {
  title: 'Components/DatePicker',
  component: DatePicker,
  decorators: [
    Story => (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <Story />
      </View>
    ),
  ],
  tags: ['autodocs'],
  args: { onChange: fn() },
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

// Helper function to create dates
const createDate = (year: number, month: number, day: number) => {
  return new Date(year, month - 1, day);
};

export const Default: Story = {
  args: {
    placeholder: 'Select a date',
  },
};

export const WithSelectedDate: Story = {
  args: {
    value: createDate(2023, 6, 15),
  },
};

export const CustomFormat: Story = {
  args: {
    value: createDate(2023, 6, 15),
    format: 'DD/MM/YYYY',
  },
};

export const WithMinMaxDates: Story = {
  args: {
    value: createDate(2023, 6, 15),
    minDate: createDate(2023, 6, 1),
    maxDate: createDate(2023, 6, 30),
  },
};

export const Disabled: Story = {
  args: {
    value: createDate(2023, 6, 15),
    disabled: true,
  },
};

export const CustomPlaceholder: Story = {
  args: {
    placeholder: 'Choose your birthday',
  },
};

export const WithCustomStyle: Story = {
  args: {
    value: createDate(2023, 6, 15),
    style: { width: 300 },
  },
};