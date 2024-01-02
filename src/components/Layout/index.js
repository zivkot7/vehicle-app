import {
  AppShell,
  CloseButton,
  Group,
  Image,
  Input,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import carLogo from "../../assets/blue-car-logo-png.png";
import { layoutStyle } from "../../styles/Layout/styles";
import { IconSearch } from "@tabler/icons-react";
import { SearchInput } from "../SearchInput";
import { TabPanels } from "../TabPanels";

export const Layout = () => {
  const [opened, { toggle }] = useDisclosure();
  const [value, setValue] = useState("Clear me");

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group p={5}>
          <Image src={carLogo} w={50} />
          <Title styles={layoutStyle.title}>Vehicle app</Title>
          <TabPanels />
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">Navbar</AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};
