/* eslint-disable no-console */
/**
 * Script to generate a React Native stylesheet for style-values.ts
 */
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get the package directory
const packageDir = path.resolve(__dirname, '..');
const mobileDistDir = path.join(packageDir, 'dist/mobile');

// Function to generate React Native stylesheet
function generateReactNativeStylesheet() {
  console.log('Generating React Native StyleSheet for style-values.ts...');

  // Rename react-native-styles.ts to styled-theme.ts
  if (fs.existsSync(path.join(mobileDistDir, 'react-native-styles.ts'))) {
    fs.renameSync(path.join(mobileDistDir, 'react-native-styles.ts'), path.join(mobileDistDir, 'styled-theme.ts'));
    console.log('Renamed react-native-styles.ts to styled-theme.ts');
  }

  // Create component styles for the light theme
  const lightThemeStyles = {
    // Text styles
    text: {
      primary: {
        color: '#111827', // ColorTextPrimaryLight
        fontFamily: 'System',
        fontSize: '16pt', // TypographyFontSizeBody
        fontWeight: '400', // TypographyFontWeightRegular
        lineHeight: '1.5', // TypographyLineHeightDefault
      },
      secondary: {
        color: '#374151', // ColorTextSecondaryLight
        fontFamily: 'System',
        fontSize: '16pt', // TypographyFontSizeBody
        fontWeight: '400', // TypographyFontWeightRegular
        lineHeight: '1.5', // TypographyLineHeightDefault
      },
      sectionTitle: {
        color: '#1F2937', // ColorTextSectionTitleLight
        fontFamily: 'System',
        fontSize: '18pt', // TypographyFontSizeSectionTitle
        fontWeight: '600', // TypographyFontWeightSemibold
        lineHeight: '1.5', // TypographyLineHeightDefault
      },
      name: {
        color: '#111827', // ColorTextNameLight
        fontFamily: 'System',
        fontSize: '24pt', // TypographyFontSizeName
        fontWeight: '700', // TypographyFontWeightBold
        lineHeight: '1.5', // TypographyLineHeightDefault
      },
      body: {
        color: '#374151', // ColorTextBodyLight
        fontFamily: 'System',
        fontSize: '16pt', // TypographyFontSizeBody
        fontWeight: '400', // TypographyFontWeightRegular
        lineHeight: '1.5', // TypographyLineHeightDefault
      },
      tag: {
        color: '#4B5563', // ColorTextTagLight
        fontFamily: 'System',
        fontSize: '12pt', // TypographyFontSizeTag
        fontWeight: '500', // TypographyFontWeightMedium
        lineHeight: '1.5', // TypographyLineHeightDefault
      },
      navigation: {
        color: '#4B5563', // ColorTextNavigationLight
        fontFamily: 'System',
        fontSize: '16pt', // TypographyFontSizeBody
        fontWeight: '500', // TypographyFontWeightMedium
        lineHeight: '1.5', // TypographyLineHeightDefault
      },
      activeNavigation: {
        color: '#111827', // ColorTextActiveNavigationLight
        fontFamily: 'System',
        fontSize: '16pt', // TypographyFontSizeBody
        fontWeight: '600', // TypographyFontWeightSemibold
        lineHeight: '1.5', // TypographyLineHeightDefault
      },
    },
    // Container styles
    container: {
      page: {
        backgroundColor: '#FFFFFF', // ColorBackgroundPageLight
        flex: 1,
      },
      card: {
        backgroundColor: '#FFE9E4', // ColorBackgroundCardLight
        borderRadius: '12px', // BorderRadiusDefault
        padding: '12px', // SpacingMedium
      },
    },
    // Button styles
    button: {
      primary: {
        backgroundColor: '#ACEEF3', // ColorBackgroundButtonPrimaryLightBase
        borderRadius: '12px', // BorderRadiusDefault
        padding: '12px', // SpacingMedium
      },
      primaryText: {
        color: '#111827', // ColorTextPrimaryLight
        fontFamily: 'System',
        fontSize: '16pt', // TypographyFontSizeBody
        fontWeight: '600', // TypographyFontWeightSemibold
        textAlign: 'center',
      },
      secondary: {
        backgroundColor: '#FF7077', // ColorBackgroundButtonSecondaryLightBase
        borderRadius: '12px', // BorderRadiusDefault
        padding: '12px', // SpacingMedium
      },
      secondaryText: {
        color: '#111827', // ColorTextPrimaryLight
        fontFamily: 'System',
        fontSize: '16pt', // TypographyFontSizeBody
        fontWeight: '600', // TypographyFontWeightSemibold
        textAlign: 'center',
      },
      wink: {
        backgroundColor: '#FF7077', // ColorBackgroundButtonWinkLight
        borderRadius: '12px', // BorderRadiusDefault
        padding: '12px', // SpacingMedium
      },
      winkText: {
        color: '#111827', // ColorTextPrimaryLight
        fontFamily: 'System',
        fontSize: '16pt', // TypographyFontSizeBody
        fontWeight: '600', // TypographyFontWeightSemibold
        textAlign: 'center',
      },
    },
    // Tag styles
    tag: {
      container: {
        backgroundColor: '#FFB067', // ColorBackgroundTagLight
        borderRadius: '8px', // SpacingSmall
        padding: '8px', // SpacingSmall
      },
    },
    // Border styles
    border: {
      default: {
        borderColor: '#D1D5DB', // ColorBorderDefaultLight
        borderWidth: 1,
      },
      active: {
        borderColor: '#FF7077', // ColorBorderActiveLight
        borderWidth: 2,
      },
      dashed: {
        borderColor: '#9CA3AF', // ColorBorderDashedLight
        borderWidth: 1,
        borderStyle: 'dashed',
      },
    },
  };

  // Create component styles for the dark theme
  const darkThemeStyles = {
    // Text styles
    text: {
      primary: {
        color: '#F9FAFB', // ColorTextPrimaryDark
        fontFamily: 'System',
        fontSize: '16pt', // TypographyFontSizeBody
        fontWeight: '400', // TypographyFontWeightRegular
        lineHeight: '1.5', // TypographyLineHeightDefault
      },
      secondary: {
        color: '#D1D5DB', // ColorTextSecondaryDark
        fontFamily: 'System',
        fontSize: '16pt', // TypographyFontSizeBody
        fontWeight: '400', // TypographyFontWeightRegular
        lineHeight: '1.5', // TypographyLineHeightDefault
      },
      sectionTitle: {
        color: '#F3F4F6', // ColorTextSectionTitleDark
        fontFamily: 'System',
        fontSize: '18pt', // TypographyFontSizeSectionTitle
        fontWeight: '600', // TypographyFontWeightSemibold
        lineHeight: '1.5', // TypographyLineHeightDefault
      },
      name: {
        color: '#FFFFFF', // ColorTextNameDark
        fontFamily: 'System',
        fontSize: '24pt', // TypographyFontSizeName
        fontWeight: '700', // TypographyFontWeightBold
        lineHeight: '1.5', // TypographyLineHeightDefault
      },
      body: {
        color: '#D1D5DB', // ColorTextBodyDark
        fontFamily: 'System',
        fontSize: '16pt', // TypographyFontSizeBody
        fontWeight: '400', // TypographyFontWeightRegular
        lineHeight: '1.5', // TypographyLineHeightDefault
      },
      tag: {
        color: '#9CA3AF', // ColorTextTagDark
        fontFamily: 'System',
        fontSize: '12pt', // TypographyFontSizeTag
        fontWeight: '500', // TypographyFontWeightMedium
        lineHeight: '1.5', // TypographyLineHeightDefault
      },
      navigation: {
        color: '#D1D5DB', // ColorTextNavigationDark
        fontFamily: 'System',
        fontSize: '16pt', // TypographyFontSizeBody
        fontWeight: '500', // TypographyFontWeightMedium
        lineHeight: '1.5', // TypographyLineHeightDefault
      },
      activeNavigation: {
        color: '#FFFFFF', // ColorTextActiveNavigationDark
        fontFamily: 'System',
        fontSize: '16pt', // TypographyFontSizeBody
        fontWeight: '600', // TypographyFontWeightSemibold
        lineHeight: '1.5', // TypographyLineHeightDefault
      },
    },
    // Container styles
    container: {
      page: {
        backgroundColor: '#111827', // ColorBackgroundPageDark
        flex: 1,
      },
      card: {
        backgroundColor: '#5A3E39', // ColorBackgroundCardDark
        borderRadius: '12px', // BorderRadiusDefault
        padding: '12px', // SpacingMedium
      },
    },
    // Button styles
    button: {
      primary: {
        backgroundColor: '#0A4C52', // ColorBackgroundButtonPrimaryDarkBase
        borderRadius: '12px', // BorderRadiusDefault
        padding: '12px', // SpacingMedium
      },
      primaryText: {
        color: '#F9FAFB', // ColorTextPrimaryDark
        fontFamily: 'System',
        fontSize: '16pt', // TypographyFontSizeBody
        fontWeight: '600', // TypographyFontWeightSemibold
        textAlign: 'center',
      },
      secondary: {
        backgroundColor: '#8C3A40', // ColorBackgroundButtonSecondaryDarkBase
        borderRadius: '12px', // BorderRadiusDefault
        padding: '12px', // SpacingMedium
      },
      secondaryText: {
        color: '#F9FAFB', // ColorTextPrimaryDark
        fontFamily: 'System',
        fontSize: '16pt', // TypographyFontSizeBody
        fontWeight: '600', // TypographyFontWeightSemibold
        textAlign: 'center',
      },
      wink: {
        backgroundColor: '#8C3A40', // ColorBackgroundButtonWinkDark
        borderRadius: '12px', // BorderRadiusDefault
        padding: '12px', // SpacingMedium
      },
      winkText: {
        color: '#F9FAFB', // ColorTextPrimaryDark
        fontFamily: 'System',
        fontSize: '16pt', // TypographyFontSizeBody
        fontWeight: '600', // TypographyFontWeightSemibold
        textAlign: 'center',
      },
    },
    // Tag styles
    tag: {
      container: {
        backgroundColor: '#7A4B1F', // ColorBackgroundTagDark
        borderRadius: '8px', // SpacingSmall
        padding: '8px', // SpacingSmall
      },
    },
    // Border styles
    border: {
      default: {
        borderColor: '#374151', // ColorBorderDefaultDark
        borderWidth: 1,
      },
      active: {
        borderColor: '#8C3A40', // ColorBorderActiveDark
        borderWidth: 2,
      },
      dashed: {
        borderColor: '#4B5563', // ColorBorderDashedDark
        borderWidth: 1,
        borderStyle: 'dashed',
      },
    },
  };

  // Generate the React Native StyleSheet file
  const reactNativeStylesheetContent = `/**
 * Generated React Native StyleSheet
 * Auto-generated by Style Dictionary
 */
import { StyleSheet } from 'react-native';
import {
  // Colors
  ColorTextPrimaryLight,
  ColorTextPrimaryDark,
  ColorTextSecondaryLight,
  ColorTextSecondaryDark,
  ColorTextSectionTitleLight,
  ColorTextSectionTitleDark,
  ColorTextNameLight,
  ColorTextNameDark,
  ColorTextBodyLight,
  ColorTextBodyDark,
  ColorTextTagLight,
  ColorTextTagDark,
  ColorTextNavigationLight,
  ColorTextNavigationDark,
  ColorTextActiveNavigationLight,
  ColorTextActiveNavigationDark,
  ColorBackgroundPageLight,
  ColorBackgroundPageDark,
  ColorBackgroundCardLight,
  ColorBackgroundCardDark,
  ColorBackgroundButtonPrimaryLightBase,
  ColorBackgroundButtonPrimaryDarkBase,
  ColorBackgroundButtonSecondaryLightBase,
  ColorBackgroundButtonSecondaryDarkBase,
  ColorBackgroundButtonWinkLight,
  ColorBackgroundButtonWinkDark,
  ColorBackgroundTagLight,
  ColorBackgroundTagDark,
  ColorBorderDefaultLight,
  ColorBorderDefaultDark,
  ColorBorderActiveLight,
  ColorBorderActiveDark,
  ColorBorderDashedLight,
  ColorBorderDashedDark,

  // Dimensions
  BorderRadiusDefault,
  BorderRadiusSmall: SpacingSmall,
  SpacingSmall,
  SpacingMedium,
  TypographyFontSizeBody,
  TypographyFontSizeSectionTitle,
  TypographyFontSizeName,
  TypographyFontSizeTag,
  TypographyFontWeightRegular,
  TypographyFontWeightMedium,
  TypographyFontWeightSemibold,
  TypographyFontWeightBold,
  TypographyLineHeightDefault
} from './style-values';

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
  fs.writeFileSync(path.join(mobileDistDir, 'style-values.ts'), reactNativeStylesheetContent);
  console.log('React Native StyleSheet for style-values.ts generated successfully!');

  // Generate a declaration file for style-values.ts
  const styledThemeDtsContent = `/**
 * Generated React Native StyleSheet TypeScript Declaration
 * Auto-generated by Style Dictionary
 */
import { StyleSheet } from 'react-native';

// Light theme styles type
export declare const lightTheme: ReturnType<typeof StyleSheet.create>;

// Dark theme styles type
export declare const darkTheme: ReturnType<typeof StyleSheet.create>;

// Export both theme types
declare const themes: {
  light: ReturnType<typeof StyleSheet.create>;
  dark: ReturnType<typeof StyleSheet.create>;
};

export default themes;
`;

  // Write the declaration file
  fs.writeFileSync(path.join(mobileDistDir, 'style-values.d.ts'), styledThemeDtsContent);
  console.log('Generated declaration file for style-values.ts');

  // Remove theme.d.ts if it exists
  if (fs.existsSync(path.join(mobileDistDir, 'theme.d.ts'))) {
    fs.unlinkSync(path.join(mobileDistDir, 'theme.d.ts'));
    console.log('Removed theme.d.ts');
  }

  // Clean up unnecessary files
  const filesToRemove = ['theme.ts', 'theme.js', 'react-native-styles.js', 'nativewind-tokens.js'];

  filesToRemove.forEach(file => {
    const filePath = path.join(mobileDistDir, file);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`Removed unnecessary file: ${file}`);
    }
  });
}

// Run the function
generateReactNativeStylesheet();
