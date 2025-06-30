/**
 * Generates React Native StyleSheet from token values
 */
import * as fs from 'fs';
import * as path from 'path';

export function generateReactNativeStylesheet(mobileDistDir) {
  console.log('Generating React Native StyleSheet...');

  // Extract tokens directly from the theme.js file
  const lightColors = {};
  const darkColors = {};
  const spacing = {};
  const borderRadius = {};
  const typography = {};
  const shadows = {};

  // Process color tokens
  try {
    // Read the style-values.ts file directly
    const themeContent = fs.readFileSync(path.join(mobileDistDir, 'style-values.ts'), 'utf8');

    // Extract color tokens for a light theme
    const lightColorRegex = /export const (Color(?:Background|Text|Border).*?Light) = "([^"]+)"/g;
    let match;
    while ((match = lightColorRegex.exec(themeContent)) !== null) {
      const colorName = match[1];
      const colorValue = match[2];
      lightColors[colorName] = colorValue;
    }

    // Extract color tokens for dark theme
    const darkColorRegex = /export const (Color(?:Background|Text|Border).*?Dark) = "([^"]+)"/g;
    while ((match = darkColorRegex.exec(themeContent)) !== null) {
      const colorName = match[1];
      const colorValue = match[2];
      darkColors[colorName] = colorValue;
    }

    // Extract reference colors
    const refLightColorRegex = /export const (ColorRefLight\w+) = "([^"]+)"/g;
    while ((match = refLightColorRegex.exec(themeContent)) !== null) {
      const colorName = match[1];
      const colorValue = match[2];
      lightColors[colorName] = colorValue;
    }

    const refDarkColorRegex = /export const (ColorRefDark\w+) = "([^"]+)"/g;
    while ((match = refDarkColorRegex.exec(themeContent)) !== null) {
      const colorName = match[1];
      const colorValue = match[2];
      darkColors[colorName] = colorValue;
    }

    const refNeutralColorRegex = /export const (ColorRefNeutral\w+) = "([^"]+)"/g;
    while ((match = refNeutralColorRegex.exec(themeContent)) !== null) {
      const colorName = match[1];
      const colorValue = match[2];
      lightColors[colorName] = colorValue;
      darkColors[colorName] = colorValue;
    }

    // Extract spacing tokens
    const spacingRegex = /export const (Spacing\w+) = "([^"]+)"/g;
    while ((match = spacingRegex.exec(themeContent)) !== null) {
      const spacingName = match[1];
      const spacingValue = match[2];
      spacing[spacingName] = spacingValue;
    }

    // Extract border radius tokens
    const borderRadiusRegex = /export const (BorderRadius\w+) = "([^"]+)"/g;
    while ((match = borderRadiusRegex.exec(themeContent)) !== null) {
      const borderRadiusName = match[1];
      const borderRadiusValue = match[2];
      borderRadius[borderRadiusName] = borderRadiusValue;
    }

    // Extract typography tokens
    const typographyRegex = /export const (Typography\w+) = "([^"]+)"/g;
    while ((match = typographyRegex.exec(themeContent)) !== null) {
      const typographyName = match[1];
      const typographyValue = match[2];
      typography[typographyName] = typographyValue;
    }

    // Extract shadow tokens
    const shadowRegex = /export const (Shadow\w+) = "([^"]+)"/g;
    while ((match = shadowRegex.exec(themeContent)) !== null) {
      const shadowName = match[1];
      const shadowValue = match[2];
      shadows[shadowName] = shadowValue;
    }

    // Create component styles for light theme
    const lightThemeStyles = createComponentStyles(lightColors, spacing, borderRadius, typography, shadows);

    // Create component styles for dark theme
    const darkThemeStyles = createComponentStyles(darkColors, spacing, borderRadius, typography, shadows);

    // Helper function to create component styles
    function createComponentStyles(colors, spacing, borderRadius, typography, shadows) {
      // Default font family for all text styles
      const defaultFontFamily = 'System';

      return {
        // Text styles
        text: {
          primary: {
            color: colors['ColorTextPrimaryLight'] || colors['ColorTextPrimaryDark'] || '#000000',
            fontFamily: defaultFontFamily,
            fontSize: typography['TypographyFontSizeBody'] || '16pt',
            fontWeight: typography['TypographyFontWeightRegular'] || '400',
            lineHeight: typography['TypographyLineHeightDefault'] || '1.5',
          },
          secondary: {
            color: colors['ColorTextSecondaryLight'] || colors['ColorTextSecondaryDark'] || '#4B5563',
            fontFamily: defaultFontFamily,
            fontSize: typography['TypographyFontSizeBody'] || '16pt',
            fontWeight: typography['TypographyFontWeightRegular'] || '400',
            lineHeight: typography['TypographyLineHeightDefault'] || '1.5',
          },
          sectionTitle: {
            color: colors['ColorTextSectionTitleLight'] || colors['ColorTextSectionTitleDark'] || '#1F2937',
            fontFamily: defaultFontFamily,
            fontSize: typography['TypographyFontSizeSectionTitle'] || '18pt',
            fontWeight: typography['TypographyFontWeightSemibold'] || '600',
            lineHeight: typography['TypographyLineHeightDefault'] || '1.5',
          },
          name: {
            color: colors['ColorTextNameLight'] || colors['ColorTextNameDark'] || '#111827',
            fontFamily: defaultFontFamily,
            fontSize: typography['TypographyFontSizeName'] || '24pt',
            fontWeight: typography['TypographyFontWeightBold'] || '700',
            lineHeight: typography['TypographyLineHeightDefault'] || '1.5',
          },
          body: {
            color: colors['ColorTextBodyLight'] || colors['ColorTextBodyDark'] || '#374151',
            fontFamily: defaultFontFamily,
            fontSize: typography['TypographyFontSizeBody'] || '16pt',
            fontWeight: typography['TypographyFontWeightRegular'] || '400',
            lineHeight: typography['TypographyLineHeightDefault'] || '1.5',
          },
          tag: {
            color: colors['ColorTextTagLight'] || colors['ColorTextTagDark'] || '#4B5563',
            fontFamily: defaultFontFamily,
            fontSize: typography['TypographyFontSizeTag'] || '12pt',
            fontWeight: typography['TypographyFontWeightMedium'] || '500',
            lineHeight: typography['TypographyLineHeightDefault'] || '1.5',
          },
          navigation: {
            color: colors['ColorTextNavigationLight'] || colors['ColorTextNavigationDark'] || '#4B5563',
            fontFamily: defaultFontFamily,
            fontSize: typography['TypographyFontSizeBody'] || '16pt',
            fontWeight: typography['TypographyFontWeightMedium'] || '500',
            lineHeight: typography['TypographyLineHeightDefault'] || '1.5',
          },
          activeNavigation: {
            color: colors['ColorTextActiveNavigationLight'] || colors['ColorTextActiveNavigationDark'] || '#111827',
            fontFamily: defaultFontFamily,
            fontSize: typography['TypographyFontSizeBody'] || '16pt',
            fontWeight: typography['TypographyFontWeightSemibold'] || '600',
            lineHeight: typography['TypographyLineHeightDefault'] || '1.5',
          },
        },
        // Container styles
        container: {
          page: {
            backgroundColor: colors['ColorBackgroundPageLight'] || colors['ColorBackgroundPageDark'] || '#FFFFFF',
            flex: 1,
          },
          card: {
            backgroundColor: colors['ColorBackgroundCardLight'] || colors['ColorBackgroundCardDark'] || '#FFE9E4',
            borderRadius: borderRadius['BorderRadiusDefault'] || '12px',
            padding: spacing['SpacingMedium'] || '12px',
          },
        },
        // Button styles
        button: {
          primary: {
            backgroundColor:
              colors['ColorBackgroundButtonPrimaryLightBase'] ||
              colors['ColorBackgroundButtonPrimaryDarkBase'] ||
              '#ACEEF3',
            borderRadius: borderRadius['BorderRadiusDefault'] || '12px',
            padding: spacing['SpacingMedium'] || '12px',
          },
          primaryText: {
            color: colors['ColorTextPrimaryLight'] || colors['ColorTextPrimaryDark'] || '#111827',
            fontFamily: defaultFontFamily,
            fontSize: typography['TypographyFontSizeBody'] || '16pt',
            fontWeight: typography['TypographyFontWeightSemibold'] || '600',
            textAlign: 'center',
          },
          secondary: {
            backgroundColor:
              colors['ColorBackgroundButtonSecondaryLightBase'] ||
              colors['ColorBackgroundButtonSecondaryDarkBase'] ||
              '#FF7077',
            borderRadius: borderRadius['BorderRadiusDefault'] || '12px',
            padding: spacing['SpacingMedium'] || '12px',
          },
          secondaryText: {
            color: colors['ColorTextPrimaryLight'] || colors['ColorTextPrimaryDark'] || '#111827',
            fontFamily: defaultFontFamily,
            fontSize: typography['TypographyFontSizeBody'] || '16pt',
            fontWeight: typography['TypographyFontWeightSemibold'] || '600',
            textAlign: 'center',
          },
          wink: {
            backgroundColor:
              colors['ColorBackgroundButtonWinkLight'] || colors['ColorBackgroundButtonWinkDark'] || '#FF7077',
            borderRadius: borderRadius['BorderRadiusDefault'] || '12px',
            padding: spacing['SpacingMedium'] || '12px',
          },
          winkText: {
            color: colors['ColorTextPrimaryLight'] || colors['ColorTextPrimaryDark'] || '#111827',
            fontFamily: defaultFontFamily,
            fontSize: typography['TypographyFontSizeBody'] || '16pt',
            fontWeight: typography['TypographyFontWeightSemibold'] || '600',
            textAlign: 'center',
          },
        },
        // Tag styles
        tag: {
          container: {
            backgroundColor: colors['ColorBackgroundTagLight'] || colors['ColorBackgroundTagDark'] || '#FFB067',
            borderRadius: borderRadius['BorderRadiusPill'] || '9999px',
            padding: spacing['SpacingSmall'] || '8px',
          },
        },
        // Border styles
        border: {
          default: {
            borderColor: colors['ColorBorderDefaultLight'] || colors['ColorBorderDefaultDark'] || '#D1D5DB',
            borderWidth: 1,
          },
          active: {
            borderColor: colors['ColorBorderActiveLight'] || colors['ColorBorderActiveDark'] || '#FF7077',
            borderWidth: 2,
          },
          dashed: {
            borderColor: colors['ColorBorderDashedLight'] || colors['ColorBorderDashedDark'] || '#9CA3AF',
            borderWidth: 1,
            borderStyle: 'dashed',
          },
        },
      };
    }

    // Generate the React Native StyleSheet file
    const reactNativeStylesheetContent = `/**
 * Generated React Native StyleSheet
 * Auto-generated by Style Dictionary
 */

// Light theme styles
export const lightTheme = ${JSON.stringify(lightThemeStyles, null, 2)};

// Dark theme styles
export const darkTheme = ${JSON.stringify(darkThemeStyles, null, 2)};

// Export both themes
export default {
  light: lightTheme,
  dark: darkTheme
};
`;

    // Write the React Native StyleSheet file
    fs.writeFileSync(path.join(mobileDistDir, 'styled-theme.ts'), reactNativeStylesheetContent);
    console.log('React Native StyleSheet generated successfully!');
  } catch (error) {
    console.error('Error generating React Native StyleSheet:', error);
  }
}
