/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  projects: [
    {
      displayName: '@podji/configs',
      testMatch: ['<rootDir>/packages/@configs/src/**/*.test.ts'],
      transform: {
        '^.+\\.tsx?$': [
          'ts-jest',
          {
            tsconfig: '<rootDir>/packages/@configs/tsconfig.json',
          },
        ],
      },
    },
    {
      displayName: '@podji/schemas',
      testMatch: ['<rootDir>/packages/@schemas/src/**/*.test.ts'],
      transform: {
        '^.+\\.tsx?$': [
          'ts-jest',
          {
            tsconfig: '<rootDir>/packages/@schemas/tsconfig.json',
          },
        ],
      },
    },
    {
      displayName: '@podji/stores',
      testMatch: ['<rootDir>/packages/@stores/src/**/*.test.ts'],
      testEnvironment: 'jsdom',
      setupFilesAfterEnv: ['<rootDir>/packages/@stores/src/test/jest-setup.ts'],
      transform: {
        '^.+\\.tsx?$': [
          'ts-jest',
          {
            tsconfig: '<rootDir>/packages/@stores/tsconfig.json',
          },
        ],
      },
    },
    {
      displayName: 'services',
      testMatch: ['<rootDir>/packages/services/src/**/*.test.ts'],
      transform: {
        '^.+\\.tsx?$': [
          'ts-jest',
          {
            tsconfig: '<rootDir>/packages/services/tsconfig.json',
          },
        ],
      },
    },
    {
      displayName: 'podji-web',
      testMatch: ['<rootDir>/apps/podji-web/src/**/*.test.{ts,tsx}'],
      testEnvironment: 'jsdom',
      transform: {
        '^.+\\.(ts|tsx)$': 'babel-jest',
      },
      setupFilesAfterEnv: ['<rootDir>/apps/podji-web/src/test/jest-setup.ts'],
      rootDir: '<rootDir>',
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/apps/podji-web/src/$1',
        '^@podji/schemas$': '<rootDir>/packages/@schemas/src',
        '^@podji/schemas/(.*)$': '<rootDir>/packages/@schemas/$1',
        '^@podji/configs$': '<rootDir>/packages/@configs/src',
        '^@podji/configs/(.*)$': '<rootDir>/packages/@configs/$1',
        '^@podji/services$': '<rootDir>/packages/@services/src',
        '^@podji/services/(.*)$': '<rootDir>/packages/@services/$1',
        '^@podji/stores$': '<rootDir>/apps/podji-web/src/__mocks__/@podji/stores',
        '^@podji/stores/(.*)$': '<rootDir>/apps/podji-web/src/__mocks__/@podji/stores/$1',
        '^@podji/web-ui$': '<rootDir>/packages/@web-ui/src',
        '^@podji/web-ui/(.*)$': '<rootDir>/packages/@web-ui/$1',
        '^@podji/mobile-ui$': '<rootDir>/packages/@mobile-ui/src',
        '^@podji/mobile-ui/(.*)$': '<rootDir>/packages/@mobile-ui/$1',
      },
    },
    {
      displayName: 'podji-mobile',
      rootDir: '<rootDir>/apps/podji-mobile',
      // We're not using the react-native preset directly to avoid window property conflicts
      // Instead, we're configuring the necessary parts manually
      testEnvironment: 'jsdom',
      setupFilesAfterEnv: ['<rootDir>/test/jest-setup.ts'],
      testMatch: ['<rootDir>/**/*.test.{ts,tsx}'],
      transformIgnorePatterns: [
        'node_modules/(?!(react-native|@react-native|react-native-reanimated|@testing-library/react-native|expo|@expo|@unimodules|@react-navigation|@react-native-community)/)',
      ],
      transform: {
        '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { configFile: './babel.config.js' }],
      },
      moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
      },
      // Mock modules that cause issues
      modulePathIgnorePatterns: ['<rootDir>/node_modules/react-native/Libraries/react-native/'],
    },
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: ['<rootDir>/packages/*/src/**/*.{ts,tsx}', '!<rootDir>/packages/*/src/**/*.d.ts'],
  verbose: true,
};
