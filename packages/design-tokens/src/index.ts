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
    const tokens = await import('../dist/mobile/style-values.ts');

    // Construct the theme object from individual exports
    const theme = {
      light: {
        color: {
          primitive: {
            white: tokens.ColorPrimitiveWhite,
            black: tokens.ColorPrimitiveBlack,
            grey: {
              100: tokens.ColorPrimitiveGrey100,
              200: tokens.ColorPrimitiveGrey200,
              300: tokens.ColorPrimitiveGrey300,
              400: tokens.ColorPrimitiveGrey400,
              500: tokens.ColorPrimitiveGrey500,
              600: tokens.ColorPrimitiveGrey600,
              700: tokens.ColorPrimitiveGrey700,
              800: tokens.ColorPrimitiveGrey800,
              900: tokens.ColorPrimitiveGrey900,
            },
            cyan: tokens.ColorPrimitiveCyan,
            coral: tokens.ColorPrimitiveCoral,
            roseQuartz: tokens.ColorPrimitiveRoseQuartz,
            orange: tokens.ColorPrimitiveOrange,
          },
          theme: {
            primary: tokens.ColorThemeLightPrimary,
            secondary: tokens.ColorThemeLightSecondary,
            neutral: tokens.ColorThemeLightNeutral,
            accent: tokens.ColorThemeLightAccent,
          },
          semantic: {
            background: {
              neutral: tokens.ColorSemanticLightBackgroundNeutral,
              surface: tokens.ColorSemanticLightBackgroundSurface,
            },
            text: {
              primary: tokens.ColorSemanticLightTextPrimary,
              secondary: tokens.ColorSemanticLightTextSecondary,
              disabled: tokens.ColorSemanticLightTextDisabled,
            },
            border: {
              base: tokens.ColorSemanticLightBorderBase,
            },
            role: {
              error: tokens.ColorSemanticLightRoleError,
              info: tokens.ColorSemanticLightRoleInfo,
              warning: tokens.ColorSemanticLightRoleWarning,
              success: tokens.ColorSemanticLightRoleSuccess,
            },
          },
        },
        spacing: {
          base: tokens.SpacingBase,
          xs: tokens.SpacingSmall,
          sm: tokens.SpacingMedium,
          md: tokens.SpacingBase,
          lg: tokens.SpacingLarge,
          section: tokens.SpacingSection,
        },
        typography: {
          fontWeight: {
            regular: tokens.TypographyFontWeightRegular,
            medium: tokens.TypographyFontWeightMedium,
            bold: tokens.TypographyFontWeightBold,
          },
          lineHeight: {
            base: tokens.TypographyLineHeightBase,
          },
          fontSize: {
            xs: tokens.TypographyFontSize12,
            sm: tokens.TypographyFontSize14,
            md: tokens.TypographyFontSize16,
            lg: tokens.TypographyFontSize20,
            xl: tokens.TypographyFontSize24,
          },
        },
        borderRadius: {
          sm: '4px',
          md: '8px',
          lg: '16px',
        },
      },
      dark: {
        color: {
          primitive: {
            white: tokens.ColorPrimitiveWhite,
            black: tokens.ColorPrimitiveBlack,
            grey: {
              100: tokens.ColorPrimitiveGrey100,
              200: tokens.ColorPrimitiveGrey200,
              300: tokens.ColorPrimitiveGrey300,
              400: tokens.ColorPrimitiveGrey400,
              500: tokens.ColorPrimitiveGrey500,
              600: tokens.ColorPrimitiveGrey600,
              700: tokens.ColorPrimitiveGrey700,
              800: tokens.ColorPrimitiveGrey800,
              900: tokens.ColorPrimitiveGrey900,
            },
            cyan: tokens.ColorPrimitiveCyan,
            coral: tokens.ColorPrimitiveCoral,
            roseQuartz: tokens.ColorPrimitiveRoseQuartz,
            orange: tokens.ColorPrimitiveOrange,
          },
          theme: {
            primary: tokens.ColorThemeDarkPrimary,
            secondary: tokens.ColorThemeDarkSecondary,
            neutral: tokens.ColorThemeDarkNeutral,
            accent: tokens.ColorThemeDarkAccent,
          },
          semantic: {
            background: {
              neutral: tokens.ColorSemanticDarkBackgroundNeutral,
              surface: tokens.ColorSemanticDarkBackgroundSurface,
            },
            text: {
              primary: tokens.ColorSemanticDarkTextPrimary,
              secondary: tokens.ColorSemanticDarkTextSecondary,
              disabled: tokens.ColorSemanticDarkTextDisabled,
            },
            border: {
              base: tokens.ColorSemanticDarkBorderBase,
            },
            role: {
              error: tokens.ColorSemanticDarkRoleError,
              info: tokens.ColorSemanticDarkRoleInfo,
              warning: tokens.ColorSemanticDarkRoleWarning,
              success: tokens.ColorSemanticDarkRoleSuccess,
            },
          },
        },
        spacing: {
          base: tokens.SpacingBase,
          xs: tokens.SpacingSmall,
          sm: tokens.SpacingMedium,
          md: tokens.SpacingBase,
          lg: tokens.SpacingLarge,
          section: tokens.SpacingSection,
        },
        typography: {
          fontWeight: {
            regular: tokens.TypographyFontWeightRegular,
            medium: tokens.TypographyFontWeightMedium,
            bold: tokens.TypographyFontWeightBold,
          },
          lineHeight: {
            base: tokens.TypographyLineHeightBase,
          },
          fontSize: {
            xs: tokens.TypographyFontSize12,
            sm: tokens.TypographyFontSize14,
            md: tokens.TypographyFontSize16,
            lg: tokens.TypographyFontSize20,
            xl: tokens.TypographyFontSize24,
          },
        },
        borderRadius: {
          sm: '4px',
          md: '8px',
          lg: '16px',
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
