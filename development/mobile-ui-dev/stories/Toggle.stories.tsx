import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { View } from 'react-native';
import { fn } from 'storybook/test';
import { useState } from 'react';

import { Toggle } from '@/lib/components/Toggle';

const meta = {
  title: 'UI/Toggle',
  component: Toggle,
  decorators: [
    Story => (
      <View style={{ flex: 1, padding: 20, maxWidth: 400 }}>
        <Story />
      </View>
    ),
  ],
  tags: ['autodocs'],
  args: {
    onValueChange: fn(),
  },
} satisfies Meta<typeof Toggle>;

export default meta;

type Story = StoryObj<typeof meta>;

// Interactive toggle that maintains its own state
const InteractiveToggle = (props: any) => {
  const [value, setValue] = useState(props.value || false);
  return (
    <Toggle
      {...props}
      value={value}
      onValueChange={newValue => {
        setValue(newValue);
        props.onValueChange?.(newValue);
      }}
    />
  );
};

export const Default: Story = {
  render: args => <InteractiveToggle {...args} />,
  args: {
    label: 'Toggle me',
    value: false,
  },
};

export const On: Story = {
  render: args => <InteractiveToggle {...args} />,
  args: {
    label: 'Toggle me',
    value: true,
  },
};

export const Off: Story = {
  render: args => <InteractiveToggle {...args} />,
  args: {
    label: 'Toggle me',
    value: false,
  },
};

export const WithLabelOnRight: Story = {
  render: args => <InteractiveToggle {...args} />,
  args: {
    label: 'Label on right',
    labelPosition: 'right',
    value: false,
  },
};

export const WithLabelOnLeft: Story = {
  render: args => <InteractiveToggle {...args} />,
  args: {
    label: 'Label on left',
    labelPosition: 'left',
    value: false,
  },
};

export const Disabled: Story = {
  render: args => <InteractiveToggle {...args} />,
  args: {
    label: 'Disabled toggle',
    disabled: true,
    value: false,
  },
};

export const DisabledOn: Story = {
  render: args => <InteractiveToggle {...args} />,
  args: {
    label: 'Disabled toggle (on)',
    disabled: true,
    value: true,
  },
};

export const WithCustomStyles: Story = {
  render: args => <InteractiveToggle {...args} />,
  args: {
    label: 'Custom styled toggle',
    value: false,
    containerStyle: { backgroundColor: '#f0f0f0', padding: 10, borderRadius: 8 },
    labelStyle: { color: '#6200ee', fontWeight: 'bold' },
    toggleStyle: { backgroundColor: '#e0e0e0', borderWidth: 1, borderColor: '#cccccc' },
  },
};

export const MultipleToggles: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <InteractiveToggle label="Notifications" />
      <InteractiveToggle label="Dark Mode" />
      <InteractiveToggle label="Auto-play" />
      <InteractiveToggle label="High Quality Audio" value={true} />
    </View>
  ),
  args: {
    value: false,
    onValueChange: fn(),
  },
};
