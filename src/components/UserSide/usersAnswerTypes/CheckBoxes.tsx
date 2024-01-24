"use client";

import React, { useState } from "react";
import { CheckboxGroup, Checkbox, Input } from "@nextui-org/react";
import { Choices, UserAnswerTypeProps } from "@/types/questions";

const CheckBoxes = ({
  question,
  index,
  handleAdminPreviewQuestions,
}: UserAnswerTypeProps) => {
  const [selected, setSelected] = useState(question?.userAnswer);

  // useEffect(() => {
  //   if (logic?.answerValue !== undefined) {
  //     setSelected(logic?.answerValue);
  //   } else {
  //     setSelected([]);
  //   }
  // }, [logic?.answerValue, logic?.selectQuestId]);

  const minLimit = question?.parentQuestion?.minSelectedChoices!;
  const maxLimit = question?.parentQuestion?.maxSelectedChoices!;
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
    if (selected && selected.length > minLimit) {
      return false;
    } else {
      return question?.isAnswerInvalid && question?.userAnswer === undefined;
    }
  };

  // console.log(`selected: ${question?.parentQuestion?.name}`, selected);

  return (
    <div
    // id={`${logic?.logicDataId}-${logic?.currentQuestionId}-${logic?.selectQuestId}`}
    >
      <div className="w-full pt-4">
        <h1 className="text-center text-base text-blue-600 font-bold">
          {`Kindly ensure you select at least ${minLimit} choice${
            minLimit > 1 ? "s" : ""
          } & you can choose up to ${maxLimit} choice${maxLimit > 1 ? "s" : ""}
          for this question.`}
        </h1>
      </div>
      <CheckboxGroup
        // id={`${logic?.logicDataId}-${logic?.currentQuestionId}-${logic?.selectQuestId}-checkboxGroup`}
        value={selected}
        onValueChange={(selected) => {
          setSelected(selected);
          if (selected.length < 1) {
            handleAdminPreviewQuestions!(index!, "userAnswer", undefined);
          } else if (selected.length < minLimit) {
            handleAdminPreviewQuestions!(index!, "userAnswer", undefined);
          } else if (selected.length >= minLimit) {
            handleAdminPreviewQuestions!(index!, "userAnswer", selected);
          }
        }}
        isInvalid={isInvalid()}
        classNames={{
          base: ["p-4"],
        }}
      >
        {question?.parentQuestion?.choices!.map(
          (choice: Choices, choiceIndex: number) => {
            return (
              <div
                key={choiceIndex}
                className=" flex justify-between items-center"
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
          }
        )}
      </CheckboxGroup>
      <div className="justify-self-center self-center col-span-2">
        <p
          className={` text-center ${
            isInvalid()
              ? "text-rose-500 capitalize font-semibold text-sm"
              : "text-green-500 font-semibold"
          }`}
        >
          {`${
            isInvalid()
              ? `Please select at least ${
                  minLimit === 0 ? 1 : minLimit
                } choice${minLimit > 1 ? "s" : ""}.`
              : question?.userAnswer?.length >= maxLimit
              ? `Maximum limit of ${maxLimit} choice${
                  maxLimit > 1 ? "s" : ""
                } exceeded.`
              : question?.userAnswer
              ? `${question?.userAnswer?.length} choice${
                  question?.userAnswer?.length !== 1 ? "s" : ""
                } within ${minLimit}-${maxLimit} limit.`
              : ""
          }`}
        </p>
      </div>
    </div>
  );
};

export default CheckBoxes;
