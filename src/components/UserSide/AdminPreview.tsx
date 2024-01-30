import { Button, Card, CardBody, CardHeader, Chip } from "@nextui-org/react";
import React, { useState } from "react";
import SingleInput from "./usersAnswerTypes/SingleInput";
import LongText from "./usersAnswerTypes/LongText";
import RadioGroup from "./usersAnswerTypes/RadioGroup";
import CheckBoxes from "./usersAnswerTypes/CheckBoxes";
import Boolean from "./usersAnswerTypes/Boolean";
import RatingScale from "./usersAnswerTypes/RatingScale";
import DefaultAnswer from "./usersAnswerTypes/DefaultUI";
import { Question, QueueQuestion } from "@/types/questions";
import { MoveRight } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

const AdminPreview = ({
  userQuestionList,
  setUserQuestionList,
  questionsQueue,
  setQuestionsQueue,
  dequeue,
}: any) => {
  // const [questionNumber, setQuestionNumber] = useState(1);
  const [isSurveyFinished, setIsSurveyFinished] = useState(false);

  const handleNextQuesiton = () => {
    if (
      questionsQueue.length > 0 &&
      questionsQueue[0].userAnswer === undefined &&
      questionsQueue[0].parentQuestion.isRequired
    ) {
      return setQuestionsQueue((prev: QueueQuestion[]) => {
        const requiredQuestion = prev[0];
        requiredQuestion.isAnswerInvalid = true;
        return [...prev];
      });
    }

    if (questionsQueue.length > 0) {
      const dequeuedQuestion = dequeue();

      setUserQuestionList((prev: QueueQuestion[]) => {
        return [...prev, dequeuedQuestion];
      });
    } else {
      setIsSurveyFinished(true);
    }
  };

  const handleAdminPreviewQuestions = (
    index: number,
    field: keyof QueueQuestion,
    value: string | boolean | number | string[] | undefined
  ) => {
    const updatedQuestions: QueueQuestion[] = [...questionsQueue];
    const questionToUpdate: any = updatedQuestions[index];
    questionToUpdate[field] = value;
    setQuestionsQueue(updatedQuestions);
  };

  const userAnswerField = (
    question: QueueQuestion,
    index: number,
    isCurrentQuestion: boolean
  ) => {
    switch (question?.parentQuestion?.type) {
      case "singleinput":
        return (
          <SingleInput
            isCurrentQuestion={isCurrentQuestion}
            question={question}
            index={index}
            handleAdminPreviewQuestions={handleAdminPreviewQuestions}
          />
        );

      case "textarea":
        return (
          <LongText
            isCurrentQuestion={isCurrentQuestion}
            question={question}
            index={index}
            handleAdminPreviewQuestions={handleAdminPreviewQuestions}
          />
        );

      case "radiogroup":
        return (
          <RadioGroup
            isCurrentQuestion={isCurrentQuestion}
            question={question}
            index={index}
            handleAdminPreviewQuestions={handleAdminPreviewQuestions}
          />
        );

      case "checkboxes":
        return (
          <CheckBoxes
            isCurrentQuestion={isCurrentQuestion}
            question={question}
            index={index}
            handleAdminPreviewQuestions={handleAdminPreviewQuestions}
          />
        );

      case "boolean":
        return (
          <Boolean
            isCurrentQuestion={isCurrentQuestion}
            question={question}
            index={index}
            handleAdminPreviewQuestions={handleAdminPreviewQuestions}
          />
        );

      case "ratingscale":
        return (
          <RatingScale
            isCurrentQuestion={isCurrentQuestion}
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
          <div className="w-full  bg-blue-50 gap-2">
            {userQuestionList.map((question: QueueQuestion, index: number) => {
              // const isLastItem = userQuestionList.length - 1 === index;
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
                    className={`p-3 pointer-events-none`}
                  >
                    <div className="rounded-md bg-blue-100">
                      {userAnswerField(question, index, false)}
                    </div>
                  </CardBody>
                </Card>
              );
            })}
          </div>
          <div className="w-full ">
            {questionsQueue.length > 0 && (
              <Card
                id={questionsQueue[0].userQuestionId}
                // key={`${question?.parentQuestion?.questionId}-${index}`}
                className="w-full bg-blue-300 mb-4 shadow-xl border-2 border-blue-400"
              >
                <CardHeader className="flex items-center gap-4 pointer-events-none">
                  <Chip
                    color="primary"
                    // size="lg"
                    radius="sm"
                    variant="shadow"
                    className="place-self-center self-start"
                  >
                    {`Question ${userQuestionList.length + 1}`}
                  </Chip>
                  <div className="flex ">
                    <h1 className="self-center text-base font-semibold text-blue-800">
                      {`${questionsQueue[0]?.parentQuestion?.title}`}
                      {questionsQueue[0].parentQuestion?.isRequired && (
                        <span className="text-red-500 font-bold text-xl">
                          *
                        </span>
                      )}
                    </h1>
                  </div>
                </CardHeader>

                <CardBody
                  // style={{ pointerEvents: "none", opacity: 0.7 }}
                  className={`p-3`}
                >
                  <div className="rounded-md bg-blue-100">
                    {userAnswerField(questionsQueue[0], 0, true)}
                  </div>
                </CardBody>
              </Card>
            )}
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
