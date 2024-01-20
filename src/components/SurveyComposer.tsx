"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Divider,
  Input,
  Listbox,
  ListboxItem,
} from "@nextui-org/react";
import QuestionForm from "./QuestionForm";

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
  const scrollHandle = (questionId: string) => {
    const targetElement = document.getElementById(`${questionId}`);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  return (
    <section className=" bg-white grid grid-cols-12 justify-center items-center">
      <aside className="col-span-2 ps-4 h-[90vh] ">
        <div className="w-full border-small rounded-small border-default-200 dark:border-default-100">
          <h1 className="font-bold text-base text-center text-blue-400 p-2 bg-blue-200 rounded-t-small">
            {questions.length === 0
              ? "Create Survey Questions"
              : questions.length === 1
              ? "Survey Question"
              : "Survey Questions"}
          </h1>
          <Divider />
          <Listbox
            aria-label="Listbox Variants"
            color={"primary"}
            variant={"light"}
            classNames={{ base: "h-[84vh] overflow-auto bg-blue-50" }}
            itemClasses={{ title: "font-semibold text-center text-base" }}
            emptyContent={"Add some questions..."}
          >
            {questions.map((question) => (
              <ListboxItem
                key={`${question.questionId}`}
                // href={`#${question.questionId}`}
                onPress={() => scrollHandle(question.questionId!)}
              >
                {question.name}
              </ListboxItem>
            ))}
          </Listbox>
        </div>
      </aside>
      <div className="overflow-auto h-[90vh] col-span-10 px-4 pb-4">
        <div className="">
          <Input
            isClearable
            color="primary"
            type="text"
            label="Provide a name for your survey:"
            labelPlacement={"inside"}
            size={"lg"}
            value={surveyName}
            onChange={(e) => {
              setSurveyName(e.target.value);
            }}
            onBlur={() =>
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
              base: ["mb-4"],
              input: ["text-black capitalize font-semibold"],
            }}
          />
        </div>

        <QuestionForm />
      </div>
    </section>
  );
};

export default SurveyComposer;
