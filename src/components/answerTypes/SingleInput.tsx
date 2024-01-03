import { Divider, Input, Slider, Switch } from "@nextui-org/react";
import React, { useState } from "react";
import { Question } from "../QuestionForm";

interface SingleinputProps {
  question: Question;
  index: number;
  handleDataChange: (
    index: number,
    field: keyof Question,
    value: string
  ) => void;
}

const SingleInput = ({
  question,
  index,
  handleDataChange,
}: SingleinputProps) => {
  const {
    inputType,
    max = 100,
    min = 0,
    defaultValue = 50,
    step = 10,
  } = question;
  const [isSelected, setIsSelected] = useState(false);
  const stepInt = parseInt(`${step}`);
  const minValue = parseInt(`${min}`);
  const maxValue = parseInt(`${max}`);
  const defaultValueInt = parseInt(`${defaultValue}`);

  return (
    <div>
      <h5 className="text-center pt-2 text-base font-medium text-blue-800">
        Answer type: Single Input{" "}
        {inputType && (
          <>
            <span>{inputType}</span>
          </>
        )}
      </h5>
      <div className="mx-4 my-2">
        <Divider />
      </div>
      {inputType !== "range" ? (
        <Input
          readOnly
          type={inputType ? inputType : "text"}
          placeholder={`Enter your ${inputType ? inputType : "text"}`}
          value={""}
          classNames={{
            base: ["w-full p-4 "],
          }}
          // label={`${inputType ? inputType : "Text"}`}
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
              value={`${step}`}
              onChange={(e) => handleDataChange(index, "step", e.target.value)}
            />
            <Input
              type="number"
              label="Min Limit"
              placeholder="0.00"
              labelPlacement="outside"
              size="sm"
              value={`${min}`}
              onChange={(e) => handleDataChange(index, "min", e.target.value)}
            />
            <Input
              type="number"
              label="Max Limit"
              placeholder="0.00"
              labelPlacement="outside"
              size="sm"
              value={`${max}`}
              onChange={(e) => handleDataChange(index, "max", e.target.value)}
            />
            <Input
              type="number"
              label="Defaule Value"
              labelPlacement="outside"
              size="sm"
              // min={0}
              value={`${defaultValue}`}
              onChange={(e) =>
                handleDataChange(index, "defaultValue", e.target.value)
              }
            />
          </div>
          <Slider
            // isDisabled
            size="md"
            color="primary"
            label={"Range"}
            step={stepInt}
            showSteps={stepInt ? isSelected : false}
            minValue={minValue || 0}
            maxValue={maxValue || 100}
            defaultValue={
              maxValue < defaultValueInt ? maxValue / 2 : defaultValueInt
            }
            className="w-full p-4"
          />
        </>
      )}
    </div>
  );
};

export default SingleInput;
