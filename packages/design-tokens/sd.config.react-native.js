/**
 * Style Dictionary Configuration for React Native StyleSheets
 *
 * This file configures Style Dictionary to transform design tokens from JSON
 * into React Native StyleSheets for both light and dark themes.
 */

export default {
  source: ['designTokens.json'],
  parsers: [
    {
      pattern: /\.json$/,
      parse: ({ contents }) => {
        // Parse the JSON content
        const tokens = JSON.parse(contents);

        // Process the tokens to handle references correctly
        const processTokens = obj => {
          for (const key in obj) {
            if (typeof obj[key] === 'object' && obj[key] !== null) {
              if (
                obj[key].value &&
                typeof obj[key].value === 'string' &&
                obj[key].value.includes('{') &&
                obj[key].value.includes('}')
              ) {
                // Handle references in the format {color.primitive.cyan.value}
                obj[key].value = obj[key].value.replace(/\{([^}]+)\.value\}/g, '{$1}');

                // Handle references with hyphens in the path
                obj[key].value = obj[key].value.replace(/\{([^}]+)-([^}]+)\.([^}]+)\}/g, '{$1_$2.$3}');
                obj[key].value = obj[key].value.replace(/\{([^}]+)\.([^}]+)-([^}]+)\.([^}]+)\}/g, '{$1.$2_$3.$4}');
                obj[key].value = obj[key].value.replace(/\{([^}]+)\.([^}]+)\.([^}]+)-([^}]+)\}/g, '{$1.$2.$3_$4}');
              }
              processTokens(obj[key]);
            }
          }
          return obj;
        };

        return processTokens(tokens);
      },
    },
  ],
  transform: {
    // Add transforms for token references
    'attribute/cti': {
      type: 'attribute',
      transformer: token => {
        const path = token.path.join('/');
        return {
          category: path.split('/')[0],
          type: path.split('/')[1],
          item: path.split('/')[2],
        };
      },
    },
    'name/cti/pascal': {
      type: 'name',
      transformer: (token, options) => {
        return token.path.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('');
      },
    },
    'size/px': {
      type: 'value',
      matcher: token => {
        return token.unit === 'px' || (token.value && token.value.toString().includes('px'));
      },
      transformer: token => {
        return token.value;
      },
    },
    'size/percent': {
      type: 'value',
      matcher: token => {
        return token.value && token.value.toString().includes('%');
      },
      transformer: token => {
        return token.value;
      },
    },
  },
  platforms: {
    // React Native StyleSheet configuration
    reactNative: {
      transformGroup: 'js',
      buildPath: 'dist/mobile/',
      files: [
        {
          destination: 'react-native-styles.js',
          format: 'javascript/module',
          filter: token =>
            token.type === 'color' ||
            token.path[0] === 'color' ||
            token.path[0] === 'spacing' ||
            token.path[0] === 'borderRadius' ||
            (token.path[0] === 'typography' &&
              (token.path[1] === 'fontSize' || token.path[1] === 'fontWeight' || token.path[1] === 'lineHeight')) ||
            token.path[0] === 'shadow',
          options: {
            outputReferences: true,
            formatter: function (dictionary) {
              // Extract light theme colors
              const lightColors = {};
              dictionary.allTokens
                .filter(
                  token =>
                    token.path[0] === 'color' &&
                    (token.path.includes('light') ||
                      (token.path[1] === 'ref' && token.path[2] === 'light') ||
                      (token.path[1] === 'ref' && token.path[2] === 'neutral')),
                )
                .forEach(token => {
                  const path = token.path.join('_');
                  lightColors[path] = token.value;
                });

              // Extract dark theme colors
              const darkColors = {};
              dictionary.allTokens
                .filter(
                  token =>
                    token.path[0] === 'color' &&
                    (token.path.includes('dark') ||
                      (token.path[1] === 'ref' && token.path[2] === 'dark') ||
                      (token.path[1] === 'ref' && token.path[2] === 'neutral')),
                )
                .forEach(token => {
                  const path = token.path.join('_');
                  darkColors[path] = token.value;
                });

              // Extract spacing tokens
              const spacing = {};
              dictionary.allTokens
                .filter(token => token.path[0] === 'spacing')
                .forEach(token => {
                  const name = token.path.join('_');
                  spacing[name] = token.value;
                });

              // Extract border radius tokens
              const borderRadius = {};
              dictionary.allTokens
                .filter(token => token.path[0] === 'borderRadius')
                .forEach(token => {
                  const name = token.path.join('_');
                  borderRadius[name] = token.value;
                });

              // Extract typography tokens
              const typography = {};
              dictionary.allTokens
                .filter(token => token.path[0] === 'typography')
                .forEach(token => {
                  const name = token.path.join('_');
                  typography[name] = token.value;
                });

              // Extract shadow tokens
              const shadows = {};
              dictionary.allTokens
                .filter(token => token.path[0] === 'shadow')
                .forEach(token => {
                  const name = token.path.join('_');
                  shadows[name] = token.value;
                });

              // Create component styles for the light theme
              const lightThemeStyles = createComponentStyles(lightColors, spacing, borderRadius, typography, shadows);

              // Create component styles for the dark theme
              const darkThemeStyles = createComponentStyles(darkColors, spacing, borderRadius, typography, shadows);

              // Helper function to create component styles
              function createComponentStyles(colors, spacing, borderRadius, typography, shadows) {
                return {
                  // Text styles
                  text: {
                    primary: {
                      color: colors['color_text_primary_light'] || colors['color_text_primary_dark'],
                      fontFamily: typography['typography_fontFamily_system'],
                      fontSize: typography['typography_fontSize_body'],
                      fontWeight: typography['typography_fontWeight_regular'],
                      lineHeight: typography['typography_lineHeight_default'],
                    },
                    secondary: {
                      color: colors['color_text_secondary_light'] || colors['color_text_secondary_dark'],
                      fontFamily: typography['typography_fontFamily_system'],
                      fontSize: typography['typography_fontSize_body'],
                      fontWeight: typography['typography_fontWeight_regular'],
                      lineHeight: typography['typography_lineHeight_default'],
                    },
                    sectionTitle: {
                      color: colors['color_text_sectionTitle_light'] || colors['color_text_sectionTitle_dark'],
                      fontFamily: typography['typography_fontFamily_system'],
                      fontSize: typography['typography_fontSize_sectionTitle'],
                      fontWeight: typography['typography_fontWeight_semibold'],
                      lineHeight: typography['typography_lineHeight_default'],
                    },
                    name: {
                      color: colors['color_text_name_light'] || colors['color_text_name_dark'],
                      fontFamily: typography['typography_fontFamily_system'],
                      fontSize: typography['typography_fontSize_name'],
                      fontWeight: typography['typography_fontWeight_bold'],
                      lineHeight: typography['typography_lineHeight_default'],
                    },
                    body: {
                      color: colors['color_text_body_light'] || colors['color_text_body_dark'],
                      fontFamily: typography['typography_fontFamily_system'],
                      fontSize: typography['typography_fontSize_body'],
                      fontWeight: typography['typography_fontWeight_regular'],
                      lineHeight: typography['typography_lineHeight_default'],
                    },
                    tag: {
                      color: colors['color_text_tag_light'] || colors['color_text_tag_dark'],
                      fontFamily: typography['typography_fontFamily_system'],
                      fontSize: typography['typography_fontSize_tag'],
                      fontWeight: typography['typography_fontWeight_medium'],
                      lineHeight: typography['typography_lineHeight_default'],
                    },
                    navigation: {
                      color: colors['color_text_navigation_light'] || colors['color_text_navigation_dark'],
                      fontFamily: typography['typography_fontFamily_system'],
                      fontSize: typography['typography_fontSize_body'],
                      fontWeight: typography['typography_fontWeight_medium'],
                      lineHeight: typography['typography_lineHeight_default'],
                    },
                    activeNavigation: {
                      color: colors['color_text_activeNavigation_light'] || colors['color_text_activeNavigation_dark'],
                      fontFamily: typography['typography_fontFamily_system'],
                      fontSize: typography['typography_fontSize_body'],
                      fontWeight: typography['typography_fontWeight_semibold'],
                      lineHeight: typography['typography_lineHeight_default'],
                    },
                  },
                  // Container styles
                  container: {
                    page: {
                      backgroundColor: colors['color_background_page_light'] || colors['color_background_page_dark'],
                      flex: 1,
                    },
                    card: {
                      backgroundColor: colors['color_background_card_light'] || colors['color_background_card_dark'],
                      borderRadius: borderRadius['borderRadius_medium'],
                      padding: spacing['spacing_medium'],
                    },
                  },
                  // Button styles
                  button: {
                    primary: {
                      backgroundColor:
                        colors['color_background_button_primary_light_base'] ||
                        colors['color_background_button_primary_dark_base'],
                      borderRadius: borderRadius['borderRadius_medium'],
                      padding: spacing['spacing_medium'],
                    },
                    primaryText: {
                      color: colors['color_text_primary_light'] || colors['color_text_primary_dark'],
                      fontFamily: typography['typography_fontFamily_system'],
                      fontSize: typography['typography_fontSize_body'],
                      fontWeight: typography['typography_fontWeight_semibold'],
                      textAlign: 'center',
                    },
                    secondary: {
                      backgroundColor:
                        colors['color_background_button_secondary_light_base'] ||
                        colors['color_background_button_secondary_dark_base'],
                      borderRadius: borderRadius['borderRadius_medium'],
                      padding: spacing['spacing_medium'],
                    },
                    secondaryText: {
                      color: colors['color_text_primary_light'] || colors['color_text_primary_dark'],
                      fontFamily: typography['typography_fontFamily_system'],
                      fontSize: typography['typography_fontSize_body'],
                      fontWeight: typography['typography_fontWeight_semibold'],
                      textAlign: 'center',
                    },
                    wink: {
                      backgroundColor:
                        colors['color_background_button_wink_light'] || colors['color_background_button_wink_dark'],
                      borderRadius: borderRadius['borderRadius_medium'],
                      padding: spacing['spacing_medium'],
                    },
                    winkText: {
                      color: colors['color_text_primary_light'] || colors['color_text_primary_dark'],
                      fontFamily: typography['typography_fontFamily_system'],
                      fontSize: typography['typography_fontSize_body'],
                      fontWeight: typography['typography_fontWeight_semibold'],
                      textAlign: 'center',
                    },
                  },
                  // Tag styles
                  tag: {
                    container: {
                      backgroundColor: colors['color_background_tag_light'] || colors['color_background_tag_dark'],
                      borderRadius: borderRadius['borderRadius_small'],
                      padding: spacing['spacing_small'],
                    },
                  },
                  // Border styles
                  border: {
                    default: {
                      borderColor: colors['color_border_default_light'] || colors['color_border_default_dark'],
                      borderWidth: 1,
                    },
                    active: {
                      borderColor: colors['color_border_active_light'] || colors['color_border_active_dark'],
                      borderWidth: 2,
                    },
                    dashed: {
                      borderColor: colors['color_border_dashed_light'] || colors['color_border_dashed_dark'],
                      borderWidth: 1,
                      borderStyle: 'dashed',
                    },
                  },
                };
              }

              return `/**
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
            },
          },
        },
      ],
    },
  },
};
