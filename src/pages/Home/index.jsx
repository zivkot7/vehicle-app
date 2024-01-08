import React, { useEffect } from "react";
import SearchInput from "../../components/SearchInput";
import {
  ActionIcon,
  Button,
  Container,
  Grid,
  Group,
  LoadingOverlay,
  Pagination,
  Stack,
  Title,
  Tooltip,
} from "@mantine/core";
import { SortBtn } from "../../components/SortBtn";
import { VehicleCard } from "../../components/VehicleCard";
import { homeStyle } from "../../styles/Home/styles";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { makeStore } from "../../stores/VehicleMakeStore";
import { cardSpanCalculator } from "../../utils/cardSpanCalculator";
import { handleSearch, handleSort } from "../../utils/filterHandlers";
import { SELECT_BRAND_DATA } from "../../utils/Constants";
import { theme } from "../../providers/Theme";

const Home = observer(() => {
  const navigate = useNavigate();

  const handleNavigateEdit = (item) => {
    navigate(`brand/${item.id}`, { state: item });
  };

  const handleDelete = (id) => {
    makeStore.deleteMake(id);
  };

  const renderButtons = (item) => {
    return (
      <Group justify="space-between">
        <Tooltip label="Edit Brand" withArrow arrowSize={10}>
          <Button onClick={() => handleNavigateEdit({ ...item })}>Edit</Button>
        </Tooltip>
        <Tooltip label="Delete Brand " withArrow arrowSize={10} color="red.8">
          <Button
            variant="outline"
            c={theme.colors.primary[4]}
            onClick={() => handleDelete(item.id)}
          >
            Delete
          </Button>
        </Tooltip>
      </Group>
    );
  };

  useEffect(() => {
    makeStore.getMake();
  }, []);

  return (
    <>
      {makeStore.isLoading ? (
        <LoadingOverlay
          visible={makeStore.isLoading}
          zIndex={1000}
          overlayProps={{ radius: "xl", blur: 2 }}
          loaderProps={{ type: "dots", size: 150 }}
        />
      ) : (
        <Container size="xl">
          <Stack align="center" mt={10}>
            <Title style={homeStyle.title}>Vehicle brands</Title>
            <Group mt={10}>
              <SearchInput
                onChange={(value) =>
                  handleSearch({ query: value, store: makeStore })
                }
                initialValue={makeStore.searchQuery}
              />
              <SortBtn
                data={SELECT_BRAND_DATA}
                initialValue={makeStore.sort}
                onChange={(value) =>
                  handleSort({ query: value, store: makeStore })
                }
              />
            </Group>
            <Grid gutter="xl">
              {makeStore.make.map((data) => {
                return (
                  <Grid.Col
                    span={cardSpanCalculator(makeStore.make.length, 4)}
                    key={data.id}
                  >
                    <VehicleCard
                      data={data}
                      onClick={() => navigate(`models/${data.id}`)}
                      renderButtons={renderButtons(data)}
                    />
                  </Grid.Col>
                );
              })}
            </Grid>
            <Pagination
              mt="xl"
              mx="auto"
              total={makeStore.pageCount}
              value={makeStore.pageIndex}
              onChange={(value) => makeStore.setPageIndex(value)}
            />
          </Stack>
        </Container>
      )}
    </>
  );
});
export default Home;
