import { Select } from "@mantine/core";
import React from "react";

export const SortBtn = ({ data, onChange, initialValue = "" }) => {
  return (
    <Select
      data={data}
      value={initialValue}
      onChange={(value) => onChange(value)}
      clearable
    />
  );
};
