import { UserAnswerTypeProps } from "@/types/questions";
import { Textarea } from "@nextui-org/react";
import React, { useState } from "react";

const LongText = ({
  question,
  index,
  handleAdminPreviewQuestions,
}: UserAnswerTypeProps) => {
  const [answerValue, setAnswerValue] = useState(question?.userAnswer);

  // useEffect(() => {
  //   if (logic?.answerValue !== undefined) {
  //     setAnswerValue(logic?.answerValue);
  //   } else {
  //     setAnswerValue("");
  //   }
  // }, [logic?.answerValue, logic?.selectQuestId]);

  const isInvalid =
    question?.isAnswerInvalid && question?.userAnswer === undefined;

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
            handleAdminPreviewQuestions!(index!, "userAnswer", answerValue);
          } else {
            handleAdminPreviewQuestions!(index!, "userAnswer", undefined);
          }
        }}
        classNames={{
          base: ["w-full p-4"],
          errorMessage: "capitalize font-semibold text-xs",
        }}
        isInvalid={isInvalid}
        color={isInvalid ? "danger" : "default"}
        errorMessage={isInvalid && "Answer is required!"}
      />
    </>
  );
};

export default LongText;
