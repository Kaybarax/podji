/** @type {import('jest').Config} */
const config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.json',
        useESM: true,
      },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@shared/services$': '<rootDir>/../@services/src',
    '^@shared/services/(.*)$': '<rootDir>/../@services/$1',
    '^@shared/schemas$': '<rootDir>/../@schemas/src',
    '^@shared/schemas/(.*)$': '<rootDir>/../@schemas/$1',
    '^@shared/schemas/src/generated/(.+)\\.js$': '<rootDir>/../@schemas/src/generated/$1.ts',
  },
  transformIgnorePatterns: ['node_modules/(?!(@shared/schemas|@shared/services)/)'],
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
};

export default config;
