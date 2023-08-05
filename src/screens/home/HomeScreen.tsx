import React, { useEffect } from "react";
import { LocationsList } from "../../components/locations/LocationsList";
import { useNavigation } from "../../App";

export const HomeScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      title: "Home",
    });
  }, [navigation]);
  return <LocationsList />;
};
