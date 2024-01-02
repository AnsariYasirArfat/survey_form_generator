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

const CheckBoxes = () => {
  const [optionCount, setOptionCount] = useState(3);
  const [options, setOptions] = useState<any>([
    {
      value: "Option 1",
    },
    {
      value: "Option 2",
    },
  ]);
  const addOption = () => {
    setOptions([...options, { value: `Option ${optionCount}` }]);
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
              <Checkbox value={option.value} />
              <Input
                size={"sm"}
                type="text"
                value={option.value}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  editOption(index, "value", e.target.value)
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
          <Checkbox value={"add"} isDisabled />
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
