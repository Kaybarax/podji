/** @type {import('jest').Config} */
module.exports = {
  displayName: 'nextjs-web-app',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@shared/stores$': '<rootDir>/src/__mocks__/@shared/stores',
    '^@shared/stores/(.*)$': '<rootDir>/src/__mocks__/@shared/stores/$1',
    '^@shared/schemas$': '<rootDir>/../../packages/@schemas/src',
    '^@shared/schemas/(.*)$': '<rootDir>/../../packages/@schemas/$1',
    '^@shared/configs$': '<rootDir>/../../packages/@configs/src',
    '^@shared/configs/(.*)$': '<rootDir>/../../packages/@configs/$1',
    '^@shared/services$': '<rootDir>/../../packages/@services/src',
    '^@shared/services/(.*)$': '<rootDir>/../../packages/@services/$1',
    '^@shared/web-ui$': '<rootDir>/../../packages/@web-ui/src',
    '^@shared/web-ui/(.*)$': '<rootDir>/../../packages/@web-ui/$1',
    '^@shared/mobile-ui$': '<rootDir>/../../packages/@mobile-ui/src',
    '^@shared/mobile-ui/(.*)$': '<rootDir>/../../packages/@mobile-ui/$1',
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
