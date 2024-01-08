import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { observer } from "mobx-react";
import {
  Button,
  CloseButton,
  Container,
  Grid,
  Group,
  Image,
  LoadingOverlay,
  Paper,
  Title,
} from "@mantine/core";
import { editForm } from "./Form";
import { makeStore } from "../../stores/VehicleMakeStore";
import { CustomInput } from "../../components/CustomInput";
import FileDropZone from "../../components/FileDropZone";

const EditBrand = observer(({ form }) => {
  const [file, setFile] = useState(null);
  const convert = file && URL.createObjectURL(file);
  const { id } = useParams();
  const navigate = useNavigate();

  const handlePreview = (e) => {
    if (!e.target.files) {
      return;
    }
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    form.$("image").set(selectedFile);
  };

  const removePreview = () => {
    form.$("image").set("");
    setFile(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    form.submit();
    navigate(-1);
  };

  const handleState = () => {
    if (id) {
      makeStore.getSingleMake(id);
    }

    if (makeStore.singleMake) {
      form.$("name").set(`${makeStore.singleMake.name}`);
      form.$("manufacturer").set(`${makeStore.singleMake.manufacturer}`);
      form.$("image").set(`${makeStore.singleMake.image}`);
    }
  };

  useEffect(() => {
    handleState();
  }, [makeStore.singleMakeId]);

  return (
    <>
      {makeStore.isLoading ? (
        <LoadingOverlay
          visible={true}
          zIndex={1000}
          overlayProps={{ radius: "xl", blur: 2 }}
          loaderProps={{ type: "dots", size: 150 }}
        />
      ) : (
        <Container size="xs" my={20}>
          <Title ta="center" c="primary">
            Edit Brand
          </Title>

          <Paper withBorder shadow="md" p="lg" mt={30} radius="md">
            <form onSubmit={handleSubmit}>
              <Grid gutter="xl">
                <Grid.Col>
                  <CustomInput
                    field={{ ...form.$("name").bind() }}
                    formError={form.errors().name}
                    errorText={form.$("name").error}
                  />
                </Grid.Col>
                <Grid.Col>
                  <CustomInput
                    field={{ ...form.$("manufacturer").bind() }}
                    formError={form.errors().name}
                    errorText={form.$("manufacturer").error}
                  />
                </Grid.Col>

                <Grid.Col>
                  <Paper withBorder mah="20rem" maw="50rem" pos="relative">
                    {file && (
                      <CloseButton
                        pos="absolute"
                        variant="transparent"
                        right={0}
                        onClick={() => removePreview()}
                      />
                    )}

                    <Image
                      src={convert ?? makeStore.singleMake?.image}
                      alt="image"
                      mah={300}
                      fit="contain"
                    />
                  </Paper>
                </Grid.Col>
                <Grid.Col>
                  <Group justify="right" mr={8}>
                    {!file && (
                      <FileDropZone
                        text="Upload Image"
                        onChange={(e) => handlePreview(e)}
                      />
                    )}
                  </Group>
                </Grid.Col>

                <Grid.Col>
                  <Button variant="filled" type="submit" mt="xl">
                    Submit
                  </Button>
                </Grid.Col>
              </Grid>
            </form>
          </Paper>
        </Container>
      )}
    </>
  );
});

export const VehicleMakeEdit = () => <EditBrand form={editForm} />;
