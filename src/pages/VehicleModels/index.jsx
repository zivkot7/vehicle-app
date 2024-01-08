import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { observer } from "mobx-react";
import {
  Button,
  Container,
  Grid,
  Group,
  LoadingOverlay,
  Pagination,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { modelStore } from "../../stores/VehicleModelStore";
import { makeStore } from "../../stores/VehicleMakeStore";
import { VehicleCard } from "../../components/VehicleCard";
import SearchInput from "../../components/SearchInput";
import {
  IconCalendar,
  IconEngine,
  IconGasStation,
  IconManualGearbox,
} from "@tabler/icons-react";
import { theme } from "../../providers/Theme";
import { modelsStyle } from "../../styles/Models";
import CustomSelect from "../../components/CustomSelect";
import { handleSort } from "../../utils/filterHandlers";
import { SELECT_MODEL_DATA } from "../../utils/Constants";

const VehicleModels = observer(() => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleNavigateEdit = (item) => {
    navigate(`/model/${item.id}`, { state: item });
  };

  const handleDelete = (id) => {
    modelStore.deleteModel(id);
  };

  const searchHandler = (query) => {
    if (query.length) {
      modelStore.setPageIndex(1);
      modelStore.setSearchQuery(query ?? "");
    } else {
      modelStore.setSearchQuery("");
    }
  };

  const renderBtns = (data) => {
    return (
      <Group justify="space-between">
        <Button onClick={() => handleNavigateEdit({ ...data })}>
          Edit Model
        </Button>
        <Button
          variant="outline"
          color={theme.colors.primary[4]}
          onClick={() => handleDelete(data.id)}
        >
          Delete Model
        </Button>
      </Group>
    );
  };

  const renderModelSpec = (data) => {
    const item = [
      { label: data.year, icon: <IconCalendar size={16} /> },
      { label: data.horse_power, icon: <IconEngine size={16} /> },
      { label: data.transmission, icon: <IconManualGearbox size={16} /> },
      { label: data.engine, icon: <IconGasStation size={16} /> },
    ];

    return item.map((feature, index) => (
      <Group key={index} gap={3}>
        {feature.icon}
        <Text size="xs">{feature.label}</Text>
      </Group>
    ));
  };

  useEffect(() => {
    if (id) {
      modelStore.setPageIndex(1);
      if (modelStore.pageIndex === 1) {
        modelStore.getModels(id);
        makeStore.getSingleMake(id);
        modelStore.getColors(id);
      }
    }
  }, []);

  return (
    <>
      {modelStore.isLoading ? (
        <LoadingOverlay
          visible={modelStore.isLoading}
          zIndex={1000}
          overlayProps={{ radius: "xl", blur: 2 }}
          loaderProps={{ type: "dots", size: 150 }}
        />
      ) : (
        <Container size="xl" mx="auto">
          <Stack justify="center">
            <Title mx="auto" order={2} style={modelsStyle.title}>
              {makeStore.singleMake?.name} Models
            </Title>
            <Group justify="center" mb="xl">
              <SearchInput
                onChange={searchHandler}
                initialValue={modelStore.searchQuery}
              />
              <CustomSelect
                placeholder="Sort by..."
                data={SELECT_MODEL_DATA}
                initialValue={modelStore.sort}
                onChange={(value) =>
                  handleSort({ query: value, store: modelStore })
                }
              />
            </Group>
            <Grid gutter="xl" align="center">
              {modelStore.models.map((data) => {
                return (
                  <Grid.Col
                    span={{ base: 12, sm: 6, md: 4, lg: 3 }}
                    key={data.id}
                  >
                    <VehicleCard
                      data={data}
                      renderButtons={renderBtns(data)}
                      modelDescription={renderModelSpec(data)}
                    />
                  </Grid.Col>
                );
              })}
            </Grid>
            <Pagination
              mt="xl"
              mx="auto"
              total={modelStore.pageCount}
              value={modelStore.pageIndex}
              onChange={(value) => modelStore.setPageIndex(value)}
            />
          </Stack>
        </Container>
      )}
    </>
  );
});

export default VehicleModels;
