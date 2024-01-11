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
  CardFooter,
} from "@nextui-org/react";
import { Network, Plus, Trash2 } from "lucide-react";
import { useGlobalContext } from "@/app/Context/store";
import {
  ConditionalLogicEditorProps,
  LogicConditonData,
  Question,
} from "@/types/questions";
import SingleInput from "./answerTypes/SingleInput";
import LongText from "./answerTypes/LongText";
import RadioGroup from "./answerTypes/RadioGroup";
import CheckBoxes from "./answerTypes/CheckBoxes";
import Boolean from "./answerTypes/Boolean";
import RatingScale from "./answerTypes/RatingScale";
import DefaultAnswer from "./answerTypes/DefaultUI";
import { comparisonOperators, logicalOperators } from "@/utils/answerTypesData";

const ConditionalLogicEditor = ({
  index,
  handleDataChange,
}: ConditionalLogicEditorProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { questions, logicConditionsData, setLogicConditionsData } =
    useGlobalContext();
  const [questionList, setQuestionList] = useState<Question[]>([]);
  const currentQuestion = questions[index];

  const [logicToCurrentQuestions, setLogicToCurrentQuestions] = useState<
    LogicConditonData[]
  >([]);

  useEffect(() => {
    console.log("logic Conditions Data: ", logicConditionsData);

    const currentQuestionLogicData = logicConditionsData.filter((logic) => {
      return currentQuestion.questionId === logic.currentQuestionId;
    });
    console.log(
      `currentQuestionLogicData=> ${currentQuestion.name}: `,
      currentQuestionLogicData
    );
    setLogicToCurrentQuestions(currentQuestionLogicData);
  }, [currentQuestion, logicConditionsData]);

  useEffect(() => {
    const questionList: Question[] = questions.filter(
      (question: Question) => currentQuestion !== question
    );
    setQuestionList(questionList);
  }, [currentQuestion, questions]);

  const addMoreConditions = () => {
    setLogicConditionsData((prevLogicConditionsData: LogicConditonData[]) => [
      ...prevLogicConditionsData,
      {
        logicDataId: uuidv4(),
        currentQuestionId: currentQuestion.questionId,
        selectQuestId: undefined,
        selectedQuestion: undefined,
        comparisonOperator: "=",
        logicOperator: logicToCurrentQuestions.length > 0 ? "and" : undefined,
        answerValue: undefined,
      },
    ]);
  };

  const deleteLogicCondition = (
    logicToDelete: LogicConditonData,
    localIndex: number
  ) => {
    if (logicToCurrentQuestions.length > 1 && localIndex === 0) {
      console.log(
        "logic local data before any delete: ",
        logicToCurrentQuestions
      );

      setLogicConditionsData((prevLogicConditionsData: LogicConditonData[]) => {
        const logicDataIdToUpdate = logicToCurrentQuestions[1].logicDataId;
        const updatedArray = prevLogicConditionsData.map((item) => {
          if (item.logicDataId === logicDataIdToUpdate) {
            // Update the corresponding object
            return { ...item, logicOperator: undefined };
          }
          return item;
        });
        console.log(`I am here on `, updatedArray);
        return updatedArray;
      });

      // Second Option to update logicOperator to undefined
      // setLogicToCurrentQuestions((prev: LogicConditonData[]) => {
      //   const updatedArray = [...prev];
      //   const logicToUpdate = updatedArray[1];
      //   logicToUpdate["logicOperator"] = undefined;
      //   console.log(`I am here on `, updatedArray);
      //   return updatedArray;
      // });
    }
    setLogicConditionsData((prevLogicConditionsData: LogicConditonData[]) =>
      prevLogicConditionsData.filter(
        (logic: LogicConditonData) =>
          logicToDelete.logicDataId !== logic.logicDataId
      )
    );
  };

  const handleClearAllLogicData = () => {
    setLogicConditionsData((prevLogicConditionsData: LogicConditonData[]) =>
      prevLogicConditionsData.filter(
        (logic: LogicConditonData) =>
          currentQuestion.questionId !== logic.currentQuestionId
      )
    );
  };

  // useEffect(() => {
  //   if (logicToCurrentQuestions.length > 0) {
  //     setLogicToCurrentQuestions((prev: LogicConditonData[]) => {
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
  //     setLogicConditionsData((prevLogicConditionsData: LogicConditonData[]) => {
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
    field: keyof LogicConditonData,
    value: string | Question
  ) => {
    // update in local logic array
    // setLogicToCurrentQuestions(
    //   (prevLogicConditionsData: LogicConditonData[]) => {
    //     const updateLogicData: LogicConditonData[] = [
    //       ...prevLogicConditionsData,
    //     ];
    //     const logicToUpdate: any = updateLogicData[index];
    //     logicToUpdate[field] = value;
    //     return updateLogicData;
    //   }
    // );

    // Update in Main logic array
    setLogicConditionsData((prevLogicConditionsData: LogicConditonData[]) => {
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

  const userAnswerField = (logic: LogicConditonData, index: number) => {
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
        return <LongText adminMode={false} />;

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
        return <Boolean adminMode={false} />;

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
        classNames={{
          base: [
            `overflow-auto ${
              logicToCurrentQuestions.length < 1
                ? "h-[30vh]"
                : logicToCurrentQuestions.length < 2
                ? "h-[78vh]"
                : "h-[90vh]"
            }`,
          ],
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
                  color="danger"
                  variant="shadow"
                  onPress={onClose}
                  radius="sm"
                  size="sm"
                >
                  Cancel
                </Button>
              </ModalHeader>
              <ModalBody className={`overflow-auto  gap-4`}>
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
                              handleLogicConditions(
                                index,
                                "selectQuestId",
                                e.target.value
                              );
                              if (e.target.value) {
                                const question = questions.find(
                                  (ques) => ques.questionId === e.target.value
                                );
                                handleLogicConditions(
                                  index,
                                  "selectedQuestion",
                                  question!
                                );
                              }
                            }}
                          >
                            {questionList!.map((question, index) => (
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
                            label="Comparison Operator:"
                            defaultSelectedKeys={["="]}
                            selectedKeys={
                              logic.comparisonOperator
                                ? [logic.comparisonOperator]
                                : undefined
                            }
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                              console.log(
                                "comparison operator: ",
                                e.target.value
                              );
                              handleLogicConditions(
                                index,
                                "comparisonOperator",
                                e.target.value
                              );
                            }}
                          >
                            {comparisonOperators.map((operator, index) => (
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

                          <CardBody className="p-3">
                            <div className="rounded-md bg-blue-100">
                              {userAnswerField(logic, index)}
                            </div>
                          </CardBody>
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
                  isDisabled={logicToCurrentQuestions.length > 0 ? false : true}
                  color="danger"
                  variant="flat"
                  onPress={handleClearAllLogicData}
                  radius="sm"
                >
                  Clear All
                </Button>
                <Button
                  isDisabled={logicToCurrentQuestions.length > 0 ? false : true}
                  color="primary"
                  onPress={onClose}
                  variant="shadow"
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
