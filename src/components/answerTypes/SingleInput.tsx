import { Divider, Input, Slider, Switch } from "@nextui-org/react";
import React, { useState } from "react";
import { Question } from "../QuestionForm";

interface SingleinputProps {
  question: Question;
  index: number;
  handleDataChange: (
    index: number,
    field: keyof Question,
    value: string | boolean | number
  ) => void;
}

const SingleInput = ({
  question,
  index,
  handleDataChange,
}: SingleinputProps) => {
  const [isSelected, setIsSelected] = useState(false);
  // const stepInt = parseInt(`${question?.step}`);
  // const minValue = parseInt(`${question?.min}`);
  // const maxValue = parseInt(`${question?.max}`);
  // const defaultValueInt = parseInt(`${question?.defaultValue}`);

  return (
    <div>
      <h5 className="text-center pt-2 text-base font-medium text-blue-800">
        Answer type: Single Input{" "}
        {question.inputType && (
          <>
            <span>{question.inputType}</span>
          </>
        )}
      </h5>
      <div className="mx-4 my-2">
        <Divider />
      </div>
      {question.inputType !== "range" ? (
        <Input
          readOnly
          type={question.inputType}
          placeholder={`Enter your ${question.inputType}`}
          value={""}
          classNames={{
            base: ["w-full p-4"],
          }}
          // label={`${question.inputType ? question.inputType : "Text"}`}
          // isDisabled
        />
      ) : (
        <>
          <div className="w-full grid grid-cols-5 gap-2 p-4 ">
            <Switch
              className="justify-self-center"
              isSelected={isSelected}
              onValueChange={setIsSelected}
              size="sm"
            >
              Show Steps?
            </Switch>
            <Input
              type="number"
              label="Steps Limit?"
              labelPlacement="outside"
              placeholder="0.00"
              size="sm"
              value={`${question.step}`}
              onChange={(e) => {
                console.log("step onchange: ", e);
                handleDataChange(index, "step", e.target.valueAsNumber);
              }}
            />
            <Input
              type="number"
              label="Min Limit"
              placeholder="0.00"
              labelPlacement="outside"
              size="sm"
              value={`${question.min}`}
              onChange={(e) =>
                handleDataChange(index, "min", e.target.valueAsNumber)
              }
            />
            <Input
              type="number"
              label="Max Limit"
              placeholder="0.00"
              labelPlacement="outside"
              size="sm"
              value={`${question.max}`}
              onChange={(e) =>
                handleDataChange(index, "max", e.target.valueAsNumber)
              }
            />
            <Input
              type="number"
              label="Defaule Value"
              labelPlacement="outside"
              size="sm"
              min={0}
              value={`${question.defaultValue}`}
              onChange={(e) => {
                handleDataChange(index, "defaultValue", e.target.valueAsNumber);
                console.log("step default: ", e);
              }}
            />
          </div>
          <Slider
            // isDisabled
            size="md"
            color="primary"
            label={"Range"}
            step={question.step}
            showSteps={question.step ? isSelected : false}
            minValue={question.min}
            maxValue={question.max}
            defaultValue={question.defaultValue}
            className="w-full p-4"
          />
        </>
      )}
    </div>
  );
};

export default SingleInput;
