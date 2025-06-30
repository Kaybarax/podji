# @shared/web-ui

A React component library for the web application.

## Installation

```bash
npm install @shared/web-ui
# or
yarn add @shared/web-ui
# or
pnpm add @shared/web-ui
```

## Usage

Import components from the library:

```jsx
import { App } from '@shared/web-ui';

function MyComponent() {
  return (
    <div>
      <App />
    </div>
  );
}
```

## Available Components

- `App`: The main application component

## Development

### Building the library

```bash
# Install dependencies
npm install

# Build the library
npm run build
```

The build output will be in the `dist` directory, which can be published as an npm package.

### Running tests

```bash
npm test
```

### Running Storybook

```bash
npm run storybook
```
