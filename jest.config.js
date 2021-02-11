// Official GitHub profile page
// Copyright (C) 2021 Alexander Rogalskiy
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see https\\://www.gnu.org/licenses/.
module.exports = {
  roots: ['<rootDir>/tests/'],
  verbose: true,
  clearMocks: true,
  moduleFileExtensions: ['js'],
  testEnvironment: 'node',
  testMatch: ['**/*.test.js', '**/__tests__/**/?(*.)+(spec|test).js'],
  testRunner: 'jest-circus/runner',
  testPathIgnorePatterns: ['/node_modules/', '/__fixtures__/'],
  collectCoverage: true,
  collectCoverageFrom: [
    '!**/dist/**',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**/generated/**',
    '!**/__fixtures__/**',
    '!**/scenarios/**',
    '!**/redirects/**',
  ],
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 75,
      lines: 75,
      statements: 75,
    },
  },
  coverageDirectory: './coverage',
  coverageReporters: ['json', 'lcov', 'text', 'clover', 'html'],
};
