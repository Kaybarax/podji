import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import React, { useState, useEffect } from 'react';
import { View, Button } from 'react-native';
import { fn } from 'storybook/test';

import { Toast, ToastProvider, useToast } from '@/lib/components/Toast';

// Component to demonstrate the useToast hook
const ToastDemo = () => {
  const toast = useToast();

  return (
    <View style={{ padding: 20 }}>
      <Button
        title="Show Success Toast"
        onPress={() =>
          toast.show({
            message: 'Success! Your action was completed.',
            type: 'success',
          })
        }
      />
      <View style={{ height: 10 }} />
      <Button
        title="Show Error Toast"
        onPress={() =>
          toast.show({
            message: 'Error! Something went wrong.',
            type: 'error',
          })
        }
      />
      <View style={{ height: 10 }} />
      <Button
        title="Show Warning Toast"
        onPress={() =>
          toast.show({
            message: 'Warning! This action might have consequences.',
            type: 'warning',
          })
        }
      />
      <View style={{ height: 10 }} />
      <Button
        title="Show Info Toast"
        onPress={() =>
          toast.show({
            message: 'Info: Here is some information for you.',
            type: 'info',
          })
        }
      />
      <View style={{ height: 10 }} />
      <Button
        title="Show Top Toast"
        onPress={() =>
          toast.show({
            message: 'This toast appears at the top.',
            position: 'top',
          })
        }
      />
      <View style={{ height: 10 }} />
      <Button
        title="Show Bottom Toast"
        onPress={() =>
          toast.show({
            message: 'This toast appears at the bottom.',
            position: 'bottom',
          })
        }
      />
      <View style={{ height: 10 }} />
      <Button
        title="Show Long Duration Toast"
        onPress={() =>
          toast.show({
            message: 'This toast stays visible for 5 seconds.',
            duration: 5000,
          })
        }
      />
      <View style={{ height: 10 }} />
      <Button
        title="Show Non-dismissible Toast"
        onPress={() =>
          toast.show({
            message: 'This toast cannot be dismissed manually.',
            dismissible: false,
          })
        }
      />
    </View>
  );
};

// Wrapper component for direct Toast stories
const ToastWrapper = ({ children }: { children: React.ReactNode }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show the toast after a short delay
    const timer = setTimeout(() => {
      setVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' }}>
      {children}
      <Button title="Toggle Toast" onPress={() => setVisible(!visible)} />
    </View>
  );
};

const meta = {
  title: 'Components/Toast',
  component: Toast,
  decorators: [
    Story => (
      <View style={{ flex: 1 }}>
        <Story />
      </View>
    ),
  ],
  tags: ['autodocs'],
  args: {
    message: 'This is a toast message',
    visible: true,
    onClose: fn(),
  },
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;

// Direct Toast component stories
export const Default: Story = {
  args: {
    message: 'This is a default toast message',
    visible: true,
  },
  decorators: [
    Story => (
      <ToastWrapper>
        <Story />
      </ToastWrapper>
    ),
  ],
};

export const Success: Story = {
  args: {
    message: 'Success! Your action was completed.',
    type: 'success',
    visible: true,
  },
  decorators: [
    Story => (
      <ToastWrapper>
        <Story />
      </ToastWrapper>
    ),
  ],
};

export const Error: Story = {
  args: {
    message: 'Error! Something went wrong.',
    type: 'error',
    visible: true,
  },
  decorators: [
    Story => (
      <ToastWrapper>
        <Story />
      </ToastWrapper>
    ),
  ],
};

export const Warning: Story = {
  args: {
    message: 'Warning! This action might have consequences.',
    type: 'warning',
    visible: true,
  },
  decorators: [
    Story => (
      <ToastWrapper>
        <Story />
      </ToastWrapper>
    ),
  ],
};

export const Info: Story = {
  args: {
    message: 'Info: Here is some information for you.',
    type: 'info',
    visible: true,
  },
  decorators: [
    Story => (
      <ToastWrapper>
        <Story />
      </ToastWrapper>
    ),
  ],
};

export const TopPosition: Story = {
  args: {
    message: 'This toast appears at the top.',
    position: 'top',
    visible: true,
  },
  decorators: [
    Story => (
      <ToastWrapper>
        <Story />
      </ToastWrapper>
    ),
  ],
};

export const BottomPosition: Story = {
  args: {
    message: 'This toast appears at the bottom.',
    position: 'bottom',
    visible: true,
  },
  decorators: [
    Story => (
      <ToastWrapper>
        <Story />
      </ToastWrapper>
    ),
  ],
};

export const LongDuration: Story = {
  args: {
    message: 'This toast stays visible for 5 seconds.',
    duration: 5000,
    visible: true,
  },
  decorators: [
    Story => (
      <ToastWrapper>
        <Story />
      </ToastWrapper>
    ),
  ],
};

export const NonDismissible: Story = {
  args: {
    message: 'This toast cannot be dismissed manually.',
    dismissible: false,
    visible: true,
  },
  decorators: [
    Story => (
      <ToastWrapper>
        <Story />
      </ToastWrapper>
    ),
  ],
};

// ToastProvider with useToast hook demo
export const ToastProviderDemo: StoryObj = {
  render: () => (
    <ToastProvider>
      <ToastDemo />
    </ToastProvider>
  ),
};
