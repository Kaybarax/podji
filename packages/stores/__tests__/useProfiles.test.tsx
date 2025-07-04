import { renderHook, waitFor } from '@testing-library/react';
import { useProfiles } from '../lib/hooks';
import { fetchProfiles } from '@podji/services';
import { validateProfile } from '@podji/schemas';
import { createWrapper } from './test-utils';
import { queryClient } from '../lib/queryClient';

// Mock the fetchProfiles function
jest.mock('@podji/services', () => ({
  fetchProfiles: jest.fn(),
}));

// Mock the validateProfile function
jest.mock('@podji/schemas', () => ({
  validateProfile: jest.fn(),
}));

// Mock types for TypeScript
const mockedFetchProfiles = fetchProfiles as jest.MockedFunction<typeof fetchProfiles>;
const mockedValidateProfile = validateProfile as jest.MockedFunction<typeof validateProfile>;

// Create a wrapper for the tests
const wrapper = createWrapper();

describe('useProfiles', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    // Reset the QueryClient to avoid test interference
    queryClient.clear();
  });

  it('should initially return isLoading: true', async () => {
    // Mock the fetchProfiles function to return a promise that never resolves
    // This ensures the hook stays in the loading state
    mockedFetchProfiles.mockImplementation(
      () =>
        new Promise(() => {
          // This promise intentionally never resolves
        }),
    );

    // Render the hook with the QueryClientProvider wrapper
    const { result } = renderHook(() => useProfiles(), {
      wrapper,
    });

    // Assert that the hook initially returns isLoading: true
    expect(result.current.isLoading).toBe(true);
  });

  it('should return validated data on successful API response', async () => {
    // Mock profile data
    const mockProfiles = [
      { id: '1', name: 'John Doe', age: 30, validated: true },
      { id: '2', name: 'Jane Smith', age: 25, validated: true },
    ];

    // Mock successful API response
    mockedFetchProfiles.mockResolvedValue(mockProfiles);

    // Mock successful validation for each profile
    mockedValidateProfile.mockImplementation((profile: any) => ({
      success: true,
      data: {
        ...profile,
        bio: 'Test bio',
        location: 'Test location',
        imageUrl: 'https://example.com/image.jpg',
        interests: ['coding', 'reading'],
        lastActive: new Date().toISOString(),
      },
    }));

    // Render the hook with the QueryClientProvider wrapper
    const { result } = renderHook(() => useProfiles(), {
      wrapper,
    });

    // Wait for the query to complete
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    // Assert that the hook returns the validated data
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.data).toHaveLength(2);
    expect(result.current.data?.[0]).toHaveProperty('id', '1');
    expect(result.current.data?.[0]).toHaveProperty('name', 'John Doe');
    expect(result.current.data?.[0]).toHaveProperty('bio', 'Test bio');
    expect(mockedValidateProfile).toHaveBeenCalledTimes(2);
  });

  it('should return an error when API request fails', async () => {
    // Mock API error
    const errorMessage = 'Failed to fetch profiles';
    mockedFetchProfiles.mockResolvedValue({ error: errorMessage });

    // Render the hook with the QueryClientProvider wrapper
    const { result } = renderHook(() => useProfiles(), {
      wrapper,
    });

    // Wait for the query to complete
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    // Assert that the hook returns an error
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).not.toBeNull();
    expect(result.current.error?.message).toContain(errorMessage);
    expect(result.current.data).toBeUndefined();
  });

  it('should filter out invalid profiles', async () => {
    // Mock profile data with one valid and one invalid profile
    const mockProfiles = [
      { id: '1', name: 'John Doe', age: 30, validated: true },
      { id: '2', name: 'Invalid Profile', age: 'not-a-number', validated: true }, // Invalid age
    ];

    // Mock successful API response
    mockedFetchProfiles.mockResolvedValue(mockProfiles);

    // Mock validation that succeeds for the first profile and fails for the second
    mockedValidateProfile.mockImplementation((profile: any) => {
      if (profile.id === '1') {
        return {
          success: true,
          data: {
            ...profile,
            bio: 'Test bio',
            location: 'Test location',
            imageUrl: 'https://example.com/image.jpg',
            interests: ['coding', 'reading'],
            lastActive: new Date().toISOString(),
          },
        };
      } else {
        return {
          success: false,
          error: 'Invalid profile data',
        };
      }
    });

    // Render the hook with the QueryClientProvider wrapper
    const { result } = renderHook(() => useProfiles(), {
      wrapper,
    });

    // Wait for the query to complete
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    // Assert that the hook returns only the valid profile
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.data).toHaveLength(1);
    expect(result.current.data?.[0]).toHaveProperty('id', '1');
    expect(mockedValidateProfile).toHaveBeenCalledTimes(2);
  });
});
