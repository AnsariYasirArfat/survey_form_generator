"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Button,
  Tooltip,
  Chip,
  AutocompleteItem,
  Autocomplete,
} from "@nextui-org/react";
import { Asterisk, CopyPlus, Network, Plus } from "lucide-react";
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
import { Choices, Question, VisibleIf } from "@/types/questions";
import DeleteQuestionModel from "./models/DeleteQuestionModel";
const QuestionForm = () => {
  const { questions, setQuestions } = useGlobalContext();
  const [generatedQuestionId, setGeneratedQuestionId] = useState("");
  const [questionCount, setQuestionCount] = useState(1);

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
    setGeneratedQuestionId(generatedId);

    setQuestions((prevQuestions) => [
      ...prevQuestions,
      {
        questionId: generatedId,
        name: `Question ${questionCount}`,
        title: `Title for question ${questionCount}`,
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
      setQuestions((prevQuestions: Question[]) => {
        delete prevQuestions[1]["visibleIf"];
        return [...prevQuestions];
      });
    }

    setQuestions((prevQuestions: Question[]) => {
      const removedDeletedQuestionLogic = prevQuestions.map((question) => {
        if (question.visibleIf) {
          question.visibleIf = question.visibleIf.filter(
            (logic) =>
              logic.selectQuestId !==
              prevQuestions[questionIndexToDelete].questionId
          );
        }
        return question;
      });

      return [...removedDeletedQuestionLogic];
    });

    // Delete the question
    setQuestions((prevQuestions) =>
      prevQuestions.filter(
        (question: Question) =>
          questionToDelete.questionId !== question.questionId
      )
    );
  };

  const duplicateQuestions = (questionToDuplicate: Question) => {
    const generatedId = uuidv4();
    setGeneratedQuestionId(generatedId);

    setQuestions((prevQuestions) => [
      ...prevQuestions,
      {
        ...questionToDuplicate,
        questionId: generatedId,
        name: `Question ${questionCount}`,
      },
    ]);

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
              <CardHeader className="grid grid-cols-12 gap-3">
                <Chip
                  color="primary"
                  size="lg"
                  radius="sm"
                  variant="shadow"
                  className="place-self-center"
                >
                  {`No. ${index + 1}`}
                </Chip>
                <Input
                  isRequired={question.isRequired}
                  type="text"
                  classNames={{
                    base: ["col-span-3"],
                    input: ["text-black  font-semibold"],
                    description: ["text-black"],
                    label: [""],
                  }}
                  label="Question name:"
                  labelPlacement={"outside"}
                  size={"md"}
                  isInvalid={question.name ? false : true}
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
                    base: ["col-span-8"],
                    input: ["text-black  font-semibold"],
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
                        `Title for ${question.name.toLowerCase()}`
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
              <CardFooter className="grid grid-cols-12 gap-4">
                <div className="w-full col-span-3">
                  <Autocomplete
                    label="Choose the answer type:"
                    className="max-w-xs"
                    defaultItems={answerTypesData}
                    selectedKey={`${question.type!}`}
                    isClearable={false}
                    onSelectionChange={(e) => {
                      handleDataChange(index, "type", e);

                      if (questions.length > 1) {
                        setQuestions((prevQuestions: Question[]) =>
                          prevQuestions.map((question) => {
                            if (question.visibleIf) {
                              const visibleIfUpdate = question.visibleIf.filter(
                                (logic) =>
                                  logic.selectQuestId !==
                                  questions[index].questionId
                              );
                              question.visibleIf =
                                visibleIfUpdate.length > 0
                                  ? visibleIfUpdate
                                  : undefined;
                            }
                            return question;
                          })
                        );
                      }

                      //  Single Input default and dependent properties handle
                      if (e === "singleinput") {
                        handleDataChange(index, "inputType", "text");
                      } else {
                        delete question.inputType;
                        delete question.max;
                        delete question.min;
                        delete question.step;
                        delete question.defaultValue;
                      }

                      //  Rating Scale default and dependent properties handle
                      if (e === "ratingscale") {
                        handleDataChange(index, "rateCount", 5);
                        handleDataChange(index, "rateType", "number");
                      } else {
                        delete question.rateType;
                        delete question.rateCount;
                      }
                      //  Checkboxes & Radio Group default and dependent properties handle
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
                      <AutocompleteItem
                        key={answerType.type}
                        value={answerType.type}
                      >
                        {answerType.label}
                      </AutocompleteItem>
                    ))}
                  </Autocomplete>
                </div>
                <div className="h-full w-full  col-span-3">
                  {question && question.type === "singleinput" && (
                    <div className="w-full">
                      <Autocomplete
                        label="Select Input Type:"
                        className="max-w-xs"
                        defaultItems={singleInputTypes}
                        selectedKey={`${question.inputType!}`}
                        isClearable={false}
                        onSelectionChange={(e) => {
                          handleDataChange(index, "inputType", e);

                          if (
                            questions.length > 1 &&
                            question &&
                            question.type === "singleinput"
                          ) {
                            setQuestions((prevQuestions: Question[]) =>
                              prevQuestions.map((question) => {
                                if (question.visibleIf) {
                                  const visibleIfUpdate =
                                    question.visibleIf.filter(
                                      (logic) =>
                                        logic.selectQuestId !==
                                        questions[index].questionId
                                    );
                                  question.visibleIf =
                                    visibleIfUpdate.length > 0
                                      ? visibleIfUpdate
                                      : undefined;
                                }
                                return question;
                              })
                            );
                          }

                          if (e === "range") {
                            handleDataChange(index, "max", 100);
                            handleDataChange(index, "min", 0);
                            handleDataChange(index, "defaultValue", 50);
                            handleDataChange(index, "step", 10);
                          }
                          if (e !== "range") {
                            delete question.max;
                            delete question.min;
                            delete question.step;
                            delete question.defaultValue;
                          }
                        }}
                      >
                        {singleInputTypes.map((inputType) => (
                          <AutocompleteItem
                            key={inputType.type}
                            value={inputType.type}
                          >
                            {inputType.label}
                          </AutocompleteItem>
                        ))}
                      </Autocomplete>
                    </div>
                  )}
                  {question && question.type === "ratingscale" && (
                    <div className="w-full">
                      <Autocomplete
                        label="Select Rate Type:"
                        className="max-w-xs"
                        defaultItems={rateTypes}
                        selectedKey={`${question.rateType!}`}
                        isClearable={false}
                        onSelectionChange={(e) => {
                          handleDataChange(index, "rateType", e);
                          if (
                            questions.length > 1 &&
                            question &&
                            question.type === "ratingscale"
                          ) {
                            setQuestions((prevQuestions: Question[]) =>
                              prevQuestions.map((question) => {
                                if (question.visibleIf) {
                                  const visibleIfUpdate =
                                    question.visibleIf.filter(
                                      (logic) =>
                                        logic.selectQuestId !==
                                        questions[index].questionId
                                    );
                                  question.visibleIf =
                                    visibleIfUpdate.length > 0
                                      ? visibleIfUpdate
                                      : undefined;
                                }
                                return question;
                              })
                            );
                          }
                        }}
                      >
                        {rateTypes.map((rateType) => (
                          <AutocompleteItem
                            key={rateType.type}
                            value={rateType.type}
                          >
                            {rateType.label}
                          </AutocompleteItem>
                        ))}
                      </Autocomplete>
                    </div>
                  )}
                </div>
                <div className=" col-span-3"></div>
                <div className=" col-span-3 flex justify-end h-full items-end gap-2">
                  {index === 0 ? (
                    <Tooltip>
                      <Button
                        isDisabled={index === 0 ? true : false}
                        radius="sm"
                        size={"sm"}
                      >
                        <Network size={"16"} />
                      </Button>
                    </Tooltip>
                  ) : (
                    <ConditionalLogicEditor index={index} />
                  )}
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

                  <DeleteQuestionModel
                    deleteQuestions={deleteQuestions}
                    question={question}
                    index={index}
                  />
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
