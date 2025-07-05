# Testing Directory

This directory contains all the tests for the mobile app. Tests are organized in a structure that mirrors the app directory structure.

## Running Tests

To run all tests:

```bash
yarn test
```

To run a specific test:

```bash
yarn test path/to/test
```

## Test Structure

- `__mocks__`: Contains mock implementations for external dependencies
- `jest-setup.ts`: Contains setup code that runs before each test
- Other directories: Mirror the app directory structure

## Writing Tests

When writing tests for components or functionality in the app directory, place the test files in this directory with a matching path structure. For example:

- App component: `app/index.tsx` -> Test: `test/index.test.tsx`
- Profile component: `app/profile/ProfileList.tsx` -> Test: `test/profile/ProfileList.test.tsx`

This keeps test files separate from the app directory, preventing Expo Router from treating them as routes.
