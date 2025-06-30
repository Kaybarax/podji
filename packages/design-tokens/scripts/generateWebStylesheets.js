/**
 * Generates web stylesheets from token values:
 * - styled-tailwind-theme.css (Tailwind CSS)
 * - styled-sass-theme.scss (SASS)
 * - styled-theme.css (pure CSS)
 */
import * as fs from 'fs';
import * as path from 'path';

export async function generateWebStylesheets(webDistDir) {
  console.log('Generating web stylesheets...');

  try {
    // Extract tokens from theme.js
    const themeModule = fs.readFileSync(path.join(webDistDir, 'theme.js'), 'utf8');

    // Extract the theme object using regex
    const themeMatch = themeModule.match(/export const theme = (\{[\s\S]*\});/);
    if (!themeMatch) {
      throw new Error('Could not extract theme data from theme.js');
    }

    // Create a temporary JS file to evaluate the theme object
    const tempFilePath = path.join(webDistDir, 'temp-theme.js');
    fs.writeFileSync(
      tempFilePath,
      `
      const theme = ${themeMatch[1]};

      // Extract colors
      const colors = {};
      if (theme.color) {
        // Process color tokens
        const processColorCategory = (category, prefix = '') => {
          Object.entries(category).forEach(([key, value]) => {
            if (value && typeof value === 'object' && value.value) {
              colors[\`\${prefix}\${key}\`] = value.value;
            } else if (value && typeof value === 'object') {
              processColorCategory(value, \`\${prefix}\${key}.\`);
            }
          });
        };

        processColorCategory(theme.color);
      }

      // Extract spacing
      const spacing = {};
      if (theme.spacing) {
        Object.entries(theme.spacing).forEach(([key, value]) => {
          if (value && typeof value === 'object' && value.value) {
            spacing[key] = value.value;
          }
        });
      }

      // Extract border radius
      const borderRadius = {};
      if (theme.borderRadius) {
        Object.entries(theme.borderRadius).forEach(([key, value]) => {
          if (value && typeof value === 'object' && value.value) {
            borderRadius[key] = value.value;
          }
        });
      }

      // Extract typography
      const fontSize = {};
      const fontWeight = {};
      const lineHeight = {};
      if (theme.typography) {
        // Font size
        if (theme.typography.fontSize) {
          Object.entries(theme.typography.fontSize).forEach(([key, value]) => {
            if (value && typeof value === 'object' && value.value) {
              fontSize[key] = value.value;
            }
          });
        }

        // Font weight
        if (theme.typography.fontWeight) {
          Object.entries(theme.typography.fontWeight).forEach(([key, value]) => {
            if (value && typeof value === 'object' && value.value) {
              fontWeight[key] = value.value;
            }
          });
        }

        // Line height
        if (theme.typography.lineHeight) {
          Object.entries(theme.typography.lineHeight).forEach(([key, value]) => {
            if (value && typeof value === 'object' && value.value) {
              lineHeight[key] = value.value;
            }
          });
        }
      }

      // Extract shadow
      const boxShadow = {};
      if (theme.shadow) {
        Object.entries(theme.shadow).forEach(([key, value]) => {
          if (value && typeof value === 'object' && value.value) {
            boxShadow[key] = value.value;
          }
        });
      }

      // Export the extracted data
      console.log(JSON.stringify({
        colors,
        spacing,
        borderRadius,
        fontSize,
        fontWeight,
        lineHeight,
        boxShadow
      }));
    `,
    );

    // Execute the temporary JS file to extract the tokens
    const { execSync } = await import('node:child_process');
    const result = execSync(`node ${tempFilePath}`, { encoding: 'utf8' });

    // Parse the result
    const themeData = JSON.parse(result);

    // Clean up the temporary file
    fs.unlinkSync(tempFilePath);

    // Generate the stylesheets
    generateTailwindStylesheet(webDistDir, themeData);
    generateSassStylesheet(webDistDir, themeData);
    generateCssStylesheet(webDistDir, themeData);

    console.log('Web stylesheets generated successfully!');
  } catch (error) {
    console.error('Error generating web stylesheets:', error);
  }
}

/**
 * Generates a Tailwind CSS stylesheet
 */
