"use client";

import React, { ChangeEvent, useState } from "react";
import {
  CheckboxGroup,
  Checkbox,
  Divider,
  Button,
  Input,
} from "@nextui-org/react";
import { Minus, Plus } from "lucide-react";
import { Choices } from "../QuestionForm";

const CheckBoxes = () => {
  const [optionCount, setOptionCount] = useState(3);
  const [minSelectedChoices, setMinSelectedChoices] = useState<number>(1);
  const [maxSelectedChoices, setMaxSelectedChoices] = useState<number>(1);
  // console.log("maxSelectedChoices: ", maxSelectedChoices);
  // console.log("minSelectedChoices: ", minSelectedChoices);
  const [options, setOptions] = useState<Choices[]>([
    {
      value: "Option 1",
      text: "Option 1",
    },
    {
      value: "Option 2",
      text: "Option 2",
    },
  ]);

  console.log("options: ", options);
  const addOption = () => {
    setOptions([
      ...options,
      { value: `Option ${optionCount}`, text: `Option ${optionCount}` },
    ]);
    setOptionCount((prevCount) => prevCount + 1);
  };
  const minusOption = (optionToMinus: any) => {
    const udatedOption = options.filter(
      (option: any) => optionToMinus !== option
    );
    setOptions(udatedOption);
  };

  const editOption = (index: number, field: string, value: string) => {
    setOptions((prevOptions: any) => {
      const updatedOptions = [...prevOptions];
      updatedOptions[index] = {
        ...updatedOptions[index],
        [field]: value,
      };
      return updatedOptions;
    });
  };

  return (
    <div>
      <h5 className="text-center pt-2 text-base font-medium text-blue-800">
        Answer type: Checkbox Group
      </h5>
      <div className="mx-4 my-2">
        <Divider />
      </div>
      <div className="w-full grid grid-cols-2 justify-center gap-2 p-4 ">
        <Input
          type="number"
          label="Min. Select Choice?"
          labelPlacement="outside"
          placeholder="0.00"
          size="sm"
          min={0}
          max={options.length}
          value={`${minSelectedChoices}`}
          onChange={(e) => {
            setMinSelectedChoices(e.target.valueAsNumber);
            // console.log(e.target.value);
          }}
          // onChange={(e) => handleDataChange(index, "step", e.target.value)}
        />

        <Input
          type="number"
          label="Max. Select Choice?"
          labelPlacement="outside"
          size="sm"
          min={0}
          max={options.length}
          value={`${maxSelectedChoices}`}
          onChange={
            (e) => {
              setMaxSelectedChoices(e.target.valueAsNumber);
              // console.log(e.target.value);
            }
            // handleDataChange(index, "defaultValue", e.target.value)
          }
        />
      </div>
      <CheckboxGroup
        // label="Add label if needed"
        // isReadOnly
        classNames={{
          base: ["p-4"],
        }}
      >
        {options.map((option: any, index: number) => {
          return (
            <div key={index} className="flex justify-between items-center">
              <Checkbox value={option.value} size={"lg"} radius="sm" />
              <Input
                size={"sm"}
                type="text"
                value={option.text}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  editOption(index, "text", e.target.value)
                }
                classNames={{
                  base: ["me-4"],
                  input: ["text-black capitalize font-semibold"],
                }}
              />
              <Button
                onClick={() => minusOption(option)}
                variant="bordered"
                color="danger"
                size="sm"
              >
                <Minus size={16} />
              </Button>
            </div>
          );
        })}
        <div className="flex justify-between items-center">
          <Checkbox value={"add"} isDisabled size={"lg"} radius="sm" />
          <Input
            isDisabled
            size={"sm"}
            type="text"
            value={`Option ${optionCount}`}
            readOnly
            classNames={{
              base: ["me-4"],
              input: ["text-black capitalize font-semibold"],
            }}
          />

          <Button
            onClick={addOption}
            variant="bordered"
            color="success"
            size="sm"
          >
            <Plus size={16} />
          </Button>
        </div>
      </CheckboxGroup>
    </div>
  );
};

export default CheckBoxes;
