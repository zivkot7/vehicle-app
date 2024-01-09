import { Card, Text, Image, Badge, Group, Paper } from "@mantine/core";
import React from "react";
import { vehicleCardStyle } from "../../styles/VehicleCard/styles";
import { useHover } from "@mantine/hooks";

export const VehicleCard = ({
  data,
  renderButtons,
  modelDescription,
  onClick,
}) => {
  const { hovered, ref } = useHover();

  return (
    <Paper ref={ref}>
      <Card
        mt={20}
        shadow="lg"
        radius="md"
        withBorder
        styles={hovered ? vehicleCardStyle.hovered : vehicleCardStyle}
      >
        <Card.Section
          p={10}
          onClick={onClick}
          styles={{ section: { cursor: "pointer" } }}
        >
          <Text fw={600} mt={10} align="center">
            {data.name}
          </Text>

          <Image p={5} src={data.image} h={160} w={276} alt="image" />
          <Text fw={400} mt={5} align="start">
            {data.abrv}
          </Text>
          {!modelDescription && (
            <Group>
              <Text fw={400} mt={5} align="start">
                Manufacturer:{" "}
              </Text>
              <Badge bg="black" c="white">
                {data.manufacturer}
              </Badge>
            </Group>
          )}
        </Card.Section>
        {modelDescription && (
          <Card.Section p="md">
            <Text
              fz="sm"
              fw={500}
              c="gray.7"
              mb="sm"
              tt="uppercase"
              style={{ lineHeight: 1 }}
            >
              Model description:
            </Text>

            <Group>{modelDescription}</Group>
          </Card.Section>
        )}

        <Card.Section p="md">{renderButtons}</Card.Section>
      </Card>
    </Paper>
  );
};
