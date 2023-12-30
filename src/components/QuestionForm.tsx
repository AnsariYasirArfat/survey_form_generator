import { useState, ChangeEvent } from "react";
interface Question {
  name?: string;
  text?: string;
  type?: string;
  choices?: string[];
}
interface QuestionFormProp {
  questions: Question[];
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
}

const QuestionForm = ({ questions, setQuestions }: QuestionFormProp) => {
  const handleQuestionChange = (
    index: number,
    field: keyof Question,
    value: string
  ) => {
    // Update the specified field of the question at the given index
    const updatedQuestions: any = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  return (
    <div>
      <h1>All Questions</h1>

      {questions.map((question, index) => (
        <div key={index}>
          <label>
            Question Name:
            <input
              type="text"
              value={question.name || ""}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleQuestionChange(index, "name", e.target.value)
              }
            />
          </label>
          <label>
            Question Text:
            <input
              type="text"
              value={question.text || ""}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleQuestionChange(index, "text", e.target.value)
              }
            />
          </label>
          <label>
            Answer Type:
            <select
              value={question.type || ""}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                handleQuestionChange(index, "type", e.target.value)
              }
            >
              <option value="radiogroup">Radio Group</option>
              <option value="rating">Rating</option>
              <option value="checkbox">Checkbox</option>
              <option value="dropdown">Dropdown</option>
              <option value="tagbox">Tagbox</option>
              <option value="boolean">Boolean</option>
            </select>
          </label>
        </div>
      ))}
    </div>
  );
};

export default QuestionForm;
