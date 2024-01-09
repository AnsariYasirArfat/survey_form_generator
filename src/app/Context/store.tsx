"use client";

import { Question, SurveyForm } from "@/types/questions";
import {
  useContext,
  useState,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";

const GlobalContext = createContext({
  questions: [] as Question[],
  setQuestions: {} as Dispatch<SetStateAction<Question[]>>,
  surveyForm: {} as SurveyForm,
  setSurveyForm: {} as Dispatch<SetStateAction<SurveyForm>>,
});

export const GlobalContextProvider = ({ children }: any) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [surveyForm, setSurveyForm] = useState<SurveyForm>({
    name: "",
    questions: questions,
  });

  return (
    <GlobalContext.Provider
      value={{ questions, setQuestions, surveyForm, setSurveyForm }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
