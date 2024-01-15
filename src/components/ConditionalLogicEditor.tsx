"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

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
} from "@nextui-org/react";
import { Network, Plus, Trash2 } from "lucide-react";
import { useGlobalContext } from "@/app/Context/store";
import { LogicConditionData, Question } from "@/types/questions";
import SingleInput from "./answerTypes/SingleInput";
import LongText from "./answerTypes/LongText";
import RadioGroup from "./answerTypes/RadioGroup";
import CheckBoxes from "./answerTypes/CheckBoxes";
import Boolean from "./answerTypes/Boolean";
import RatingScale from "./answerTypes/RatingScale";
import DefaultAnswer from "./answerTypes/DefaultUI";
import { comparisonOperators, logicalOperators } from "@/utils/answerTypesData";

const ConditionalLogicEditor = ({ index }: { index: number }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { questions, logicConditionsData, setLogicConditionsData } =
    useGlobalContext();
  const [questionList, setQuestionList] = useState<Question[]>([]);
  // const [filteredComparison, setFilteredComparison] = useState<any>([]);
  const currentQuestion = questions[index!];

  const [logicToCurrentQuestions, setLogicToCurrentQuestions] = useState<
    LogicConditionData[]
  >([]);

  useEffect(() => {
    const currentQuestionLogicData = logicConditionsData.filter((logic) => {
      return currentQuestion.questionId === logic.currentQuestionId;
    });
    console.log("All Logic data: ", logicConditionsData);
    console.log(
      `Current ${currentQuestion.name} Logic Data : `,
      currentQuestionLogicData
    );
    setLogicToCurrentQuestions(currentQuestionLogicData);
  }, [currentQuestion, logicConditionsData]);

  useEffect(() => {
    const idToAvoide: LogicConditionData[] =
      logicConditionsData?.filter(
        (logicData: LogicConditionData) =>
          currentQuestion.questionId === logicData.selectQuestId
      ) || [];

    const finalQuestionList: Question[] = questions.filter(
      (question: Question) =>
        currentQuestion !== question &&
        idToAvoide.every(
          (logic: LogicConditionData) =>
            logic.currentQuestionId !== question.questionId
        )
    );

    // console.log(
    //   `${currentQuestion.name}: logic quesitonlist: `,
    //   finalQuestionList
    // );
    setQuestionList(finalQuestionList);
  }, [currentQuestion, logicConditionsData, questions]);

  const addMoreConditions = () => {
    setLogicConditionsData((prevLogicConditionsData: LogicConditionData[]) => [
      ...prevLogicConditionsData,
      {
        logicDataId: uuidv4(),
        currentQuestionId: currentQuestion.questionId,
        selectQuestId: undefined,
        selectedQuestion: undefined,
        comparisonOperator: undefined,
        logicOperator: undefined,
        answerValue: undefined,
      },
    ]);
  };

  const deleteLogicCondition = (
    logicToDelete: LogicConditionData,
    localIndex: number
  ) => {
    if (logicToCurrentQuestions.length > 1 && localIndex === 0) {
      // console.log(
      //   "logic local data before any delete: ",
      //   logicToCurrentQuestions
      // );

      setLogicConditionsData(
        (prevLogicConditionsData: LogicConditionData[]) => {
          const logicDataIdToUpdate = logicToCurrentQuestions[1].logicDataId;
          const updatedArray = prevLogicConditionsData.map((item) => {
            if (item.logicDataId === logicDataIdToUpdate) {
              // Update the corresponding object
              return { ...item, logicOperator: undefined };
            }
            return item;
          });
          // console.log(`I am here on `, updatedArray);
          return updatedArray;
        }
      );

      // Second Option to update logicOperator to undefined
      // setLogicToCurrentQuestions((prev: LogicConditionData[]) => {
      //   const updatedArray = [...prev];
      //   const logicToUpdate = updatedArray[1];
      //   logicToUpdate["logicOperator"] = undefined;
      //   console.log(`I am here on `, updatedArray);
      //   return updatedArray;
      // });
    }
    setLogicConditionsData((prevLogicConditionsData: LogicConditionData[]) =>
      prevLogicConditionsData.filter(
        (logic: LogicConditionData) =>
          logicToDelete.logicDataId !== logic.logicDataId
      )
    );
  };

  const handleClearAllLogicData = () => {
    setLogicConditionsData((prevLogicConditionsData: LogicConditionData[]) =>
      prevLogicConditionsData.filter(
        (logic: LogicConditionData) =>
          currentQuestion.questionId !== logic.currentQuestionId
      )
    );
  };

  // useEffect(() => {
  //   if (logicToCurrentQuestions.length > 0) {
  //     setLogicToCurrentQuestions((prev: LogicConditionData[]) => {
  //       const updatedArray = [...prev];
  //       const logicToUpdate = updatedArray[0];
  //       logicToUpdate["logicOperator"] = undefined;
  //       console.log(`I am here on `, updatedArray);
  //       return updatedArray;
  //     });
  //   }
  // }, [logicToCurrentQuestions.length]);

  // useEffect(() => {
  //   if (logicToCurrentQuestions.length > 0) {
  //     setLogicConditionsData((prevLogicConditionsData: LogicConditionData[]) => {
  //       const logicDataIdToUpdate = logicToCurrentQuestions[0].logicDataId;
  //       const updatedArray = prevLogicConditionsData.map((item) => {
  //         if (item.logicDataId === logicDataIdToUpdate) {
  //           // Update the corresponding object
  //           return { ...item, logicOperator: undefined };
  //         }
  //         return item;
  //       });
  //       console.log(`I am here on `, updatedArray);
  //       return updatedArray;
  //     });
  //   }
  // }, [logicToCurrentQuestions]);

  const handleLogicConditions = (
    index: number,
    field: keyof LogicConditionData,
    value: string | Question | boolean | number | undefined
  ) => {
    // update in local logic array
    // setLogicToCurrentQuestions(
    //   (prevLogicConditionsData: LogicConditionData[]) => {
    //     const updateLogicData: LogicConditionData[] = [
    //       ...prevLogicConditionsData,
    //     ];
    //     const logicToUpdate: any = updateLogicData[index];
    //     logicToUpdate[field] = value;
    //     return updateLogicData;
    //   }
    // );

    // Update in Main logic array
    setLogicConditionsData((prevLogicConditionsData: LogicConditionData[]) => {
      const logicDataIdToUpdate = logicToCurrentQuestions[index].logicDataId;
      const updateLogicData = prevLogicConditionsData.map((logic) => {
        if (logic.logicDataId === logicDataIdToUpdate) {
          return { ...logic, [field]: value };
        }
        return logic;
      });
      return updateLogicData;
    });
  };

  const handleComparisonArray = (question: Question) => {
    const type = question?.type;
    const inputType = question?.inputType;
    if (type === "singleinput" || type === "textarea") {
      if ((inputType && inputType === "range") || inputType === "number") {
        return ["allof", "anyof", "contain", "notcontain"];
      } else {
        return ["allof", "anyof", ">", ">=", "<", "<="];
      }
    }
    if (type === "radiogroup") {
      // const array = comparisonOperators.filter((operator) => {
      //   return (
      //     ("notcontain" || "<=") !== operator.type && "allof" !== operator.type
      //   );
      // });
      // const array = comparisonOperators.filter((operator) => !["notcontain", "<=", "allof"].includes(operator.type));
      // console.log("comparison operator", array);
      return ["allof", "anyof", ">", ">=", "<", "<=", "contain", "notcontain"];
    }
    if (type === "checkboxes") {
      return [">", ">=", "<", "<=", "contain", "notcontain"];
    }
    if (type === "boolean") {
      return ["allof", "anyof", ">", ">=", "<", "<=", "contain", "notcontain"];
    }
    if (type === "ratingscale") {
      return ["allof", "anyof", "contain", "notcontain"];
    }
  };

  const handleVisibleIf = () => {
    console.log("apply");
  };

  const userAnswerField = (logic: LogicConditionData, index: number) => {
    switch (logic.selectedQuestion!.type) {
      case "singleinput":
        return (
          <SingleInput
            adminMode={false}
            index={index}
            logic={logic}
            handleLogicConditions={handleLogicConditions}
          />
        );

      case "textarea":
        return (
          <LongText
            adminMode={false}
            index={index}
            logic={logic}
            handleLogicConditions={handleLogicConditions}
          />
        );

      case "radiogroup":
        return (
          <RadioGroup
            adminMode={false}
            index={index}
            logic={logic}
            handleLogicConditions={handleLogicConditions}
          />
        );

      case "checkboxes":
        return (
          <CheckBoxes
            adminMode={false}
            index={index}
            logic={logic}
            handleLogicConditions={handleLogicConditions}
          />
        );

      case "boolean":
        return (
          <Boolean
            adminMode={false}
            index={index}
            logic={logic}
            handleLogicConditions={handleLogicConditions}
          />
        );

      case "ratingscale":
        return (
          <RatingScale
            adminMode={false}
            index={index}
            logic={logic}
            handleLogicConditions={handleLogicConditions}
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
          radius="sm"
          size={"sm"}
        >
          <Network size={"16"} />
        </Button>
      </Tooltip>
      <Modal
        isOpen={isOpen}
        hideCloseButton
        onOpenChange={onOpenChange}
        size={"4xl"}
        isDismissable={false}
        scrollBehavior={"inside"}
        classNames={{
          // base: [
          //   `overflow-auto ${
          //     logicToCurrentQuestions.length < 1
          //       ? "h-[30vh]"
          //       : logicToCurrentQuestions.length < 2
          //       ? "h-[78vh]"
          //       : "h-[90vh]"
          //   }`,
          // ],
          backdrop:
            "bg-gradient-to-t from-zinc-900/60 to-zinc-900/60 backdrop-opacity-20",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="grid grid-cols-12 justify-center text-xl font-bold text-slate-600">
                <h1 className="col-span-11 text-center">
                  Make
                  <span className="text-blue-400">
                    {` ${currentQuestion["name"]} `}
                  </span>
                  Visible, if...?
                </h1>

                <Button
                  isDisabled={logicToCurrentQuestions.length > 0 ? false : true}
                  variant="shadow"
                  color="danger"
                  onPress={handleClearAllLogicData}
                  radius="sm"
                >
                  Clear All
                </Button>
              </ModalHeader>
              <ModalBody className={`gap-4`}>
                {logicToCurrentQuestions.map((logic, index) => {
                  return (
                    <div
                      key={`${logic}-${index}`}
                      className="p-4 rounded-xl bg-blue-200"
                    >
                      <div className="grid grid-cols-12 gap-1 mb-2">
                        <div className="col-span-2">
                          {index > 0 && (
                            <Select
                              isDisabled={logic.selectQuestId ? false : true}
                              label="Logic Operator:"
                              defaultSelectedKeys={["and"]}
                              selectedKeys={
                                logic.logicOperator
                                  ? [logic.logicOperator]
                                  : undefined
                              }
                              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                                handleLogicConditions(
                                  index,
                                  "logicOperator",
                                  e.target.value
                                )
                              }
                            >
                              {logicalOperators.map((operator, index) => (
                                <SelectItem
                                  key={`${operator.type}`}
                                  value={operator.type}
                                >
                                  {`${operator.label}`}
                                </SelectItem>
                              ))}
                            </Select>
                          )}
                        </div>
                        <div
                          className={`${
                            index > 0 ? "col-span-5" : "col-span-5"
                          } `}
                        >
                          <Select
                            label="Select a question:"
                            selectedKeys={
                              logic.selectQuestId
                                ? [logic.selectQuestId]
                                : undefined
                            }
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                              if (e.target.value) {
                                handleLogicConditions(
                                  index,
                                  "selectQuestId",
                                  e.target.value
                                );
                                const question = questions.find(
                                  (ques) => ques.questionId === e.target.value
                                );
                                handleLogicConditions(
                                  index,
                                  "selectedQuestion",
                                  question!
                                );
                              } else {
                                handleLogicConditions(
                                  index,
                                  "selectQuestId",
                                  undefined
                                );
                              }
                              if (e.target.value) {
                                handleLogicConditions(
                                  index,
                                  "comparisonOperator",
                                  "="
                                );
                              }
                              if (
                                e.target.value &&
                                logicToCurrentQuestions.length > 0
                              ) {
                                handleLogicConditions(
                                  index,
                                  "logicOperator",
                                  "and"
                                );
                              }
                            }}
                          >
                            {questionList.map((question, index) => (
                              <SelectItem
                                key={`${question.questionId}`}
                                value={question.questionId}
                              >
                                {`${question.name}: ${question.title}`}
                              </SelectItem>
                            ))}
                          </Select>
                        </div>
                        <div
                          className={`${
                            index > 0 ? "col-span-4" : "col-span-4"
                          }`}
                        >
                          <Select
                            isDisabled={logic.selectQuestId ? false : true}
                            label="Comparison Operator:"
                            defaultSelectedKeys={["="]}
                            disabledKeys={handleComparisonArray(
                              logic.selectedQuestion!
                            )}
                            selectedKeys={
                              logic.comparisonOperator
                                ? [logic.comparisonOperator]
                                : undefined
                            }
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                              handleLogicConditions(
                                index,
                                "comparisonOperator",
                                e.target.value
                              );
                              if (
                                e.target.value === "empty" ||
                                e.target.value === "notempty"
                              ) {
                                handleLogicConditions(
                                  index,
                                  "answerValue",
                                  undefined
                                );
                              }
                            }}
                          >
                            {comparisonOperators.map((operator: any) => (
                              <SelectItem
                                key={`${operator.type}`}
                                value={operator.type}
                              >
                                {`${operator.label}`}
                              </SelectItem>
                            ))}
                          </Select>
                        </div>
                        <div className="col-span-1">
                          <Button
                            variant="light"
                            className="h-full w-8"
                            radius="sm"
                            size={"sm"}
                            color={"danger"}
                            onClick={() => deleteLogicCondition(logic, index)}
                          >
                            <Trash2 size={"28"} />
                          </Button>
                        </div>
                      </div>
                      {logic.selectedQuestion && logic.selectQuestId ? (
                        <Card
                          key={index}
                          isFooterBlurred
                          className="w-full bg-blue-300 "
                        >
                          <CardHeader className="grid grid-cols-4 gap-3">
                            <Input
                              readOnly
                              isRequired={logic.selectedQuestion.isRequired}
                              type="text"
                              classNames={{
                                base: ["col-span-4"],
                                input: ["text-black capitalize font-semibold"],
                                description: ["text-black"],
                              }}
                              size={"md"}
                              value={logic.selectedQuestion.title}
                            />
                          </CardHeader>

                          {logic.comparisonOperator &&
                            logic.comparisonOperator !== "empty" &&
                            logic.comparisonOperator !== "notempty" && (
                              <CardBody className="p-3">
                                <div className="rounded-md bg-blue-100">
                                  {userAnswerField(logic, index)}
                                </div>
                              </CardBody>
                            )}
                        </Card>
                      ) : (
                        <Card className="w-full bg-blue-300 ">
                          <CardHeader className="grid grid-cols-4 gap-3">
                            <Input
                              readOnly
                              type="text"
                              classNames={{
                                base: ["col-span-4 "],
                                input: [
                                  "text-black capitalize font-semibold text-center",
                                ],
                                description: ["text-black"],
                              }}
                              size={"md"}
                              value={"Add Conditions!"}
                            />
                          </CardHeader>

                          <CardBody className="p-3">
                            <div className="rounded-md bg-blue-100 h-24 flex justify-center items-center">
                              <p className="text-center font-medium text-blue-900">
                                Please select a question to configure
                                conditional logic.
                              </p>
                            </div>
                          </CardBody>
                        </Card>
                      )}
                    </div>
                  );
                })}
              </ModalBody>
              <ModalFooter>
                <Button
                  onClick={addMoreConditions}
                  className="w-full font-semibold text-base"
                  color="primary"
                  radius="sm"
                  // variant="shadow"
                  variant="ghost"
                >
                  <Plus size={20} />
                  {logicToCurrentQuestions.length > 0
                    ? `Add More Conditions`
                    : `Add Condition`}
                </Button>
                <Button
                  color="danger"
                  variant="flat"
                  onPress={onClose}
                  radius="sm"
                  // size="sm"
                >
                  Cancel
                </Button>
                <Button
                  isDisabled={
                    logicToCurrentQuestions.length > 0 &&
                    logicToCurrentQuestions.every((logic) => {
                      if (logic.selectQuestId !== undefined) {
                        if (
                          logic.comparisonOperator !== "empty" &&
                          logic.comparisonOperator !== "notempty"
                        ) {
                          return logic.answerValue !== undefined;
                        } else {
                          return true;
                        }
                      }
                      return false;
                    })
                      ? false
                      : true
                  }
                  color="primary"
                  onPress={onClose}
                  variant="shadow"
                  radius="sm"
                  onClick={handleVisibleIf}
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
