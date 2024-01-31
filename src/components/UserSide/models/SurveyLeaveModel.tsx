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
import { MoveLeft } from "lucide-react";
import React from "react";

const SurveyLeaveModel = ({ handleLeaveSurvey }: any) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        onPress={onOpen}
        radius="none"
        color="danger"
        variant="shadow"
        className="flex gap-2 text-sm font-bold bg-red-600 text-white rounded-md hover:bg-red-500 transition duration-300"
      >
        <MoveLeft size={"18"} />
        Leave Survey
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
              <ModalHeader className="flex flex-col gap-1 font-bold">
                Leaving Survey!
              </ModalHeader>
              <ModalBody>
                <p className="font-semibold">
                  Warning: Exiting the survey at this point will result in the
                  loss of your current progress. Are you sure you want to leave?
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
                  No
                </Button>
                <Button
                  color="primary"
                  variant="shadow"
                  radius="sm"
                  onPress={onClose}
                  onClick={() => handleLeaveSurvey()}
                >
                  Yes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default SurveyLeaveModel;
