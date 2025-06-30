# Pocket DJ (PodJi) - Digital DJing Made Accessible

## Overview

Pocket DJ (PodJi) is a cross-platform application that makes digital DJing accessible to a wider audience by facilitating real-time mixing of music sourced from SoundCloud, and potentially other platforms in future iterations. This repository contains a structured monorepo setup for managing two applications:

- **Web Platform**: A Next.js web application with TypeScript, Tailwind CSS, and Web Audio API for low-latency audio processing.
- **Mobile App**: A React Native mobile application managed through Expo, with native audio capabilities via Superpowered SDK.

The repository also includes shared packages for configurations, schemas, stores, and services, enabling a consistent experience across platforms.

## Feature Overview

### Continuous Mix Builder & Playback Engine

- **Two-Track Mix Workflow**: Simultaneous playback of two tracks for seamless blending
- **Mix Construction**: Set transition points, create mix metadata, and optionally record audio
- **Playback of Completed Mixes**: Metadata-driven or audio file playback
- **Waveform & Timeline Visualization**: Interactive timeline for navigation and editing
- **Tempo & Pitch Control**: Global BPM adjustment with harmonic pitch shifting
- **Effects & Enhancements**: Apply filters, EQ, reverb, or echo at transition points
- **AI-Assisted Suggestions**: Genkit-powered analysis for optimal transitions

### SoundCloud Integration & Library

- **Authentication & OAuth**: SoundCloud login for full-length streaming
- **Search & Metadata**: Query tracks by title, artist, genre, tags
- **Streaming**: Retrieve and buffer audio streams for gapless playback

### Queue Management & Playlists

- **Live Queue**: Dynamic "Up Next" panel with drag-and-drop reordering
- **Playlists (Mixes)**: Create, save, and manage track collections
- **Library Screen**: Browse and manage saved playlists

### Mix Sharing & Social Features

- **Dynamic Links**: Share mixes via Firebase Dynamic Links
- **Social Feed**: Personalized feed of new and trending mixes
- **Following & Followers**: Connect with other DJs
- **Likes & Comments**: Engage with shared mixes
- **Chat**: One-to-one messaging with push notifications
- **User Profiles**: Customizable profiles with stats and mix collections

### Account Roles & Subscription

- **Free vs. Premium**: Tiered access to features and audio quality
- **Subscription Management**: In-app purchases with billing integration

## Project Structure

```plaintext
monorepo/
├── apps/
│   ├── podji-web         # Next.js web application for Pocket DJ
│   └── podji-mobile      # Expo mobile application for Pocket DJ
├── development/
│   ├── web-ui-dev        # React Vite + Storybook for web UI components development
│   └── mobile-ui-dev     # Expo + Storybook for mobile UI components development
├── packages/
│   ├── @podji/web-ui     # Web UI components library
│   ├── @podji/mobile-ui  # Mobile UI components library
│   ├── @podji/design-tokens # Style Dictionary for theme and style definitions
│   ├── @podji/graphql-client # Apollo Client configuration and GraphQL operations
│   ├── @podji/eslint-config # Shared ESLint configuration
│   ├── @podji/tsconfig   # Shared TypeScript configurations
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
- **Web Platform**:
  - Next.js with TypeScript and Tailwind CSS
  - Web Audio API and AudioWorklet for low-latency audio processing
  - Wavesurfer.js for waveform visualization
  - Framer Motion for animations
  - dnd-kit for drag-and-drop functionality
- **Mobile Application**:
  - Expo with React Native
  - React Native Audio API for basic controls
  - Superpowered SDK for low-latency mixing, tempo/pitch shifting, and effects
  - AVFoundation (iOS) & ExoPlayer (Android) for native playback
  - React Native Paper for component system
  - Reanimated and Gesture Handler for animations and interactions
- **State Management**: Zustand for lightweight, global UI state management
- **Data Fetching**: React Query (TanStack Query) for managing GraphQL/REST calls
- **Backend & Cloud Services**:
  - Firebase (Authentication, Firestore, Cloud Functions, Cloud Messaging)
  - Google Cloud Platform (Cloud Run, Pub/Sub)
  - GraphQL API Gateway with Apollo Server
  - SoundCloud API integration
- **AI Integration**: Google's Genkit & Gemma AI for mix suggestions and automation
- **UI Development**: Storybook for component development and testing
- **Visual Testing**: BackstopJS for visual regression testing
- **Testing**: Jest with React Testing Library, Detox for mobile E2E, Cypress for web E2E
- **Code Quality**: ESLint, Prettier, TypeScript
- **Development Workflow**: Husky for pre-commit hooks, lint-staged for staged file linting
- **CI/CD**: GitHub Actions for frontend and backend pipelines

## Design System & UI

### Color Palette (Fresh Grapefruit)

- Cyan: `#ACEEF3`
- Coral: `#FF7077`
- Rose Quartz: `#FFE9E4`
- Orange: `#FFB067`

