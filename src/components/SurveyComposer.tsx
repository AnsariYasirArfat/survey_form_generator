"use client";
import React, { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import QuestionForm from "./QuestionForm";
import Link from "next/link";
import { useGlobalContext } from "@/app/Context/store";

const SurveyComposer = () => {
  // const [questions, setQuestions] = useState<any>([]);
  // const [surveyForm, setSurveyForm] = useState<any>({
  //   name: "",
  //   questions: questions,
  // });

  const { questions, setQuestions, setSurveyForm, surveyForm } =
    useGlobalContext();
  return (
    <div className="">
      <div className="flex justify-center items-center">
        <h1 className={`m-2 font-bold text-3xl text-center text-blue-400`}>
          Survey Form Generator{" "}
        </h1>
        <Link
          href={{
            pathname: "/json",
            // query: {
            //   name: surveyForm.name,
            //   questions: JSON.stringify(questions),
            // },
          }}
        >
          <Button radius="sm" size={"sm"} className="font-bold">
            JSON
          </Button>
        </Link>
      </div>

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

      <QuestionForm />
    </div>
  );
};

export default SurveyComposer;
