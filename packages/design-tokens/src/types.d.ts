export interface WebTheme {
    theme: Record<string, any>;
}
export interface WebTailwindTokens {
    theme: {
        extend: Record<string, any>;
    };
}
export interface MobileTheme {
    lightTheme: Record<string, any>;
    darkTheme: Record<string, any>;
    default: {
        light: Record<string, any>;
        dark: Record<string, any>;
    };
}
