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
  userSurvey,
  userQuestionList,
  setUserQuestionList,
  setGeneratedUserQuestionId,
}: any) => {
  const [questionNumber, setQuestionNumber] = useState(1);

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

    if (userSurvey.questions.length > questionNumber) {
      const generatedId = uuidv4();
      setGeneratedUserQuestionId(generatedId);
      const userQuestion: UserQuestion = {
        userQuestionId: generatedId,
        questionNo: `Question ${questionNumber + 1}`,
        parentQuestion: userSurvey.questions[questionNumber],
        userAnswer: undefined,
        isAnswerInvalid: false,
      };

      setUserQuestionList((prev: UserQuestion[]) => {
        return [...prev, userQuestion];
      });
    }

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
                      {/* <span>
                        {question.parentQuestion?.isRequired && (
                          <Asterisk size={`14`} color={`red`} />
                        )}
                      </span> */}
                    </div>
                    {/* <Input
                      readOnly
                      isRequired={question?.parentQuestion?.isRequired}
                      type="text"
                      classNames={{
                        base: ["col-span-4"],
                        input: ["text-black capitalize font-semibold"],
                        description: ["text-red-500 text-xs font-semibold"],
                      }}
                      description={`${
                        question?.parentQuestion?.isRequired
                          ? "This question is required to answer"
                          : ""
                      }`}
                      startContent={
                        <>
                          <div className="me-auto">*</div>
                        </>
                      }
                      size={"md"}
                      value={`${question?.parentQuestion?.title} `}
                    /> */}
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
