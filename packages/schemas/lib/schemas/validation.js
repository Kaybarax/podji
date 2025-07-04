// Implementation of the validateProfile utility function
import { z } from 'zod';
import { ProfileSchema } from './ProfileSchema.ts';
/**
 * Validates a profile object against the ProfileSchema
 * @param profile The profile object to validate
 * @returns An object containing the validation result and either the validated profile or an error message
 */
export const validateProfile = (profile) => {
    try {
        const validatedProfile = ProfileSchema.parse(profile);
        return {
            success: true,
            data: validatedProfile,
        };
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            return {
                success: false,
                error: error.message,
            };
        }
        // Handle unexpected errors
        return {
            success: false,
            error: 'An unexpected error occurred during validation',
        };
    }
};
