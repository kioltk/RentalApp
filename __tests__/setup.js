jest.useFakeTimers();
import "react-native-gesture-handler/jestSetup";

// Uncomment this line if you want to use @react-navigation/drawer
jest.mock("react-native-reanimated", () => {
  const Reanimated = require("react-native-reanimated/mock");
  Reanimated.default.call = () => {};
  return Reanimated;
});
jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");
