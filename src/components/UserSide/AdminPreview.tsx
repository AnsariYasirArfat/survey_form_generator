import { Button, Card, CardBody, CardHeader, Chip } from "@nextui-org/react";
import React, { useState } from "react";
import SingleInput from "./usersAnswerTypes/SingleInput";
import LongText from "./usersAnswerTypes/LongText";
import RadioGroup from "./usersAnswerTypes/RadioGroup";
import CheckBoxes from "./usersAnswerTypes/CheckBoxes";
import Boolean from "./usersAnswerTypes/Boolean";
import RatingScale from "./usersAnswerTypes/RatingScale";
import DefaultAnswer from "./usersAnswerTypes/DefaultUI";
import { UserQuestion } from "@/types/questions";
import { MoveRight } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";

const AdminPreview = ({
  allSurveyQuestions,
  setAllSurveyQuestions,
  userQuestionList,
  setUserQuestionList,
  questionsQueue,
  setQuestionsQueue,
  dequeue,
  enqueue,
  setGeneratedUserQuestionId,
}: any) => {
  // const [questionNumber, setQuestionNumber] = useState(1);
  const [isSurveyFinished, setIsSurveyFinished] = useState(false);

  const handleNextQuesiton = () => {
    if (
      userQuestionList[userQuestionList.length - 1].userAnswer === undefined &&
      userQuestionList[userQuestionList.length - 1].parentQuestion.isRequired
    ) {
      return setUserQuestionList((prev: UserQuestion[]) => {
        const requiredQuestion = prev[userQuestionList.length - 1];
        requiredQuestion.isAnswerInvalid = true;
        return [...prev];
      });
    }

    if (questionsQueue.length > 0) {
      const generatedId = uuidv4();
      setGeneratedUserQuestionId(generatedId);
      const dequeuedQuestion = dequeue();

      const userQuestion: UserQuestion = {
        userQuestionId: generatedId,
        parentQuestion: dequeuedQuestion,
        userAnswer: undefined,
        isAnswerInvalid: false,
      };

      setUserQuestionList((prev: UserQuestion[]) => {
        return [...prev, userQuestion];
      });
    } else {
      setIsSurveyFinished(true);
    }
  };

  const handleAdminPreviewQuestions = (
    index: number,
    field: keyof UserQuestion,
    value: string | boolean | number | string[] | undefined
  ) => {
    const updatedQuestions: UserQuestion[] = [...userQuestionList];
    const questionToUpdate: any = updatedQuestions[index];
    questionToUpdate[field] = value;
    setUserQuestionList(updatedQuestions);
  };

  const userAnswerField = (question: UserQuestion, index: number) => {
    switch (question?.parentQuestion?.type) {
      case "singleinput":
        return (
          <SingleInput
            question={question}
            index={index}
            handleAdminPreviewQuestions={handleAdminPreviewQuestions}
          />
        );

      case "textarea":
        return (
          <LongText
            question={question}
            index={index}
            handleAdminPreviewQuestions={handleAdminPreviewQuestions}
          />
        );

      case "radiogroup":
        return (
          <RadioGroup
            question={question}
            index={index}
            handleAdminPreviewQuestions={handleAdminPreviewQuestions}
          />
        );

      case "checkboxes":
        return (
          <CheckBoxes
            question={question}
            index={index}
            handleAdminPreviewQuestions={handleAdminPreviewQuestions}
          />
        );

      case "boolean":
        return (
          <Boolean
            question={question}
            index={index}
            handleAdminPreviewQuestions={handleAdminPreviewQuestions}
          />
        );

      case "ratingscale":
        return (
          <RatingScale
            question={question}
            index={index}
            handleAdminPreviewQuestions={handleAdminPreviewQuestions}
          />
        );

      default:
        return <DefaultAnswer />;
    }
  };
  return (
    <div className="row-span-10 h-full overflow-auto p-4 flex flex-col justify-between items-center rounded-xl bg-blue-50">
      {!isSurveyFinished ? (
        <>
          <div className="w-full h-full overflow-auto p-2 bg-blue-50 gap-2">
            {userQuestionList.map((question: UserQuestion, index: number) => {
              const isLastItem = userQuestionList.length - 1 === index;
              return (
                <Card
                  id={question.userQuestionId}
                  key={`${question?.parentQuestion?.questionId}-${index}`}
                  className="w-full bg-blue-300 mb-4"
                >
                  <CardHeader className="flex items-center gap-4 pointer-events-none">
                    <Chip
                      color="primary"
                      // size="lg"
                      radius="sm"
                      variant="shadow"
                      className="place-self-center self-start"
                    >
                      {`Question ${index + 1}`}
                    </Chip>
                    <div className="flex ">
                      <h1 className="self-center text-base font-semibold text-blue-800">
                        {`${question?.parentQuestion?.title}`}
                        {question.parentQuestion?.isRequired && (
                          <span className="text-red-500 font-bold text-xl">
                            *
                          </span>
                        )}
                      </h1>
                    </div>
                  </CardHeader>

                  <CardBody
                    // style={{ pointerEvents: "none", opacity: 0.7 }}
                    className={`p-3 ${isLastItem ? "" : "pointer-events-none"}`}
                  >
                    <div className="rounded-md bg-blue-100">
                      {userAnswerField(question, index)}
                    </div>
                  </CardBody>
                </Card>
              );
            })}
          </div>
          <div className="w-full mt-2">
            <Button
              onClick={handleNextQuesiton}
              className="h-12 font-semibold text-lg float-end w-48"
              color="primary"
              radius="none"
              variant="shadow"
            >
              Go to Next <MoveRight />
            </Button>
          </div>
        </>
      ) : (
        <div className="h-full flex justify-center items-center">
          <h1 className="text-center text-2xl font-semibold text-blue-400">
            Thank you for taking this Survey
          </h1>
        </div>
      )}
    </div>
  );
};

export default AdminPreview;
