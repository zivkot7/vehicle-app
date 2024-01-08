import { CloseButton, Input } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";

const SearchInput = ({ onChange, initialValue = "" }) => {
  const [inputValue, setInputValue] = useState(initialValue);
  const [debounced] = useDebouncedValue(inputValue, 500);

  useEffect(() => {
    onChange(debounced);
  }, [debounced, onChange]);

  return (
    <Input
      placeholder="Search..."
      styles={{ wrapper: { width: 300 } }}
      value={inputValue}
      rightSectionPointerEvents="all"
      onChange={(e) => {
        setInputValue(e.target.value);
      }}
      onBlur={() => onChange(inputValue)}
      leftSection={<IconSearch size={16} />}
      rightSection={
        <CloseButton
          aria-label="Search"
          onClick={() => setInputValue("")}
          style={{ display: inputValue ? undefined : "none" }}
        />
      }
    />
  );
};

export default SearchInput;
