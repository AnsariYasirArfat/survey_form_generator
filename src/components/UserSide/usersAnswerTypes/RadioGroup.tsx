"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { RadioGroup, Radio, Divider, Button, Input } from "@nextui-org/react";
import { Minus, Plus } from "lucide-react";
import { AnswerTypeComponentProps } from "@/types/questions";

const RadioChoices = ({ question }: AnswerTypeComponentProps) => {
  const [choiceCount, setChoiceCount] = useState(3);
  const [tempChoices, setTempChoices] = useState<any>(
    question && question!.choices
  );
  const [selected, setSelected] = useState("");

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
            // handleLogicConditions!(logicIndex!, "answerValue", selected);
          } else {
            // handleLogicConditions!(logicIndex!, "answerValue", undefined);
          }
        }}
        // label={`${isInvalid ? "Please defined Choice." : ""}`}
        // isInvalid={isInvalid}
        classNames={{
          base: ["p-4"],
          // label: [`${isInvalid && "text-rose-500 font-semibold"}`],
        }}
      >
        {question?.choices!.map((choice: any, choiceIndex: number) => {
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
        })}
      </RadioGroup>
    </>
  );
};

export default RadioChoices;
