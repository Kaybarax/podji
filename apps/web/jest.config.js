/** @type {import('jest').Config} */
module.exports = {
  displayName: 'podji-web',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@podji/stores$': '<rootDir>/src/__mocks__/@podji/stores',
    '^@podji/stores/(.*)$': '<rootDir>/src/__mocks__/@podji/stores/$1',
    '^@podji/schemas$': '<rootDir>/../../packages/@schemas/src',
    '^@podji/schemas/(.*)$': '<rootDir>/../../packages/@schemas/$1',
    '^@podji/configs$': '<rootDir>/../../packages/@configs/src',
    '^@podji/configs/(.*)$': '<rootDir>/../../packages/@configs/$1',
    '^@podji/services$': '<rootDir>/../../packages/@services/src',
    '^@podji/services/(.*)$': '<rootDir>/../../packages/@services/$1',
    '^@podji/web-ui$': '<rootDir>/../../packages/@web-ui/src',
    '^@podji/web-ui/(.*)$': '<rootDir>/../../packages/@web-ui/$1',
    '^@podji/mobile-ui$': '<rootDir>/../../packages/@mobile-ui/src',
    '^@podji/mobile-ui/(.*)$': '<rootDir>/../../packages/@mobile-ui/$1',
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
