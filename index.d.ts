import { ReactNode } from "react";

declare module "react-native-keyboard-aware-scrollview" {
  interface KeyboardAwareScrollViewProperties
    extends React.ScrollViewProperties {
    getTextInputRefs?: () => __React.TextInput[];
    children: ReactNode;
  }

  interface KeyboardAwareScrollViewStatic
    extends React.ComponentClass<KeyboardAwareScrollViewProperties> {}

  export var KeyboardAwareScrollView: KeyboardAwareScrollViewStatic;
}