function generateTailwindStylesheet(webDistDir, themeData) {
  const { colors, spacing, borderRadius, fontSize, fontWeight, lineHeight, boxShadow } = themeData;

  // Create CSS variables for light theme
  let lightThemeVars = ':root {\n';
  // Add color variables
  Object.entries(colors).forEach(([key, value]) => {
    if (key.includes('light') || !key.includes('dark')) {
      lightThemeVars += `  --color-${key.replace(/\./g, '-')}: ${value};\n`;
    }
  });
  // Add spacing variables
  Object.entries(spacing || {}).forEach(([key, value]) => {
    lightThemeVars += `  --spacing-${key.replace(/\./g, '-')}: ${value};\n`;
  });
  // Add border radius variables
  Object.entries(borderRadius || {}).forEach(([key, value]) => {
    lightThemeVars += `  --radius-${key.replace(/\./g, '-')}: ${value};\n`;
  });
  // Add font size variables
  Object.entries(fontSize || {}).forEach(([key, value]) => {
    lightThemeVars += `  --font-size-${key.replace(/\./g, '-')}: ${value};\n`;
  });
  // Add font weight variables
  Object.entries(fontWeight || {}).forEach(([key, value]) => {
    lightThemeVars += `  --font-weight-${key.replace(/\./g, '-')}: ${value};\n`;
  });
  // Add line height variables
  Object.entries(lineHeight || {}).forEach(([key, value]) => {
    lightThemeVars += `  --line-height-${key.replace(/\./g, '-')}: ${value};\n`;
  });
  // Add box shadow variables
  Object.entries(boxShadow || {}).forEach(([key, value]) => {
    lightThemeVars += `  --shadow-${key.replace(/\./g, '-')}: ${value};\n`;
  });
  lightThemeVars += '}\n\n';

  // Create CSS variables for dark theme
  let darkThemeVars = '.dark {\n';
  // Add color variables for dark theme
  Object.entries(colors).forEach(([key, value]) => {
    if (key.includes('dark')) {
      darkThemeVars += `  --color-${key.replace(/\./g, '-')}: ${value};\n`;
    }
  });
  darkThemeVars += '}\n\n';

  // Create component styles
  let componentStyles = '';

  // Text styles
  componentStyles += '/* Text styles */\n';
  componentStyles += '.text-primary {\n';
  componentStyles += '  color: var(--color-text-primary-light);\n';
  componentStyles += '  font-size: var(--font-size-body);\n';
  componentStyles += '  font-weight: var(--font-weight-regular);\n';
  componentStyles += '  line-height: var(--line-height-default);\n';
  componentStyles += '}\n\n';

  componentStyles += '.text-secondary {\n';
  componentStyles += '  color: var(--color-text-secondary-light);\n';
  componentStyles += '  font-size: var(--font-size-body);\n';
  componentStyles += '  font-weight: var(--font-weight-regular);\n';
  componentStyles += '  line-height: var(--line-height-default);\n';
  componentStyles += '}\n\n';

  componentStyles += '.text-section-title {\n';
  componentStyles += '  color: var(--color-text-section-title-light);\n';
  componentStyles += '  font-size: var(--font-size-section-title);\n';
  componentStyles += '  font-weight: var(--font-weight-semibold);\n';
  componentStyles += '  line-height: var(--line-height-default);\n';
  componentStyles += '}\n\n';

  componentStyles += '.text-name {\n';
  componentStyles += '  color: var(--color-text-name-light);\n';
  componentStyles += '  font-size: var(--font-size-name);\n';
  componentStyles += '  font-weight: var(--font-weight-bold);\n';
  componentStyles += '  line-height: var(--line-height-default);\n';
  componentStyles += '}\n\n';

  componentStyles += '.text-body {\n';
  componentStyles += '  color: var(--color-text-body-light);\n';
  componentStyles += '  font-size: var(--font-size-body);\n';
  componentStyles += '  font-weight: var(--font-weight-regular);\n';
  componentStyles += '  line-height: var(--line-height-default);\n';
  componentStyles += '}\n\n';

  // Container styles
  componentStyles += '/* Container styles */\n';
  componentStyles += '.container-page {\n';
  componentStyles += '  background-color: var(--color-background-page-light);\n';
  componentStyles += '}\n\n';

  componentStyles += '.container-card {\n';
  componentStyles += '  background-color: var(--color-background-card-light);\n';
  componentStyles += '  border-radius: var(--radius-medium);\n';
  componentStyles += '  padding: var(--spacing-medium);\n';
  componentStyles += '}\n\n';

  // Button styles
  componentStyles += '/* Button styles */\n';
  componentStyles += '.button-primary {\n';
  componentStyles += '  background-color: var(--color-background-button-primary-light-base);\n';
  componentStyles += '  border-radius: var(--radius-medium);\n';
  componentStyles += '  padding: var(--spacing-medium);\n';
  componentStyles += '  color: var(--color-text-primary-light);\n';
  componentStyles += '  font-size: var(--font-size-body);\n';
  componentStyles += '  font-weight: var(--font-weight-semibold);\n';
  componentStyles += '  text-align: center;\n';
  componentStyles += '}\n\n';

  componentStyles += '.button-secondary {\n';
  componentStyles += '  background-color: var(--color-background-button-secondary-light-base);\n';
  componentStyles += '  border-radius: var(--radius-medium);\n';
  componentStyles += '  padding: var(--spacing-medium);\n';
  componentStyles += '  color: var(--color-text-primary-light);\n';
  componentStyles += '  font-size: var(--font-size-body);\n';
  componentStyles += '  font-weight: var(--font-weight-semibold);\n';
  componentStyles += '  text-align: center;\n';
  componentStyles += '}\n\n';

  // Tag styles
  componentStyles += '/* Tag styles */\n';
  componentStyles += '.tag {\n';
  componentStyles += '  background-color: var(--color-background-tag-light);\n';
  componentStyles += '  border-radius: var(--radius-small);\n';
  componentStyles += '  padding: var(--spacing-small);\n';
  componentStyles += '  color: var(--color-text-tag-light);\n';
  componentStyles += '  font-size: var(--font-size-tag);\n';
  componentStyles += '  font-weight: var(--font-weight-medium);\n';
  componentStyles += '}\n\n';

  // Border styles
  componentStyles += '/* Border styles */\n';
  componentStyles += '.border-default {\n';
  componentStyles += '  border-color: var(--color-border-default-light);\n';
  componentStyles += '  border-width: 1px;\n';
  componentStyles += '  border-style: solid;\n';
  componentStyles += '}\n\n';

  componentStyles += '.border-active {\n';
  componentStyles += '  border-color: var(--color-border-active-light);\n';
  componentStyles += '  border-width: 2px;\n';
  componentStyles += '  border-style: solid;\n';
  componentStyles += '}\n\n';

  componentStyles += '.border-dashed {\n';
  componentStyles += '  border-color: var(--color-border-dashed-light);\n';
  componentStyles += '  border-width: 1px;\n';
  componentStyles += '  border-style: dashed;\n';
  componentStyles += '}\n\n';

  // Dark theme overrides
  componentStyles += '/* Dark theme overrides */\n';
  componentStyles += '.dark .text-primary { color: var(--color-text-primary-dark); }\n';
  componentStyles += '.dark .text-secondary { color: var(--color-text-secondary-dark); }\n';
  componentStyles += '.dark .text-section-title { color: var(--color-text-section-title-dark); }\n';
  componentStyles += '.dark .text-name { color: var(--color-text-name-dark); }\n';
  componentStyles += '.dark .text-body { color: var(--color-text-body-dark); }\n';
  componentStyles += '.dark .container-page { background-color: var(--color-background-page-dark); }\n';
  componentStyles += '.dark .container-card { background-color: var(--color-background-card-dark); }\n';
  componentStyles +=
    '.dark .button-primary { background-color: var(--color-background-button-primary-dark-base); color: var(--color-text-primary-dark); }\n';
  componentStyles +=
    '.dark .button-secondary { background-color: var(--color-background-button-secondary-dark-base); color: var(--color-text-primary-dark); }\n';
  componentStyles +=
    '.dark .tag { background-color: var(--color-background-tag-dark); color: var(--color-text-tag-dark); }\n';
  componentStyles += '.dark .border-default { border-color: var(--color-border-default-dark); }\n';
  componentStyles += '.dark .border-active { border-color: var(--color-border-active-dark); }\n';
  componentStyles += '.dark .border-dashed { border-color: var(--color-border-dashed-dark); }\n';

  // Combine all sections
  const tailwindStylesheet = `/**
 * Generated Tailwind CSS Stylesheet
 * Auto-generated by Style Dictionary
 */

${lightThemeVars}
${darkThemeVars}
${componentStyles}`;

  // Write the Tailwind CSS stylesheet
  fs.writeFileSync(path.join(webDistDir, 'styled-tailwind-theme.css'), tailwindStylesheet);
  console.log('Tailwind CSS stylesheet generated successfully!');
}

