import { useQuery } from '@tanstack/react-query';
import { fetchProfileById } from '@podji/services';
import { validateProfile } from '@podji/schemas';

/**
 * Hook for fetching and managing a single profile by ID
 * @param profileId The ID of the profile to fetch
 * @returns Query result containing profile data, loading state, and error state
 */
export const useProfileById = (profileId: string) => {
  return useQuery({
    queryKey: ['profile', profileId],
    queryFn: async () => {
      const profile = await fetchProfileById(profileId);

      // If the API returned an error object, throw an error
      if ('error' in profile) {
        throw new Error(profile.error as string);
      }

      // Validate the profile
      const validationResult = validateProfile(profile);
      if (!validationResult.success) {
        throw new Error(validationResult.error);
      }

      return validationResult.data;
    },
    // Add retry: false to prevent React Query from retrying failed requests
    // This ensures that the loading state is set to false when an error occurs
    retry: false,
  });
};
