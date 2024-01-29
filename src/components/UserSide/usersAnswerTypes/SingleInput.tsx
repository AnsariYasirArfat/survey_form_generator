import { UserAnswerTypeProps } from "@/types/questions";
import { Input, Slider } from "@nextui-org/react";
import React, { ChangeEvent, useEffect, useState } from "react";

const SingleInput = ({
  isCurrentQuestion,
  question,
  index,
  handleAdminPreviewQuestions,
}: UserAnswerTypeProps) => {
  const [answerValue, setAnswerValue] = useState(question?.userAnswer);
  const [rangValue, setRangValue] = useState(
    question?.userAnswer ? question?.userAnswer : null
  );
  useEffect(() => {
    if (question?.userAnswer !== undefined) {
      setAnswerValue(question?.userAnswer);
      setRangValue(question?.userAnswer);
    } else {
      setAnswerValue("");
      setRangValue(null);
    }
  }, [question?.userAnswer, question?.userQuestionId]);

  const takenQuestion = () => {
    // console.log("taken question");
    return (
      <>
        {question?.parentQuestion?.inputType !== "range" && (
          <Input
            readOnly
            type={question!.parentQuestion?.inputType}
            placeholder={`Enter your ${question!.parentQuestion?.inputType}`}
            value={question?.userAnswer}
            classNames={{
              base: ["w-full p-4"],
            }}
          />
        )}
        {question!.parentQuestion?.inputType === "range" && (
          <div className="flex flex-col gap-2  p-4 w-full h-full items-start justify-center">
            <Slider
              size="md"
              label={"Define Range?"}
              value={question?.userAnswer}
              step={question!.parentQuestion?.step}
              showSteps={true}
              minValue={question!.parentQuestion?.min}
              maxValue={question!.parentQuestion?.max}
              className="w-full"
            />
          </div>
        )}
      </>
    );
  };

  const currentQuestion = () => {
    // console.log("current question");

    const isInvalid =
      question?.isAnswerInvalid && question?.userAnswer === undefined;
    return (
      <>
        {question?.parentQuestion?.inputType !== "range" && (
          <Input
            type={question!.parentQuestion?.inputType}
            placeholder={`Enter your ${question!.parentQuestion?.inputType}`}
            value={answerValue}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (question!.parentQuestion?.inputType === "number") {
                setAnswerValue(e.target.valueAsNumber);
              } else {
                setAnswerValue(e.target.value);
              }
            }}
            onBlur={() => {
              if (
                question!.parentQuestion?.inputType === "number" &&
                answerValue
              ) {
                handleAdminPreviewQuestions!(index!, "userAnswer", answerValue);
              } else if (
                question!.parentQuestion?.inputType !== "number" &&
                answerValue &&
                answerValue.trim()
              ) {
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
            errorMessage={
              isInvalid && `${question!.parentQuestion?.inputType} is required!`
            }
          />
        )}
        {question!.parentQuestion?.inputType === "range" && (
          <div className="flex flex-col gap-2  p-4 w-full h-full items-start justify-center">
            <Slider
              size="md"
              color={isInvalid ? "danger" : "primary"}
              label={"Define Range?"}
              value={rangValue}
              onChange={setRangValue}
              onBlur={() => {
                handleAdminPreviewQuestions!(index!, "userAnswer", rangValue);
              }}
              step={question!.parentQuestion?.step}
              showSteps={true}
              minValue={question!.parentQuestion?.min}
              maxValue={question!.parentQuestion?.max}
              className="w-full"
            />
            {isInvalid && (
              <p className="text-rose-500 capitalize font-semibold text-sm">{`${
                question!.parentQuestion?.inputType
              } is required!`}</p>
            )}
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <div>{isCurrentQuestion ? currentQuestion() : takenQuestion()}</div>
    </>
  );
};

export default SingleInput;
