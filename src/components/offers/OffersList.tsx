import React from "react";
import { api } from "../../api/api";
import { useQuery } from "@tanstack/react-query";
import { FlatList, Pressable, Text, View } from "react-native";
import { ErrorMessage } from "../ui/ErrorMessage";
import { Location } from "../../api/types";
import { useNavigation } from "../../App";
import { OfferCard } from "./OfferCard";
import Loading from "../ui/Loading";

const useOffers = (location: Location) => {
  const query = useQuery({
    queryKey: ["offers", location.id],
    queryFn: () => api.offers.getOffers(location.id),
    cacheTime: 0,
  });
  return query;
};

interface Props {
  location: Location;
}

export const OffersList = ({ location }: Props) => {
  const navigation = useNavigation();
  const offers = useOffers(location);

  if (offers.isLoading) {
    return <Loading />;
  }

  if (offers.error) {
    return <ErrorMessage error={offers.error} />;
  }

  return (
    <View>
      <FlatList
        numColumns={2}
        className="h-full w-full"
        data={offers.data}
        renderItem={({ item }) => (
          <Pressable
            className="w-1/2 px-2"
            onPress={() =>
              navigation.navigate("CreateReservationScreen", { offer: item })
            }
          >
            <OfferCard offer={item} />
          </Pressable>
        )}
        keyExtractor={(item) => item.offerUId ?? ""}
      />
    </View>
  );
};
