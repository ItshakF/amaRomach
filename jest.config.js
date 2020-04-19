module.exports = {
  preset: 'jest-preset-angular',
  setupTestFrameworkScriptFile: '<rootDir>/src/setup-jest.ts',
  testURL: 'http://localhost',
  transformIgnorePatterns: ['node_modules/(?!ng2-semantic-ui)'],
};
