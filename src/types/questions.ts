import { Dispatch, SetStateAction } from "react";

export interface GlobalContextProps {
  questions: Question[];
  setQuestions: Dispatch<SetStateAction<Question[]>>;
  surveyForm: SurveyForm;
  setSurveyForm: Dispatch<SetStateAction<SurveyForm>>;
  logicConditionsData: LogicConditionData[];
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
  index?: number;
  question?: Question;
  handleDataChange?: (
    index: number,
    field: keyof Question,
    value: string | number | Choices[]
  ) => void;

  logic?: LogicConditionData;
  handleLogicConditions?: (
    index: number,
    field: keyof LogicConditionData,
    value: string | Question | boolean | number | string[] | undefined
  ) => void;
}

// export interface ConditionalLogicEditorProps
//   extends Omit<AnswerTypeComponentProps, "adminMode" | "question"> {}

export interface LogicConditionData {
  logicDataId: string;
  currentQuestionId: string | undefined;
  selectQuestId: string | undefined;
  selectedQuestion: Question | undefined;
  comparisonOperator: string | undefined;
  logicOperator: string | undefined;
  answerValue: any;
}
// export interface AnswerValue {
//   answerValue: string | boolean | undefined;
// }
