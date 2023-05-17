module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "tests/(.*)": "<rootDir>/tests/$1",
  },
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{js,ts}"],
  verbose: true,
  setupFilesAfterEnv: ["./jest.setup.js"],
};
