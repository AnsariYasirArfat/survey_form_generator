"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import {
  CheckboxGroup,
  Checkbox,
  Divider,
  Button,
  Input,
} from "@nextui-org/react";
import { Minus, Plus } from "lucide-react";
import { AnswerTypeComponentProps, Choices } from "@/types/questions";

const CheckBoxes = ({
  adminMode,
  question,
  index,
  handleDataChange,
  logic,
  handleLogicConditions,
}: AnswerTypeComponentProps) => {
  let questionIndex: number | undefined, logicIndex: number | undefined;
  if (adminMode) {
    questionIndex = index;
  } else if (logic && !adminMode) {
    logicIndex = index;
  }
  const [choiceCount, setChoiceCount] = useState(3);
  const [tempChoices, setTempChoices] = useState<any>(
    question && question!.choices
  );
  const [selected, setSelected] = useState(logic?.answerValue || []);

  useEffect(() => {
    setSelected([]);
  }, [logic?.selectQuestId]);

  const renderAdminMode = () => {
    const addChoice = () => {
      setTempChoices([
        ...tempChoices,
        { text: `Choice ${choiceCount}`, value: `Choice ${choiceCount}` },
      ]);

      const choices: any = question!.choices;
      const addedChoices = [
        ...choices,
        { text: `Choice ${choiceCount}`, value: `Choice ${choiceCount}` },
      ];
      handleDataChange!(questionIndex!, "choices", addedChoices);
      setChoiceCount((prevCount) => prevCount + 1);
    };

    const minusChoice = (choiceToMinus: any) => {
      if (question!.choices!.length > 2) {
        const updatedChoice = tempChoices.filter(
          (tempChoice: any) => choiceToMinus !== tempChoice
        );
        setTempChoices(updatedChoice);
        const choices: any = question!.choices;
        const minusChoice = choices.filter(
          (choice: any) => choiceToMinus.text !== choice.text
        );
        handleDataChange!(questionIndex!, "choices", minusChoice);
      }
    };

    const editTempChoice = (index: number, field: string, value: string) => {
      setTempChoices((prevChoices: any) => {
        const updatedChoices = [...prevChoices];
        updatedChoices[index] = {
          ...updatedChoices[index],
          [field]: value,
        };
        return updatedChoices;
      });
    };
    const updateChoiceTextInMainData = () => {
      handleDataChange!(questionIndex!, "choices", tempChoices);
    };
    return (
      <>
        <h5 className="text-center pt-2 text-base font-medium text-blue-800">
          Answer type: Checkbox Group
        </h5>
        <div className="mx-4 my-2">
          <Divider />
        </div>

        <div className="w-full grid grid-cols-2 justify-center gap-2 p-4 ">
          <Input
            type="number"
            label="Min. Select Choice?"
            labelPlacement="outside-left"
            className="justify-center"
            placeholder="0.00"
            size="sm"
            min={0}
            max={tempChoices.length}
            value={`${question!.minSelectedChoices}`}
            onChange={(e) => {
              if (e.target.valueAsNumber <= tempChoices.length) {
                handleDataChange!(
                  questionIndex!,
                  "minSelectedChoices",
                  e.target.valueAsNumber
                );
              } else {
                handleDataChange!(questionIndex!, "minSelectedChoices", 1);
              }

              if (
                question!.minSelectedChoices &&
                question!.maxSelectedChoices &&
                question!.minSelectedChoices > question!.maxSelectedChoices
              ) {
                handleDataChange!(
                  questionIndex!,
                  "maxSelectedChoices",
                  question!.minSelectedChoices
                );
              }
            }}
          />

          <Input
            type="number"
            label="Max. Select Choice?"
            labelPlacement="outside-left"
            className="justify-center"
            size="sm"
            min={question!.minSelectedChoices}
            max={tempChoices.length}
            value={`${question!.maxSelectedChoices}`}
            onChange={(e) => {
              handleDataChange!(
                questionIndex!,
                "maxSelectedChoices",
                e.target.valueAsNumber
              );
              if (e.target.valueAsNumber <= tempChoices.length) {
                handleDataChange!(
                  questionIndex!,
                  "maxSelectedChoices",
                  e.target.valueAsNumber
                );
              } else {
                handleDataChange!(
                  questionIndex!,
                  "maxSelectedChoices",
                  tempChoices.length
                );
              }
            }}
          />
        </div>
        <CheckboxGroup
          classNames={{
            base: ["p-4"],
          }}
        >
          {tempChoices.map((tempChoice: any, choiceIndex: number) => {
            return (
              <div
                key={choiceIndex}
                className="flex justify-between items-center"
              >
                <Checkbox
                  classNames={{
                    wrapper: [`${adminMode && "border-slate-400 border-2"}`],
                  }}
                  isDisabled
                  value={tempChoice.value}
                  size={"lg"}
                  radius="sm"
                />
                <Input
                  // readOnly={!adminMode}
                  size={"sm"}
                  type="text"
                  value={tempChoice.text}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    editTempChoice(choiceIndex, "text", e.target.value)
                  }
                  onBlur={updateChoiceTextInMainData}
                  classNames={{
                    base: ["me-4"],
                    input: ["text-black capitalize font-semibold"],
                  }}
                />

                <Button
                  onClick={() => minusChoice(tempChoice)}
                  variant="bordered"
                  color="danger"
                  size="sm"
                >
                  <Minus size={16} />
                </Button>
              </div>
            );
          })}

          <div className="flex justify-between items-center">
            <Checkbox value={"add"} isDisabled size={"lg"} radius="sm" />
            <Input
              isDisabled
              size={"sm"}
              type="text"
              value={`Choice ${choiceCount}`}
              readOnly
              classNames={{
                base: ["me-4"],
                input: ["text-black capitalize font-semibold"],
              }}
            />

            <Button
              onClick={addChoice}
              variant="bordered"
              color="success"
              size="sm"
            >
              <Plus size={16} />
            </Button>
          </div>
        </CheckboxGroup>
      </>
    );
  };

  const renderUserMode = () => {
    const minLimit = logic?.selectedQuestion?.minSelectedChoices!;
    const maxLimit = logic?.selectedQuestion?.maxSelectedChoices!;
    const handleDisbleOnMaxlimit = (choice: Choices) => {
      let isDisabled;
      if (selected && selected.length > 0) {
        isDisabled =
          !selected.some(
            (selectChoice: string) => selectChoice === choice.value
          ) && maxLimit === selected.length;
      } else {
        isDisabled = false;
      }

      return isDisabled;
    };
    const isInvalid = () => {
      if (selected && selected.lenght > minLimit) {
        return false;
      } else {
        return logic?.answerValue === undefined;
      }
    };

    console.log("selected: ", selected);
    return (
      <>
        <div className="w-full grid grid-cols-4 justify-center gap-2 pt-4">
          <div className="justify-self-center self-center col-span-2">
            <p
              className={`${
                isInvalid()
                  ? "text-rose-500 font-semibold"
                  : "text-green-500 font-semibold"
              }`}
            >
              {`${
                isInvalid()
                  ? `Please select at least ${
                      minLimit === 0 ? 1 : minLimit
                    } choice${minLimit > 1 ? "s" : ""}.`
                  : logic?.answerValue.length >= maxLimit
                  ? `Maximum limit of ${maxLimit} choice${
                      maxLimit > 1 ? "s" : ""
                    } exceeded.`
                  : `${logic?.answerValue.length} choice${
                      logic?.answerValue.length !== 1 ? "s" : ""
                    } within ${minLimit}-${maxLimit} limit.`
              }`}
            </p>
          </div>
          <Input
            readOnly
            type="number"
            label={`Min. Select Choice${minLimit !== 1 ? "s" : ""}:`}
            className="justify-self-center max-w-44"
            size="md"
            value={`${minLimit}`}
          />

          <Input
            readOnly
            type="number"
            label={`Max. Select Choice${maxLimit !== 1 ? "s" : ""}:`}
            className="justify-self-center max-w-44"
            size="md"
            value={`${maxLimit}`}
          />
        </div>
        <CheckboxGroup
          value={selected}
          onValueChange={(selected) => {
            setSelected(selected);
            if (selected.length < 1) {
              handleLogicConditions!(logicIndex!, "answerValue", undefined);
            } else if (selected.length < minLimit) {
              handleLogicConditions!(logicIndex!, "answerValue", undefined);
            } else if (selected.length >= minLimit) {
              handleLogicConditions!(logicIndex!, "answerValue", selected);
            }
          }}
          isInvalid={isInvalid()}
          // onBlur={() => {
          //   if (selected.length >= minLimit && selected.length > 0) {
          //     handleLogicConditions!(logicIndex!, "answerValue", selected);
          //   } else {
          //     handleLogicConditions!(logicIndex!, "answerValue", undefined);
          //   }
          // }}
          classNames={{
            base: ["p-4"],
            label: [`${isInvalid() && "text-rose-500 font-semibold"}`],
          }}
        >
          {logic?.selectedQuestion?.choices!.map(
            (choice: Choices, choiceIndex: number) => {
              return (
                <div
                  key={choiceIndex}
                  className="flex justify-between items-center"
                >
                  <Checkbox
                    isDisabled={handleDisbleOnMaxlimit(choice)}
                    value={choice.value}
                    size={"lg"}
                    radius="sm"
                    classNames={{
                      label: [` text-base capitalize font-semibold`],
                    }}
                  >
                    {choice.text}
                  </Checkbox>
                </div>
              );
            }
          )}
        </CheckboxGroup>
      </>
    );
  };
  return <div>{adminMode ? renderAdminMode() : renderUserMode()}</div>;
};

export default CheckBoxes;
