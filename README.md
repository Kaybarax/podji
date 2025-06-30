# React Next.js and Expo React Native Monorepo

## Overview

This repository contains a structured monorepo setup for managing two applications:

- **Next.js Web App**: A Next.js web application with TypeScript, ESLint, and Tailwind CSS.
- **Expo Mobile App**: A React Native mobile application managed through Expo.

The repository also includes shared packages for configurations, schemas, stores, and services.

## Project Structure

```plaintext
monorepo/
├── apps/
│   ├── nextjs-web-app    # Next.js web application
│   └── expo-mobile-app   # Expo mobile application
├── packages/
│   ├── @configs          # Shared configuration constants
│   ├── @mobile-ui        # Mobile UI components library
│   ├── @schemas          # Zod schemas for data validation
│   ├── @services         # Common utilities and services
│   ├── @stores           # State management stores
│   ├── @web-ui           # Web UI components library
│   ├── mobile-ui-dev     # Mobile UI components development environment
│   └── web-ui-dev        # Web UI components development environment
├── scripts/
│   └── cleanup.js        # Cleanup script for the monorepo
├── .husky/               # Git hooks for pre-commit and pre-push checks
├── babel.config.js       # Babel configuration
├── backstop.config.js    # BackstopJS configuration for visual regression testing of UI components
├── backstop.json         # BackstopJS test scenarios
├── jest.config.js        # Jest testing configuration
├── tsconfig.json         # TypeScript configuration
├── .eslintrc.js          # ESLint configuration
├── .prettierrc           # Prettier configuration
├── turbo.json            # Turborepo configuration
├── package.json          # Root package configuration
└── yarn.lock             # Yarn dependency lock file
```

## Core Technologies

- **Monorepo Management**: Yarn Workspaces and Turborepo
- **Web Application**: Next.js with TypeScript and Tailwind CSS
- **Mobile Application**: Expo with React Native
- **UI Development**: Storybook for component development and testing
- **Visual Testing**: BackstopJS for visual regression testing
- **Design System**: Kaleidoscope design system for consistent UI/UX
- **Testing**: Jest with TypeScript support
- **Code Quality**: ESLint, Prettier, TypeScript
- **Development Workflow**: Husky for pre-commit hooks, lint-staged for staged file linting

## Design System & UI

### Color Palette (Fresh Grapefruit)

- Cyan: `#ACEEF3`
- Coral: `#FF7077`
- Rose Quartz: `#FFE9E4`
- Orange: `#FFB067`

## Shared Packages

- **`@configs`**: Centralized configuration constants
- **`@mobile-ui`**: Mobile UI components
- **`@schemas`**: Type definitions using TypeScript
- **`@services`**: Common utilities and services
- **`@stores`**: State management functionality
- **`@web-ui`**: Web UI components
- **`mobile-ui-dev`**: Mobile UI development environment with Storybook
- **`web-ui-dev`**: Web UI development environment with Storybook

## Web Application

The web application is built with Next.js and includes:

- TypeScript for type safety
- Tailwind CSS for styling
- ESLint for code quality
- Next.js app directory structure

## Mobile Application

The mobile application is built with Expo and includes:

- TypeScript for type safety
- React Native components
- Expo managed workflow
- Directory structure for components, hooks, utils, and tests

## Development & Testing

- **Unit Testing**: Jest for unit testing
- **Visual Regression Testing**: BackstopJS for UI component testing
- **Code Quality**: ESLint and Prettier for consistent code style
- **Type Safety**: TypeScript for static type checking
- **Pre-commit Hooks**: Husky and lint-staged for code quality enforcement

### Development Approaches

This project follows two complementary development methodologies:

#### Test-Driven Development (TDD)

The development process follows TDD principles:

- **Write Tests First**: Tests are written before implementing features
- **Red-Green-Refactor**: First create failing tests (red), then implement code to make tests pass (green), and finally refactor for optimization
- **Continuous Validation**: Tests run automatically on each commit via CI/CD pipelines
- **Comprehensive Coverage**: Unit, integration, and end-to-end tests ensure complete functionality

#### Component-Driven Development (CDD)

UI components are built using CDD principles:

- **Bottom-Up Development**: Components are developed in isolation before integration
- **Storybook-First**: UI components are first created and tested in Storybook
- **Visual Documentation**: Each component has documented states and variations
- **Incremental Integration**: Components are gradually integrated into the application

### UI Component Development with Storybook

This project uses Storybook for developing and testing UI components in isolation. Storybook provides a development environment for UI components, allowing developers to:

