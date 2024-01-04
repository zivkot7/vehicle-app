import React from "react";
import { SearchInput } from "../../components/SearchInput";
import { Group, Stack, Title } from "@mantine/core";
import { SortBtn } from "../../components/SortBtn";
import { VehicleCard } from "../../components/VehicleCard";
import { homeStyle } from "../../styles/Home/styles";

export const Home = () => {
  return (
    <>
      <Stack align="center" mt={10}>
        <Title style={homeStyle.title}>Vehicle brands</Title>
        <Group mt={10}>
          <SearchInput />
          <SortBtn />
        </Group>
        <VehicleCard />
      </Stack>
    </>
  );
};
