"use client";
import { useGlobalContext } from "@/app/Context/store";
import { Code } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

const JsonOutput = () => {
  const { surveyForm, questions } = useGlobalContext();
  const [jsonQuestion, setJsonQuestion] = useState<string>("");
  useEffect(() => {
    console.log("Updated surveyForm: ", surveyForm);
    setJsonQuestion(JSON.stringify(questions));
  }, [questions, surveyForm]);
  console.log("surveyForm: ", surveyForm);

  return (
    <div className="flex justify-center">
      <Code size="lg">{surveyForm.name}</Code>
      <Code size="lg">{jsonQuestion}</Code>
    </div>
  );
};

export default JsonOutput;
