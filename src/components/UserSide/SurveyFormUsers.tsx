"use client";
import React, { useEffect, useState } from "react";
import { Listbox, ListboxItem } from "@nextui-org/react";
import AdminPreview from "./AdminPreview";
import { SurveyForm, UserQuestion } from "@/types/questions";
import { v4 as uuidv4 } from "uuid";

const SurveyFormUsers = () => {
  const [userSurvey, setUserSurvey] = useState<SurveyForm>({
    name: "",
    questions: [],
  });

  const [generatedUserQuestionId, setGeneratedUserQuestionId] = useState("");

  const [userQuestionList, setUserQuestionList] = useState<UserQuestion[]>([]);

  console.log("User Question List", userQuestionList);

  useEffect(() => {
    const storedData = localStorage.getItem("surveyFormData");
    const parsedData: SurveyForm = storedData && JSON.parse(storedData);
    setUserSurvey(parsedData);
    if (parsedData && parsedData.questions.length > 0) {
      const { visibleIf, ...questionWithoutVisibleIf } =
        parsedData.questions[0];
      const userQuestion: UserQuestion = {
        userQuestionId: uuidv4(),
        questionNo: `Question 1`,
        parentQuestion: questionWithoutVisibleIf,
        userAnswer: undefined,
        isAnswerInvalid: false,
      };

      setUserQuestionList([userQuestion]);
    }
  }, []);

  const scrollHandle = (questionId: string) => {
    const targetElement = document.getElementById(`${questionId}`);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  useEffect(() => {
    scrollHandle(generatedUserQuestionId);
  }, [generatedUserQuestionId]);
  return (
    <section className="h-full grid grid-cols-12 gap-4 justify-center items-center ">
      <aside className="col-span-2 grid grid-rows-12 overflow-auto w-full h-full bg-blue-50 shadow-xl border-small rounded-small border-default-200 dark:border-default-100">
        <h1 className="row-span-1 font-bold text-sm text-center text-blue-400 m-1 p-2 self-center bg-blue-200 rounded-small shadow-lg">
          Questions seen
        </h1>
        <Listbox
          aria-label="Listbox Variants"
          color={"primary"}
          variant={"light"}
          classNames={{
            base: "row-span-11 h-full overflow-auto",
            emptyContent: "text-lg text-center self-center",
          }}
          itemClasses={{ title: "font-semibold text-center text-base" }}
          emptyContent={"Add some questions..."}
        >
          {userQuestionList.map((question) => (
            <ListboxItem
              onPress={() => scrollHandle(question.userQuestionId)}
              key={`${question.userQuestionId}`}
            >
              {question.questionNo}
            </ListboxItem>
          ))}
        </Listbox>
      </aside>
      <div className="grid grid-rows-12 gap-4 overflow-auto h-full col-span-10 pe-1">
        <div className="row-span-2 bg-blue-50 shadow-lg p-4 rounded-xl flex justify-center items-center">
          <h1 className="text-center text-2xl font-bold text-blue-600">
            {userSurvey && userSurvey.name
              ? userSurvey.name
              : `No Survey Available!`}
          </h1>
        </div>

        <AdminPreview
          userSurvey={userSurvey}
          userQuestionList={userQuestionList}
          setUserQuestionList={setUserQuestionList}
          setGeneratedUserQuestionId={setGeneratedUserQuestionId}
        />
      </div>
    </section>
  );
};

export default SurveyFormUsers;
