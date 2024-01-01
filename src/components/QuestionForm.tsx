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
import { Asterisk, CopyPlus, Trash2 } from "lucide-react";
import { answerTypesData } from "@/utils/answerTypesData";
import ConditionalLogicEditor from "./ConditionalLogicEditor";
import LongText from "./answerTypes/LongText";
import RadioGroup from "./answerTypes/RadioGroup";

interface Question {
  name?: string;
  text?: string;
  type?: string;
  choices?: string[];
}
interface QuestionFormProp {
  questions: Question[];
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
}

const QuestionForm = ({ questions, setQuestions }: QuestionFormProp) => {
  const handleQuestionChange = (
    index: number,
    field: keyof Question,
    value: string
  ) => {
    // Updating the specified field of the question at the given index
    const updatedQuestions: any = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const renderAnswerField = (question: Question) => {
    console.log(question);
    switch (question.type) {
      case "textarea":
        return <LongText />;

      case "radiogroup":
        return <RadioGroup />;
      default:
        return null;
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
            <CardHeader className="flex gap-3">
              <Input
                isClearable
                type="text"
                classNames={{
                  input: ["text-black capitalize font-semibold"],
                  description: ["text-black"],
                }}
                label="Question?"
                // description="Write your question here"
                // labelPlacement={"outside"}
                size={"md"}
                value={question.text || ""}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleQuestionChange(index, "text", e.target.value)
                }
                onClear={() => {
                  console.log("Question text cleared");
                  handleQuestionChange(index, "text", "");
                }}
              />
            </CardHeader>

            <CardBody className="p-3">
              <div className="rounded-md bg-blue-100">
                {renderAnswerField(question)}
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
                    handleQuestionChange(index, "type", e.target.value)
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
                <ConditionalLogicEditor />
              </div>
              <div className="flex justify-end h-full items-end gap-2">
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
