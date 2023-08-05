module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: ["nativewind/babel"],
  env: {
    test: {
      plugins: ["react-native-config-node/transform"],
    },
  },
};
