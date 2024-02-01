"use client";
import React, { useEffect, useState } from "react";
import { Input, Listbox, ListboxItem, Tooltip } from "@nextui-org/react";
import QuestionForm from "./QuestionForm";

import { useGlobalContext } from "@/app/Context/store";
import { Asterisk, Network } from "lucide-react";

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
    <section className="h-full grid grid-cols-12 gap-4 justify-center items-center ">
      <aside className="col-span-2 grid grid-rows-12 overflow-auto w-full h-full bg-blue-50 border-small rounded-small border-default-200 dark:border-default-100">
        <h1 className="row-span-1 font-bold text-sm text-center text-blue-400 m-1 p-2 self-center bg-blue-200 rounded-small shadow-lg">
          {questions.length === 0
            ? "Create Survey Questions"
            : questions.length === 1
            ? "Survey Question"
            : "Survey Questions"}
        </h1>
        <Listbox
          aria-label="Listbox Variants"
          color={"primary"}
          variant={"light"}
          classNames={{
            base: "row-span-11 h-full overflow-auto",
            emptyContent: "text-base text-center self-center",
          }}
          itemClasses={{
            title: "font-semibold ps-4 text-base hover:!text-blue-400",
          }}
          emptyContent={"Add some questions..."}
        >
          {questions.map((question, index) => (
            <ListboxItem
              key={`${question.questionId}`}
              onPress={() => scrollHandle(question.questionId!)}
            >
              <div className="flex items-center gap-4">
                <h3> {question.name}</h3>
                {question.visibleIf && question.visibleIf?.length > 0 && (
                  <>
                    <Tooltip content={"Logic Applied"}>
                      <Network size={`14`} color="green" />
                    </Tooltip>
                    <Tooltip content="Question is Required">
                      <Asterisk size={`16`} color={`red`} />
                    </Tooltip>
                  </>
                )}
              </div>
            </ListboxItem>
          ))}
        </Listbox>
      </aside>
      <div className="overflow-auto h-full col-span-10 pe-1">
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
              input: ["text-black  font-semibold"],
            }}
          />
        </div>

        <QuestionForm />
      </div>
    </section>
  );
};

export default SurveyComposer;
