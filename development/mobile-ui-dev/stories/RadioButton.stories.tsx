import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { View } from 'react-native';
import { fn } from 'storybook/test';
import { useState } from 'react';

import { RadioButton } from '@/lib/components/RadioButton';

const meta = {
  title: 'Components/RadioButton',
  component: RadioButton,
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
} satisfies Meta<typeof RadioButton>;

export default meta;

type Story = StoryObj<typeof meta>;

// Interactive radio button that maintains its own state
const InteractiveRadioButton = (props: any) => {
  const [selected, setSelected] = useState(props.selected || false);
  return (
    <RadioButton
      {...props}
      selected={selected}
      onValueChange={(newValue) => {
        setSelected(newValue);
        props.onValueChange?.(newValue);
      }}
    />
  );
};

// Radio group that maintains selection state
const RadioGroup = ({ options, initialSelected, onChange }: any) => {
  const [selectedOption, setSelectedOption] = useState(initialSelected || null);
  
  return (
    <View style={{ gap: 16 }}>
      {options.map((option: any) => (
        <RadioButton
          key={option.value}
          label={option.label}
          selected={selectedOption === option.value}
          onValueChange={() => {
            setSelectedOption(option.value);
            onChange?.(option.value);
          }}
        />
      ))}
    </View>
  );
};

export const Default: Story = {
  render: (args) => <InteractiveRadioButton {...args} />,
  args: {
    label: 'Default radio button',
  },
};

export const Selected: Story = {
  render: (args) => <InteractiveRadioButton {...args} />,
  args: {
    label: 'Selected radio button',
    selected: true,
  },
};

export const Unselected: Story = {
  render: (args) => <InteractiveRadioButton {...args} />,
  args: {
    label: 'Unselected radio button',
    selected: false,
  },
};

export const WithLabelOnRight: Story = {
  render: (args) => <InteractiveRadioButton {...args} />,
  args: {
    label: 'Label on right',
    labelPosition: 'right',
  },
};

export const WithLabelOnLeft: Story = {
  render: (args) => <InteractiveRadioButton {...args} />,
  args: {
    label: 'Label on left',
    labelPosition: 'left',
  },
};

export const Disabled: Story = {
  render: (args) => <InteractiveRadioButton {...args} />,
  args: {
    label: 'Disabled radio button',
    disabled: true,
  },
};

export const DisabledSelected: Story = {
  render: (args) => <InteractiveRadioButton {...args} />,
  args: {
    label: 'Disabled selected radio button',
    disabled: true,
    selected: true,
  },
};

export const WithCustomStyles: Story = {
  render: (args) => <InteractiveRadioButton {...args} />,
  args: {
    label: 'Custom styled radio button',
    containerStyle: { backgroundColor: '#f0f0f0', padding: 10, borderRadius: 8 },
    labelStyle: { color: '#6200ee', fontWeight: 'bold' },
    radioStyle: { borderWidth: 3 },
  },
};

export const SimpleRadioGroup: Story = {
  render: () => (
    <RadioGroup
      options={[
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
      ]}
      initialSelected="option1"
      onChange={fn()}
    />
  ),
};

export const GenderSelection: Story = {
  render: () => (
    <RadioGroup
      options={[
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'other', label: 'Other' },
        { value: 'prefer-not-to-say', label: 'Prefer not to say' },
      ]}
      onChange={fn()}
    />
  ),
};

export const PaymentMethods: Story = {
  render: () => (
    <RadioGroup
      options={[
        { value: 'credit-card', label: 'Credit Card' },
        { value: 'paypal', label: 'PayPal' },
        { value: 'bank-transfer', label: 'Bank Transfer' },
        { value: 'crypto', label: 'Cryptocurrency' },
      ]}
      initialSelected="credit-card"
      onChange={fn()}
    />
  ),
};