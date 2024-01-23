"use client";

import React, { useState } from "react";
import { RadioGroup, Radio } from "@nextui-org/react";

import { UserAnswerTypeProps } from "@/types/questions";

const RadioChoices = ({
  question,
  index,
  handleAdminPreviewQuestions,
}: UserAnswerTypeProps) => {
  const [selected, setSelected] = useState(question?.userAnswer);

  // useEffect(() => {
  //   if (logic?.answerValue !== undefined) {
  //     setSelected(logic?.answerValue);
  //   } else {
  //     setSelected("");
  //   }
  // }, [logic?.answerValue, logic?.selectQuestId]);

  // const isInvalid = logic?.answerValue === undefined;

  return (
    <>
      <RadioGroup
        value={selected}
        onValueChange={(selected) => {
          setSelected(selected);
          if (selected) {
            handleAdminPreviewQuestions!(index!, "userAnswer", selected);
          } else {
            handleAdminPreviewQuestions!(index!, "userAnswer", undefined);
          }
        }}
        // label={`${isInvalid ? "Please defined Choice." : ""}`}
        // isInvalid={isInvalid}
        classNames={{
          base: ["p-4"],
          // label: [`${isInvalid && "text-rose-500 font-semibold"}`],
        }}
      >
        {question?.parentQuestion?.choices!.map(
          (choice: any, choiceIndex: number) => {
            return (
              <div
                key={choiceIndex}
                className="flex justify-between items-center"
              >
                <Radio
                  value={choice.value}
                  size={"lg"}
                  classNames={{
                    label: [` text-base capitalize font-semibold`],
                  }}
                >
                  {choice.text}
                </Radio>
              </div>
            );
          }
        )}
      </RadioGroup>
    </>
  );
};

export default RadioChoices;
