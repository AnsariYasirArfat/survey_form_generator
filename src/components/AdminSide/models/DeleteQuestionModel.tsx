"use client";
import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { Trash2 } from "lucide-react";
import React from "react";

const DeleteQuestionModel = ({ question, index, deleteQuestions }: any) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Tooltip content="Delete" color={"danger"}>
        <Button
          onPress={onOpen}
          radius="sm"
          size={"sm"}
          color={"danger"}
          variant="shadow"
        >
          <Trash2 size={"16"} />
        </Button>
      </Tooltip>{" "}
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
                Question Deletion!
              </ModalHeader>
              <ModalBody>
                <p>
                  Warning: Deleting this question will remove all linked logics
                  across other questions. Delete only if you&apos;re sure.
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
                  onClick={() => deleteQuestions(question, index)}
                >
                  <Trash2 size={"16"} />
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteQuestionModel;
