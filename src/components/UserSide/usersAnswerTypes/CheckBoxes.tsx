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

const CheckBoxes = ({ question }: AnswerTypeComponentProps) => {
  const [choiceCount, setChoiceCount] = useState(3);
  const [tempChoices, setTempChoices] = useState<any>(
    question && question!.choices
  );
  const [selected, setSelected] = useState([""]);

  // useEffect(() => {
  //   if (logic?.answerValue !== undefined) {
  //     setSelected(logic?.answerValue);
  //   } else {
  //     setSelected([]);
  //   }
  // }, [logic?.answerValue, logic?.selectQuestId]);

  useEffect(() => {
    const isValuePresent =
      question &&
      question!.choices!.some(
        (choice: any) => choice.value === `Choice ${choiceCount}`
      );

    console.log("isValuePresent: ", isValuePresent);
    if (isValuePresent) {
      setChoiceCount((prevCount) => prevCount + 1);
    }
  }, [choiceCount, question]);

  const minLimit = question?.minSelectedChoices!;
  const maxLimit = question?.maxSelectedChoices!;
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
  // const isInvalid = () => {
  //   if (selected && selected.length > minLimit) {
  //     return false;
  //   } else {
  //     return logic?.answerValue === undefined;
  //   }
  // };

  console.log(`selected: ${question?.name}`, selected);

  return (
    <div
    // id={`${logic?.logicDataId}-${logic?.currentQuestionId}-${logic?.selectQuestId}`}
    >
      <div className="w-full grid grid-cols-4 justify-center gap-2 pt-4">
        {/* <div className="justify-self-center self-center col-span-2">
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
                : logic?.answerValue?.length >= maxLimit
                ? `Maximum limit of ${maxLimit} choice${
                    maxLimit > 1 ? "s" : ""
                  } exceeded.`
                : `${logic?.answerValue?.length} choice${
                    logic?.answerValue?.length !== 1 ? "s" : ""
                  } within ${minLimit}-${maxLimit} limit.`
            }`}
          </p>
        </div> */}
        {/* <Input
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
        /> */}
      </div>
      <CheckboxGroup
        // id={`${logic?.logicDataId}-${logic?.currentQuestionId}-${logic?.selectQuestId}-checkboxGroup`}
        value={selected}
        onValueChange={(selected) => {
          setSelected(selected);
          if (selected.length < 1) {
            // handleLogicConditions!(logicIndex!, "answerValue", undefined);
          } else if (selected.length < minLimit) {
            // handleLogicConditions!(logicIndex!, "answerValue", undefined);
          } else if (selected.length >= minLimit) {
            // handleLogicConditions!(logicIndex!, "answerValue", selected);
          }
        }}
        // isInvalid={isInvalid()}
        classNames={{
          base: ["p-4"],
          // label: [`${isInvalid() && "text-rose-500 font-semibold"}`],
        }}
      >
        {question?.choices!.map((choice: Choices, choiceIndex: number) => {
          return (
            <div
              key={choiceIndex}
              className="flex justify-between items-center"
            >
              <Checkbox
                // id={`${logic?.logicDataId}-${logic?.currentQuestionId}-${logic?.selectQuestId}-checkbox-${choiceIndex}`}
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
        })}
      </CheckboxGroup>
    </div>
  );
};

export default CheckBoxes;
