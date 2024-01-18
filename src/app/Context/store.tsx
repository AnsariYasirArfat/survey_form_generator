"use client";

import { GlobalContextProps, Question, SurveyForm } from "@/types/questions";
import { useContext, useState, createContext } from "react";

const GlobalContext = createContext<GlobalContextProps>({
  questions: [],
  setQuestions: () => {},
  surveyForm: {
    name: "",
    questions: [],
  },
  setSurveyForm: () => {},
});
export const GlobalContextProvider = ({ children }: any) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [surveyForm, setSurveyForm] = useState<SurveyForm>({
    name: "",
    questions: questions,
  });

  return (
    <GlobalContext.Provider
      value={{
        questions,
        setQuestions,
        surveyForm,
        setSurveyForm,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
