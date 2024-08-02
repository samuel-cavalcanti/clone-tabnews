const nextJest = require("next/jest");

const dotenv = require("dotenv");

dotenv.config({
  path: ".env.development",
});

/** @type {import('jest').Config} */
const createJestConfig = nextJest({
  dir: "./",
});

const config = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testTimeout: 60 * 1_000,
});

module.exports = config;
