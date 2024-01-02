import { Tabs } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes";

export const TabPanels = () => {
  const navigate = useNavigate();

  const handleTabClick = (value) => {
    switch (value) {
      case "home":
        navigate(ROUTES.HOME);
        break;
      case "brand":
        navigate(ROUTES.VEHICLE_CREATE);
        break;
      case "model":
        navigate(ROUTES.VEHICLE_CREATE_MODEL);
        break;
      default:
        break;
    }
  };

  return (
    <Tabs defaultValue="home" ml={100} styles={{ tab: { fontSize: 18 } }}>
      <Tabs.List>
        <Tabs.Tab value="home" onClick={() => handleTabClick("home")}>
          Home
        </Tabs.Tab>
        <Tabs.Tab value="brand" onClick={() => handleTabClick("brand")}>
          Make Brand
        </Tabs.Tab>
        <Tabs.Tab value="model" onClick={() => handleTabClick("model")}>
          Make Model
        </Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
};
