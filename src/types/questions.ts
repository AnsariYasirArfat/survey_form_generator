import { Dispatch, SetStateAction } from "react";

export interface GlobalContextProps {
  questions: Question[];
  setQuestions: Dispatch<SetStateAction<Question[]>>;
  surveyForm: SurveyForm;
  setSurveyForm: Dispatch<SetStateAction<SurveyForm>>;
  logicConditionsData: LogicConditonData[];
  setLogicConditionsData: Dispatch<SetStateAction<any>>;
}

export interface Choices {
  value?: string;
  text?: string;
}

export interface Question {
  questionId?: string;
  name?: string;
  title?: string;
  inputType?: string;
  type?: string;
  choices?: Choices[];
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  rateType?: string;
  rateCount?: number;
  isRequired?: boolean;
  maxSelectedChoices?: number;
  minSelectedChoices?: number;
}

export interface SurveyForm {
  name: string;
  questions: Question[];
}

export interface AnswerTypeComponentProps {
  adminMode: boolean;
  question?: Question;
  logic?: LogicConditonData;
  index: number;
  handleDataChange?: (
    index: number,
    field: keyof Question,
    value: string | boolean | number | Choices[]
  ) => void;
  handleLogicConditions?: (
    index: number,
    field: keyof LogicConditonData,
    value: string | Question
  ) => void;
}

export interface ConditionalLogicEditorProps
  extends Omit<AnswerTypeComponentProps, "adminMode" | "question"> {}

export interface LogicConditonData {
  logicDataId: string;
  currentQuestionId: string | undefined;
  selectQuestId: string | undefined;
  selectedQuestion: Question | undefined;
  comparisonOperator: string | undefined;
  logicOperator: string | undefined;
  answerValue: string | undefined;
}
