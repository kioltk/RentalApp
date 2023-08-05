import React from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { Customer, Offer } from "../../api/types";
import { useNavigation } from "../../App";
import { useEffect } from "react";
import { OfferCard } from "../../components/offers/OfferCard";
import { Controller, useForm } from "react-hook-form";
import Title from "../../components/Title";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { api } from "../../api/api";
import { useMutation } from "@tanstack/react-query";

const Section = ({ children }: { children: React.ReactNode }) => (
  <View className="px-4 py-2">{children}</View>
);

const useCustomerForm = () => {
  const form = useForm<Customer>({
    defaultValues: {
      name: "",
      surname: "",
    },
  });
  return form;
};
type CustomerForm = ReturnType<typeof useCustomerForm>;

interface FieldProps {
  placeholder: string;
  form: CustomerForm;
  fieldName: keyof Customer;
  nextFieldName?: keyof Customer;
}

const Field = (props: FieldProps) => (
  <View className="my-2">
    <Text className="mb-1">{props.placeholder}</Text>
    <Controller
      control={props.form.control}
      rules={{
        required: true,
      }}
      render={({ field: { ref, onChange, onBlur, value } }) => (
        <TextInput
          ref={ref}
          className="border-2 border-gray-200 rounded-xl p-2 "
          onBlur={onBlur}
          onChangeText={onChange}
          value={value ?? ""}
          onSubmitEditing={() => {
            if (props.nextFieldName) {
              props.form.setFocus(props.nextFieldName);
            }
          }}
          returnKeyType={props.nextFieldName ? "next" : "done"}
        />
      )}
      name={props.fieldName}
    />
    {props.form.formState.errors[props.fieldName] && (
      <Text className="text-red-600">This is required.</Text>
    )}
  </View>
);

const CustomerForm = ({ form }: { form: CustomerForm }) => {
  return (
    <View className="px-4 py-2 bg-white rounded-xl">
      <Field
        placeholder="First name"
        form={form}
        fieldName="name"
        nextFieldName="surname"
      />
      <Field placeholder="Last name" form={form} fieldName="surname" />
    </View>
  );
};

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

  const performReservation = async (customer: Customer) => {
    await reservationRequest.mutate(customer);
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
    </KeyboardAwareScrollView>
  );
};
