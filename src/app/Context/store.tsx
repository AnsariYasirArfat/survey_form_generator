"use client";

import {
  GlobalContextProps,
  LogicConditonData,
  Question,
  SurveyForm,
} from "@/types/questions";
import { useContext, useState, createContext } from "react";

const GlobalContext = createContext<GlobalContextProps>({
  questions: [],
  setQuestions: () => {},
  surveyForm: {
    name: "",
    questions: [],
  },
  setSurveyForm: () => {},
  logicConditionsData: [],
  setLogicConditionsData: () => {},
});
export const GlobalContextProvider = ({ children }: any) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [surveyForm, setSurveyForm] = useState<SurveyForm>({
    name: "",
    questions: questions,
  });

  const [logicConditionsData, setLogicConditionsData] = useState<
    LogicConditonData[]
  >([]);
  return (
    <GlobalContext.Provider
      value={{
        questions,
        setQuestions,
        surveyForm,
        setSurveyForm,
        logicConditionsData,
        setLogicConditionsData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
