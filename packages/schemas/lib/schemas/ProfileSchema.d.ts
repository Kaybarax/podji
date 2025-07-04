import { z } from 'zod';
export declare const ProfileSchema: z.ZodObject<{
    id: z.ZodNumber;
    firstName: z.ZodString;
    lastName: z.ZodString;
    age: z.ZodNumber;
    email: z.ZodString;
    phone: z.ZodString;
    username: z.ZodString;
    image: z.ZodString;
    address: z.ZodObject<{
        address: z.ZodString;
        city: z.ZodString;
        state: z.ZodString;
        country: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        address: string;
        city: string;
        state: string;
        country: string;
    }, {
        address: string;
        city: string;
        state: string;
        country: string;
    }>;
    company: z.ZodObject<{
        name: z.ZodString;
        title: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        title: string;
    }, {
        name: string;
        title: string;
    }>;
}, "strip", z.ZodTypeAny, {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    phone: string;
    username: string;
    image: string;
    address: {
        address: string;
        city: string;
        state: string;
        country: string;
    };
    company: {
        name: string;
        title: string;
    };
}, {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    phone: string;
    username: string;
    image: string;
    address: {
        address: string;
        city: string;
        state: string;
        country: string;
    };
    company: {
        name: string;
        title: string;
    };
}>;
export type Profile = z.infer<typeof ProfileSchema>;
export declare const parseProfile: (data: unknown) => Profile;
