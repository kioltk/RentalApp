import React from "react";
import { Image, Text, View } from "react-native";
import { Offer } from "../../api/types";

export const OfferCard = ({ offer }: { offer: Offer }) => {
  return (
    <View className="py-1 w-full">
      <View className="my-1 rounded-xl bg-white w-full">
        <View>
          <Image
            source={{ uri: offer.vehicle.imageLink ?? undefined }}
            className="aspect-video rounded-xl"
          />

          <View className="absolute left-4 right-2 -bottom-2 flex flex-row justify-between items-center">
            <Text
              className="text-white"
              style={{
                textShadowColor: "rgba(0, 0, 0, 1)",
                textShadowOffset: { width: 0, height: 0 },
                textShadowRadius: 3,
              }}
            >
              {offer.vendor.name}
            </Text>
            <Image
              source={{ uri: offer.vendor.imageLink ?? undefined }}
              className="w-10 h-10 rounded-full bg-white border-neutral-200 border-1"
            />
          </View>
        </View>
        <View className="px-4 py-2">
          <Text>{offer.vehicle.modelName}</Text>
          <Text>{offer.vehicle.sipp}</Text>
          <Text>
            <Text className="text-xs">{offer.price.currency}</Text>
            {offer.price.amount}
          </Text>
        </View>
      </View>
    </View>
  );
};