/**
 * Generates a SASS stylesheet
 */
function generateSassStylesheet(webDistDir, themeData) {
  const { colors, spacing, borderRadius, fontSize, fontWeight, lineHeight, boxShadow } = themeData;

  // Create SASS variables for light theme
  let lightThemeVars = '// Light theme variables\n';
  // Add color variables
  Object.entries(colors).forEach(([key, value]) => {
    if (key.includes('light') || !key.includes('dark')) {
      lightThemeVars += `$color-${key.replace(/\./g, '-')}: ${value};\n`;
    }
  });
  // Add spacing variables
  Object.entries(spacing || {}).forEach(([key, value]) => {
    lightThemeVars += `$spacing-${key.replace(/\./g, '-')}: ${value};\n`;
  });
  // Add border radius variables
  Object.entries(borderRadius || {}).forEach(([key, value]) => {
    lightThemeVars += `$radius-${key.replace(/\./g, '-')}: ${value};\n`;
  });
  // Add font size variables
  Object.entries(fontSize || {}).forEach(([key, value]) => {
    lightThemeVars += `$font-size-${key.replace(/\./g, '-')}: ${value};\n`;
  });
  // Add font weight variables
  Object.entries(fontWeight || {}).forEach(([key, value]) => {
    lightThemeVars += `$font-weight-${key.replace(/\./g, '-')}: ${value};\n`;
  });
  // Add line height variables
  Object.entries(lineHeight || {}).forEach(([key, value]) => {
    lightThemeVars += `$line-height-${key.replace(/\./g, '-')}: ${value};\n`;
  });
  // Add box shadow variables
  Object.entries(boxShadow || {}).forEach(([key, value]) => {
    lightThemeVars += `$shadow-${key.replace(/\./g, '-')}: ${value};\n`;
  });

  // Add additional variables needed for mixins
  lightThemeVars += '$font-weight-semibold: 600;\n';
  lightThemeVars += '$line-height-default: 1.5;\n';
  lightThemeVars += '$font-size-body: 16px;\n';
  lightThemeVars += '$font-size-section-title: 20px;\n';
  lightThemeVars += '$color-text-primary-light: #000000;\n';
  lightThemeVars += '$color-text-secondary-light: #00000099;\n';
  lightThemeVars += '$color-text-section-title-light: #000000;\n';
  lightThemeVars += '$color-background-page-light: #ffffff;\n';
  lightThemeVars += '$color-background-card-light: #ffe9e4;\n';
  lightThemeVars += '$color-background-button-primary-light-base: #aceef3;\n';
  lightThemeVars += '$radius-medium: 8px;\n';

  lightThemeVars += '\n';

  // Create SASS variables for dark theme
  let darkThemeVars = '// Dark theme variables\n';
  // Add color variables for dark theme
  Object.entries(colors).forEach(([key, value]) => {
    if (key.includes('dark')) {
      darkThemeVars += `$color-${key.replace(/\./g, '-')}: ${value};\n`;
    }
  });

  // Add additional dark theme variables needed for mixins
  darkThemeVars += '$color-text-primary-dark: #ffffff;\n';
  darkThemeVars += '$color-text-secondary-dark: #ffffffb3;\n';
  darkThemeVars += '$color-text-section-title-dark: #ffffff;\n';
  darkThemeVars += '$color-background-page-dark: #121212;\n';
  darkThemeVars += '$color-background-card-dark: #1e1e1e;\n';
  darkThemeVars += '$color-background-button-primary-dark-base: #289baa;\n';

  darkThemeVars += '\n';

  // Create component styles using SASS mixins
  let componentMixins = '// Component mixins\n';

  // Text mixins
  componentMixins += '@mixin text-primary {\n';
  componentMixins += '  color: $color-text-primary-light;\n';
  componentMixins += '  font-size: $font-size-body;\n';
  componentMixins += '  font-weight: $font-weight-regular;\n';
  componentMixins += '  line-height: $line-height-default;\n';
  componentMixins += '}\n\n';

  componentMixins += '@mixin text-secondary {\n';
  componentMixins += '  color: $color-text-secondary-light;\n';
  componentMixins += '  font-size: $font-size-body;\n';
  componentMixins += '  font-weight: $font-weight-regular;\n';
  componentMixins += '  line-height: $line-height-default;\n';
  componentMixins += '}\n\n';

  componentMixins += '@mixin text-section-title {\n';
  componentMixins += '  color: $color-text-section-title-light;\n';
  componentMixins += '  font-size: $font-size-section-title;\n';
  componentMixins += '  font-weight: $font-weight-semibold;\n';
  componentMixins += '  line-height: $line-height-default;\n';
  componentMixins += '}\n\n';

  // Container mixins
  componentMixins += '@mixin container-page {\n';
  componentMixins += '  background-color: $color-background-page-light;\n';
  componentMixins += '}\n\n';

  componentMixins += '@mixin container-card {\n';
  componentMixins += '  background-color: $color-background-card-light;\n';
  componentMixins += '  border-radius: $radius-medium;\n';
  componentMixins += '  padding: $spacing-medium;\n';
  componentMixins += '}\n\n';

  // Button mixins
  componentMixins += '@mixin button-primary {\n';
  componentMixins += '  background-color: $color-background-button-primary-light-base;\n';
  componentMixins += '  border-radius: $radius-medium;\n';
  componentMixins += '  padding: $spacing-medium;\n';
  componentMixins += '  color: $color-text-primary-light;\n';
  componentMixins += '  font-size: $font-size-body;\n';
  componentMixins += '  font-weight: $font-weight-semibold;\n';
  componentMixins += '  text-align: center;\n';
  componentMixins += '}\n\n';

  // Component styles
  let componentStyles = '// Component styles\n';

  // Text styles
  componentStyles += '.text-primary {\n';
  componentStyles += '  @include text-primary;\n';
  componentStyles += '}\n\n';

  componentStyles += '.text-secondary {\n';
  componentStyles += '  @include text-secondary;\n';
  componentStyles += '}\n\n';

  componentStyles += '.text-section-title {\n';
  componentStyles += '  @include text-section-title;\n';
  componentStyles += '}\n\n';

  // Container styles
  componentStyles += '.container-page {\n';
  componentStyles += '  @include container-page;\n';
  componentStyles += '}\n\n';

  componentStyles += '.container-card {\n';
  componentStyles += '  @include container-card;\n';
  componentStyles += '}\n\n';

  // Button styles
  componentStyles += '.button-primary {\n';
  componentStyles += '  @include button-primary;\n';
  componentStyles += '}\n\n';

  // Dark theme styles
  let darkThemeStyles = '// Dark theme styles\n';
  darkThemeStyles += '.dark {\n';
  darkThemeStyles += '  .text-primary {\n';
  darkThemeStyles += '    color: $color-text-primary-dark;\n';
  darkThemeStyles += '  }\n\n';

  darkThemeStyles += '  .text-secondary {\n';
  darkThemeStyles += '    color: $color-text-secondary-dark;\n';
  darkThemeStyles += '  }\n\n';

  darkThemeStyles += '  .text-section-title {\n';
  darkThemeStyles += '    color: $color-text-section-title-dark;\n';
  darkThemeStyles += '  }\n\n';

  darkThemeStyles += '  .container-page {\n';
  darkThemeStyles += '    background-color: $color-background-page-dark;\n';
  darkThemeStyles += '  }\n\n';

  darkThemeStyles += '  .container-card {\n';
  darkThemeStyles += '    background-color: $color-background-card-dark;\n';
  darkThemeStyles += '  }\n\n';

  darkThemeStyles += '  .button-primary {\n';
  darkThemeStyles += '    background-color: $color-background-button-primary-dark-base;\n';
  darkThemeStyles += '    color: $color-text-primary-dark;\n';
  darkThemeStyles += '  }\n';
  darkThemeStyles += '}\n';

  // Combine all sections
  const sassStylesheet = `/**
 * Generated SASS Stylesheet
 * Auto-generated by Style Dictionary
 */

${lightThemeVars}
${darkThemeVars}
${componentMixins}
${componentStyles}
${darkThemeStyles}`;

  // Write the SASS stylesheet
  fs.writeFileSync(path.join(webDistDir, 'styled-sass-theme.scss'), sassStylesheet);
  console.log('SASS stylesheet generated successfully!');
}

