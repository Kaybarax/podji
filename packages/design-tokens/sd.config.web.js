/**
 * Style Dictionary Configuration for Web Platform (v5 API)
 *
 * This file configures Style Dictionary to transform design tokens from JSON
 * into web-specific formats (Tailwind CSS, JS/TS theme modules).
 */

export default {
  source: ['tokens.json'],
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
    // Tailwind CSS configuration
    tailwind: {
      transformGroup: 'js',
      buildPath: 'dist/web/',
      files: [
        {
          destination: 'tailwind-tokens.js',
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
              const colors = {};
              const spacing = {};
              const borderRadius = {};
              const fontSize = {};
              const fontWeight = {};
              const lineHeight = {};
              const boxShadow = {};

              // Process color tokens
              dictionary.allTokens
                .filter(token => token.type === 'color' || token.path[0] === 'color')
                .forEach(token => {
                  const path = token.path.join('.');
                  colors[path] = token.value;

                  // Add simplified color names for reference colors
                  if (token.path[0] === 'color' && token.path[1] === 'ref' && token.path[2] === 'light') {
                    const colorName = token.path[3];
                    colors[colorName] = token.value;
                  }
                });

              // Process spacing tokens
              dictionary.allTokens
                .filter(token => token.path[0] === 'spacing')
                .forEach(token => {
                  const name = token.path.slice(1).join('.');
                  spacing[name] = token.value;
                });

              // Process border radius tokens
              dictionary.allTokens
                .filter(token => token.path[0] === 'borderRadius')
                .forEach(token => {
                  const name = token.path.slice(1).join('.');
                  borderRadius[name] = token.value;
                });

              // Process typography tokens
              dictionary.allTokens
                .filter(token => token.path[0] === 'typography' && token.path[1] === 'fontSize')
                .forEach(token => {
                  const name = token.path.slice(2).join('.');
                  fontSize[name] = token.value;
                });

              dictionary.allTokens
                .filter(token => token.path[0] === 'typography' && token.path[1] === 'fontWeight')
                .forEach(token => {
                  const name = token.path.slice(2).join('.');
                  fontWeight[name] = token.value;
                });

              dictionary.allTokens
                .filter(token => token.path[0] === 'typography' && token.path[1] === 'lineHeight')
                .forEach(token => {
                  const name = token.path.slice(2).join('.');
                  lineHeight[name] = token.value;
                });

              // Process shadow tokens
              dictionary.allTokens
                .filter(token => token.path[0] === 'shadow')
                .forEach(token => {
                  const name = token.path.slice(1).join('.');
                  boxShadow[name] = token.value;
                });

              return `export default {
  theme: {
    extend: {
      colors: ${JSON.stringify(colors, null, 2)},
      spacing: ${JSON.stringify(spacing, null, 2)},
      borderRadius: ${JSON.stringify(borderRadius, null, 2)},
      fontSize: ${JSON.stringify(fontSize, null, 2)},
      fontWeight: ${JSON.stringify(fontWeight, null, 2)},
      lineHeight: ${JSON.stringify(lineHeight, null, 2)},
      boxShadow: ${JSON.stringify(boxShadow, null, 2)},
    }
  }
};`;
            },
          },
        },
      ],
    },
    // JavaScript/TypeScript theme module
    js: {
      transformGroup: 'js',
      buildPath: 'dist/web/',
      files: [
        {
          destination: 'theme.js',
          format: 'javascript/module',
          options: {
            outputReferences: true,
            formatter: function (dictionary) {
              return `/**
 * Generated Web Theme Module
 * Auto-generated by Style Dictionary
 */

export const theme = ${JSON.stringify(dictionary.tokens, null, 2)};
`;
            },
          },
        },
      ],
    },
    // TypeScript declarations
    ts: {
      transformGroup: 'js',
      buildPath: 'dist/web/',
      files: [
        {
          destination: 'theme.d.ts',
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
