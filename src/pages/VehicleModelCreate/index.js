import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import {
  Paper,
  Title,
  Container,
  Button,
  Grid,
  Image,
  CloseButton,
  Text,
  Group,
  Select,
} from "@mantine/core";
import { createForm } from "./Form";
import FileDropZone from "../../components/FileDropZone";
import { makeStore } from "../../stores/VehicleMakeStore";
import { CustomInput } from "../../components/CustomInput";

export const Create = observer(({ form }) => {
  const [file, setFile] = useState(null);
  const [mappedMakeData, setMappedMakeData] = useState([]);

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
    console.log(form);
    e.preventDefault();
    form.submit();

    if (!form.hasError) {
      setFile(null);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await makeStore.getMake();
      const mappedData = makeStore.make.map((data) => ({
        value: data.id,
        label: data.name,
      }));
      setMappedMakeData(mappedData);
    };

    fetchData();
  }, []);

  return (
    <>
      <Container size="xs" my={20}>
        <Title ta="center" c="primary" order={2}>
          Add New {makeStore.singleMake?.name} Model
        </Title>

        <Paper withBorder shadow="md" p="lg" mt={30} radius="md">
          <form onSubmit={handleSubmit}>
            <Grid gutter="xl">
              <Grid.Col>
                <Select
                  label="Brand"
                  placeholder="Select brand..."
                  data={mappedMakeData}
                  value={form.$("make_id").value || null}
                  onChange={(selectedOption) => {
                    form.$("make_id").set(selectedOption);
                  }}
                />
              </Grid.Col>
              <Grid.Col>
                <CustomInput
                  field={{ ...form.$("name").bind() }}
                  formError={form.errors().name}
                  errorText={form.$("name").error}
                />
              </Grid.Col>
              <Grid.Col>
                <CustomInput
                  field={{ ...form.$("year").bind() }}
                  formError={form.errors().name}
                  errorText={form.$("year").error}
                />
              </Grid.Col>
              <Grid.Col>
                <CustomInput
                  field={{ ...form.$("engine").bind() }}
                  formError={form.errors().name}
                  errorText={form.$("engine").error}
                />
              </Grid.Col>
              <Grid.Col>
                <CustomInput
                  field={{ ...form.$("horse_power").bind() }}
                  formError={form.errors().name}
                  errorText={form.$("horse_power").error}
                />
              </Grid.Col>
              <Grid.Col>
                <CustomInput
                  field={{ ...form.$("transmission").bind() }}
                  formError={form.errors().name}
                  errorText={form.$("transmission").error}
                />
              </Grid.Col>
              <Grid.Col>
                <CustomInput
                  field={{ ...form.$("color").bind() }}
                  formError={form.errors().name}
                  errorText={form.$("color").error}
                />
              </Grid.Col>
              <Grid.Col>
                <Text fw={500} size="sm" py={5}>
                  Add image
                </Text>

                {form.errors().image && (
                  <Text c="red.8">{form.$("image").error}</Text>
                )}
                {file && (
                  <Paper withBorder mah="20rem" maw="50rem" pos="relative">
                    <CloseButton
                      pos="absolute"
                      variant="transparent"
                      right={0}
                      onClick={() => removePreview()}
                    />
                    <Image
                      alt="logo"
                      w="100%"
                      mah={300}
                      fit="contain"
                      src={file ? URL.createObjectURL(file) : null}
                    />
                  </Paper>
                )}
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
    </>
  );
});

export const VehicleModelCreate = () => <Create form={createForm} />;