- Build components in isolation without needing to run the entire application
- Document component variants and use cases
- Test components interactively
- Share component libraries with the team

#### Web UI Components

The web UI components are developed using Storybook in the `web-ui-dev` package. This environment is configured specifically for web components with:

- React-specific addons
- Tailwind CSS integration
- Responsive viewport testing
- Accessibility testing tools

To start the web Storybook development environment:

```bash
yarn storybook:web
```

This will launch a web server (typically at http://localhost:6006) where you can browse, test, and develop web UI components.

#### Mobile UI Components

The mobile UI components are developed using Storybook in the `mobile-ui-dev` package. This environment is configured specifically for React Native components with:

- React Native-specific addons
- Device simulation
- Gesture testing capabilities

To start the mobile Storybook development environment:

```bash
yarn storybook:mobile
```

This will launch a development server for mobile components, allowing you to develop and test React Native components in a browser environment before deploying to actual devices.

### Visual Regression Testing

This project uses BackstopJS for visual regression testing of UI components developed in Storybook. BackstopJS captures screenshots of UI components and compares them against reference images to detect visual changes.

The workflow integrates Storybook with BackstopJS:

1. Components are developed and documented in Storybook
2. BackstopJS captures reference screenshots of components in various states
3. When changes are made, BackstopJS compares new screenshots against references
4. Visual differences are highlighted for review

The configuration is defined in:

- `backstop.config.js`: Main configuration file
- `backstop.json`: Test scenarios for both web and mobile components

To run visual regression tests:

1. Generate reference images: `yarn backstop:reference`
2. Run tests against reference images: `yarn backstop:test`

This ensures UI components maintain visual consistency across changes and prevents unintended visual regressions during development.

## Commands & Scripts

### Core Commands

- `yarn install`: Install dependencies
- `yarn prepare`: Set up Husky hooks
- `yarn format`: Run Prettier on all files
- `yarn clean`: Clean build artifacts using the cleanup script
- `yarn test`: Run Jest tests
- `yarn turbo:test`: Run tests using Turborepo

### Build Commands

- `yarn build`: Build all packages in the correct order
- `yarn turbo:build`: Run build using Turborepo
- `yarn build:configs:tokens`: Build configuration tokens
- `yarn turbo:configs:tokens`: Build configuration tokens using Turborepo
- `yarn build:schemas`: Build schemas
- `yarn turbo:schemas`: Build schemas using Turborepo
- `yarn build:services`: Build shared services
- `yarn turbo:services`: Build shared services using Turborepo
- `yarn build:stores`: Build stores
- `yarn turbo:stores`: Build stores using Turborepo
- `yarn build:mobile-ui`: Build mobile UI components
- `yarn turbo:mobile-ui`: Build mobile UI components using Turborepo
- `yarn build:web-ui`: Build web UI components
- `yarn turbo:web-ui`: Build web UI components using Turborepo
- `yarn build:web`: Build web application
- `yarn turbo:build:web`: Build web application using Turborepo

### Development Commands

- `yarn dev:web`: Start web application development environment
- `yarn turbo:dev:web`: Start web application development environment using Turborepo
- `yarn dev:mobile`: Start mobile application development environment
- `yarn turbo:dev:mobile`: Start mobile application development environment using Turborepo
- `yarn dev:web-ui`: Start web UI development environment
- `yarn turbo:dev:web-ui`: Start web UI development environment using Turborepo
- `yarn dev:mobile-ui`: Start mobile UI development environment

### Storybook Commands

- `yarn storybook:web`: Start web Storybook
- `yarn storybook:mobile`: Start mobile Storybook

### Visual Regression Testing

- `yarn backstop:reference`: Create reference images for visual regression testing
- `yarn backstop:test`: Run visual regression tests

For additional scripts, review the specific `package.json` files in each workspace.

## Monorepo Architecture

This project uses Turborepo and Yarn Workspaces to manage the monorepo architecture. This setup provides several benefits:

1. **Shared Code**: Common code is extracted into shared packages to avoid duplication
2. **Dependency Management**: Yarn Workspaces manages dependencies across all packages
3. **Build Optimization**: Turborepo optimizes the build process with caching and parallel execution
4. **Development Experience**: Consistent development experience across all packages

The architecture allows for:

- Sharing UI components between web and mobile applications
- Centralizing configuration and schemas
- Reusing services and utilities
- Maintaining a single source of truth for state management

This approach ensures consistency across platforms while allowing for platform-specific implementations when needed.
