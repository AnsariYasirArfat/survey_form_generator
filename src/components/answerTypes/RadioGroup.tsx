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
import { Choices, Question } from "../QuestionForm";

interface RadioGroupProps {
  question: Question;
  index: number;
  handleDataChange: (
    index: number,
    field: keyof Question,
    value: string | boolean | number | Choices[]
  ) => void;
}
const RadioGroup = ({ question, index, handleDataChange }: RadioGroupProps) => {
  const [choiceCount, setChoiceCount] = useState(3);

  const addChoice = () => {
    const choices: any = question.choices;

    const addedChoices = [
      ...choices,
      { text: `Choice ${choiceCount}`, value: `Choice ${choiceCount}` },
    ];
    console.log("Added choice: ", addedChoices);
    handleDataChange(index, "choices", addedChoices);

    setChoiceCount((prevCount) => prevCount + 1);
  };

  const minusChoice = (choiceToMinus: any) => {
    const choices: any = question.choices;
    const minusChoice = choices.filter(
      (choice: any) => choiceToMinus.text !== choice.text
    );

    handleDataChange(index, "choices", minusChoice);
  };

  // const editChoice = (index: number, field: string, value: string) => {
  //   // setchoices((prevchoices: any) => {
  //   //   const updatedchoices = [...prevchoices];
  //   //   updatedchoices[index] = {
  //   //     ...updatedchoices[index],
  //   //     [field]: value,
  //   //   };
  //   //   return updatedchoices;
  //   // });
  //   const choices: any = question.choices;
  //   const updatedChoices: any = [...choices];
  //   updatedChoices[index] = {
  //     ...updatedChoices[index],
  //     [field]: value,
  //   };
  //   handleDataChange(index, "choices", updatedChoices);
  // };

  const editChoice = (index: number, field: string, value: string) => {
    const choices: any = question.choices;
    const updatedChoices: any = [...choices];

    updatedChoices[index] = {
      ...updatedChoices[index],
      [field]: value,
    };

    handleDataChange(index, "choices", updatedChoices);
  };

  // console.log("questions string: ", `${JSON.stringify(question)}`);

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
        {question.choices?.map((choice: any, index: number) => {
          return (
            <div
              key={`radiogroup-${index}-${JSON.stringify(question)}`}
              className="flex justify-between items-center"
            >
              <Radio value={choice.value} />
              <Input
                size={"sm"}
                type="text"
                value={choice.text}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  editChoice(index, "text", e.target.value)
                }
                // onBlur={(e: any) => editChoice(index, "text", e.target.value)}
                classNames={{
                  base: ["me-4"],
                  input: ["text-black capitalize font-semibold"],
                }}
              />
              <Button
                onClick={() => minusChoice(choice)}
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
            value={`Choice ${choiceCount}`}
            readOnly
            classNames={{
              base: ["me-4"],
              input: ["text-black capitalize font-semibold"],
            }}
          />
          <Button
            onClick={addChoice}
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
