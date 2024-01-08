import React, { useState } from "react";
import { createForm } from "./Form";
import { observer } from "mobx-react";
import {
  Button,
  CloseButton,
  Container,
  Grid,
  Group,
  Image,
  Paper,
  Text,
  Title,
} from "@mantine/core";
import { CustomInput } from "../../components/CustomInput";
import FileDropZone from "../../components/FileDropZone";
import { useNavigate } from "react-router-dom";

export const Create = observer(({ form }) => {
  const [file, setFile] = useState(null);
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
    if (!form.hasError) {
      setFile(null);
    }
    navigate("/");
  };

  return (
    <Container size="xs" my={10}>
      <Title ta="center" c="primary" order={2}>
        Add New Brand
      </Title>

      <Paper withBorder shadow="md" p="lg" mt={30} radius="md">
        <form onSubmit={handleSubmit}>
          <Grid gutter="lg">
            <Grid.Col>
              <CustomInput
                label="Brand name"
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
              <Text fw={500} size="sm" py={8}>
                Add logo
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
  );
});

export const VehicleMakeCreate = () => <Create form={createForm} />;
