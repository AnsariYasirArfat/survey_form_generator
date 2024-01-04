// "use client";
import React, { ChangeEvent, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Tooltip,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { Network } from "lucide-react";
import { Question } from "./QuestionForm";

interface ConditionalLogicEditorProps {
  questions: Question[];
}

const ConditionalLogicEditor = ({ questions }: ConditionalLogicEditorProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedQuestion, setSelectedQuestion] = useState("");

  return (
    <>
      <Tooltip content="Logic">
        <Button
          onPress={onOpen}
          // className="h-full w-full font-semibold"
          // fullWidth
          radius="sm"
          size={"sm"}
        >
          <Network size={"16"} />
        </Button>
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size={"4xl"}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-xl text-center font-bold">
                Visible If?
              </ModalHeader>
              <ModalBody>
                <div className="w-full">
                  <Select
                    label="Select question:"
                    className="max-w-xs"
                    // placeholder="Select an type"
                    // defaultSelectedKeys={["text"]}
                    selectedKeys={[selectedQuestion]}
                    onChange={
                      (e: ChangeEvent<HTMLSelectElement>) =>
                        setSelectedQuestion(e.target.value)
                      // handleDataChange(index, "inputType", e.target.value)
                    }
                  >
                    {questions.map((question, index) => (
                      <SelectItem
                        key={`question-${index}-${question.questionId}`}
                        value={question.questionId}
                      >
                        {question.name}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClose}
                  radius="sm"
                >
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={onClose}
                  // variant="light"
                  radius="sm"
                >
                  Apply
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConditionalLogicEditor;
