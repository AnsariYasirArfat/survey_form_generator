import { UserAnswerTypeProps } from "@/types/questions";
import { Textarea } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

const LongText = ({
  isCurrentQuestion,
  question,
  index,
  handleAdminPreviewQuestions,
}: UserAnswerTypeProps) => {
  const [answerValue, setAnswerValue] = useState(question?.userAnswer);

  useEffect(() => {
    if (question?.userAnswer !== undefined) {
      setAnswerValue(question?.userAnswer);
    } else {
      setAnswerValue("");
    }
  }, [question?.userAnswer, question?.userQuestionId]);

  const takenQuestion = () => {
    return (
      <>
        <Textarea
          placeholder={`Enter your long text`}
          value={question?.userAnswer}
          classNames={{
            base: ["w-full p-4"],
            errorMessage: "capitalize font-semibold text-xs",
          }}
        />
      </>
    );
  };
  const currentQuestion = () => {
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

  return (
    <>
      <div>{isCurrentQuestion ? currentQuestion() : takenQuestion()}</div>
    </>
  );
};

export default LongText;
