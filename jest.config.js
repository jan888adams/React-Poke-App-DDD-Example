export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: {
          jsx: "react-jsx",
        },
      },
    ],
  },

  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: [
    'text',
    'lcov',
    'cobertura',
  ],

  testMatch: ["<rootDir>/tests/**/*.{test,spec}.{js,jsx,ts,tsx}"],

  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    "^.+\\.svg$": "jest-transformer-svg",
    "\\.(png|jpg|jpeg)$": "<rootDir>/tests/mocks/image.js",
    "\\.(mp4)$": "<rootDir>/tests/mocks/video.js",
  },

  setupFilesAfterEnv: ["<rootDir>/tests/jest.setup.ts"],
};