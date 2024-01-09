"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
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
  Card,
  CardHeader,
  Input,
  CardBody,
  CardFooter,
} from "@nextui-org/react";
import { Network } from "lucide-react";
import { useGlobalContext } from "@/app/Context/store";
import { AnswerTypeComponentProps, Question } from "@/types/questions";
import SingleInput from "./answerTypes/SingleInput";
import LongText from "./answerTypes/LongText";
import RadioGroup from "./answerTypes/RadioGroup";
import CheckBoxes from "./answerTypes/CheckBoxes";
import Boolean from "./answerTypes/Boolean";
import RatingScale from "./answerTypes/RatingScale";
import DefaultAnswer from "./answerTypes/DefaultUI";

interface ConditionalLogicEditorProps
  extends Omit<AnswerTypeComponentProps, "adminMode" | "question"> {}

const ConditionalLogicEditor = ({
  index,
  handleDataChange,
}: ConditionalLogicEditorProps) => {
  const { questions } = useGlobalContext();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedQuestionId, setSelectedQuestionId] = useState<
    string | undefined
  >(undefined);

  const [selectedQuestion, setselectedQuestion] = useState<
    Question | undefined
  >(undefined);
  useEffect(() => {
    if (selectedQuestionId) {
      const question = questions.find(
        (ques) => ques.questionId === selectedQuestionId
      );
      setselectedQuestion(question);
    }
  }, [questions, selectedQuestionId]);

  console.log("selectedQuestionId: ", selectedQuestionId);
  const questionList: Question[] = questions.filter(
    (question: Question) => questions[index] !== question
  );
  const userAnswerField = (question: Question, index: number) => {
    // console.log(question);
    switch (question.type) {
      case "singleinput":
        return (
          <SingleInput
            adminMode={false}
            question={question}
            index={index}
            handleDataChange={handleDataChange}
          />
        );

      case "textarea":
        return <LongText adminMode={false} />;

      case "radiogroup":
        return (
          <RadioGroup
            adminMode={false}
            question={question}
            index={index}
            handleDataChange={handleDataChange}
          />
        );

      case "checkboxes":
        return (
          <CheckBoxes
            adminMode={false}
            question={question}
            index={index}
            handleDataChange={handleDataChange}
          />
        );

      case "boolean":
        return <Boolean adminMode={false} />;

      case "ratingscale":
        return (
          <RatingScale
            adminMode={false}
            question={question}
            index={index}
            handleDataChange={handleDataChange}
          />
        );

      default:
        return <DefaultAnswer />;
    }
  };

  return (
    <>
      <Tooltip content="Logic">
        <Button
          isDisabled={index === 0 ? true : false}
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
                    selectedKeys={
                      selectedQuestionId ? [selectedQuestionId] : undefined
                    }
                    onChange={
                      (e: ChangeEvent<HTMLSelectElement>) =>
                        setSelectedQuestionId(e.target.value)
                      // handleDataChange(index, "inputType", e.target.value)
                    }
                  >
                    {questionList.map((question, index) => (
                      <SelectItem
                        key={`${question.questionId}`}
                        value={question.questionId}
                      >
                        {question.name}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                {selectedQuestion && selectedQuestionId && (
                  <Card
                    key={index}
                    //  id={question.questionId}
                    isFooterBlurred
                    className="w-full bg-blue-300 "
                  >
                    <CardHeader className="grid grid-cols-4 gap-3">
                      {/* <Input
                        readOnly
                        isRequired={selectedQuestion.isRequired}
                        type="text"
                        classNames={{
                          input: ["text-black capitalize font-semibold"],
                          description: ["text-black"],
                          label: [""],
                        }}
                        label="Question name:"
                        labelPlacement={"outside"}
                        size={"md"}
                        value={selectedQuestion.name}
                      /> */}
                      <Input
                        readOnly
                        isRequired={selectedQuestion.isRequired}
                        type="text"
                        classNames={{
                          base: ["col-span-4"],
                          input: ["text-black capitalize font-semibold"],
                          description: ["text-black"],
                        }}
                        size={"md"}
                        value={selectedQuestion.title}
                      />
                    </CardHeader>

                    <CardBody className="p-3">
                      <div className="rounded-md bg-blue-100">
                        {userAnswerField(selectedQuestion, index)}
                      </div>
                    </CardBody>
                    <CardFooter className="grid grid-cols-3 gap-4"></CardFooter>
                  </Card>
                )}
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
