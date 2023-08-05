import React, { useEffect } from "react";
import { OffersList } from "../../components/offers/OffersList";
import { Location } from "../../api/types";
import { useNavigation } from "../../App";

export const OffersScreen = ({
  route,
}: {
  route: {
    params: {
      location: Location;
    };
  };
}) => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: false,
      title: route.params.location.name ?? "OffersScreen",
    });
  }, [navigation, route.params.location.name]);

  return <OffersList location={route.params.location} />;
};
