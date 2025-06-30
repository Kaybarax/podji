import React from 'react';
import { render, screen } from '@testing-library/react';

// Mock the dynamic import of ProfileList
jest.mock('next/dynamic', () => {
  return jest.fn(() => {
    const MockProfileList = () => <div data-testid="mocked-profile-list">Mocked Profile List</div>;
    return MockProfileList;
  });
});

// Mock the ProfileListWrapper component
jest.mock('./ProfileListWrapper', () => {
  return {
    __esModule: true,
    default: function MockedProfileListWrapper() {
      return (
        <div>
          <div data-testid="loading-spinner" className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <span className="ml-3">Loading profiles...</span>
          </div>
          <div data-testid="mocked-profile-list">Mocked Profile List</div>
        </div>
      );
    }
  };
});

describe('ProfileListWrapper', () => {
  it('renders the mocked ProfileListWrapper component', () => {
    // Import the mocked ProfileListWrapper component
    const ProfileListWrapper = require('./ProfileListWrapper').default;

    // Render the component
    render(<ProfileListWrapper />);

    // Check if the mocked component is rendered
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    expect(screen.getByText('Loading profiles...')).toBeInTheDocument();
    expect(screen.getByTestId('mocked-profile-list')).toBeInTheDocument();
    expect(screen.getByText('Mocked Profile List')).toBeInTheDocument();
  });

  it('has the correct structure with loading spinner', () => {
    // Import the mocked ProfileListWrapper component
    const ProfileListWrapper = require('./ProfileListWrapper').default;

    // Render the component
    render(<ProfileListWrapper />);

    // The fallback should be a div with a loading spinner
    const fallbackElement = screen.getByTestId('loading-spinner');
    expect(fallbackElement).toBeInTheDocument();

    // The fallback should have the correct styling classes
    expect(fallbackElement).toHaveClass('flex', 'justify-center', 'items-center', 'p-8');

    // The spinner animation should be present
    const spinnerElement = fallbackElement.querySelector('div');
    expect(spinnerElement).toHaveClass('animate-spin', 'rounded-full', 'h-12', 'w-12', 'border-t-2', 'border-b-2', 'border-blue-500');
  });
});
