"use client";

import React, { useEffect, useState } from "react";
import { RadioGroup, Radio } from "@nextui-org/react";

import { UserAnswerTypeProps } from "@/types/questions";

const RadioChoices = ({
  isCurrentQuestion,
  question,
  index,
  handleAdminPreviewQuestions,
}: UserAnswerTypeProps) => {
  const [selected, setSelected] = useState(question?.userAnswer);

  useEffect(() => {
    if (question?.userAnswer !== undefined) {
      setSelected(question?.userAnswer);
    } else {
      setSelected("");
    }
  }, [question?.userAnswer, question?.userQuestionId]);

  const takenQuestion = () => {
    return (
      <>
        <RadioGroup
          value={question?.userAnswer}
          classNames={{
            base: ["p-4"],
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
  const currentQuestion = () => {
    const isInvalid =
      question?.isAnswerInvalid && question?.userAnswer === undefined;
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
          label={`${isInvalid ? "Choice is required!" : ""}`}
          isInvalid={isInvalid}
          classNames={{
            base: ["p-4"],
            label: [
              `${
                isInvalid && "text-rose-500 capitalize font-semibold text-xs"
              }`,
            ],
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

  return (
    <>
      <div>{isCurrentQuestion ? currentQuestion() : takenQuestion()}</div>
    </>
  );
};

export default RadioChoices;
