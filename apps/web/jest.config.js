/** @type {import('jest').Config} */
module.exports = {
  displayName: 'podji-web',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@podji/stores$': '<rootDir>/src/__mocks__/@podji/stores',
    '^@podji/stores/(.*)$': '<rootDir>/src/__mocks__/@podji/stores/$1',
    '^@podji/schemas$': '<rootDir>/src/__mocks__/@podji/schemas',
    '^@podji/schemas/(.*)$': '<rootDir>/src/__mocks__/@podji/schemas',
    '^@podji/design-tokens$': '<rootDir>/../../packages/design-tokens/src',
    '^@podji/design-tokens/(.*)$': '<rootDir>/../../packages/design-tokens/$1',
    '^@podji/services$': '<rootDir>/src/__mocks__/@podji/services',
    '^@podji/services/(.*)$': '<rootDir>/src/__mocks__/@podji/services',
    '^@podji/web-ui$': '<rootDir>/../../packages/web-ui/src',
    '^@podji/web-ui/(.*)$': '<rootDir>/../../packages/web-ui/$1',
    '^@podji/mobile-ui$': '<rootDir>/../../packages/mobile-ui/src',
    '^@podji/mobile-ui/(.*)$': '<rootDir>/../../packages/mobile-ui/$1',
  },
  transform: {
    '^.+\\.(ts|tsx)$': [
      'babel-jest',
      {
        presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
      },
    ],
  },
  setupFilesAfterEnv: ['<rootDir>/src/test/jest-setup.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  rootDir: '.',
};
