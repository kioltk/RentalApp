module.exports = {
  preset: "react-native",
  setupFiles: ["<rootDir>/__tests__/setup.js"],
  testPathIgnorePatterns: ["<rootDir>/__tests__/setup.js"],
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|rollbar-react-native|@fortawesome|@react-native|@react-navigation)",
  ],
};
