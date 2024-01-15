"use client";
import React, { useEffect, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import QuestionForm from "./QuestionForm";
import Link from "next/link";
import { useGlobalContext } from "@/app/Context/store";

const SurveyComposer = () => {
  const { questions, surveyForm, setSurveyForm } = useGlobalContext();
  const [surveyName, setSurveyName] = useState(surveyForm.name || "");
  useEffect(() => {
    setSurveyForm((prev) => ({
      ...prev,
      questions: questions,
    }));
  }, [questions, setSurveyForm]);
  console.log("SurveyForm: ", surveyForm);

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
          value={surveyName}
          onChange={(e) => {
            setSurveyName(e.target.value);
          }}
          onBlur={(e) =>
            setSurveyForm((prev: any) => ({
              ...prev,
              name: surveyName,
            }))
          }
          onClear={() => {
            setSurveyName("");

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
