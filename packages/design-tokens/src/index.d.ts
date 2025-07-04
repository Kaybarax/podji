export * from './types';
export declare const getWebTheme: () => Promise<Record<string, any>>;
export declare const getWebTailwindTokens: () => Promise<{
    theme: {
        extend: Record<string, any>;
    };
}>;
export declare const getMobileTheme: () => Promise<{
    light: Record<string, any>;
    dark: Record<string, any>;
}>;
export declare const getTheme: () => Promise<Record<string, any>>;
export declare const getTailwindTokens: () => Promise<{
    theme: {
        extend: Record<string, any>;
    };
}>;
