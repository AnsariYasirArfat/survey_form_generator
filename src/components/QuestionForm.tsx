"use client";

import { ChangeEvent } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Input,
  Button,
  Select,
  SelectItem,
  Tooltip,
} from "@nextui-org/react";
import { Asterisk, CopyPlus, Network, Trash2 } from "lucide-react";
import { answerTypesData, singleInputTypes } from "@/utils/answerTypesData";
import ConditionalLogicEditor from "./ConditionalLogicEditor";
import LongText from "./answerTypes/LongText";
import RadioGroup from "./answerTypes/RadioGroup";
import CheckBoxes from "./answerTypes/CheckBoxes";
import SingleInput from "./answerTypes/SingleInput";
import Boolean from "./answerTypes/Boolean";
import RatingScale from "./answerTypes/RatingScale";
import DefaultAnswer from "./answerTypes/DefaultUI";

// text?: string;
export interface Question {
  name?: string;
  title?: string;
  inputType?: string;
  type?: string;
  choices?: string[];
  min?: number | string;
  max?: number | string;
  step?: number | string;
  rateType?: string;
  defaultValue?: number;
}
export interface QuestionFormProp {
  questions: Question[];
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
}

const QuestionForm = ({ questions, setQuestions }: QuestionFormProp) => {
  const handleDataChange = (
    index: number,
    field: keyof Question,
    value: string
  ) => {
    // Updating the specified field of the question at the given index
    const updatedQuestions: any = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const renderAnswerField = (question: Question, index: number) => {
    console.log(question);
    switch (question.type) {
      case "singleinput":
        return (
          <SingleInput
            question={question}
            index={index}
            // inputType={question.inputType}
            // questions={questions}
            // setQuestions={setQuestions}
            handleDataChange={handleDataChange}
          />
        );

      case "textarea":
        return <LongText />;

      case "radiogroup":
        return <RadioGroup />;

      case "checkboxes":
        return <CheckBoxes />;

      case "boolean":
        return <Boolean />;

      case "ratingscale":
        return <RatingScale />;
      default:
        return <DefaultAnswer />;
    }
  };

  return (
    <div>
      <h1 className="font-bold text-xl text-center text-blue-400 mb-2">
        {questions.length === 0
          ? "Create Survey Questions"
          : questions.length === 1
          ? "Survey Question"
          : "Survey Questions"}
      </h1>
      <div className="mx-4 grid grid-cols-1 gap-4 ">
        {questions.map((question, index) => (
          <Card key={index} isFooterBlurred className="w-full bg-blue-300 ">
            <CardHeader className="grid grid-cols-4 gap-3">
              <Input
                type="text"
                classNames={{
                  input: ["text-black capitalize font-semibold"],
                  description: ["text-black"],
                  label: [""],
                }}
                label="Question name:"
                // description="Write your question here"
                labelPlacement={"outside"}
                size={"md"}
                value={
                  question.name === undefined
                    ? `Question ${index + 1}`
                    : question.name
                }
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleDataChange(index, "name", e.target.value)
                }
                onClear={() => {
                  console.log("Question name cleared");
                  handleDataChange(index, "name", "");
                }}
                isClearable
              />
              <Input
                isClearable
                type="text"
                classNames={{
                  base: ["col-span-3"],
                  input: ["text-black capitalize font-semibold"],
                  description: ["text-black"],
                }}
                label="Question title:"
                // description="Write your question here"
                labelPlacement={"outside"}
                placeholder="Write the question you'd like to present to users here:"
                size={"md"}
                value={question.title || ""}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleDataChange(index, "title", e.target.value)
                }
                onClear={() => {
                  console.log("Question title cleared");
                  handleDataChange(index, "title", "");
                }}
              />
            </CardHeader>

            <CardBody className="p-3">
              <div className="rounded-md bg-blue-100">
                {renderAnswerField(question, index)}
              </div>
            </CardBody>
            <CardFooter className="grid grid-cols-3 gap-4">
              <div className="w-full">
                <Select
                  label="Choose the answer Type:"
                  className="max-w-xs"
                  // placeholder="Select an type"
                  selectedKeys={question.type ? [question.type] : undefined}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    handleDataChange(index, "type", e.target.value)
                  }
                >
                  {answerTypesData.map((answerType) => (
                    <SelectItem key={answerType.type} value={answerType.type}>
                      {answerType.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              <div className="h-full w-full">
                {question && question.type === "singleinput" && (
                  <div className="w-full">
                    <Select
                      label="Select Input Type:"
                      className="max-w-xs"
                      // placeholder="Select an type"
                      defaultSelectedKeys={["text"]}
                      selectedKeys={
                        question.inputType ? [question.inputType] : undefined
                      }
                      onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                        handleDataChange(index, "inputType", e.target.value)
                      }
                    >
                      {singleInputTypes.map((inputType) => (
                        <SelectItem key={inputType.type} value={inputType.type}>
                          {inputType.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                )}
              </div>
              <div className="flex justify-end h-full items-end gap-2">
                <ConditionalLogicEditor />

                <Tooltip content="Required">
                  <Button radius="sm" size={"sm"}>
                    <Asterisk size={"16"} />
                  </Button>
                </Tooltip>
                <Tooltip content="Duplicate">
                  <Button radius="sm" size={"sm"}>
                    <CopyPlus size={"16"} />
                  </Button>
                </Tooltip>
                <Tooltip content="Delete" color={"danger"}>
                  <Button radius="sm" size={"sm"} color={"danger"}>
                    <Trash2 size={"16"} />
                  </Button>
                </Tooltip>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QuestionForm;
