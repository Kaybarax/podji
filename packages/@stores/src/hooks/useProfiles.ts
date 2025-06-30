/* eslint-disable no-console */
import { useQuery } from '@tanstack/react-query';
import { fetchProfiles } from '@shared/services';
import { validateProfile } from '@shared/schemas';

/**
 * Hook for fetching and managing profile data
 * @returns Query result containing profiles data, loading state, and error state
 */
export const useProfiles = () => {
  console.log('Initiating profiles query...');
  return useQuery({
    queryKey: ['profiles'],
    queryFn: async () => {
      console.log('Executing profiles query function...');
      const profiles = await fetchProfiles();

      // If the API returned an error object, throw an error
      if ('error' in profiles) {
        console.error('Error in profiles query:', profiles.error);
        throw new Error(profiles.error as string);
      }

      // Validate each profile
      const validatedProfiles = profiles
        .map(profile => {
          const validationResult = validateProfile(profile);
          if (!validationResult.success) {
            console.warn(`Invalid profile data: ${validationResult.error}`);
            return null;
          }
          return validationResult.data;
        })
        .filter(Boolean); // Filter out null values

      console.log(`Profiles query completed successfully. Received ${validatedProfiles.length} valid profiles.`);
      return validatedProfiles;
    },
    // Add retry: false to prevent React Query from retrying failed requests
    // This ensures that the loading state is set to false when an error occurs
    retry: false,
  });
};
