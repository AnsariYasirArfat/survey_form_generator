"use client";
import React, { useState } from "react";
import { Button, button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Plus } from "lucide-react";
import QuestionForm from "./QuestionForm";
const SurveyComposer = () => {
  const [questions, setQuestions] = useState<any>([]);
  const [surveyForm, setSurveyForm] = useState<any>({
    name: "",
    questions: questions,
  });
  console.log(surveyForm.name);

  const addQuestions = () => {
    setQuestions([...questions, {}]);
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
    <div className="h-[200vh]">
      <h1 className={`m-2 font-bold text-3xl text-center text-blue-400`}>
        Survey Form Generator
      </h1>

      <div className="p-4">
        <h4 className="m-2 font-bold text-xl text-center text-blue-400">
          Give your survey a name
        </h4>
        <Input
          type="email"
          label="Survey Name"
          size={"lg"}
          value={surveyForm.name}
          onChange={(e) =>
            setSurveyForm((prev: any) => ({
              ...prev,
              name: e.target.value,
            }))
          }
        />
      </div>
      <div className="flex justify-center items-center">
        <Button
          onClick={addQuestions}
          className="w-60"
          color="primary"
          radius="none"
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
