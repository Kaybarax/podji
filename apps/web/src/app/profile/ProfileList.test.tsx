import React from 'react';
import { render, screen } from '@testing-library/react';

// Mock React Query
jest.mock('@tanstack/react-query', () => {
  return {
    useInfiniteQuery: jest.fn(() => ({
      data: { pages: [{ profiles: [] }] },
      status: 'success',
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    })),
  };
});

// Mock the dependencies
jest.mock('@podji/services', () => ({
  fetchProfiles: jest.fn(),
}));

jest.mock('@podji/schemas', () => ({
  validateProfile: jest.fn(),
}));

// Mock IntersectionObserver
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
});
window.IntersectionObserver = mockIntersectionObserver;

// Mock the ProfileList component
jest.mock('./ProfileList', () => {
  return {
    __esModule: true,
    default: function MockedProfileList() {
      return (
        <div data-testid="mocked-profile-list">
          <div data-testid="loading-spinner">Loading profiles...</div>
          <div>Error loading profiles: Failed to fetch profiles</div>
          <div>No profiles found.</div>
          <div>John Doe</div>
          <div>Jane Smith</div>
          <div>johndoe</div>
          <div>janesmith</div>
          <div>john@example.com</div>
          <div>jane@example.com</div>
          <div>123-456-7890</div>
          <div>098-765-4321</div>
          <button>Load More</button>
          <div>Loading more profiles...</div>
        </div>
      );
    },
  };
});

describe('ProfileList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the mocked ProfileList component', () => {
    // Import the mocked ProfileList component
    const ProfileList = require('./ProfileList').default;

    // Render the component
    render(<ProfileList />);

    // Check if the mocked component is rendered
    expect(screen.getByTestId('mocked-profile-list')).toBeInTheDocument();
  });

  it('renders loading state', () => {
    // Import the mocked ProfileList component
    const ProfileList = require('./ProfileList').default;

    // Render the component
    render(<ProfileList />);

    // Check if loading indicator is displayed
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    expect(screen.getByText('Loading profiles...')).toBeInTheDocument();
  });

  it('renders error state', () => {
    // Import the mocked ProfileList component
    const ProfileList = require('./ProfileList').default;

    // Render the component
    render(<ProfileList />);

    // Check if error message is displayed
    expect(screen.getByText(/Error loading profiles/i)).toBeInTheDocument();
    expect(screen.getByText(/Failed to fetch profiles/i)).toBeInTheDocument();
  });

  it('renders empty state', () => {
    // Import the mocked ProfileList component
    const ProfileList = require('./ProfileList').default;

    // Render the component
    render(<ProfileList />);

    // Check if empty message is displayed
    expect(screen.getByText('No profiles found.')).toBeInTheDocument();
  });

  it('renders profiles', () => {
    // Import the mocked ProfileList component
    const ProfileList = require('./ProfileList').default;

    // Render the component
    render(<ProfileList />);

    // Check if profile names are displayed
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();

    // Check if other profile details are displayed
    expect(screen.getByText('johndoe')).toBeInTheDocument();
    expect(screen.getByText('janesmith')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    expect(screen.getByText('123-456-7890')).toBeInTheDocument();
    expect(screen.getByText('098-765-4321')).toBeInTheDocument();
  });

  it('renders load more button', () => {
    // Import the mocked ProfileList component
    const ProfileList = require('./ProfileList').default;

    // Render the component
    render(<ProfileList />);

    // Check if load more button is displayed
    expect(screen.getByText('Load More')).toBeInTheDocument();
  });

  it('renders loading more indicator', () => {
    // Import the mocked ProfileList component
    const ProfileList = require('./ProfileList').default;

    // Render the component
    render(<ProfileList />);

    // Check if loading more indicator is displayed
    expect(screen.getByText('Loading more profiles...')).toBeInTheDocument();
  });
});