/**
 * Generates a pure CSS stylesheet
 */
function generateCssStylesheet(webDistDir, themeData) {
  const { colors, spacing, borderRadius, fontSize, fontWeight, lineHeight, boxShadow } = themeData;

  // Create CSS variables for light theme
  let lightThemeVars = ':root {\n';
  // Add color variables
  Object.entries(colors).forEach(([key, value]) => {
    if (key.includes('light') || !key.includes('dark')) {
      lightThemeVars += `  --color-${key.replace(/\./g, '-')}: ${value};\n`;
    }
  });
  // Add spacing variables
  Object.entries(spacing || {}).forEach(([key, value]) => {
    lightThemeVars += `  --spacing-${key.replace(/\./g, '-')}: ${value};\n`;
  });
  // Add border radius variables
  Object.entries(borderRadius || {}).forEach(([key, value]) => {
    lightThemeVars += `  --radius-${key.replace(/\./g, '-')}: ${value};\n`;
  });
  // Add font size variables
  Object.entries(fontSize || {}).forEach(([key, value]) => {
    lightThemeVars += `  --font-size-${key.replace(/\./g, '-')}: ${value};\n`;
  });
  // Add font weight variables
  Object.entries(fontWeight || {}).forEach(([key, value]) => {
    lightThemeVars += `  --font-weight-${key.replace(/\./g, '-')}: ${value};\n`;
  });
  // Add line height variables
  Object.entries(lineHeight || {}).forEach(([key, value]) => {
    lightThemeVars += `  --line-height-${key.replace(/\./g, '-')}: ${value};\n`;
  });
  // Add box shadow variables
  Object.entries(boxShadow || {}).forEach(([key, value]) => {
    lightThemeVars += `  --shadow-${key.replace(/\./g, '-')}: ${value};\n`;
  });
  lightThemeVars += '}\n\n';

  // Create CSS variables for dark theme
  let darkThemeVars = '.dark {\n';
  // Add color variables for dark theme
  Object.entries(colors).forEach(([key, value]) => {
    if (key.includes('dark')) {
      darkThemeVars += `  --color-${key.replace(/\./g, '-')}: ${value};\n`;
    }
  });
  darkThemeVars += '}\n\n';

  // Create component styles
  let componentStyles = '';

  // Text styles
  componentStyles += '/* Text styles */\n';
  componentStyles += '.text-primary {\n';
  componentStyles += '  color: var(--color-text-primary-light);\n';
  componentStyles += '  font-size: var(--font-size-body);\n';
  componentStyles += '  font-weight: var(--font-weight-regular);\n';
  componentStyles += '  line-height: var(--line-height-default);\n';
  componentStyles += '}\n\n';

  componentStyles += '.text-secondary {\n';
  componentStyles += '  color: var(--color-text-secondary-light);\n';
  componentStyles += '  font-size: var(--font-size-body);\n';
  componentStyles += '  font-weight: var(--font-weight-regular);\n';
  componentStyles += '  line-height: var(--line-height-default);\n';
  componentStyles += '}\n\n';

  componentStyles += '.text-section-title {\n';
  componentStyles += '  color: var(--color-text-section-title-light);\n';
  componentStyles += '  font-size: var(--font-size-section-title);\n';
  componentStyles += '  font-weight: var(--font-weight-semibold);\n';
  componentStyles += '  line-height: var(--line-height-default);\n';
  componentStyles += '}\n\n';

  componentStyles += '.text-name {\n';
  componentStyles += '  color: var(--color-text-name-light);\n';
  componentStyles += '  font-size: var(--font-size-name);\n';
  componentStyles += '  font-weight: var(--font-weight-bold);\n';
  componentStyles += '  line-height: var(--line-height-default);\n';
  componentStyles += '}\n\n';

  componentStyles += '.text-body {\n';
  componentStyles += '  color: var(--color-text-body-light);\n';
  componentStyles += '  font-size: var(--font-size-body);\n';
  componentStyles += '  font-weight: var(--font-weight-regular);\n';
  componentStyles += '  line-height: var(--line-height-default);\n';
  componentStyles += '}\n\n';

  // Container styles
  componentStyles += '/* Container styles */\n';
  componentStyles += '.container-page {\n';
  componentStyles += '  background-color: var(--color-background-page-light);\n';
  componentStyles += '}\n\n';

  componentStyles += '.container-card {\n';
  componentStyles += '  background-color: var(--color-background-card-light);\n';
  componentStyles += '  border-radius: var(--radius-medium);\n';
  componentStyles += '  padding: var(--spacing-medium);\n';
  componentStyles += '}\n\n';

  // Button styles
  componentStyles += '/* Button styles */\n';
  componentStyles += '.button-primary {\n';
  componentStyles += '  background-color: var(--color-background-button-primary-light-base);\n';
  componentStyles += '  border-radius: var(--radius-medium);\n';
  componentStyles += '  padding: var(--spacing-medium);\n';
  componentStyles += '  color: var(--color-text-primary-light);\n';
  componentStyles += '  font-size: var(--font-size-body);\n';
  componentStyles += '  font-weight: var(--font-weight-semibold);\n';
  componentStyles += '  text-align: center;\n';
  componentStyles += '}\n\n';

  componentStyles += '.button-secondary {\n';
  componentStyles += '  background-color: var(--color-background-button-secondary-light-base);\n';
  componentStyles += '  border-radius: var(--radius-medium);\n';
  componentStyles += '  padding: var(--spacing-medium);\n';
  componentStyles += '  color: var(--color-text-primary-light);\n';
  componentStyles += '  font-size: var(--font-size-body);\n';
  componentStyles += '  font-weight: var(--font-weight-semibold);\n';
  componentStyles += '  text-align: center;\n';
  componentStyles += '}\n\n';

  // Tag styles
  componentStyles += '/* Tag styles */\n';
  componentStyles += '.tag {\n';
  componentStyles += '  background-color: var(--color-background-tag-light);\n';
  componentStyles += '  border-radius: var(--radius-small);\n';
  componentStyles += '  padding: var(--spacing-small);\n';
  componentStyles += '  color: var(--color-text-tag-light);\n';
  componentStyles += '  font-size: var(--font-size-tag);\n';
  componentStyles += '  font-weight: var(--font-weight-medium);\n';
  componentStyles += '}\n\n';

  // Border styles
  componentStyles += '/* Border styles */\n';
  componentStyles += '.border-default {\n';
  componentStyles += '  border-color: var(--color-border-default-light);\n';
  componentStyles += '  border-width: 1px;\n';
  componentStyles += '  border-style: solid;\n';
  componentStyles += '}\n\n';

  componentStyles += '.border-active {\n';
  componentStyles += '  border-color: var(--color-border-active-light);\n';
  componentStyles += '  border-width: 2px;\n';
  componentStyles += '  border-style: solid;\n';
  componentStyles += '}\n\n';

  componentStyles += '.border-dashed {\n';
  componentStyles += '  border-color: var(--color-border-dashed-light);\n';
  componentStyles += '  border-width: 1px;\n';
  componentStyles += '  border-style: dashed;\n';
  componentStyles += '}\n\n';

  // Dark theme overrides
  componentStyles += '/* Dark theme overrides */\n';
  componentStyles += '.dark .text-primary { color: var(--color-text-primary-dark); }\n';
  componentStyles += '.dark .text-secondary { color: var(--color-text-secondary-dark); }\n';
  componentStyles += '.dark .text-section-title { color: var(--color-text-section-title-dark); }\n';
  componentStyles += '.dark .text-name { color: var(--color-text-name-dark); }\n';
  componentStyles += '.dark .text-body { color: var(--color-text-body-dark); }\n';
  componentStyles += '.dark .container-page { background-color: var(--color-background-page-dark); }\n';
  componentStyles += '.dark .container-card { background-color: var(--color-background-card-dark); }\n';
  componentStyles +=
    '.dark .button-primary { background-color: var(--color-background-button-primary-dark-base); color: var(--color-text-primary-dark); }\n';
  componentStyles +=
    '.dark .button-secondary { background-color: var(--color-background-button-secondary-dark-base); color: var(--color-text-primary-dark); }\n';
  componentStyles +=
    '.dark .tag { background-color: var(--color-background-tag-dark); color: var(--color-text-tag-dark); }\n';
  componentStyles += '.dark .border-default { border-color: var(--color-border-default-dark); }\n';
  componentStyles += '.dark .border-active { border-color: var(--color-border-active-dark); }\n';
  componentStyles += '.dark .border-dashed { border-color: var(--color-border-dashed-dark); }\n';

  // Combine all sections
  const cssStylesheet = `/**
 * Generated CSS Stylesheet
 * Auto-generated by Style Dictionary
 */

${lightThemeVars}
${darkThemeVars}
${componentStyles}`;

  // Write the CSS stylesheet
  fs.writeFileSync(path.join(webDistDir, 'styled-theme.css'), cssStylesheet);
  console.log('CSS stylesheet generated successfully!');
}
