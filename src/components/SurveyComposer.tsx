"use client";
import React, { useState } from "react";
import { Input } from "@nextui-org/react";
import QuestionForm from "./QuestionForm";

const SurveyComposer = () => {
  const [questions, setQuestions] = useState<any>([]);
  const [surveyForm, setSurveyForm] = useState<any>({
    name: "",
    questions: questions,
  });

  return (
    <div className="">
      <h1 className={`m-2 font-bold text-3xl text-center text-blue-400`}>
        Survey Form Generator
      </h1>

      <div className="px-4">
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

      <QuestionForm questions={questions} setQuestions={setQuestions} />
    </div>
  );
};

export default SurveyComposer;
