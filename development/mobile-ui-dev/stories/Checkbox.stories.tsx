import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { View } from 'react-native';
import { fn } from 'storybook/test';
import { useState } from 'react';

import { Checkbox } from '@/lib/components/Checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
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
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

// Interactive checkbox that maintains its own state
const InteractiveCheckbox = (props: any) => {
  const [checked, setChecked] = useState(props.checked || false);
  return (
    <Checkbox
      {...props}
      checked={checked}
      onValueChange={(newValue) => {
        setChecked(newValue);
        props.onValueChange?.(newValue);
      }}
    />
  );
};

export const Default: Story = {
  render: (args) => <InteractiveCheckbox {...args} />,
  args: {
    label: 'Default checkbox',
  },
};

export const Checked: Story = {
  render: (args) => <InteractiveCheckbox {...args} />,
  args: {
    label: 'Checked checkbox',
    checked: true,
  },
};

export const Unchecked: Story = {
  render: (args) => <InteractiveCheckbox {...args} />,
  args: {
    label: 'Unchecked checkbox',
    checked: false,
  },
};

export const WithLabelOnRight: Story = {
  render: (args) => <InteractiveCheckbox {...args} />,
  args: {
    label: 'Label on right',
    labelPosition: 'right',
  },
};

export const WithLabelOnLeft: Story = {
  render: (args) => <InteractiveCheckbox {...args} />,
  args: {
    label: 'Label on left',
    labelPosition: 'left',
  },
};

export const Disabled: Story = {
  render: (args) => <InteractiveCheckbox {...args} />,
  args: {
    label: 'Disabled checkbox',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  render: (args) => <InteractiveCheckbox {...args} />,
  args: {
    label: 'Disabled checked checkbox',
    disabled: true,
    checked: true,
  },
};

export const WithCustomStyles: Story = {
  render: (args) => <InteractiveCheckbox {...args} />,
  args: {
    label: 'Custom styled checkbox',
    containerStyle: { backgroundColor: '#f0f0f0', padding: 10, borderRadius: 8 },
    labelStyle: { color: '#6200ee', fontWeight: 'bold' },
    checkboxStyle: { borderRadius: 12, borderWidth: 3 },
  },
};

export const CheckboxGroup: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <InteractiveCheckbox label="Option 1" />
      <InteractiveCheckbox label="Option 2" />
      <InteractiveCheckbox label="Option 3" />
      <InteractiveCheckbox label="Option 4" checked={true} />
    </View>
  ),
};

export const TermsAndConditions: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <InteractiveCheckbox label="I accept the Terms and Conditions" />
      <InteractiveCheckbox label="I would like to receive marketing emails" />
      <InteractiveCheckbox label="Remember me on this device" checked={true} />
    </View>
  ),
};