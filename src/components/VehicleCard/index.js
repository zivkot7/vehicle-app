import { Card, Text, Image, Badge, Group } from "@mantine/core";
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
    <div ref={ref}>
      <Card
        mt={20}
        shadow="lg"
        padding="lg"
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

          <Image
            p={5}
            src={data.image}
            height={160}
            w="100%"
            alt="Norway"
            onClick={onClick}
          />
          <Text fw={400} mt={5} align="start">
            {data.abrv}
          </Text>
          <Text fw={400} mt={5} align="start">
            Manufacturer:{" "}
            <Badge bg="black" c="white">
              {data.manufacturer}
            </Badge>
          </Text>
        </Card.Section>
        {modelDescription && (
          <Card.Section mt="xs" p="md">
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
    </div>
  );
};
