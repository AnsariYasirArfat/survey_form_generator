"use client";
import React, { ChangeEvent, useState } from "react";
import {
  RadioGroup as RadioType,
  Radio,
  Divider,
  Button,
  Input,
} from "@nextui-org/react";
import { Minus, Plus } from "lucide-react";
import { Choices } from "../QuestionForm";

const RadioGroup = () => {
  const [optionCount, setOptionCount] = useState(3);
  const [options, setOptions] = useState<Choices[]>([
    {
      text: "Option 1",
      value: "Option 1",
    },
    {
      text: "Option 2",
      value: "Option 2",
    },
  ]);

  console.log("options: ", options);

  const addOption = () => {
    setOptions([
      ...options,
      { text: `Option ${optionCount}`, value: `Option ${optionCount}` },
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
        Answer type: Radio Group
      </h5>
      <div className="mx-4 my-2">
        <Divider />
      </div>

      <RadioType
        // label="Add label if needed"
        // isReadOnly
        classNames={{
          base: ["p-4"],
        }}
      >
        {options.map((option: any, index: number) => {
          return (
            <div key={index} className="flex justify-between items-center">
              <Radio value={option.value} />
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
          <Radio value={"add"} isDisabled />
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
      </RadioType>
    </div>
  );
};

export default RadioGroup;
