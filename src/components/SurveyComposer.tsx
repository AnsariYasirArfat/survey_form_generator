"use client";
import React, { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { Plus } from "lucide-react";
import QuestionForm from "./QuestionForm";
import { v4 as uuidv4 } from "uuid";

const SurveyComposer = () => {
  const [questions, setQuestions] = useState<any>([]);
  const [surveyForm, setSurveyForm] = useState<any>({
    name: "",
    questions: questions,
  });
  console.log(surveyForm.name);

  const addQuestions = () => {
    setQuestions([
      ...questions,
      {
        questionId: uuidv4(),
      },
    ]);
    // const targetElement = document.getElementById("heading2");
    // if (targetElement) {
    //   console.log("target: ", targetElement);
    //   targetElement.scrollIntoView({
    //     behavior: "smooth",
    //     block: "start",
    //   });
    // }
  };
  return (
    <div className="">
      <h1 className={`m-2 font-bold text-3xl text-center text-blue-400`}>
        Survey Form Generator
      </h1>

      <div className="px-4">
        {/* <h4 className="m-2 font-bold text-xl text-center text-blue-400">
        Provide a name for your survey:
        </h4> */}
        <Input
          isClearable
          type="text"
          label="Provide a name for your survey:"
          labelPlacement={"outside"}
          size={"lg"}
          value={surveyForm.name}
          onChange={(e) =>
            setSurveyForm((prev: any) => ({
              ...prev,
              name: e.target.value,
            }))
          }
          onClear={() => {
            console.log("Survey form's name cleared");
            setSurveyForm((prev: any) => ({
              ...prev,
              name: "",
            }));
          }}
          classNames={{
            input: ["text-black capitalize font-semibold"],
          }}
        />
      </div>
      <div className="flex justify-center items-center">
        <Button
          onClick={addQuestions}
          className="w-full h-12 m-4 font-bold text-xl"
          color="primary"
          radius="sm"
          variant="ghost"
        >
          <Plus size={16} />
          Add Questions
        </Button>
      </div>
      <QuestionForm questions={questions} setQuestions={setQuestions} />
    </div>
  );
};

export default SurveyComposer;
