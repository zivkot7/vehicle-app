import React from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";

export const VehiclePreviewModal = () => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Modal opened={opened} onClose={close} title="Authentication">
        fgfdgfdd
      </Modal>

      <Button onClick={open}>Open modal</Button>
    </>
  );
};
