/* eslint-disable @typescript-eslint/no-explicit-any */
// Export type definitions
export * from './types';

// Web platform exports
// Export web theme
// This is a dynamic import to ensure the theme is loaded at runtime
// and not during build time, as the theme.js file is generated during build
export const getWebTheme = async (): Promise<Record<string, any>> => {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
    // Return a hardcoded theme object with the necessary properties
    const theme = {
      light: {
        color: {
          primitive: {
            white: '#ffffff',
            black: '#000000',
            grey: {
              100: '#f5f5f5',
              200: '#eeeeee',
              300: '#e0e0e0',
              400: '#bdbdbd',
              500: '#9e9e9e',
              600: '#757575',
              700: '#616161',
              800: '#424242',
              900: '#212121',
            },
            cyan: '#aceef3',
            coral: '#ff7077',
            roseQuartz: '#ffe9e4',
            orange: '#ffb067',
          },
          theme: {
            primary: '#aceef3',
            secondary: '#ff7077',
            neutral: '#ffe9e4',
            accent: '#ffb067',
          },
          semantic: {
            background: {
              neutral: '#ffe9e4',
              surface: '#ffffff',
            },
            text: {
              primary: '#000000',
              secondary: '#00000099',
              disabled: '#00000061',
            },
            border: {
              base: '#0000001f',
            },
            role: {
              error: '#ff7077',
              info: '#aceef3',
              warning: '#ffb067',
              success: '#aceef3',
            },
          },
        },
        spacing: {
          base: 16,
          xs: 8,
          sm: 12,
          md: 16,
          lg: 20,
          section: 16,
        },
        typography: {
          fontWeight: {
            regular: '400',
            medium: '500',
            bold: '700',
          },
          lineHeight: {
            base: 1.5,
          },
          fontSize: {
            xs: 12,
            sm: 14,
            md: 16,
            lg: 20,
            xl: 24,
          },
        },
        borderRadius: {
          sm: 4,
          md: 8,
          lg: 16,
        },
      },
      dark: {
        color: {
          primitive: {
            white: '#ffffff',
            black: '#000000',
            grey: {
              100: '#f5f5f5',
              200: '#eeeeee',
              300: '#e0e0e0',
              400: '#bdbdbd',
              500: '#9e9e9e',
              600: '#757575',
              700: '#616161',
              800: '#424242',
              900: '#212121',
            },
            cyan: '#aceef3',
            coral: '#ff7077',
            roseQuartz: '#ffe9e4',
            orange: '#ffb067',
          },
          theme: {
            primary: '#289baa',
            secondary: '#c94d50',
            neutral: '#1e1e1e',
            accent: '#cc7a55',
          },
          semantic: {
            background: {
              neutral: '#121212',
              surface: '#1e1e1e',
            },
            text: {
              primary: '#ffffff',
              secondary: '#ffffffb3',
              disabled: '#ffffff80',
            },
            border: {
              base: '#ffffff1f',
            },
            role: {
              error: '#c94d50',
              info: '#289baa',
              warning: '#cc7a55',
              success: '#289baa',
            },
          },
        },
        spacing: {
          base: 16,
          xs: 8,
          sm: 12,
          md: 16,
          lg: 20,
          section: 16,
        },
        typography: {
          fontWeight: {
            regular: '400',
            medium: '500',
            bold: '700',
          },
          lineHeight: {
            base: 1.5,
          },
          fontSize: {
            xs: 12,
            sm: 14,
            md: 16,
            lg: 20,
            xl: 24,
          },
        },
        borderRadius: {
          sm: 4,
          md: 8,
          lg: 16,
        },
      },
    };

    return theme;
  } catch (error) {
    console.error('Failed to load mobile theme:', error);
    return { light: {}, dark: {} };
  }
};

// Legacy exports for backward compatibility
export const getTheme = getWebTheme;
export const getTailwindTokens = getWebTailwindTokens;
