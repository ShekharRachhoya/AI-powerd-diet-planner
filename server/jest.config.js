export default {
  testEnvironment: 'node',

  roots: [
    '<rootDir>/src/tests'
  ],

  testMatch: [
    '**/*.test.js'
  ],

  collectCoverageFrom: [
    'src/**/*.js',
    '!src/tests/**'
  ],

  setupFilesAfterEnv: [
    '<rootDir>/src/tests/setup/setup.js'
  ]
};