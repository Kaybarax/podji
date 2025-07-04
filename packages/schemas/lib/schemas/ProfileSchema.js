// Implementation of ProfileSchema using zod
import { z } from 'zod';
// Define the ProfileSchema
export const ProfileSchema = z.object({
    id: z.number(),
    firstName: z.string(),
    lastName: z.string(),
    age: z.number(),
    email: z.string().email(),
    phone: z.string(),
    username: z.string(),
    image: z.string().url(),
    address: z.object({
        address: z.string(),
        city: z.string(),
        state: z.string(),
        country: z.string(),
    }),
    company: z.object({
        name: z.string(),
        title: z.string(),
    }),
});
export const parseProfile = (data) => {
    const result = ProfileSchema.safeParse(data);
    if (!result.success) {
        throw new Error(`ProfileSchema: ${result.error.message}`);
    }
    return result.data;
};
