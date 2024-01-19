"use client";
import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { Eraser, Trash2 } from "lucide-react";
import React from "react";

const ClearAllLogicModel = ({
  logicToCurrentQuestions,
  handleClearAllLogicData,
}: any) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        onPress={onOpen}
        isDisabled={
          logicToCurrentQuestions && logicToCurrentQuestions.length > 0
            ? false
            : true
        }
        variant="shadow"
        color="danger"
        radius="sm"
        size="sm"
        className="col-span-2 justify-self-end"
      >
        <Eraser size={"16"} />
        Clear All
      </Button>

      <Modal
        size={"sm"}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900/70 to-zinc-900/70 backdrop-opacity-20",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Clear All Logic Data!
              </ModalHeader>
              <ModalBody>
                <p>
                  Warning: This irreversible action will permanently remove
                  logic applied to this question. Proceed only if you are
                  certain about clearing all logic data.
                </p>
                <Divider />
              </ModalBody>
              <ModalFooter className="gap-3 !pt-2">
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClose}
                  radius="sm"
                >
                  Cancel
                </Button>
                <Button
                  color="danger"
                  variant="shadow"
                  radius="sm"
                  onPress={onClose}
                  //   onPress={handleClearAllLogicData}
                  onClick={handleClearAllLogicData}
                >
                  <Trash2 size={"16"} />
                  Clear All
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ClearAllLogicModel;
