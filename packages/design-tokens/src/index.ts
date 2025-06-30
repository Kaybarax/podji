// Export constants
export * from './constants';

// Export build utility
export * from './buildTokens';

// Export type definitions
export * from './types';

// Web platform exports
// Export web theme
// This is a dynamic import to ensure the theme is loaded at runtime
// and not during build time, as the theme.js file is generated during build
export const getWebTheme = async (): Promise<Record<string, any>> => {
  try {
    // @ts-ignore - This file is generated during build
    const theme = (await import('../dist/web/theme.js')) as WebTheme;
    return theme.theme;
  } catch (error) {
    console.error('Failed to load web theme:', error);
    return {};
  }
};

// Export tailwind tokens
// This is a dynamic import to ensure the tailwind tokens are loaded at runtime
// and not during build time, as the tailwind-tokens.js file is generated during build
export const getWebTailwindTokens = async (): Promise<{ theme: { extend: Record<string, any> } }> => {
  try {
    // @ts-ignore - This file is generated during build
    const tokens = (await import('../dist/web/tailwind-tokens.js')) as WebTailwindTokens;
    return tokens;
  } catch (error) {
    console.error('Failed to load web tailwind tokens:', error);
    return { theme: { extend: {} } };
  }
};

// Mobile platform exports
// Export mobile theme
// This is a dynamic import to ensure the theme is loaded at runtime
// and not during build time, as the style-values.ts file is generated during build
export const getMobileTheme = async (): Promise<{ light: Record<string, any>; dark: Record<string, any> }> => {
  try {
    // @ts-ignore - This file is generated during build
    const theme = (await import('../dist/mobile/style-values.ts')) as MobileTheme;
    return theme.default;
  } catch (error) {
    console.error('Failed to load mobile theme:', error);
    return { light: {}, dark: {} };
  }
};

// Legacy exports for backward compatibility
export const getTheme = getWebTheme;
export const getTailwindTokens = getWebTailwindTokens;
