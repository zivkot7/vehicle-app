import { CloseButton, Input } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";

export const SearchInput = ({ value, setValue }) => {
  return (
    <Input
      placeholder="Input placeholder"
      styles={{ wrapper: { width: 300 } }}
      value={value}
      rightSectionPointerEvents="all"
      onChange={(event) => setValue(event.currentTarget.value)}
      leftSection={<IconSearch size={16} />}
      rightSection={
        <CloseButton
          aria-label="Search"
          onClick={() => setValue("")}
          style={{ display: value ? undefined : "none" }}
        />
      }
    />
  );
};
