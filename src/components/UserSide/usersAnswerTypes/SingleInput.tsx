import { AnswerTypeComponentProps } from "@/types/questions";
import { Divider, Input, Slider, Switch } from "@nextui-org/react";
import React, { ChangeEvent, useEffect, useState } from "react";

const SingleInput = ({ question }: AnswerTypeComponentProps) => {
  const [answerValue, setAnswerValue] = useState("");
  const [rangValue, setRangValue] = useState(0);

  return (
    <>
      {question!.inputType !== "range" && (
        <Input
          type={question!.inputType}
          placeholder={`Enter your ${question!.inputType}`}
          value={answerValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            // if (question!.inputType === "number") {
            //   setAnswerValue(e.target.valueAsNumber);
            // } else {
            //   setAnswerValue(e.target.value);
            // }
          }}
          onBlur={() => {
            // if (question!.inputType === "number" && answerValue) {
            //   handleLogicConditions!(logicIndex!, "answerValue", answerValue);
            // } else if (
            //   question!.inputType !== "number" &&
            //   answerValue &&
            //   answerValue.trim()
            // ) {
            //   handleLogicConditions!(logicIndex!, "answerValue", answerValue);
            // } else {
            //   handleLogicConditions!(logicIndex!, "answerValue", undefined);
            // }
          }}
          classNames={{
            base: ["w-full p-4"],
          }}
          // isInvalid={isInvalid}
          // color={isInvalid ? "danger" : "default"}
          // errorMessage={isInvalid && "Please defined answer"}
        />
      )}
      {question!.inputType === "range" && (
        <div className="flex flex-col gap-2  p-4 w-full h-full items-start justify-center">
          <Slider
            size="md"
            // color={isInvalid ? "danger" : "primary"}
            label={"Define Range?"}
            value={rangValue}
            onChange={() => setRangValue}
            onBlur={() => {
              // handleLogicConditions!(logicIndex!, "answerValue", rangValue);
            }}
            step={question!.step}
            showSteps={true}
            minValue={question!.min}
            maxValue={question!.max}
            className="w-full"
          />
          {/* {isInvalid && (
            <p className="text-rose-500 font-semibold">
              Please define the range.
            </p>
          )} */}
        </div>
      )}
    </>
  );
};

export default SingleInput;
