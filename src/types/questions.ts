import { Dispatch, SetStateAction } from "react";

export interface GlobalContextProps {
  questions: Question[];
  setQuestions: Dispatch<SetStateAction<Question[]>>;
  surveyForm: SurveyForm;
  setSurveyForm: Dispatch<SetStateAction<SurveyForm>>;
}

export interface Choices {
  value?: string;
  text?: string;
}

export interface VisibleIf {
  logicDataId: string;
  logicOperator?: string | undefined;
  selectQuestId?: string | undefined;
  selectedQuestion?: any;
  comparisonOperator?: string | undefined;
  answerValue?: any;
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
  visibleIf?: VisibleIf[];
}

export interface SurveyForm {
  name: string;
  questions: Question[];
}

export interface AnswerTypeComponentProps {
  adminMode?: boolean;
  index?: number;
  question?: Question;
  handleDataChange?: (
    index: number,
    field: keyof Question,
    value: string | number | Choices[]
  ) => void;

  logic?: VisibleIf;
  handleLogicConditions?: (
    index: number,
    field: keyof VisibleIf,
    value: string | Question | boolean | number | string[] | undefined
  ) => void;
}

export interface AdminPreviewQuestion extends Question {
  previewAnswer?: any;
}
export interface UserQuestion {
  userQuestionId: string;
  questionNo?: string;
  parentQuestion?: Question;
  userAnswer?: any;
}

export interface UserAnswerTypeProps {
  index?: number;
  question?: UserQuestion;
  handleAdminPreviewQuestions?: (
    index: number,
    field: keyof UserQuestion,
    value: string | boolean | number | string[] | undefined
  ) => void;
}
