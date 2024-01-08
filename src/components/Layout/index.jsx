import { AppShell, Group, Image, Title } from "@mantine/core";

import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import carLogo from "../../assets/blue-car-logo-png.png";
import { layoutStyle } from "../../styles/Layout/styles";
import { TabPanels } from "../TabPanels";

export const Layout = () => {
  const navigate = useNavigate();

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header styles={layoutStyle.header}>
        <Group p={5} justify="space-evenly" style={{ flex: 1 }}>
          <Group onClick={() => navigate("/")} styles={layoutStyle.title}>
            <Image src={carLogo} w={50} />
            <Title size={25}>Vehicle app</Title>
          </Group>
          <TabPanels />
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};
