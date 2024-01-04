import React from "react";
import { Group, Text, rem } from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";

const FileDropZone = ({ onChange }) => {
  const handleDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      onChange({ target: { files: [acceptedFiles[0]] } });
    }
  };

  return (
    <>
      <Dropzone
        onDrop={handleDrop}
        maxSize={5 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
      >
        <Group
          mr={30}
          justify="center"
          gap="xl"
          mih={220}
          style={{ pointerEvents: "none" }}
        >
          <Dropzone.Accept>
            <IconUpload
              style={{
                width: rem(52),
                height: rem(52),
                color: "var(--mantine-color-blue-6)",
              }}
              stroke={1.5}
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX
              style={{
                width: rem(52),
                height: rem(52),
                color: "var(--mantine-color-red-6)",
              }}
              stroke={1.5}
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconPhoto
              style={{
                width: rem(52),
                height: rem(52),
                color: "var(--mantine-color-dimmed)",
              }}
              stroke={1.5}
            />
          </Dropzone.Idle>

          <div>
            <Text size="xl" inline>
              Drag image here or click to select file
            </Text>
            <Text size="md" c="dimmed" inline mt={7}>
              Attach file as you like, file should not exceed 5mb
            </Text>
          </div>
        </Group>
      </Dropzone>
    </>
  );
};

export default FileDropZone;
