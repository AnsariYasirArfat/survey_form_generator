"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Input,
  Button,
  Select,
  SelectItem,
  Tooltip,
} from "@nextui-org/react";
import { Asterisk, CopyPlus, Plus, Trash2 } from "lucide-react";
import {
  answerTypesData,
  rateTypes,
  singleInputTypes,
} from "@/utils/answerTypesData";
import ConditionalLogicEditor from "./ConditionalLogicEditor";
import LongText from "./answerTypes/LongText";
import RadioGroup from "./answerTypes/RadioGroup";
import CheckBoxes from "./answerTypes/CheckBoxes";
import SingleInput from "./answerTypes/SingleInput";
import Boolean from "./answerTypes/Boolean";
import RatingScale from "./answerTypes/RatingScale";
import DefaultAnswer from "./answerTypes/DefaultUI";

export interface Choices {
  value?: string;
  text?: string;
}

export interface Question {
  questionId?: string;
  name?: string;
  title?: string;
  inputType?: string;
  type?: string;
  choices?: Choices[];
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  rateType?: string;
  rateCount?: number;
  isRequired?: boolean;
  maxSelectedChoices?: number;
  minSelectedChoices?: number;
}

export interface QuestionFormProp {
  questions: Question[];
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
}

const QuestionForm = ({ questions, setQuestions }: QuestionFormProp) => {
  const [generatedQuestionId, setgeneratedQuestionId] = useState("");
  const [questionCount, setQuestionCount] = useState(1);
  console.log("Question: ", questions);

  useEffect(() => {
    const targetElement = document.getElementById(`${generatedQuestionId}`);
    if (targetElement) {
      // console.log("target: ", targetElement);
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [generatedQuestionId]);

  const addQuestions = () => {
    const generatedId = uuidv4();
    setgeneratedQuestionId(generatedId);

    setQuestions([
      ...questions,
      {
        questionId: generatedId,
        name: `Question ${questionCount}`,
        isRequired: false,
      },
    ]);
    setQuestionCount((prevCount) => prevCount + 1);
  };

  const deleteQuestions = (questionToDelete: Question) => {
    const updatedQuestions = questions.filter(
      (question: Question) => questionToDelete !== question
    );
    setQuestions(updatedQuestions);
  };

  const duplicateQuestions = (questionToDuplicate: Question) => {
    const generatedId = uuidv4();
    const questionToAdd = { ...questionToDuplicate };
    questionToAdd.questionId = generatedId;
    questionToAdd.name = `Question ${questionCount}`;

    const allQuestion = [...questions, questionToAdd];

    setQuestions(allQuestion);
    setgeneratedQuestionId(generatedId);
    setQuestionCount((prevCount) => prevCount + 1);
  };

  const handleDataChange = (
    index: number,
    field: keyof Question,
    value: string | boolean | number | Choices[]
  ) => {
    // Updating the specified field of the question at the given index
    const updatedQuestions: any = [...questions];
    const questionToUpdate = updatedQuestions[index];
    questionToUpdate[field] = value;
    // To Handle subTypes properties, specific to answer type
    if (
      questionToUpdate.type !== "singleinput" &&
      questionToUpdate.inputType !== undefined
    ) {
      delete questionToUpdate.inputType;
    }

    if (
      questionToUpdate.type !== "ratingscale" &&
      (questionToUpdate.rateType !== undefined ||
        questionToUpdate.rateCount !== undefined)
    ) {
      delete questionToUpdate.rateType;
      delete questionToUpdate.rateCount;
    }

    if (
      questionToUpdate.type !== "checkboxes" &&
      (questionToUpdate.maxSelectedChoices !== undefined ||
        questionToUpdate.minSelectedChoices !== undefined)
    ) {
      delete questionToUpdate.maxSelectedChoices;
      delete questionToUpdate.minSelectedChoices;
    }

    if (
      questionToUpdate.type !== "checkboxes" &&
      questionToUpdate.type !== "radiogroup" &&
      questionToUpdate.choices !== undefined
    ) {
      delete questionToUpdate.choices;
    }

    // if (
    //   questionToUpdate.type === "singleinput" &&
    //   (questionToUpdate.inputType !== "number" ||
    //     questionToUpdate.inputType !== "range" ||
    //     questionToUpdate.inputType !== "date" ||
    //     questionToUpdate.inputType !== "time") &&
    //   (questionToUpdate.max !== undefined || questionToUpdate.min !== undefined)
    // ) {
    //   delete questionToUpdate.max;
    //   delete questionToUpdate.min;
    // }
    // if (
    //   questionToUpdate.type === "singleinput" &&
    //   (questionToUpdate.inputType !== "number" ||
    //     questionToUpdate.inputType !== "range") &&
    //   questionToUpdate.step !== undefined
    // ) {
    //   delete questionToUpdate.step;
    // }
    // if (
    //   questionToUpdate.type !== "singleinput" &&
    //   (questionToUpdate.max !== undefined ||
    //     questionToUpdate.min !== undefined ||
    //     questionToUpdate.step !== undefined)
    // ) {
    //   delete questionToUpdate.max;
    //   delete questionToUpdate.min;
    //   delete questionToUpdate.step;
    // }
    if (
      (questionToUpdate.type !== "singleinput" ||
        questionToUpdate.type === "singleinput") &&
      questionToUpdate.inputType !== "range" &&
      questionToUpdate.defaultValue !== undefined
    ) {
      delete questionToUpdate.defaultValue;
    }
    setQuestions(updatedQuestions);
  };

  const renderAnswerField = (question: Question, index: number) => {
    // console.log(question);
    switch (question.type) {
      case "singleinput":
        return (
          <SingleInput
            question={question}
            index={index}
            handleDataChange={handleDataChange}
          />
        );

      case "textarea":
        return <LongText />;

      case "radiogroup":
        return (
          <RadioGroup
            question={question}
            index={index}
            handleDataChange={handleDataChange}
          />
        );

      case "checkboxes":
        return (
          <CheckBoxes
            question={question}
            index={index}
            handleDataChange={handleDataChange}
          />
        );

      case "boolean":
        return <Boolean />;

      case "ratingscale":
        return <RatingScale question={question} />;
      default:
        return <DefaultAnswer />;
    }
  };

  return (
    <div>
      <h1 className="font-bold text-xl text-center text-blue-400 my-2">
        {questions.length === 0
          ? "Create Survey Questions"
          : questions.length === 1
          ? "Survey Question"
          : "Survey Questions"}
      </h1>
      <div className="mx-4 grid grid-cols-1 gap-4 ">
        {questions.map((question, index) => {
          return (
            <Card
              key={index}
              id={question.questionId}
              isFooterBlurred
              className="w-full bg-blue-300 "
            >
              <CardHeader className="grid grid-cols-4 gap-3">
                <Input
                  isRequired={question.isRequired}
                  type="text"
                  classNames={{
                    input: ["text-black capitalize font-semibold"],
                    description: ["text-black"],
                    label: [""],
                  }}
                  label="Question name:"
                  labelPlacement={"outside"}
                  size={"md"}
                  value={question.name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleDataChange(index, "name", e.target.value)
                  }
                  onClear={() => {
                    handleDataChange(index, "name", "");
                  }}
                  isClearable
                />
                <Input
                  isRequired={question.isRequired}
                  isClearable
                  type="text"
                  classNames={{
                    base: ["col-span-3"],
                    input: ["text-black capitalize font-semibold"],
                    description: ["text-black"],
                  }}
                  label="Question title:"
                  labelPlacement={"outside"}
                  size={"md"}
                  value={question.title || ""}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleDataChange(index, "title", e.target.value)
                  }
                  onClear={() => {
                    handleDataChange(index, "title", "");
                  }}
                />
              </CardHeader>

              <CardBody className="p-3">
                <div className="rounded-md bg-blue-100">
                  {renderAnswerField(question, index)}
                </div>
              </CardBody>
              <CardFooter className="grid grid-cols-3 gap-4">
                <div className="w-full">
                  <Select
                    label="Choose the answer Type:"
                    className="max-w-xs"
                    selectedKeys={question.type ? [question.type] : undefined}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                      handleDataChange(index, "type", e.target.value);
                      if (question.type === "singleinput") {
                        handleDataChange(index, "inputType", "text");
                      }
                      if (question.type === "ratingscale") {
                        handleDataChange(index, "rateType", "number");
                      }
                      if (question.type === "checkboxes") {
                        handleDataChange(index, "choices", [
                          {
                            text: "Choice 1",
                            value: "Choice 1",
                          },
                          {
                            text: "Choice 2",
                            value: "Choice 2",
                          },
                        ]);
                        handleDataChange(index, "maxSelectedChoices", 1);
                        handleDataChange(index, "minSelectedChoices", 1);
                      }
                      if (question.type === "radiogroup") {
                        handleDataChange(index, "choices", [
                          {
                            text: "Choice 1",
                            value: "Choice 1",
                          },
                          {
                            text: "Choice 2",
                            value: "Choice 2",
                          },
                        ]);
                      }
                    }}
                  >
                    {answerTypesData.map((answerType) => (
                      <SelectItem key={answerType.type} value={answerType.type}>
                        {answerType.label}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                <div className="h-full w-full">
                  {question && question.type === "singleinput" && (
                    <div className="w-full">
                      <Select
                        label="Select Input Type:"
                        className="max-w-xs"
                        defaultSelectedKeys={["text"]}
                        selectedKeys={
                          question.inputType ? [question.inputType] : undefined
                        }
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                          handleDataChange(index, "inputType", e.target.value);
                          if (e.target.value === "range") {
                            handleDataChange(index, "max", 100);
                            handleDataChange(index, "min", 0);
                            handleDataChange(index, "defaultValue", 50);
                            handleDataChange(index, "step", 10);
                          }
                        }}
                      >
                        {singleInputTypes.map((inputType) => (
                          <SelectItem
                            key={inputType.type}
                            value={inputType.type}
                          >
                            {inputType.label}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>
                  )}
                  {question && question.type === "ratingscale" && (
                    <div className="w-full">
                      <Select
                        label="Select Rate Type:"
                        className="max-w-xs"
                        defaultSelectedKeys={["number"]}
                        selectedKeys={
                          question.rateType ? [question.rateType] : undefined
                        }
                        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                          handleDataChange(index, "rateType", e.target.value)
                        }
                      >
                        {rateTypes.map((rateType) => (
                          <SelectItem key={rateType.type} value={rateType.type}>
                            {rateType.label}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>
                  )}
                </div>
                <div className="flex justify-end h-full items-end gap-2">
                  <ConditionalLogicEditor questions={questions} />

                  <Tooltip content="Required">
                    <Button
                      radius="sm"
                      size={"sm"}
                      onClick={() => {
                        handleDataChange(
                          index,
                          "isRequired",
                          !question.isRequired
                        );
                      }}
                    >
                      <Asterisk
                        size={question.isRequired ? `24` : `16`}
                        color={question.isRequired ? `red` : `black`}
                      />
                    </Button>
                  </Tooltip>
                  <Tooltip content="Duplicate">
                    <Button
                      radius="sm"
                      size={"sm"}
                      onClick={() => duplicateQuestions(question)}
                    >
                      <CopyPlus size={"16"} />
                    </Button>
                  </Tooltip>
                  <Tooltip content="Delete" color={"danger"}>
                    <Button
                      radius="sm"
                      size={"sm"}
                      color={"danger"}
                      onClick={() => deleteQuestions(question)}
                    >
                      <Trash2 size={"16"} />
                    </Button>
                  </Tooltip>
                </div>
              </CardFooter>
            </Card>
          );
        })}
        <div className="flex justify-center items-center">
          <Button
            onClick={addQuestions}
            className="w-full h-12 font-semibold text-lg"
            color="primary"
            radius="sm"
            variant="ghost"
          >
            <Plus size={20} />
            Add Questions
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuestionForm;
