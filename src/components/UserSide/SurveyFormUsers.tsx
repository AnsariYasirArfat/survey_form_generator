"use client";
import React, { useEffect, useState } from "react";
import { Input, Listbox, ListboxItem } from "@nextui-org/react";

import QuestionUser from "./QuestionUser";
const SurveyFormUsers = () => {
  const storedData = localStorage.getItem("surveyFormData");
  const parsedData = storedData && JSON.parse(storedData);
  const [userSurvey, setUserSurvey] = useState(parsedData);
  return (
    <section className="h-full grid grid-cols-12 gap-4 justify-center items-center ">
      <aside className="col-span-2 grid grid-rows-12 overflow-auto w-full h-full bg-blue-50 shadow-xl border-small rounded-small border-default-200 dark:border-default-100">
        <h1 className="row-span-1 font-bold text-sm text-center text-blue-400 m-2 p-2 bg-blue-200 rounded-small shadow-lg">
          Questions
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
          {[{ name: "Question 1" }].map((question) => (
            <ListboxItem key={`${question.name}`}>{question.name}</ListboxItem>
          ))}
        </Listbox>
      </aside>
      <div className="grid grid-rows-12 gap-4 overflow-auto h-full col-span-10 pe-1">
        <div className="row-span-2 bg-blue-50 shadow-lg p-4 rounded-xl flex justify-center items-center">
          <h1 className="text-center text-3xl font-bold text-blue-600">
            {userSurvey.name}
          </h1>
        </div>
        <QuestionUser userSurvey={userSurvey} />
      </div>
    </section>
  );
};

export default SurveyFormUsers;
