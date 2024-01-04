import { Card, Text, Image, Paper } from "@mantine/core";
import React from "react";
import { vehicleCardStyle } from "../../styles/VehicleCard/styles";
import { useHover } from "@mantine/hooks";

export const VehicleCard = () => {
  const { hovered, ref } = useHover();

  return (
    <div ref={ref}>
      <Card
        mt={20}
        shadow="lg"
        padding="lg"
        radius="md"
        withBorder
        styles={hovered ? vehicleCardStyle.hovered : vehicleCardStyle}
      >
        <Card.Section>
          <Text fw={600} mt={10} align="center">
            BMW
          </Text>

          <Image
            p={10}
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
            height={160}
            w="100%"
            alt="Norway"
          />
        </Card.Section>
      </Card>
    </div>
  );
};
