// Basic types using zod
import { z } from 'zod';
// Example schema
export const UserSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(1),
    email: z.string().email(),
    createdAt: z.date(),
});
export const parseUser = (data) => {
    const result = UserSchema.safeParse(data);
    if (!result.success) {
        throw new Error(`UserSchema: ${result.error.message}`);
    }
    return result.data;
};
