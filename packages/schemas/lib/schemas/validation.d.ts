import { Profile } from './ProfileSchema.ts';
/**
 * Validates a profile object against the ProfileSchema
 * @param profile The profile object to validate
 * @returns An object containing the validation result and either the validated profile or an error message
 */
export declare const validateProfile: (profile: unknown) => {
    success: boolean;
    data?: Profile;
    error?: string;
};
