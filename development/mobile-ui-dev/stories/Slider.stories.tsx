import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { View, Text } from 'react-native';
import { fn } from 'storybook/test';
import { useState } from 'react';

import { Slider } from '@/lib/components/Slider';

const meta = {
  title: 'Components/Slider',
  component: Slider,
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
    onSlidingStart: fn(),
    onSlidingComplete: fn(),
  },
} satisfies Meta<typeof Slider>;

export default meta;

type Story = StoryObj<typeof meta>;

// Interactive slider that maintains its own state
const InteractiveSlider = (props: any) => {
  const [value, setValue] = useState(props.value || 50);
  return (
    <Slider
      {...props}
      value={value}
      onValueChange={(newValue) => {
        setValue(newValue);
        props.onValueChange?.(newValue);
      }}
    />
  );
};

export const Default: Story = {
  render: (args) => <InteractiveSlider {...args} />,
  args: {
    value: 50,
    minimumValue: 0,
    maximumValue: 100,
  },
};

export const WithLabels: Story = {
  render: (args) => <InteractiveSlider {...args} />,
  args: {
    value: 50,
    minimumValue: 0,
    maximumValue: 100,
    showLabels: true,
  },
};

export const WithCustomLabels: Story = {
  render: (args) => <InteractiveSlider {...args} />,
  args: {
    value: 50,
    minimumValue: 0,
    maximumValue: 100,
    showLabels: true,
    minimumLabel: 'Min',
    maximumLabel: 'Max',
  },
};

export const WithValue: Story = {
  render: (args) => <InteractiveSlider {...args} />,
  args: {
    value: 50,
    minimumValue: 0,
    maximumValue: 100,
    showValue: true,
  },
};

export const WithValueFormatter: Story = {
  render: (args) => <InteractiveSlider {...args} />,
  args: {
    value: 50,
    minimumValue: 0,
    maximumValue: 100,
    showValue: true,
    valueFormatter: (value) => `${value}%`,
  },
};

export const WithStep: Story = {
  render: (args) => <InteractiveSlider {...args} />,
  args: {
    value: 50,
    minimumValue: 0,
    maximumValue: 100,
    step: 10,
    showValue: true,
    showLabels: true,
  },
};

export const Disabled: Story = {
  render: (args) => <InteractiveSlider {...args} />,
  args: {
    value: 50,
    minimumValue: 0,
    maximumValue: 100,
    disabled: true,
    showValue: true,
    showLabels: true,
  },
};

export const CustomColors: Story = {
  render: (args) => <InteractiveSlider {...args} />,
  args: {
    value: 50,
    minimumValue: 0,
    maximumValue: 100,
    minimumTrackTintColor: '#6200ee',
    maximumTrackTintColor: '#e0e0e0',
    thumbTintColor: '#6200ee',
    showValue: true,
    showLabels: true,
  },
};

export const CustomStyles: Story = {
  render: (args) => <InteractiveSlider {...args} />,
  args: {
    value: 50,
    minimumValue: 0,
    maximumValue: 100,
    containerStyle: { backgroundColor: '#f0f0f0', padding: 10, borderRadius: 8 },
    trackStyle: { height: 8, borderRadius: 4 },
    thumbStyle: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: '#ffffff' },
    labelStyle: { fontWeight: 'bold' },
    showValue: true,
    showLabels: true,
  },
};

export const VolumeSlider: Story = {
  render: (args) => (
    <View>
      <Text style={{ marginBottom: 8, fontWeight: 'bold' }}>Volume</Text>
      <InteractiveSlider {...args} />
    </View>
  ),
  args: {
    value: 75,
    minimumValue: 0,
    maximumValue: 100,
    showValue: true,
    valueFormatter: (value) => `${value}%`,
    minimumTrackTintColor: '#4CAF50',
    thumbTintColor: '#4CAF50',
  },
};

export const TempoSlider: Story = {
  render: (args) => (
    <View>
      <Text style={{ marginBottom: 8, fontWeight: 'bold' }}>Tempo (BPM)</Text>
      <InteractiveSlider {...args} />
    </View>
  ),
  args: {
    value: 120,
    minimumValue: 60,
    maximumValue: 180,
    step: 1,
    showValue: true,
    showLabels: true,
    minimumLabel: 'Slow',
    maximumLabel: 'Fast',
    minimumTrackTintColor: '#2196F3',
    thumbTintColor: '#2196F3',
  },
};

export const CrossfadeSlider: Story = {
  render: (args) => (
    <View>
      <Text style={{ marginBottom: 8, fontWeight: 'bold' }}>Crossfade</Text>
      <InteractiveSlider {...args} />
    </View>
  ),
  args: {
    value: 50,
    minimumValue: 0,
    maximumValue: 100,
    showLabels: true,
    minimumLabel: 'Deck A',
    maximumLabel: 'Deck B',
    minimumTrackTintColor: '#FF5722',
    maximumTrackTintColor: '#9C27B0',
    thumbTintColor: '#FFFFFF',
    thumbStyle: { 
      borderWidth: 2, 
      borderColor: '#000000',
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 4,
    },
  },
};