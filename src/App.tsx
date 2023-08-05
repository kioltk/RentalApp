import {
  NavigationContainer,
  useNavigation as baseUseNavigation,
} from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";

import React from "react";
import { HomeScreen } from "./screens/home/HomeScreen";
import { Compose } from "./components/Compose";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Location, Offer } from "./api/types";
import { OffersScreen } from "./screens/offers/OffersScreen";
import { CreateReservationScreen } from "./screens/reservations/CreateReservationScreen";

export type RootStackParamList = {
  HomeScreen: undefined;
  OffersScreen: { location: Location };
  CreateReservationScreen: { offer: Offer };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const { Navigator, Group, Screen } = Stack;

export const useNavigation = () =>
  baseUseNavigation<NativeStackNavigationProp<RootStackParamList>>();

const App = () => {
  return (
    <Compose providers={[[QueryClientProvider, { client: new QueryClient() }]]}>
      <NavigationContainer>
        <Navigator>
          <Group>
            <Screen name="HomeScreen" component={HomeScreen} />
            <Screen name="OffersScreen" component={OffersScreen} />
          </Group>
          <Group screenOptions={{ presentation: "formSheet" }}>
            <Screen
              name="CreateReservationScreen"
              component={CreateReservationScreen}
            />
          </Group>
        </Navigator>
      </NavigationContainer>
    </Compose>
  );
};
export default App;
