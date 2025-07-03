# Pocket DJ Design Tokens

## Overview

This package contains the design tokens for the Pocket DJ (PodJi) application, providing a consistent design system across web and mobile platforms.

## Design Token Structure

All design tokens are defined in a single `tokens.json` file, which is processed by Style Dictionary to generate platform-specific token formats.

## Usage

### Building Tokens

To build all tokens for both web and mobile platforms:

```bash
yarn build
```

### Importing Tokens

#### Web (React)

```javascript
import { theme } from '@podji/design-tokens/web';
// Or for Tailwind CSS
import tailwindTokens from '@podji/design-tokens/web';
```

#### Mobile (React Native)

```javascript
import { lightTheme, darkTheme } from '@podji/design-tokens/mobile';
```

## Token Categories

The design token system includes the following categories:

- **Color**: Base palette, text colors, background colors, border colors
- **Spacing**: Consistent spacing values
- **Typography**: Font families, sizes, weights, and line heights
- **Border Radius**: Corner radius values
- **Shadow**: Elevation and shadow styles
- **Animation**: Duration and easing functions
- **Breakpoint**: Responsive breakpoints
- **Layout**: Layout-specific dimensions
- **Size**: Standardized element sizes

## Development

To modify the design tokens, simply edit/replace the `tokens/okens.json` file and rebuild design-tokens package.
