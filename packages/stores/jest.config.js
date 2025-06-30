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
    '^@podji/services$': '<rootDir>/../@services/src',
    '^@podji/services/(.*)$': '<rootDir>/../@services/$1',
    '^@podji/schemas$': '<rootDir>/../@schemas/src',
    '^@podji/schemas/(.*)$': '<rootDir>/../@schemas/$1',
    '^@podji/schemas/src/generated/(.+)\\.js$': '<rootDir>/../@schemas/src/generated/$1.ts',
  },
  transformIgnorePatterns: ['node_modules/(?!(@podji/schemas|@podji/services)/)'],
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
};

export default config;
