import { Question } from "@/components/QuestionForm";
import { Code } from "@nextui-org/react";
import React from "react";

const Json = ({ searchParams }: any) => {
  console.log(searchParams);
  const paramQues = searchParams?.questions;
  const questions = JSON.parse(paramQues);
  console.log(questions);
  return (
    <div>
      <h1 className="text-center font-bold">JSON</h1>
      <Code size="lg">{searchParams.name}</Code>
      <Code size="lg">{searchParams?.questions}</Code>
      {/* <Code size="lg">{questions[0]}</Code> */}
    </div>
  );
};

export default Json;
