/** @format */

import type { JestConfigWithTsJest } from "ts-jest";

const jestConfig: JestConfigWithTsJest = {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "jsdom",

  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: true,
        tsconfig: "tsconfig.jest.json",
      },
    ],
  },
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  transformIgnorePatterns: ["/node_modules/(?!lucide-react)"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.ts",
    "^next/image$": "<rootDir>/__mocks__/next/image.tsx",
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@packages/(.*)$": "<rootDir>/packages/$1",
    "^lucide-react$": "<rootDir>/__mocks__/lucide-react.ts",
    "^@/_components(.*)$": "<rootDir>/src/_components$1",
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  testPathIgnorePatterns: ["/node_modules/", "/e2e/"],
};

export default jestConfig;
