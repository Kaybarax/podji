import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { fn } from 'storybook/test';
import { useState } from 'react';

import { Modal } from '@/lib/components/Modal';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  decorators: [
    Story => (
      <View style={{ flex: 1, padding: 20 }}>
        <Story />
      </View>
    ),
  ],
  tags: ['autodocs'],
  args: {
    onClose: fn(),
  },
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

// Interactive modal that maintains its own state
const InteractiveModal = ({ children, ...props }: any) => {
  const [visible, setVisible] = useState(false);
  
  return (
    <View>
      <Button 
        title={props.buttonTitle || "Open Modal"} 
        onPress={() => setVisible(true)} 
      />
      <Modal
        {...props}
        visible={visible}
        onClose={() => {
          setVisible(false);
          props.onClose?.();
        }}
      >
        {children}
      </Modal>
    </View>
  );
};

const SimpleContent = () => (
  <View>
    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16 }}>Modal Title</Text>
    <Text style={{ marginBottom: 24 }}>This is a simple modal with some content.</Text>
    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
      <Button title="Close" onPress={() => {}} />
    </View>
  </View>
);

const FormContent = () => (
  <View>
    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16 }}>Contact Form</Text>
    <View style={{ marginBottom: 16 }}>
      <Text style={{ marginBottom: 8 }}>Name</Text>
      <TextInput 
        style={{ 
          borderWidth: 1, 
          borderColor: '#ccc', 
          borderRadius: 4, 
          padding: 8 
        }} 
        placeholder="Enter your name"
      />
    </View>
    <View style={{ marginBottom: 16 }}>
      <Text style={{ marginBottom: 8 }}>Email</Text>
      <TextInput 
        style={{ 
          borderWidth: 1, 
          borderColor: '#ccc', 
          borderRadius: 4, 
          padding: 8 
        }} 
        placeholder="Enter your email"
        keyboardType="email-address"
      />
    </View>
    <View style={{ marginBottom: 16 }}>
      <Text style={{ marginBottom: 8 }}>Message</Text>
      <TextInput 
        style={{ 
          borderWidth: 1, 
          borderColor: '#ccc', 
          borderRadius: 4, 
          padding: 8,
          height: 100,
          textAlignVertical: 'top'
        }} 
        placeholder="Enter your message"
        multiline
        numberOfLines={4}
      />
    </View>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Button title="Cancel" color="#888" onPress={() => {}} />
      <Button title="Submit" onPress={() => {}} />
    </View>
  </View>
);

const LongContent = () => (
  <View>
    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16 }}>Terms and Conditions</Text>
    {Array.from({ length: 10 }).map((_, i) => (
      <Text key={i} style={{ marginBottom: 16 }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget
        aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.
        Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam
        nisl nunc quis nisl.
      </Text>
    ))}
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}>
      <Button title="Decline" color="#888" onPress={() => {}} />
      <Button title="Accept" onPress={() => {}} />
    </View>
  </View>
);

export const Default: Story = {
  render: (args) => (
    <InteractiveModal {...args}>
      <SimpleContent />
    </InteractiveModal>
  ),
};

export const CenterPosition: Story = {
  render: (args) => (
    <InteractiveModal {...args} position="center" buttonTitle="Open Center Modal">
      <SimpleContent />
    </InteractiveModal>
  ),
};

export const BottomPosition: Story = {
  render: (args) => (
    <InteractiveModal {...args} position="bottom" buttonTitle="Open Bottom Modal">
      <SimpleContent />
    </InteractiveModal>
  ),
};

export const WithoutBackdrop: Story = {
  render: (args) => (
    <InteractiveModal {...args} hasBackdrop={false} buttonTitle="Open Without Backdrop">
      <SimpleContent />
    </InteractiveModal>
  ),
};

export const NonDismissible: Story = {
  render: (args) => (
    <InteractiveModal {...args} closeOnBackdropPress={false} buttonTitle="Open Non-Dismissible Modal">
      <View>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16 }}>Non-Dismissible Modal</Text>
        <Text style={{ marginBottom: 24 }}>This modal cannot be closed by tapping outside. You must use the close button.</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Button title="Close Modal" onPress={args.onClose} />
        </View>
      </View>
    </InteractiveModal>
  ),
};

export const ScrollableContent: Story = {
  render: (args) => (
    <InteractiveModal {...args} scrollable={true} buttonTitle="Open Scrollable Modal">
      <LongContent />
    </InteractiveModal>
  ),
};

export const WithForm: Story = {
  render: (args) => (
    <InteractiveModal {...args} avoidKeyboard={true} buttonTitle="Open Form Modal">
      <FormContent />
    </InteractiveModal>
  ),
};

export const CustomStyles: Story = {
  render: (args) => (
    <InteractiveModal 
      {...args} 
      contentStyle={{ 
        backgroundColor: '#f0f0f0',
        borderRadius: 16,
        padding: 24,
        borderWidth: 1,
        borderColor: '#ddd',
      }}
      buttonTitle="Open Custom Styled Modal"
    >
      <View>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16, color: '#6200ee' }}>
          Custom Styled Modal
        </Text>
        <Text style={{ marginBottom: 24 }}>
          This modal has custom styling applied to it.
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <Button title="Close" color="#6200ee" onPress={args.onClose} />
        </View>
      </View>
    </InteractiveModal>
  ),
};

export const ConfirmationDialog: Story = {
  render: (args) => (
    <InteractiveModal 
      {...args} 
      position="center"
      buttonTitle="Show Confirmation Dialog"
    >
      <View>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' }}>
          Confirm Action
        </Text>
        <Text style={{ marginBottom: 24, textAlign: 'center' }}>
          Are you sure you want to delete this item? This action cannot be undone.
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Button title="Cancel" color="#888" onPress={args.onClose} />
          <Button title="Delete" color="#f44336" onPress={args.onClose} />
        </View>
      </View>
    </InteractiveModal>
  ),
};

export const SuccessMessage: Story = {
  render: (args) => (
    <InteractiveModal 
      {...args} 
      position="center"
      buttonTitle="Show Success Message"
    >
      <View style={{ alignItems: 'center', padding: 16 }}>
        <Text style={{ fontSize: 24, marginBottom: 16 }}>✅</Text>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' }}>
          Success!
        </Text>
        <Text style={{ marginBottom: 24, textAlign: 'center' }}>
          Your changes have been saved successfully.
        </Text>
        <Button title="OK" onPress={args.onClose} />
      </View>
    </InteractiveModal>
  ),
};