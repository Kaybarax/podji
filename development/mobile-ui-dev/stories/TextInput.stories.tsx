import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { View } from 'react-native';
import { fn } from 'storybook/test';

import { TextInput } from '@/lib/components/TextInput';

const meta = {
  title: 'Components/TextInput',
  component: TextInput,
  decorators: [
    Story => (
      <View style={{ flex: 1, padding: 20, maxWidth: 400 }}>
        <Story />
      </View>
    ),
  ],
  tags: ['autodocs'],
  args: {
    onChangeText: fn(),
  },
} satisfies Meta<typeof TextInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text here',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
  },
};

export const Required: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    required: true,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    helperText: 'Password must be at least 8 characters',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    value: 'invalid-email',
    error: 'Please enter a valid email address',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
    disabled: true,
    value: 'johndoe',
  },
};

export const OutlinedVariant: Story = {
  args: {
    label: 'Outlined Input',
    placeholder: 'This is an outlined input',
    variant: 'outlined',
  },
};

export const FilledVariant: Story = {
  args: {
    label: 'Filled Input',
    placeholder: 'This is a filled input',
    variant: 'filled',
  },
};

export const UnderlinedVariant: Story = {
  args: {
    label: 'Underlined Input',
    placeholder: 'This is an underlined input',
    variant: 'underlined',
  },
};

export const Multiline: Story = {
  args: {
    label: 'Description',
    placeholder: 'Enter a description',
    multiline: true,
    numberOfLines: 4,
  },
};

export const WithCustomStyles: Story = {
  args: {
    label: 'Custom Styled Input',
    placeholder: 'Enter text here',
    containerStyle: { backgroundColor: '#f0f0f0', padding: 10, borderRadius: 8 },
    labelStyle: { color: '#6200ee', fontWeight: 'bold' },
    inputStyle: { backgroundColor: '#ffffff', borderRadius: 4 },
  },
};
