import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { View, Text } from 'react-native';
import { fn } from 'storybook/test';
import { useState } from 'react';

import { Dropdown } from '@/lib/components/Dropdown';

const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,
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
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

// Interactive dropdown that maintains its own state
const InteractiveDropdown = (props: any) => {
  const [selectedValue, setSelectedValue] = useState(props.selectedValue);
  return (
    <Dropdown
      {...props}
      selectedValue={selectedValue}
      onValueChange={value => {
        setSelectedValue(value);
        props.onValueChange?.(value);
      }}
    />
  );
};

const defaultItems = [
  { value: 'item1', label: 'Item 1' },
  { value: 'item2', label: 'Item 2' },
  { value: 'item3', label: 'Item 3' },
  { value: 'item4', label: 'Item 4' },
  { value: 'item5', label: 'Item 5' },
];

export const Default: Story = {
  render: args => <InteractiveDropdown {...args} />,
  args: {
    items: defaultItems,
    placeholder: 'Select an item',
  },
};

export const WithLabel: Story = {
  render: args => <InteractiveDropdown {...args} />,
  args: {
    items: defaultItems,
    label: 'Select an option',
    placeholder: 'Choose from the list',
  },
};

export const WithSelectedValue: Story = {
  render: args => <InteractiveDropdown {...args} />,
  args: {
    items: defaultItems,
    selectedValue: 'item2',
  },
};

export const WithHelperText: Story = {
  render: args => <InteractiveDropdown {...args} />,
  args: {
    items: defaultItems,
    label: 'Select an option',
    helperText: 'Choose one item from the list',
  },
};

export const WithError: Story = {
  render: args => <InteractiveDropdown {...args} />,
  args: {
    items: defaultItems,
    label: 'Select an option',
    error: 'This field is required',
  },
};

export const Disabled: Story = {
  render: args => <InteractiveDropdown {...args} />,
  args: {
    items: defaultItems,
    label: 'Select an option',
    disabled: true,
  },
};

export const WithDisabledItems: Story = {
  render: args => <InteractiveDropdown {...args} />,
  args: {
    items: [
      { value: 'item1', label: 'Item 1' },
      { value: 'item2', label: 'Item 2' },
      { value: 'item3', label: 'Item 3 (Disabled)', disabled: true },
      { value: 'item4', label: 'Item 4' },
      { value: 'item5', label: 'Item 5 (Disabled)', disabled: true },
    ],
    label: 'Select an option',
  },
};

export const WithCustomStyles: Story = {
  render: args => <InteractiveDropdown {...args} />,
  args: {
    items: defaultItems,
    label: 'Custom styled dropdown',
    containerStyle: { backgroundColor: '#f0f0f0', padding: 10, borderRadius: 8 },
    labelStyle: { color: '#6200ee', fontWeight: 'bold' },
    dropdownStyle: { borderColor: '#6200ee', borderWidth: 2 },
    itemStyle: { backgroundColor: '#f5f5f5' },
    itemTextStyle: { color: '#6200ee' },
  },
};

export const CountrySelector: Story = {
  render: args => <InteractiveDropdown {...args} />,
  args: {
    items: [
      { value: 'us', label: '🇺🇸 United States' },
      { value: 'ca', label: '🇨🇦 Canada' },
      { value: 'uk', label: '🇬🇧 United Kingdom' },
      { value: 'au', label: '🇦🇺 Australia' },
      { value: 'jp', label: '🇯🇵 Japan' },
      { value: 'de', label: '🇩🇪 Germany' },
      { value: 'fr', label: '🇫🇷 France' },
      { value: 'it', label: '🇮🇹 Italy' },
    ],
    label: 'Select Country',
    placeholder: 'Choose your country',
  },
};

export const LanguageSelector: Story = {
  render: args => <InteractiveDropdown {...args} />,
  args: {
    items: [
      { value: 'en', label: 'English' },
      { value: 'es', label: 'Spanish' },
      { value: 'fr', label: 'French' },
      { value: 'de', label: 'German' },
      { value: 'it', label: 'Italian' },
      { value: 'pt', label: 'Portuguese' },
      { value: 'ru', label: 'Russian' },
      { value: 'zh', label: 'Chinese' },
      { value: 'ja', label: 'Japanese' },
    ],
    label: 'Select Language',
    placeholder: 'Choose your preferred language',
    selectedValue: 'en',
  },
};

export const AudioQualitySelector: Story = {
  render: args => <InteractiveDropdown {...args} />,
  args: {
    items: [
      { value: 'low', label: 'Low (96 kbps)' },
      { value: 'medium', label: 'Medium (192 kbps)' },
      { value: 'high', label: 'High (320 kbps)' },
      { value: 'lossless', label: 'Lossless (FLAC)' },
    ],
    label: 'Audio Quality',
    placeholder: 'Select audio quality',
    helperText: 'Higher quality uses more data',
    selectedValue: 'medium',
  },
};

export const GenreSelector: Story = {
  render: args => <InteractiveDropdown {...args} />,
  args: {
    items: [
      { value: 'pop', label: 'Pop' },
      { value: 'rock', label: 'Rock' },
      { value: 'hiphop', label: 'Hip Hop' },
      { value: 'electronic', label: 'Electronic' },
      { value: 'jazz', label: 'Jazz' },
      { value: 'classical', label: 'Classical' },
      { value: 'rnb', label: 'R&B' },
      { value: 'country', label: 'Country' },
    ],
    label: 'Music Genre',
    placeholder: 'Select a genre',
  },
};
