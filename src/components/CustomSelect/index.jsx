import React from "react";
import { Select } from "@mantine/core";

const CustomSelect = ({ placeholder, data, initialValue = "", onChange }) => {
  return (
    <Select
      placeholder={placeholder}
      data={data}
      value={initialValue}
      clearable
      onChange={(value) => onChange(value)}
    />
  );
};

export default CustomSelect;
