import React from "react";
import { Text, View } from "react-native";

export const ErrorMessage = ({ error }: { error: any }) => {
  return (
    <View>
      <Text>Something went wrong</Text>
      <Text>{error.message ?? "Unknown Error"}</Text>
    </View>
  );
};
