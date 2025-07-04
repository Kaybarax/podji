import { z } from 'zod';
export declare const UserSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    email: z.ZodString;
    createdAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    email: string;
    name: string;
    createdAt: Date;
}, {
    id: string;
    email: string;
    name: string;
    createdAt: Date;
}>;
export type User = z.infer<typeof UserSchema>;
export declare const parseUser: (data: unknown) => User;
