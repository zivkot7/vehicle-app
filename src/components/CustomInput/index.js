import React from "react";
import { Field } from "mobx-react-form";
import { TextInput, Text } from "@mantine/core";

export const CustomInput = ({ errorText, formError, field = Field }) => {
  return (
    <>
      <TextInput {...field} />
      {formError && (
        <Text mt={5} c="red">
          {errorText}
        </Text>
      )}
    </>
  );
};
