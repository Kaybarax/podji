/* eslint-disable @typescript-eslint/no-explicit-any */
// Type declarations for dynamically imported files

// Web theme type
export interface WebTheme {
  theme: Record<string, any>;
}

// Web tailwind tokens type
export interface WebTailwindTokens {
  theme: {
    extend: Record<string, any>;
  };
}

// Mobile theme type
export interface MobileTheme {
  lightTheme: Record<string, any>;
  darkTheme: Record<string, any>;
  default: {
    light: Record<string, any>;
    dark: Record<string, any>;
  };
}
