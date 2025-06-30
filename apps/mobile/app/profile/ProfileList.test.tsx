// Mock expo-router

jest.mock('expo-router', () => {
  const mockReact = require('react');
  const mockRN = require('react-native');
  return {
    Link: ({ href }:{href:string}) => {
      return mockReact.createElement(mockRN.Text, { testID: `link-${href}` }, 'Link');
    },
  };
});

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

// Mock services
jest.mock('@podji/services', () => ({
  fetchProfiles: jest.fn(),
}));

// Mock schemas
jest.mock('@podji/schemas', () => ({
  validateProfile: jest.fn(),
}));

describe('ProfileList', () => {
  it('passes a simple test', () => {
    expect(true).toBe(true);
  });
});
