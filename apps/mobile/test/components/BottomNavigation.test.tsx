import React from 'react';
import { render } from '@testing-library/react-native';
import BottomNavigation from '../../app/components/BottomNavigation';

// Mock the useSafeAreaInsets hook
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: jest.fn(() => ({ bottom: 20 })),
}));

// Mock the BottomTabNavigator component
jest.mock('@podji/mobile-ui', () => ({
  BottomTabNavigator: jest.fn(({ tabs, activeTab, onTabPress }) => (
    <div data-testid="bottom-tab-navigator">
      {tabs.map(tab => (
        <button
          key={tab.key}
          data-testid={`tab-${tab.key}`}
          data-active={tab.key === activeTab}
          onClick={() => onTabPress(tab.key)}
        >
          {tab.icon} {tab.label}
        </button>
      ))}
    </div>
  )),
}));

describe('BottomNavigation', () => {
  it('renders without crashing', () => {
    // This test just verifies that the component can be rendered without errors
    expect(() => {
      render(<BottomNavigation activeTab="home" onTabPress={() => {}} />);
    }).not.toThrow();
  });
});
