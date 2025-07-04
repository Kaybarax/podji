/* eslint-disable no-console */
/**
 * Script to make final fixes to style-values.ts
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

// Function to make final fixes to style-values.ts
function makeFinalFixes() {
  console.log('Making final fixes to style-values.ts...');

  try {
    // Read the style-values.ts file
    const styledThemePath = path.join(mobileDistDir, 'style-values.ts');
    let content = fs.readFileSync(styledThemePath, 'utf8');

    // Make specific replacements
    const replacements = [
      // Light theme fixes
      {
        from: '"navigation": {\n      "color": ColorTextTagLight',
        to: '"navigation": {\n      "color": ColorTextNavigationLight',
      },
      {
        from: '"container": {\n    "page": {\n      "backgroundColor": ColorTextNameDark',
        to: '"container": {\n    "page": {\n      "backgroundColor": ColorBackgroundPageLight',
      },
      {
        from: '"card": {\n      "backgroundColor": ColorBackgroundCardLight,\n      "borderRadius": BorderRadiusDefault,\n      "padding": BorderRadiusDefault',
        to: '"card": {\n      "backgroundColor": ColorBackgroundCardLight,\n      "borderRadius": BorderRadiusDefault,\n      "padding": SpacingMedium',
      },
      {
        from: '"primary": {\n      "backgroundColor": ColorBackgroundButtonPrimaryLightBase,\n      "borderRadius": BorderRadiusDefault,\n      "padding": BorderRadiusDefault',
        to: '"primary": {\n      "backgroundColor": ColorBackgroundButtonPrimaryLightBase,\n      "borderRadius": BorderRadiusDefault,\n      "padding": SpacingMedium',
      },
      {
        from: '"secondary": {\n      "backgroundColor": ColorBackgroundButtonSecondaryLightBase,\n      "borderRadius": BorderRadiusDefault,\n      "padding": BorderRadiusDefault',
        to: '"secondary": {\n      "backgroundColor": ColorBackgroundButtonSecondaryLightBase,\n      "borderRadius": BorderRadiusDefault,\n      "padding": SpacingMedium',
      },
      {
        from: '"wink": {\n      "backgroundColor": ColorBackgroundButtonSecondaryLightBase',
        to: '"wink": {\n      "backgroundColor": ColorBackgroundButtonWinkLight',
      },
      {
        from: '"wink": {\n      "backgroundColor": ColorBackgroundButtonWinkLight,\n      "borderRadius": BorderRadiusDefault,\n      "padding": BorderRadiusDefault',
        to: '"wink": {\n      "backgroundColor": ColorBackgroundButtonWinkLight,\n      "borderRadius": BorderRadiusDefault,\n      "padding": SpacingMedium',
      },
      {
        from: '"default": {\n      "borderColor": ColorTextSecondaryDark',
        to: '"default": {\n      "borderColor": ColorBorderDefaultLight',
      },
      {
        from: '"active": {\n      "borderColor": ColorBackgroundButtonSecondaryLightBase',
        to: '"active": {\n      "borderColor": ColorBorderActiveLight',
      },
      {
        from: '"dashed": {\n      "borderColor": ColorTextTagDark',
        to: '"dashed": {\n      "borderColor": ColorBorderDashedLight',
      },

      // Dark theme fixes
      {
        from: '"navigation": {\n      "color": ColorTextSecondaryDark',
        to: '"navigation": {\n      "color": ColorTextNavigationDark',
      },
      {
        from: '"activeNavigation": {\n      "color": ColorTextNameDark',
        to: '"activeNavigation": {\n      "color": ColorTextActiveNavigationDark',
      },
      {
        from: '"container": {\n    "page": {\n      "backgroundColor": ColorTextPrimaryLight',
        to: '"container": {\n    "page": {\n      "backgroundColor": ColorBackgroundPageDark',
      },
      {
        from: '"container": {\n    "card": {\n      "backgroundColor": ColorBackgroundCardDark,\n      "borderRadius": BorderRadiusDefault,\n      "padding": BorderRadiusDefault',
        to: '"container": {\n    "card": {\n      "backgroundColor": ColorBackgroundCardDark,\n      "borderRadius": BorderRadiusDefault,\n      "padding": SpacingMedium',
      },
      {
        from: '"button": {\n    "primary": {\n      "backgroundColor": ColorBackgroundButtonPrimaryDarkBase,\n      "borderRadius": BorderRadiusDefault,\n      "padding": BorderRadiusDefault',
        to: '"button": {\n    "primary": {\n      "backgroundColor": ColorBackgroundButtonPrimaryDarkBase,\n      "borderRadius": BorderRadiusDefault,\n      "padding": SpacingMedium',
      },
      {
        from: '"secondary": {\n      "backgroundColor": ColorBackgroundButtonSecondaryDarkBase,\n      "borderRadius": BorderRadiusDefault,\n      "padding": BorderRadiusDefault',
        to: '"secondary": {\n      "backgroundColor": ColorBackgroundButtonSecondaryDarkBase,\n      "borderRadius": BorderRadiusDefault,\n      "padding": SpacingMedium',
      },
      {
        from: '"wink": {\n      "backgroundColor": ColorBackgroundButtonSecondaryDarkBase',
        to: '"wink": {\n      "backgroundColor": ColorBackgroundButtonWinkDark',
      },
      {
        from: '"wink": {\n      "backgroundColor": ColorBackgroundButtonWinkDark,\n      "borderRadius": BorderRadiusDefault,\n      "padding": BorderRadiusDefault',
        to: '"wink": {\n      "backgroundColor": ColorBackgroundButtonWinkDark,\n      "borderRadius": BorderRadiusDefault,\n      "padding": SpacingMedium',
      },
      {
        from: '"default": {\n      "borderColor": ColorTextSecondaryLight',
        to: '"default": {\n      "borderColor": ColorBorderDefaultDark',
      },
      {
        from: '"active": {\n      "borderColor": ColorBackgroundButtonSecondaryDarkBase',
        to: '"active": {\n      "borderColor": ColorBorderActiveDark',
      },
      {
        from: '"dashed": {\n      "borderColor": ColorTextTagLight',
        to: '"dashed": {\n      "borderColor": ColorBorderDashedDark',
      },
    ];

    // Apply replacements
    for (const { from, to } of replacements) {
      content = content.replace(from, to);
    }

    // Write the updated content back to the file
    fs.writeFileSync(styledThemePath, content);
    console.log('Successfully made final fixes to style-values.ts');
  } catch (error) {
    console.error('Error making final fixes to style-values.ts:', error);
  }
}

// Run the function
makeFinalFixes();
