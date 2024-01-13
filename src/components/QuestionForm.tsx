"use client";

import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
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
import { useGlobalContext } from "@/app/Context/store";
import { Choices, LogicConditionData, Question } from "@/types/questions";

const QuestionForm = () => {
  const {
    questions,
    setQuestions,
    logicConditionsData,
    setLogicConditionsData,
  } = useGlobalContext();
  const [generatedQuestionId, setgeneratedQuestionId] = useState("");
  const [questionCount, setQuestionCount] = useState(1);

  console.log("Questions: ", questions);

  useEffect(() => {
    const targetElement = document.getElementById(`${generatedQuestionId}`);
    if (targetElement) {
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
        title: `Question ${questionCount}: Title...`,
        type: "singleinput",
        inputType: "text",
        isRequired: false,
      },
    ]);
    setQuestionCount((prevCount) => prevCount + 1);
  };

  const deleteQuestions = (
    questionToDelete: Question,
    questionIndexToDelete: number
  ) => {
    if (questions.length > 1 && questionIndexToDelete === 0) {
      const clearLogicForFirstQuestionId = questions[1].questionId;
      setLogicConditionsData((prevLogicConditionsData: LogicConditionData[]) =>
        prevLogicConditionsData.filter(
          (logic: LogicConditionData) =>
            clearLogicForFirstQuestionId !== logic.currentQuestionId
        )
      );
    }
    setLogicConditionsData((prevLogicConditionsData: LogicConditionData[]) =>
      prevLogicConditionsData.filter(
        (logic: LogicConditionData) =>
          questionToDelete.questionId !== logic?.selectedQuestion?.questionId &&
          questionToDelete.questionId !== logic?.currentQuestionId
      )
    );
    // Question Delete
    const updatedQuestions = questions.filter(
      (question: Question) =>
        questionToDelete.questionId !== question.questionId
    );
    console.log("updated questions after delete: ", updatedQuestions);
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
    const updatedQuestions: Question[] = [...questions];
    const questionToUpdate: any = updatedQuestions[index];
    questionToUpdate[field] = value;
    setQuestions(updatedQuestions);
  };

  const adminAnswerField = (question: Question, index: number) => {
    // console.log(question);
    switch (question.type) {
      case "singleinput":
        return (
          <SingleInput
            adminMode={true}
            question={question}
            index={index}
            handleDataChange={handleDataChange}
          />
        );

      case "textarea":
        return <LongText adminMode={true} />;

      case "radiogroup":
        return (
          <RadioGroup
            adminMode={true}
            question={question}
            index={index}
            handleDataChange={handleDataChange}
          />
        );

      case "checkboxes":
        return (
          <CheckBoxes
            adminMode={true}
            question={question}
            index={index}
            handleDataChange={handleDataChange}
          />
        );

      case "boolean":
        return <Boolean adminMode={true} />;

      case "ratingscale":
        return (
          <RatingScale
            adminMode={true}
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
                  isInvalid={question.name ? false : true}
                  // color={!question.name? "danger" : "success"}
                  errorMessage={
                    !question.name && "Please Provide Question Name"
                  }
                  value={question.name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleDataChange(index, "name", e.target.value)
                  }
                  onBlur={() => {
                    if (!question.name) {
                      {
                        handleDataChange(
                          index,
                          "name",
                          `Question ${questionCount}`
                        );
                        setQuestionCount((prevCount) => prevCount + 1);
                      }
                    }
                  }}
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
                  isInvalid={question.title ? false : true}
                  errorMessage={
                    !question.title && "Please Provide Question's Title"
                  }
                  label="Question title:"
                  labelPlacement={"outside"}
                  size={"md"}
                  value={question.title}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    handleDataChange(index, "title", e.target.value);
                  }}
                  onBlur={() => {
                    if (question.name && !question.title) {
                      handleDataChange(
                        index,
                        "title",
                        `${question.name}: Title...`
                      );
                    }
                  }}
                  onClear={() => {
                    handleDataChange(index, "title", "");
                  }}
                />
              </CardHeader>

              <CardBody className="p-3">
                <div className="rounded-md bg-blue-100">
                  {adminAnswerField(question, index)}
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

                      if (questions.length > 1) {
                        setLogicConditionsData(
                          (prevLogicConditionsData: LogicConditionData[]) =>
                            prevLogicConditionsData.filter(
                              (logic: LogicConditionData) =>
                                question.questionId !==
                                logic?.selectedQuestion?.questionId
                            )
                        );
                      }

                      //  Single Input default and depende properties handle
                      if (e.target.value === "singleinput") {
                        handleDataChange(index, "inputType", "text");
                      } else {
                        delete question.inputType;
                        delete question.max;
                        delete question.min;
                        delete question.step;
                        delete question.defaultValue;
                      }

                      //  Rating Scale default and depende properties handle
                      if (e.target.value === "ratingscale") {
                        handleDataChange(index, "rateCount", 5);
                        handleDataChange(index, "rateType", "number");
                      } else {
                        delete question.rateType;
                        delete question.rateCount;
                      }
                      //  Checkboxes & Radio Group default and depende properties handle
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
                      if (
                        question.type !== "checkboxes" &&
                        question.type !== "radiogroup"
                      ) {
                        delete question.choices;
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
                      } else {
                        delete question.maxSelectedChoices;
                        delete question.minSelectedChoices;
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

                          if (
                            questions.length > 1 &&
                            question &&
                            question.type === "singleinput"
                          ) {
                            setLogicConditionsData(
                              (prevLogicConditionsData: LogicConditionData[]) =>
                                prevLogicConditionsData.filter(
                                  (logic: LogicConditionData) =>
                                    question.questionId !==
                                    logic?.selectedQuestion?.questionId
                                )
                            );
                          }

                          if (e.target.value === "range") {
                            handleDataChange(index, "max", 100);
                            handleDataChange(index, "min", 0);
                            handleDataChange(index, "defaultValue", 50);
                            handleDataChange(index, "step", 10);
                          }
                          if (e.target.value !== "range") {
                            delete question.max;
                            delete question.min;
                            delete question.step;
                            delete question.defaultValue;
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
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                          handleDataChange(index, "rateType", e.target.value);
                          if (
                            questions.length > 1 &&
                            question &&
                            question.type === "ratingscale"
                          ) {
                            setLogicConditionsData(
                              (prevLogicConditionsData: LogicConditionData[]) =>
                                prevLogicConditionsData.filter(
                                  (logic: LogicConditionData) =>
                                    question.questionId !==
                                    logic?.selectedQuestion?.questionId
                                )
                            );
                          }
                        }}
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
                  <ConditionalLogicEditor index={index} />

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
                      onClick={() => deleteQuestions(question, index)}
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
