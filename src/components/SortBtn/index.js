import { Select } from "@mantine/core";
import React from "react";

export const SortBtn = () => {
  return (
    <Select
      placeholder="Sort by"
      data={["React", "Angular", "Vue", "Svelte"]}
      clearable
    />
  );
};
