/* eslint-disable @typescript-eslint/no-var-requires */
const { pathsToModuleNameMapper } = require('ts-jest')
const { compilerOptions } = require('./tsconfig')

module.exports = {
  clearMocks: true,
  testTimeout: 120000,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.+(js|ts)'],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['\\\\node_modules\\\\', 'src/datasources', 'src/utils/logger'],
  coverageReporters: ['json-summary', 'text', 'lcov'],
  preset: 'ts-jest',
  setupFiles: ['<rootDir>/tests/setup.ts'],
  roots: ['<rootDir>/tests', '<rootDir>/src', '<rootDir>/config'],
  testEnvironment: 'node',
  verbose: false,
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' })
}
