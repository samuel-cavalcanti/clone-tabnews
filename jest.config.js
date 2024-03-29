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
});

module.exports = config;
