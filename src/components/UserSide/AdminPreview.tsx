import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import React, { useState } from "react";
import SingleInput from "./usersAnswerTypes/SingleInput";
import LongText from "./usersAnswerTypes/LongText";
import RadioGroup from "./usersAnswerTypes/RadioGroup";
import CheckBoxes from "./usersAnswerTypes/CheckBoxes";
import Boolean from "./usersAnswerTypes/Boolean";
import RatingScale from "./usersAnswerTypes/RatingScale";
import DefaultAnswer from "./usersAnswerTypes/DefaultUI";
import { AdminPreviewQuestion, UserQuestion } from "@/types/questions";
import { MoveRight } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";

const AdminPreview = ({
  userSurvey,
  // adminPreviewQuestion,
  // setAdminPreviewQuestion,
  userQuestionList,
  setUserQuestionList,
}: any) => {
  const [questionNumber, setQuestionNumber] = useState(1);
  //   const [currentQuestion, setCurrentQuestion] = useState(
  //     userSurvey?.questions[questionNumber]
  //   );

  const handleNextQuesiton = () => {
    // const firstQuestion = parsedData.questions[0];
    // if (adminPreviewQuestion.length > questionNumber) {
    // const userQuestion: UserQuestion = {
    //   userQuestionId: uuidv4(),
    //   questionNo: `Question ${questionNumber + 1}`,
    //   question: adminPreviewQuestion[questionNumber]["title"],
    //   userAnswer: adminPreviewQuestion[questionNumber]["previewAnswer"],
    // };
    if (userSurvey.questions.length > questionNumber) {
      const userQuestion: UserQuestion = {
        userQuestionId: uuidv4(),
        questionNo: `Question ${questionNumber + 1}`,
        parentQuestion: userSurvey.questions[questionNumber],
        userAnswer: undefined,
      };

      setUserQuestionList((prev: UserQuestion[]) => {
        return [...prev, userQuestion];
      });
    }
    // }
    // setAdminPreviewQuestion((prev: AdminPreviewQuestion[]) => [
    //   ...prev,
    //   userSurvey.questions[questionNumber + 1],
    // ]);
    if (userSurvey.questions.length >= questionNumber) {
      setQuestionNumber((prev) => prev + 1);
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
      {userSurvey.questions.length >= questionNumber ? (
        <>
          <div className="w-full h-full overflow-auto p-2 bg-blue-50 gap-2">
            {userQuestionList.map((question: UserQuestion, index: number) => {
              return (
                <Card
                  key={`${question?.parentQuestion?.questionId}-${index}`}
                  className="w-full bg-blue-300 mb-4"
                >
                  <CardHeader className="grid grid-cols-4 gap-3">
                    <Input
                      readOnly
                      isRequired={question?.parentQuestion?.isRequired}
                      type="text"
                      classNames={{
                        base: ["col-span-4"],
                        input: ["text-black capitalize font-semibold"],
                        description: ["text-black"],
                      }}
                      size={"md"}
                      value={question?.parentQuestion?.title}
                    />
                  </CardHeader>

                  <CardBody className="p-3">
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
      ) : userSurvey.questions.length === 0 ? (
        <div className="h-full flex flex-col justify-center items-center">
          <h1 className="text-center text-2xl font-semibold text-blue-400 mb-4">
            No survey quesitons available to preview
          </h1>
          <div className="flex items-center justify-center">
            <Link href={"/design"}>
              <Button
                variant="shadow"
                className="flex gap-2 text-base font-semibold bg-blue-400 text-white rounded-md hover:bg-blue-600 transition duration-300"
              >
                Go back to Create Survey
                <MoveRight size={"18"} />
              </Button>
            </Link>
          </div>
        </div>
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