### UI Components

The Pocket DJ application uses a comprehensive set of UI components across both web and mobile platforms:

#### Web Platform UI

The web platform includes 13 main screens:

- Landing Page / Home Feed
- Mixing Console Screen
- Track Search & Library Screen
- Playlist Management Screen
- Mix Sharing & Social Feed Screen
- User Profile Screen
- Chat & Messaging Screen
- Notifications Screen
- Settings Screen
- Subscription & Billing Screen
- AI Assistant Screen
- Analytics & Insights Screen
- Onboarding & Tutorial Screens

Common UI controls include navigation components, modals, toast notifications, input components, and date pickers.

#### Mobile Application UI

The mobile application includes the same 13 main screens, adapted for mobile:

- Home Screen (Social Feed & Discovery)
- Mixing Console Screen
- Library & Track Search Screen
- Playlist Management Screen
- Mix Sharing & Social Publishing Screen
- User Profile Screen
- Chat & Messaging Screen
- Notifications Screen
- Settings Screen
- Subscription & Billing Screen
- AI Assistant Screen
- Analytics & Insights Screen
- Onboarding & Tutorial Screens

Mobile-specific UI controls include bottom tab navigation, gesture-based interactions (swipe, long-press), and responsive animations using Reanimated.

## Shared Packages

- **`@podji/web-ui`**: Web UI components library exported from the web-ui-dev environment
- **`@podji/mobile-ui`**: Mobile UI components library exported from the mobile-ui-dev environment
- **`@podji/design-tokens`**: Style Dictionary package that parses theme and style definitions, exporting:
  - SASS variables and mixins for the web platform
  - React Native Stylesheet object and theme provider for the mobile platform
- **`@podji/graphql-client`**: Apollo Client configuration, GraphQL queries, mutations, subscriptions, and auto-generated TypeScript types
- **`@podji/eslint-config`**: Shared ESLint configuration for consistent coding standards
- **`@podji/tsconfig`**: Shared base TypeScript configurations used by all other packages

## Web Application

The Pocket DJ web application is built with Next.js and includes:

- TypeScript for type safety
- Tailwind CSS for styling
- Web Audio API and AudioWorklet for low-latency, multi-threaded audio processing
- Wavesurfer.js for waveform visualization
- Framer Motion for animations
- dnd-kit for drag-and-drop functionality
- Next.js app directory structure
- PWA support via Next.js PWA plugin

### Key Web Features

- **Dual Deck Mixing Interface**: Real-time mixing with waveform visualization
- **Audio Processing**: Low-latency audio manipulation with effects, tempo/pitch control
- **SoundCloud Integration**: Search and stream tracks from SoundCloud
- **Mix Recording & Sharing**: Save and share mixes via dynamic links
- **Social Features**: User profiles, following, likes, comments
- **AI-Assisted Mixing**: Suggestions for transitions and track selection

## Mobile Application

The Pocket DJ mobile application is built with Expo and includes:

- TypeScript for type safety
- React Native components with React Native Paper
- Superpowered SDK for low-latency audio processing
- AVFoundation (iOS) & ExoPlayer (Android) for native playback
- Reanimated and Gesture Handler for animations and interactions
- Expo managed workflow
- Directory structure for components, hooks, utils, and tests

### Key Mobile Features

- **Touch-Optimized Mixing Interface**: Gesture-based controls for mixing
- **Native Audio Performance**: Low-latency audio processing on mobile devices
- **Offline Capabilities**: Cache tracks for offline mixing
- **Push Notifications**: Real-time alerts for social interactions
- **Mobile-Specific UI**: Bottom tab navigation, swipe gestures, and responsive animations
- **Cross-Platform Consistency**: Same core features as the web version, optimized for mobile

## Development & Testing

### Testing Strategy

- **Unit Testing**: Jest with React Testing Library for component and logic testing
- **Integration Testing**: Jest with mocks for GraphQL and microservice interactions
- **E2E Testing**: Detox for mobile UI flows and Cypress for web UI flows
- **Visual Regression Testing**: BackstopJS for UI component testing
- **Code Quality**: ESLint and Prettier for consistent code style
- **Type Safety**: TypeScript for static type checking
- **Pre-commit Hooks**: Husky and lint-staged for code quality enforcement
- **Monitoring**: Cloud Logging for backend services, Sentry/Firebase Crashlytics for client-side error reporting, Firebase Analytics for usage insights

