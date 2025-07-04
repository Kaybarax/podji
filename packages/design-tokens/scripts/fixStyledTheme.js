/* eslint-disable no-console */
/**
 * Script to rewrite style-values.ts to use imported constants instead of hardcoded values
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

// Function to rewrite style-values.ts
function fixStyledTheme() {
  console.log('Rewriting style-values.ts to use imported constants...');

  try {
    // Read the style-values.ts file
    const styledThemePath = path.join(mobileDistDir, 'style-values.ts');
    let content = fs.readFileSync(styledThemePath, 'utf8');

    // Define mappings from hardcoded values to constants
    const valueToConstantMap = {
      // Colors
      '"#111827"': 'ColorTextPrimaryLight',
      '"#F9FAFB"': 'ColorTextPrimaryDark',
      '"#374151"': 'ColorTextSecondaryLight',
      '"#D1D5DB"': 'ColorTextSecondaryDark',
      '"#1F2937"': 'ColorTextSectionTitleLight',
      '"#F3F4F6"': 'ColorTextSectionTitleDark',
      '"#FFFFFF"': 'ColorTextNameDark',
      '"#4B5563"': 'ColorTextTagLight',
      '"#9CA3AF"': 'ColorTextTagDark',
      '"#FFE9E4"': 'ColorBackgroundCardLight',
      '"#5A3E39"': 'ColorBackgroundCardDark',
      '"#ACEEF3"': 'ColorBackgroundButtonPrimaryLightBase',
      '"#0A4C52"': 'ColorBackgroundButtonPrimaryDarkBase',
      '"#FF7077"': 'ColorBackgroundButtonSecondaryLightBase',
      '"#8C3A40"': 'ColorBackgroundButtonSecondaryDarkBase',
      '"#FFB067"': 'ColorBackgroundTagLight',
      '"#7A4B1F"': 'ColorBackgroundTagDark',

      // Dimensions
      '"12px"': 'BorderRadiusDefault',
      '"8px"': 'SpacingSmall',
      '"16pt"': 'TypographyFontSizeBody',
      '"18pt"': 'TypographyFontSizeSectionTitle',
      '"24pt"': 'TypographyFontSizeName',
      '"12pt"': 'TypographyFontSizeTag',
      '"400"': 'TypographyFontWeightRegular',
      '"500"': 'TypographyFontWeightMedium',
      '"600"': 'TypographyFontWeightSemibold',
      '"700"': 'TypographyFontWeightBold',
      '"1.5"': 'TypographyLineHeightDefault',
    };

    // Define specific property mappings for more precise replacements
    const propertyMappings = {
      // Light theme
      '"text": {"primary": {"color": "#111827"': '"text": {"primary": {"color": ColorTextPrimaryLight',
      '"text": {"secondary": {"color": "#374151"': '"text": {"secondary": {"color": ColorTextSecondaryLight',
      '"text": {"sectionTitle": {"color": "#1F2937"': '"text": {"sectionTitle": {"color": ColorTextSectionTitleLight',
      '"text": {"name": {"color": "#111827"': '"text": {"name": {"color": ColorTextNameLight',
      '"text": {"body": {"color": "#374151"': '"text": {"body": {"color": ColorTextBodyLight',
      '"text": {"tag": {"color": "#4B5563"': '"text": {"tag": {"color": ColorTextTagLight',
      '"text": {"navigation": {"color": "#4B5563"': '"text": {"navigation": {"color": ColorTextNavigationLight',
      '"text": {"activeNavigation": {"color": "#111827"':
        '"text": {"activeNavigation": {"color": ColorTextActiveNavigationLight',
      '"container": {"page": {"backgroundColor": "#FFFFFF"':
        '"container": {"page": {"backgroundColor": ColorBackgroundPageLight',
      '"container": {"card": {"backgroundColor": "#FFE9E4"':
        '"container": {"card": {"backgroundColor": ColorBackgroundCardLight',
      '"button": {"primary": {"backgroundColor": "#ACEEF3"':
        '"button": {"primary": {"backgroundColor": ColorBackgroundButtonPrimaryLightBase',
      '"button": {"primaryText": {"color": "#111827"': '"button": {"primaryText": {"color": ColorTextPrimaryLight',
      '"button": {"secondary": {"backgroundColor": "#FF7077"':
        '"button": {"secondary": {"backgroundColor": ColorBackgroundButtonSecondaryLightBase',
      '"button": {"secondaryText": {"color": "#111827"': '"button": {"secondaryText": {"color": ColorTextPrimaryLight',
      '"button": {"wink": {"backgroundColor": "#FF7077"':
        '"button": {"wink": {"backgroundColor": ColorBackgroundButtonWinkLight',
      '"button": {"winkText": {"color": "#111827"': '"button": {"winkText": {"color": ColorTextPrimaryLight',
      '"tag": {"container": {"backgroundColor": "#FFB067"':
        '"tag": {"container": {"backgroundColor": ColorBackgroundTagLight',
      '"border": {"default": {"borderColor": "#D1D5DB"':
        '"border": {"default": {"borderColor": ColorBorderDefaultLight',
      '"border": {"active": {"borderColor": "#FF7077"': '"border": {"active": {"borderColor": ColorBorderActiveLight',
      '"border": {"dashed": {"borderColor": "#9CA3AF"': '"border": {"dashed": {"borderColor": ColorBorderDashedLight',

      // Dark theme
      '"text": {"primary": {"color": "#F9FAFB"': '"text": {"primary": {"color": ColorTextPrimaryDark',
      '"text": {"secondary": {"color": "#D1D5DB"': '"text": {"secondary": {"color": ColorTextSecondaryDark',
      '"text": {"sectionTitle": {"color": "#F3F4F6"': '"text": {"sectionTitle": {"color": ColorTextSectionTitleDark',
      '"text": {"name": {"color": "#FFFFFF"': '"text": {"name": {"color": ColorTextNameDark',
      '"text": {"body": {"color": "#D1D5DB"': '"text": {"body": {"color": ColorTextBodyDark',
      '"text": {"tag": {"color": "#9CA3AF"': '"text": {"tag": {"color": ColorTextTagDark',
      '"text": {"navigation": {"color": "#D1D5DB"': '"text": {"navigation": {"color": ColorTextNavigationDark',
      '"text": {"activeNavigation": {"color": "#FFFFFF"':
        '"text": {"activeNavigation": {"color": ColorTextActiveNavigationDark',
      '"container": {"page": {"backgroundColor": "#111827"':
        '"container": {"page": {"backgroundColor": ColorBackgroundPageDark',
      '"container": {"card": {"backgroundColor": "#5A3E39"':
        '"container": {"card": {"backgroundColor": ColorBackgroundCardDark',
      '"button": {"primary": {"backgroundColor": "#0A4C52"':
        '"button": {"primary": {"backgroundColor": ColorBackgroundButtonPrimaryDarkBase',
      '"button": {"primaryText": {"color": "#F9FAFB"': '"button": {"primaryText": {"color": ColorTextPrimaryDark',
      '"button": {"secondary": {"backgroundColor": "#8C3A40"':
        '"button": {"secondary": {"backgroundColor": ColorBackgroundButtonSecondaryDarkBase',
      '"button": {"secondaryText": {"color": "#F9FAFB"': '"button": {"secondaryText": {"color": ColorTextPrimaryDark',
      '"button": {"wink": {"backgroundColor": "#8C3A40"':
        '"button": {"wink": {"backgroundColor": ColorBackgroundButtonWinkDark',
      '"button": {"winkText": {"color": "#F9FAFB"': '"button": {"winkText": {"color": ColorTextPrimaryDark',
      '"tag": {"container": {"backgroundColor": "#7A4B1F"':
        '"tag": {"container": {"backgroundColor": ColorBackgroundTagDark',
      '"border": {"default": {"borderColor": "#374151"': '"border": {"default": {"borderColor": ColorBorderDefaultDark',
      '"border": {"active": {"borderColor": "#8C3A40"': '"border": {"active": {"borderColor": ColorBorderActiveDark',
      '"border": {"dashed": {"borderColor": "#4B5563"': '"border": {"dashed": {"borderColor": ColorBorderDashedDark',
    };

    // Apply property-specific mappings first (more precise)
    for (const [pattern, replacement] of Object.entries(propertyMappings)) {
      content = content.replace(new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), replacement);
    }

    // Then apply general value mappings
    for (const [value, constant] of Object.entries(valueToConstantMap)) {
      // Replace remaining hardcoded values with constants
      content = content.replace(new RegExp(`"color": ${value}`, 'g'), `"color": ${constant}`);
      content = content.replace(new RegExp(`"backgroundColor": ${value}`, 'g'), `"backgroundColor": ${constant}`);
      content = content.replace(new RegExp(`"borderColor": ${value}`, 'g'), `"borderColor": ${constant}`);
      content = content.replace(new RegExp(`"fontSize": ${value}`, 'g'), `"fontSize": ${constant}`);
      content = content.replace(new RegExp(`"fontWeight": ${value}`, 'g'), `"fontWeight": ${constant}`);
      content = content.replace(new RegExp(`"lineHeight": ${value}`, 'g'), `"lineHeight": ${constant}`);
      content = content.replace(new RegExp(`"borderRadius": ${value}`, 'g'), `"borderRadius": ${constant}`);
      content = content.replace(new RegExp(`"padding": ${value}`, 'g'), `"padding": ${constant}`);
    }

    // Fix specific issues with incorrect constants
    const specificFixes = [
      // Light theme fixes
      {
        search: '"text": {"navigation": {"color": ColorTextTagLight',
        replace: '"text": {"navigation": {"color": ColorTextNavigationLight',
      },
      {
        search: '"container": {"page": {"backgroundColor": ColorTextNameDark',
        replace: '"container": {"page": {"backgroundColor": ColorBackgroundPageLight',
      },
      {
        search:
          '"container": {"card": {"backgroundColor": ColorBackgroundCardLight,"borderRadius": BorderRadiusDefault,"padding": BorderRadiusDefault',
        replace:
          '"container": {"card": {"backgroundColor": ColorBackgroundCardLight,"borderRadius": BorderRadiusDefault,"padding": SpacingMedium',
      },
      {
        search:
          '"button": {"primary": {"backgroundColor": ColorBackgroundButtonPrimaryLightBase,"borderRadius": BorderRadiusDefault,"padding": BorderRadiusDefault',
        replace:
          '"button": {"primary": {"backgroundColor": ColorBackgroundButtonPrimaryLightBase,"borderRadius": BorderRadiusDefault,"padding": SpacingMedium',
      },
      {
        search:
          '"button": {"secondary": {"backgroundColor": ColorBackgroundButtonSecondaryLightBase,"borderRadius": BorderRadiusDefault,"padding": BorderRadiusDefault',
        replace:
          '"button": {"secondary": {"backgroundColor": ColorBackgroundButtonSecondaryLightBase,"borderRadius": BorderRadiusDefault,"padding": SpacingMedium',
      },
      {
        search: '"button": {"wink": {"backgroundColor": ColorBackgroundButtonSecondaryLightBase',
        replace: '"button": {"wink": {"backgroundColor": ColorBackgroundButtonWinkLight',
      },
      {
        search:
          '"button": {"wink": {"backgroundColor": ColorBackgroundButtonWinkLight,"borderRadius": BorderRadiusDefault,"padding": BorderRadiusDefault',
        replace:
          '"button": {"wink": {"backgroundColor": ColorBackgroundButtonWinkLight,"borderRadius": BorderRadiusDefault,"padding": SpacingMedium',
      },
      {
        search: '"border": {"default": {"borderColor": ColorTextSecondaryDark',
        replace: '"border": {"default": {"borderColor": ColorBorderDefaultLight',
      },
      {
        search: '"border": {"active": {"borderColor": ColorBackgroundButtonSecondaryLightBase',
        replace: '"border": {"active": {"borderColor": ColorBorderActiveLight',
      },
      {
        search: '"border": {"dashed": {"borderColor": ColorTextTagDark',
        replace: '"border": {"dashed": {"borderColor": ColorBorderDashedLight',
      },

      // Dark theme fixes
      {
        search:
          '"container": {"card": {"backgroundColor": ColorBackgroundCardDark,"borderRadius": BorderRadiusDefault,"padding": BorderRadiusDefault',
        replace:
          '"container": {"card": {"backgroundColor": ColorBackgroundCardDark,"borderRadius": BorderRadiusDefault,"padding": SpacingMedium',
      },
      {
        search:
          '"button": {"primary": {"backgroundColor": ColorBackgroundButtonPrimaryDarkBase,"borderRadius": BorderRadiusDefault,"padding": BorderRadiusDefault',
        replace:
          '"button": {"primary": {"backgroundColor": ColorBackgroundButtonPrimaryDarkBase,"borderRadius": BorderRadiusDefault,"padding": SpacingMedium',
      },
      {
        search:
          '"button": {"secondary": {"backgroundColor": ColorBackgroundButtonSecondaryDarkBase,"borderRadius": BorderRadiusDefault,"padding": BorderRadiusDefault',
        replace:
          '"button": {"secondary": {"backgroundColor": ColorBackgroundButtonSecondaryDarkBase,"borderRadius": BorderRadiusDefault,"padding": SpacingMedium',
      },
      {
        search: '"button": {"wink": {"backgroundColor": ColorBackgroundButtonSecondaryDarkBase',
        replace: '"button": {"wink": {"backgroundColor": ColorBackgroundButtonWinkDark',
      },
      {
        search:
          '"button": {"wink": {"backgroundColor": ColorBackgroundButtonWinkDark,"borderRadius": BorderRadiusDefault,"padding": BorderRadiusDefault',
        replace:
          '"button": {"wink": {"backgroundColor": ColorBackgroundButtonWinkDark,"borderRadius": BorderRadiusDefault,"padding": SpacingMedium',
      },
      {
        search: '"border": {"default": {"borderColor": ColorTextSecondaryLight',
        replace: '"border": {"default": {"borderColor": ColorBorderDefaultDark',
      },
      {
        search: '"border": {"active": {"borderColor": ColorBackgroundButtonSecondaryDarkBase',
        replace: '"border": {"active": {"borderColor": ColorBorderActiveDark',
      },
      {
        search: '"border": {"dashed": {"borderColor": ColorTextTagLight',
        replace: '"border": {"dashed": {"borderColor": ColorBorderDashedDark',
      },
    ];

    // Apply specific fixes
    for (const { search, replace } of specificFixes) {
      content = content.replace(search, replace);
    }

    // Write the updated content back to the file
    fs.writeFileSync(styledThemePath, content);
    console.log('Successfully rewrote style-values.ts to use imported constants');
  } catch (error) {
    console.error('Error rewriting style-values.ts:', error);
  }
}

// Run the function
fixStyledTheme();
