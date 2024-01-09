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
  question: Question;
  index: number;
  handleDataChange: (
    index: number,
    field: keyof Question,
    value: string | boolean | number | Choices[]
  ) => void;
}
