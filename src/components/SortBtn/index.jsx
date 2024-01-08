import { Select } from "@mantine/core";
import React from "react";

export const SortBtn = ({ data, onChange, initialValue = "" }) => {
  return (
    <Select
      placeholder="Sort by..."
      data={data}
      value={initialValue}
      onChange={(value) => onChange(value)}
      clearable
    />
  );
};
