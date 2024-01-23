import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import SingleInput from "./usersAnswerTypes/SingleInput";
import LongText from "./usersAnswerTypes/LongText";
import RadioGroup from "./usersAnswerTypes/RadioGroup";
import CheckBoxes from "./usersAnswerTypes/CheckBoxes";
import Boolean from "./usersAnswerTypes/Boolean";
import RatingScale from "./usersAnswerTypes/RatingScale";
import DefaultAnswer from "./usersAnswerTypes/DefaultUI";
import { Question } from "@/types/questions";
import { MoveRight } from "lucide-react";

const QuestionUser = ({ userSurvey }: any) => {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(
    userSurvey.questions[questionNumber]
  );

  const handleNextQuesiton = () => {
    if (userSurvey.questions.length > questionNumber) {
      setQuestionNumber((prev) => prev + 1);
    }
  };

  useEffect(() => {
    setCurrentQuestion(userSurvey.questions[questionNumber]);
  }, [questionNumber, userSurvey.questions]);

  const userAnswerField = (question: Question) => {
    switch (question!.type) {
      case "singleinput":
        return <SingleInput question={question} />;

      case "textarea":
        return <LongText question={question} />;

      case "radiogroup":
        return <RadioGroup question={question} />;

      case "checkboxes":
        return <CheckBoxes question={question} />;

      case "boolean":
        return <Boolean question={question} />;

      case "ratingscale":
        return <RatingScale question={question} />;

      default:
        return <DefaultAnswer />;
    }
  };
  return (
    <div className="row-span-10 h-full overflow-auto p-4 flex flex-col justify-between items-center rounded-xl bg-blue-50">
      {userSurvey.questions.length > questionNumber ? (
        <>
          <div className="w-full h-full overflow-auto p-2 bg-blue-50">
            <Card className="w-full bg-blue-300 ">
              <CardHeader className="grid grid-cols-4 gap-3">
                <Input
                  readOnly
                  isRequired={currentQuestion.isRequired}
                  type="text"
                  classNames={{
                    base: ["col-span-4"],
                    input: ["text-black capitalize font-semibold"],
                    description: ["text-black"],
                  }}
                  size={"md"}
                  value={currentQuestion.title}
                />
              </CardHeader>

              <CardBody className="p-3">
                <div className="rounded-md bg-blue-100">
                  {userAnswerField(currentQuestion)}
                </div>
              </CardBody>
            </Card>
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

export default QuestionUser;
