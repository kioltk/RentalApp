import React from "react";
import { api } from "../../api/api";
import { useQuery } from "@tanstack/react-query";
import { FlatList, Pressable, Text, View } from "react-native";
import { ErrorMessage } from "../ui/ErrorMessage";
import { Location } from "../../api/types";
import { useNavigation } from "../../App";
import Loading from "../ui/Loading";

const useLocations = () => {
  const query = useQuery({
    queryKey: ["locations"],
    queryFn: api.locations.getLocations,
  });
  return query;
};

const LocationCard = ({ location }: { location: Location }) => {
  return (
    <View className="p-4 rounded-xl bg-white">
      <Text className="text-2xl">{location.name}</Text>
    </View>
  );
};

export const LocationsList = () => {
  const navigation = useNavigation();
  const locations = useLocations();

  if (locations.isLoading) {
    return <Loading />;
  }

  if (locations.error) {
    return <ErrorMessage error={locations.error} />;
  }

  return (
    <View>
      <FlatList
        className="py-2 h-full"
        data={locations.data}
        renderItem={({ item }) => (
          <Pressable
            className="mx-5 my-1"
            onPress={() =>
              navigation.navigate("OffersScreen", { location: item })
            }
          >
            <LocationCard location={item} />
          </Pressable>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};
