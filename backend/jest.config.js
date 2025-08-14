module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./tests/setup.js'],
  testTimeout: 30000,
  transformIgnorePatterns: [
    'node_modules/(?!bcrypt)'
  ]
};