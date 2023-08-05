import React, { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import { Customer, Offer } from "../../api/types";
import { useNavigation } from "../../App";
import { OfferCard } from "../../components/offers/OfferCard";
import Title from "../../components/Title";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { api } from "../../api/api";
import { useMutation } from "@tanstack/react-query";
import {
  CustomerForm,
  useCustomerForm,
} from "../../components/customers/CustomerForm";

const Section = ({ children }: { children: React.ReactNode }) => (
  <View className="px-4 py-2">{children}</View>
);

export const CreateReservationScreen = ({
  route: {
    params: { offer },
  },
}: {
  route: { params: { offer: Offer } };
}) => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: false,
      title: offer.vehicle.modelName ?? "Reservation",
    });
  });
  const form = useCustomerForm();

  const reservationRequest = useMutation({
    mutationFn: (customer: Customer) =>
      api.reservations.createReservation({
        offerUId: offer.offerUId,
        customer,
      }),
  });

  useEffect(() => {
    navigation.setOptions({
      gestureEnabled: !reservationRequest.isLoading,
    });
  }, [reservationRequest.isLoading, navigation]);

  const performReservation = (customer: Customer) => {
    reservationRequest.mutate(customer);
    // navigation.goBack();
  };

  return (
    <KeyboardAwareScrollView>
      <Section>
        <Title>Offer</Title>
        <OfferCard offer={offer} />
      </Section>
      <Section>
        <Title>Details</Title>
        <CustomerForm form={form} />
      </Section>
      {!reservationRequest.isSuccess && (
        <Section>
          <Pressable
            disabled={reservationRequest.isLoading}
            className="rounded-xl bg-purple-200 py-4"
            onPress={form.handleSubmit(performReservation)}
          >
            <Text className="w-full text-center text-xl font-bold">
              {reservationRequest.isLoading
                ? "Loading..."
                : "Make a Reservation"}
            </Text>
          </Pressable>
        </Section>
      )}
      {reservationRequest.isSuccess && (
        <Section>
          <Title>Booking Details</Title>
          <View className="bg-white rounded-xl px-4 py-2">
            <Text>
              Your reservation number:{" "}
              {reservationRequest.data.confirmationNumber}
            </Text>
          </View>
        </Section>
      )}
    </KeyboardAwareScrollView>
  );
};
