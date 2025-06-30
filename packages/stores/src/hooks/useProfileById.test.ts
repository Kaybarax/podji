import { renderHook, waitFor } from '@testing-library/react';
import { useProfileById } from './useProfileById';
import { fetchProfileById } from '@podji/services/src/api/profiles';
import { validateProfile } from '@podji/schemas/src/validation';
import { createWrapper } from '../test-utils';
import { queryClient } from '../queryClient';

// Mock the fetchProfileById function
jest.mock('@podji/services/src/api/profiles', () => ({
  fetchProfileById: jest.fn(),
}));

// Mock the validateProfile function
jest.mock('@podji/schemas/src/validation', () => ({
  validateProfile: jest.fn(),
}));

// Mock types for TypeScript
const mockedFetchProfileById = fetchProfileById as jest.MockedFunction<typeof fetchProfileById>;
const mockedValidateProfile = validateProfile as jest.MockedFunction<typeof validateProfile>;

// Create a wrapper for the tests
const wrapper = createWrapper();

describe('useProfileById', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    // Reset the QueryClient to avoid test interference
    queryClient.clear();
  });

  it('should initially return isLoading: true', async () => {
    // Mock the fetchProfileById function to return a promise that never resolves
    // This ensures the hook stays in the loading state
    mockedFetchProfileById.mockImplementation(
      () =>
        new Promise(() => {
          // This promise intentionally never resolves
        }),
    );

    // Render the hook with the QueryClientProvider wrapper
    const { result } = renderHook(() => useProfileById('1'), {
      wrapper,
    });

    // Assert that the hook initially returns isLoading: true
    expect(result.current.isLoading).toBe(true);
  });

  it('should return validated data on successful API response', async () => {
    // Mock profile data
    const mockProfile = { id: '1', name: 'John Doe', age: 30, validated: true };

    // Mock successful API response
    mockedFetchProfileById.mockResolvedValue(mockProfile);

    // Mock successful validation
    mockedValidateProfile.mockImplementation(() => ({
      success: true,
      data: {
        ...mockProfile,
        bio: 'Test bio',
        location: 'Test location',
        imageUrl: 'https://example.com/image.jpg',
        interests: ['coding', 'reading'],
        lastActive: new Date().toISOString(),
      },
    }));

    // Render the hook with the QueryClientProvider wrapper
    const { result } = renderHook(() => useProfileById('1'), {
      wrapper,
    });

    // Wait for the query to complete
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    // Assert that the hook returns the validated data
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.data).toHaveProperty('id', '1');
    expect(result.current.data).toHaveProperty('name', 'John Doe');
    expect(result.current.data).toHaveProperty('bio', 'Test bio');
    expect(mockedValidateProfile).toHaveBeenCalledTimes(1);
  });

  it('should return an error when API request fails', async () => {
    // Mock API error
    const errorMessage = 'Failed to fetch profile';
    mockedFetchProfileById.mockResolvedValue({ error: errorMessage });

    // Render the hook with the QueryClientProvider wrapper
    const { result } = renderHook(() => useProfileById('1'), {
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

  it('should return an error when profile validation fails', async () => {
    // Mock profile data with invalid data
    const mockProfile = { id: '1', name: 'John Doe', age: 'not-a-number', validated: true };

    // Mock successful API response
    mockedFetchProfileById.mockResolvedValue(mockProfile);

    // Mock validation failure
    mockedValidateProfile.mockImplementation(() => ({
      success: false,
      error: 'Invalid profile data',
    }));

    // Render the hook with the QueryClientProvider wrapper
    const { result } = renderHook(() => useProfileById('1'), {
      wrapper,
    });

    // Wait for the query to complete
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    // Assert that the hook returns an error
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).not.toBeNull();
    expect(result.current.error?.message).toContain('Invalid profile data');
    expect(result.current.data).toBeUndefined();
  });

  it('should use the provided profileId in the query key', async () => {
    // Mock profile data
    const mockProfile = { id: '2', name: 'Jane Smith', age: 25, validated: true };

    // Mock successful API response
    mockedFetchProfileById.mockResolvedValue(mockProfile);

    // Mock successful validation
    mockedValidateProfile.mockImplementation(() => ({
      success: true,
      data: {
        ...mockProfile,
        bio: 'Test bio',
        location: 'Test location',
        imageUrl: 'https://example.com/image.jpg',
        interests: ['coding', 'reading'],
        lastActive: new Date().toISOString(),
      },
    }));

    // Render the hook with the QueryClientProvider wrapper
    const { result } = renderHook(() => useProfileById('2'), {
      wrapper,
    });

    // Wait for the query to complete
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    // Assert that fetchProfileById was called with the correct profileId
    expect(mockedFetchProfileById).toHaveBeenCalledWith('2');
  });
});
