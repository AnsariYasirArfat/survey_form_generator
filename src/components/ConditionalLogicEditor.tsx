// Hey i am on visibleIf branch

"use client";
import React, { useEffect, useState } from "react";
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
  Card,
  CardHeader,
  Input,
  CardBody,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";
import { Network, Plus, Trash2 } from "lucide-react";
import { useGlobalContext } from "@/app/Context/store";
import { Question, VisibleIf } from "@/types/questions";
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

  const { questions, setQuestions } = useGlobalContext();

  const [questionList, setQuestionList] = useState<Question[]>([]);
  const currentQuestion = questions[index!];

  const [logicToCurrentQuestions, setLogicToCurrentQuestions] = useState<any>(
    []
  );
  console.log("logicToCurrentQuestions: ", logicToCurrentQuestions);
  useEffect(() => {
    console.log("currentQuestion.visibleIf: ", currentQuestion.visibleIf);
    setLogicToCurrentQuestions(
      currentQuestion.visibleIf ? currentQuestion.visibleIf : []
    );
  }, [currentQuestion]);

  useEffect(() => {
    const questionToAvoid = questions.filter((question) => {
      if (question.visibleIf) {
        question.visibleIf.some(
          (logic) => logic.selectQuestId !== currentQuestion.questionId
        );
      }
    });

    console.log(`${currentQuestion.name}:questionToAvoid: `, questionToAvoid);

    const finalQuestionList: Question[] = questions.filter(
      (question: Question) => currentQuestion !== question
    );

    setQuestionList(finalQuestionList);
  }, [currentQuestion, questions]);

  // console.log(`${currentQuestion.name}: logic quesitonlist: `, questionList);

  const addMoreConditions = () => {
    if (logicToCurrentQuestions) {
      setLogicToCurrentQuestions((prevLogicConditionsData: VisibleIf[]) => [
        ...prevLogicConditionsData,
        {
          logicDataId: uuidv4(),
          logicOperator: undefined,
          selectQuestId: undefined,
          selectedQuestion: undefined,
          comparisonOperator: undefined,
          answerValue: undefined,
        },
      ]);
    }
  };

  const deleteLogicCondition = (localIndex: number) => {
    if (
      logicToCurrentQuestions &&
      logicToCurrentQuestions.length > 1 &&
      localIndex === 0
    ) {
      setLogicToCurrentQuestions((prevLogicConditionsData: VisibleIf[]) => {
        const updatedLogicConditionsData = [...prevLogicConditionsData];
        updatedLogicConditionsData[1] = {
          ...updatedLogicConditionsData[1],
          logicOperator: undefined,
        };
        return updatedLogicConditionsData;
      });
    }
    setLogicToCurrentQuestions((prevLogicConditionsData: VisibleIf[]) =>
      prevLogicConditionsData.filter((_, index) => index !== localIndex)
    );
  };

  const handleClearAllLogicData = () => {
    setLogicToCurrentQuestions([]);
  };

  const handleLogicConditions = (
    index: number,
    field: keyof VisibleIf,
    value: string | Question | boolean | number | string[] | undefined
  ) => {
    setLogicToCurrentQuestions((prevLogicConditionsData: VisibleIf[]) => {
      const updateLogicData: VisibleIf[] = [...prevLogicConditionsData];
      const logicToUpdate = prevLogicConditionsData[index];
      logicToUpdate[field] = value;
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
    // const visibleIfData: VisibleIf[] = logicToCurrentQuestions.map((logic) => ({
    //   logicOperator: logic.logicOperator,
    //   questionName: logic.selectedQuestion?.name,
    //   comparisonOperator: logic.comparisonOperator,
    //   answerValue: logic.answerValue,
    // }));

    // const updatedQuestions: Question[] = [...questions];
    // const questionToUpdate: any = updatedQuestions[index];
    // currentQuestion["visibleIf"] = visibleIfData;
    setQuestions((prevQuestions: any) => {
      prevQuestions[index]["visibleIf"] = logicToCurrentQuestions;
      return [...prevQuestions];
    });
  };

  const handleCancelLogic = () => {
    setLogicToCurrentQuestions([]);

    // if (logicToCurrentQuestions && logicToCurrentQuestions.length > 0) {
    //   console.log("Before clearing logic data:", logicConditionsData);
    //   handleClearAllLogicData();
    //   console.log("After clearing logic data:", logicConditionsData);
    //   setLogicConditionsData(
    //     (prevLogicConditionsData: VisibleIf[]) => [
    //       ...prevLogicConditionsData,
    //       ...prevLogicToCurrentQuestions,
    //     ]
    //   );
    //   // console.log(
    //   //   "Reverted to previous logic => onCancel: ",
    //   //   logicToCurrentQuestions
    //   // );
    // }
  };

  const userAnswerField = (logic: VisibleIf, index: number) => {
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
        size={"5xl"}
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
            "bg-gradient-to-t from-zinc-900/70 to-zinc-900/70 backdrop-opacity-20",
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
                  isDisabled={
                    logicToCurrentQuestions &&
                    logicToCurrentQuestions.length > 0
                      ? false
                      : true
                  }
                  variant="shadow"
                  color="danger"
                  onPress={handleClearAllLogicData}
                  radius="sm"
                >
                  Clear All
                </Button>
              </ModalHeader>
              <ModalBody className={`gap-4`}>
                {logicToCurrentQuestions &&
                  logicToCurrentQuestions.map(
                    (logic: VisibleIf, index: number) => {
                      return (
                        <div
                          id={logic.logicDataId}
                          key={`${logic}-${index}`}
                          className="p-4 rounded-xl bg-blue-200"
                        >
                          <div className="grid grid-cols-12 gap-1 mb-2">
                            <div className="col-span-2">
                              {index > 0 && (
                                <Autocomplete
                                  placeholder="Select operator"
                                  isClearable={false}
                                  isDisabled={
                                    logic.selectQuestId ? false : true
                                  }
                                  label="Logic Operator:"
                                  // defaultSelectedKeys={["and"]}
                                  selectedKey={`${logic.logicOperator!}`}
                                  onSelectionChange={(e) => {
                                    if (e) {
                                      handleLogicConditions(
                                        index,
                                        "logicOperator",
                                        e
                                      );
                                    } else {
                                      handleLogicConditions(
                                        index,
                                        "logicOperator",
                                        undefined
                                      );
                                    }
                                  }}
                                >
                                  {logicalOperators.map((operator, index) => (
                                    <AutocompleteItem
                                      key={`${operator.type}`}
                                      value={operator.type}
                                    >
                                      {`${operator.label}`}
                                    </AutocompleteItem>
                                  ))}
                                </Autocomplete>
                              )}
                            </div>
                            <div
                              className={`${
                                index > 0 ? "col-span-5" : "col-span-5"
                              } `}
                            >
                              <Autocomplete
                                label="Select a question:"
                                defaultItems={questionList}
                                selectedKey={`${logic.selectQuestId!}`}
                                onSelectionChange={(e) => {
                                  if (e) {
                                    handleLogicConditions(
                                      index,
                                      "selectQuestId",
                                      e
                                    );
                                    const question = questions.find(
                                      (ques) => ques.questionId === e
                                    );
                                    const {
                                      visibleIf,
                                      ...restProperties
                                    }: any = question;
                                    const selectQuesiton: any = {
                                      ...restProperties,
                                    };
                                    handleLogicConditions(
                                      index,
                                      "selectedQuestion",
                                      selectQuesiton!
                                    );
                                    handleLogicConditions(
                                      index,
                                      "answerValue",
                                      undefined
                                    );

                                    handleLogicConditions(
                                      0,
                                      "logicOperator",
                                      undefined
                                    );
                                  } else {
                                    handleLogicConditions(
                                      index,
                                      "selectQuestId",
                                      undefined
                                    );
                                    handleLogicConditions(
                                      index,
                                      "selectedQuestion",
                                      undefined
                                    );
                                    handleLogicConditions(
                                      index,
                                      "answerValue",
                                      undefined
                                    );
                                    handleLogicConditions(
                                      index,
                                      "logicOperator",
                                      undefined
                                    );
                                    handleLogicConditions(
                                      index,
                                      "comparisonOperator",
                                      undefined
                                    );
                                  }
                                  if (e) {
                                    handleLogicConditions(
                                      index,
                                      "comparisonOperator",
                                      logic.comparisonOperator
                                        ? logic.comparisonOperator
                                        : "="
                                    );
                                  }
                                  if (
                                    e &&
                                    logicToCurrentQuestions &&
                                    logicToCurrentQuestions.length > 1 &&
                                    index > 0
                                  ) {
                                    handleLogicConditions(
                                      index,
                                      "logicOperator",
                                      logic.logicOperator
                                        ? logic.logicOperator
                                        : "and"
                                    );
                                  }
                                }}
                              >
                                {questionList.map((question, index) => (
                                  <AutocompleteItem
                                    key={`${question.questionId}`}
                                    value={question.questionId}
                                  >
                                    {`${question.name}: ${question.title}`}
                                  </AutocompleteItem>
                                ))}
                              </Autocomplete>
                            </div>
                            <div
                              className={`${
                                index > 0 ? "col-span-4" : "col-span-4"
                              }`}
                            >
                              <Autocomplete
                                isDisabled={logic.selectQuestId ? false : true}
                                label="Comparison Operator:"
                                // defaultSelectedKeys={["="]}
                                isClearable={false}
                                disabledKeys={handleComparisonArray(
                                  logic.selectedQuestion!
                                )}
                                // selectedKeys={
                                //   logic.comparisonOperator
                                //     ? [logic.comparisonOperator]
                                //     : undefined
                                // }
                                selectedKey={`${logic.comparisonOperator!}`}
                                onSelectionChange={(e) => {
                                  handleLogicConditions(
                                    index,
                                    "comparisonOperator",
                                    e
                                  );
                                  if (e === "empty" || e === "notempty") {
                                    handleLogicConditions(
                                      index,
                                      "answerValue",
                                      undefined
                                    );
                                  }
                                }}
                              >
                                {comparisonOperators.map((operator: any) => (
                                  <AutocompleteItem
                                    key={`${operator.type}`}
                                    value={operator.type}
                                  >
                                    {`${operator.label}`}
                                  </AutocompleteItem>
                                ))}
                              </Autocomplete>
                            </div>
                            <div className="col-span-1">
                              <Button
                                variant="light"
                                className="h-full w-8"
                                radius="sm"
                                size={"sm"}
                                color={"danger"}
                                onClick={() => deleteLogicCondition(index)}
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
                                    input: [
                                      "text-black capitalize font-semibold",
                                    ],
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
                    }
                  )}
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
                  {logicToCurrentQuestions && logicToCurrentQuestions.length > 0
                    ? `Add More Conditions`
                    : `Add Condition`}
                </Button>
                <Button
                  color="danger"
                  variant="flat"
                  onPress={onClose}
                  radius="sm"
                  // size="sm"
                  onClick={handleCancelLogic}
                >
                  Cancel
                </Button>
                <Button
                  isDisabled={
                    logicToCurrentQuestions &&
                    logicToCurrentQuestions.length > 0 &&
                    logicToCurrentQuestions.every((logic: VisibleIf) => {
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
