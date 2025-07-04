/**
 * Style Dictionary Configuration for Mobile Platform (v5 API)
 *
 * This file configures Style Dictionary to transform design tokens from JSON
 * into mobile-specific formats (JS/TS theme modules).
 */

export default {
  source: ['tokens/**/*.json'],
  format: {
    // Custom format for React Native StyleSheet
    'react-native/stylesheet': function ({ dictionary, file, options }) {
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

      // Create component styles for light theme
      const lightThemeStyles = createComponentStyles(lightColors, spacing, borderRadius, typography, shadows);

      // Create component styles for dark theme
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
          destination: 'styled-theme.ts',
          format: 'javascript/es6',
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

              // Create component styles for light theme
              const lightThemeStyles = createComponentStyles(lightColors, spacing, borderRadius, typography, shadows);

              // Create component styles for dark theme
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
    // JavaScript/TypeScript theme module
    js: {
      transformGroup: 'js',
      buildPath: 'dist/mobile/',
      files: [
        {
          destination: 'style-values.ts',
          format: 'javascript/es6',
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

              // Create component styles for light theme
              const lightThemeStyles = createComponentStyles(lightColors, spacing, borderRadius, typography, shadows);

              // Create component styles for dark theme
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
    // TypeScript declarations
    ts: {
      transformGroup: 'js',
      buildPath: 'dist/mobile/',
      files: [
        {
          destination: 'styled-theme.d.ts',
          format: 'typescript/module-declarations',
          options: {
            outputReferences: true,
            formatter: function (dictionary) {
              return `/**
 * Generated TypeScript Declarations
 * Auto-generated by Style Dictionary
 */

export declare const theme: ${JSON.stringify(dictionary.tokens, null, 2)};
`;
            },
          },
        },
      ],
    },
  },
};
