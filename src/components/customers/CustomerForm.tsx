import { Customer } from "../../api/types";
import { Controller, useForm } from "react-hook-form";
import { Text, TextInput, View } from "react-native";
import React from "react";

export const useCustomerForm = () =>
  useForm<Customer>({
    defaultValues: {
      name: "",
      surname: "",
    },
  });
export type CustomerForm = ReturnType<typeof useCustomerForm>;

export interface FieldProps {
  placeholder: string;
  form: CustomerForm;
  fieldName: keyof Customer;
  nextFieldName?: keyof Customer;
}

export const Field = (props: FieldProps) => (
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
export const CustomerForm = ({ form }: { form: CustomerForm }) => {
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
