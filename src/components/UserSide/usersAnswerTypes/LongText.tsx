import { AnswerTypeComponentProps } from "@/types/questions";
import { Divider, Textarea } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

const LongText = ({ question }: AnswerTypeComponentProps) => {
  const [answerValue, setAnswerValue] = useState("");

  // useEffect(() => {
  //   if (logic?.answerValue !== undefined) {
  //     setAnswerValue(logic?.answerValue);
  //   } else {
  //     setAnswerValue("");
  //   }
  // }, [logic?.answerValue, logic?.selectQuestId]);

  // const isInvalid = logic?.answerValue === undefined;

  return (
    <>
      <Textarea
        placeholder={`Enter your long text`}
        value={answerValue}
        onChange={(e) => {
          setAnswerValue(e.target.value);
        }}
        onBlur={() => {
          if (answerValue.trim()) {
            // handleLogicConditions!(index!, "answerValue", answerValue);
          } else {
            // handleLogicConditions!(index!, "answerValue", undefined);
          }
        }}
        classNames={{
          base: ["w-full p-4"],
        }}
        // isInvalid={isInvalid}
        // color={isInvalid ? "danger" : "default"}
        // errorMessage={isInvalid && "Please defined answer"}
      />
    </>
  );
};

export default LongText;