### Development Approaches

Pocket DJ follows two complementary development methodologies:

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

## Technical Architecture

### Frontend Monorepo Architecture

The Pocket DJ application uses a unified monorepo architecture managed by Turborepo and Yarn Workspaces. This approach maximizes code sharing, streamlines dependency management, and simplifies cross-platform development.

The monorepo is organized into distinct workspaces:

- **apps/**: Contains the final, user-facing applications

  - **podji-web**: The primary Next.js web application
  - **podji-mobile**: The primary Expo (React Native) mobile application

- **development/**: A dedicated workspace for isolated UI component development

  - **web-ui-dev**: An environment using React Vite + Storybook for web UI components
  - **mobile-ui-dev**: An environment using Expo + Storybook for mobile UI components

- **packages/**: Contains all shared and distributable libraries
  - **@podji/web-ui**: Web UI components library
  - **@podji/mobile-ui**: Mobile UI components library
  - **@podji/design-tokens**: Style Dictionary for theme and style definitions
  - **@podji/graphql-client**: Apollo Client configuration and GraphQL operations
  - **@podji/eslint-config**: Shared ESLint configuration
  - **@podji/tsconfig**: Shared TypeScript configurations

### Backend Microservices Architecture

The backend is designed as a distributed system of microservices running on Google Cloud Platform (GCP), primarily using Firebase Functions for event-driven services and Google Cloud Run for containerized, long-running workloads.

- **API Gateway & Service Communication**:

  - **GraphQL API Gateway**: A unified GraphQL endpoint built with Apollo Server on Google Cloud Run
  - **Inter-Service Communication**: Google Pub/Sub for asynchronous, event-driven communication

- **Microservices**:
  - **Auth Service**: Manages user authentication via Firebase Authentication
  - **User Profile Service**: Manages user data and social graph
  - **Playlist Service**: Provides CRUD functionality for user playlists
  - **Mix Service**: Manages mix metadata and social interactions
  - **Music Metadata Service**: A secure proxy to the SoundCloud API
  - **AI Suggestion Service**: Integrates with Google Genkit and Gemma
  - **Notification Service**: Sends notifications using Firebase Cloud Messaging

### Data Modeling & Firestore Schema

The primary database for Pocket DJ is Cloud Firestore, chosen for its scalability, real-time capabilities, flexible data model, and serverless integration.

The data model is denormalized and optimized for specific read patterns, with core collections including:

- **users**: Stores public profile information and private preferences
- **mixes**: Stores metadata for every mix created by users
- **playlists**: Stores user-curated lists of tracks
- **tracks**: Acts as a cache for SoundCloud track metadata
- **chats**: Manages metadata for one-on-one chat sessions

Firestore Security Rules enforce data integrity and authorization, ensuring users can only access data they are authorized to.

### UI Component Development with Storybook

Pocket DJ uses Storybook for developing and testing UI components in isolation:

- **Web UI Components**: Developed in the `web-ui-dev` environment with React-specific addons, Tailwind CSS integration, and accessibility testing tools
- **Mobile UI Components**: Developed in the `mobile-ui-dev` environment with React Native-specific addons, device simulation, and gesture testing capabilities

### Visual Regression Testing

BackstopJS is used for visual regression testing of UI components:

1. Components are developed and documented in Storybook
2. BackstopJS captures reference screenshots of components
3. Visual differences are highlighted for review during development

This ensures UI components maintain visual consistency across changes and prevents unintended visual regressions.

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

## Security & Compliance

- **Authentication**: Secure authentication via Firebase Auth, with ID Tokens verified at the API Gateway
- **Authorization**: GraphQL gateway and Firestore Security Rules enforce strict, user-scoped data access
- **API Rate Limits**: The Music Metadata Service implements caching and intelligent backoff strategies to respect SoundCloud's API policies
- **Data Privacy**: No copyrighted audio is stored persistently on servers, and all user data is handled in compliance with GDPR and other relevant regional data protection laws

## Future Roadmap

- **Group Chat & Live Session Chat**: Expand real-time messaging capabilities for live mix events
- **Advanced Audio Analysis**: Implement on-device BPM and key detection to reduce reliance on external metadata
- **Collaborative Mixing**: Develop real-time, multi-user co-DJing sessions using WebRTC
- **Plugin/SDK**: Create a system to allow third-party developers to build custom effects and themes
