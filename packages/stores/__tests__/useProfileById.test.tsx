import { renderHook, waitFor } from '@testing-library/react';
import { useProfileById } from '../lib/hooks';
import { fetchProfileById } from '@podji/services';
import { validateProfile } from '@podji/schemas';
import { createWrapper } from './utils';
import { queryClient } from '../lib/queryClient';

// Mock the fetchProfileById function
jest.mock('@podji/services/lib/api/profiles', () => ({
  fetchProfileById: jest.fn(),
}));

// Mock the validateProfile function
jest.mock('@podji/schemas/lib/schemas/validation', () => ({
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
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        age: 30,
        email: 'john.doe@example.com',
        phone: '123-456-7890',
        username: 'johndoe',
        image: 'https://example.com/image.jpg',
        address: {
          address: '123 Main St',
          city: 'Anytown',
          state: 'CA',
          country: 'USA',
        },
        company: {
          name: 'Acme Inc',
          title: 'Software Developer',
        },
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
    expect(result.current.data).toHaveProperty('id', 1);
    expect(result.current.data).toHaveProperty('firstName', 'John');
    expect(result.current.data).toHaveProperty('lastName', 'Doe');
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
        id: 2,
        firstName: 'Jane',
        lastName: 'Smith',
        age: 25,
        email: 'jane.smith@example.com',
        phone: '987-654-3210',
        username: 'janesmith',
        image: 'https://example.com/image.jpg',
        address: {
          address: '456 Oak St',
          city: 'Othertown',
          state: 'NY',
          country: 'USA',
        },
        company: {
          name: 'XYZ Corp',
          title: 'Product Manager',
        },
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
