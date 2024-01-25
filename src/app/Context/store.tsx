"use client";

import { GlobalContextProps, Question, SurveyForm } from "@/types/questions";
import { useContext, useState, createContext, useEffect } from "react";
const STORAGE_KEY = "surveyFormData";
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
  let storedData;
  if (global?.window !== undefined) {
    storedData = window?.localStorage.getItem(STORAGE_KEY);
  }

  const parsedData = storedData
    ? JSON.parse(storedData)
    : { name: "", questions: [] };

  const questionsFromLocalStorage = parsedData.questions || [];
  const [questions, setQuestions] = useState<Question[]>(
    questionsFromLocalStorage
  );
  const [surveyForm, setSurveyForm] = useState<SurveyForm>(parsedData);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(surveyForm));
  }, [questions, surveyForm]);
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
