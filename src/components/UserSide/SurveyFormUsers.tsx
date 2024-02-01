"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Divider, Listbox, ListboxItem } from "@nextui-org/react";
import AdminPreview from "./AdminPreview";
import {
  Question,
  SurveyForm,
  QueueQuestion,
  Choices,
} from "@/types/questions";
import { v4 as uuidv4 } from "uuid";
import { MoveRight } from "lucide-react";
import SurveyLeaveModel from "./models/SurveyLeaveModel";

const SurveyFormUsers = ({ userMode }: { userMode: boolean }) => {
  const [rawSurveyData, setRawSurveyData] = useState<SurveyForm>({
    name: "",
    questions: [],
  });
  const [generatedUserQuestionId, setGeneratedUserQuestionId] = useState("");
  const [questionsQueue, setQuestionsQueue] = useState<QueueQuestion[]>([]);
  const [allSurveyQuestions, setAllSurveyQuestions] = useState<Question[]>([]);
  const [userQuestionList, setUserQuestionList] = useState<QueueQuestion[]>([]);
  const [isSurveyStarted, setIsSurveyStarted] = useState(false);
  const [isSurveyFinished, setIsSurveyFinished] = useState(false);

  console.log("Questions Queue List", questionsQueue);
  console.log("All Survey Questions List", allSurveyQuestions);
  console.log("User Question List", userQuestionList);

  const enqueue = useCallback((question: QueueQuestion) => {
    setQuestionsQueue((prev: QueueQuestion[]) => {
      const newQueue = [...prev, question];
      return newQueue;
    });
  }, []);

  const dequeue = () => {
    if (questionsQueue.length === 0) {
      console.log("Queue is empty");
      return;
    }
    // Remove and return the front element from the queue
    const [frontQuestion, ...restOfQueue] = questionsQueue;
    setQuestionsQueue(restOfQueue);
    console.log("Dequeued question:", frontQuestion);
    return frontQuestion;
  };

  useEffect(() => {
    const storedData = localStorage.getItem("surveyFormData");
    const parsedData: SurveyForm = storedData && JSON.parse(storedData);
    setRawSurveyData(parsedData);
  }, []);

  const handleSurveyData = () => {
    if (rawSurveyData && rawSurveyData.questions.length > 0) {
      const noVisibleIfQuestionsQueue: QueueQuestion[] = [];
      const visibleIfQuestionsArray: Question[] = [];

      // Process each question in the survey data
      rawSurveyData.questions.forEach((question) => {
        if (question.visibleIf && question.visibleIf.length > 0) {
          visibleIfQuestionsArray.push(question);
        } else {
          // Push questions (without visibleIf property) to queue array
          const userQuestion: QueueQuestion = {
            userQuestionId: uuidv4(),
            parentQuestion: question,
            userAnswer: undefined,
            isAnswerInvalid: false,
          };
          noVisibleIfQuestionsQueue.push(userQuestion);
        }
      });
      // Set the initial state for the queue data array and userSurveyQuestions array
      setQuestionsQueue(noVisibleIfQuestionsQueue);
      setAllSurveyQuestions(visibleIfQuestionsArray);
    }
  };

  const handleLeaveSurvey = () => {
    setIsSurveyStarted(false);
    setUserQuestionList([]);
    setQuestionsQueue([]);
    setAllSurveyQuestions([]);
  };

  useEffect(() => {
    if (userQuestionList.length > 0) {
      allSurveyQuestions.forEach((question: Question) => {
        let logics = "";

        for (let index = 0; index < question.visibleIf!.length; index++) {
          console.log("Main logic runs for: ", question.name);
          console.log(`${question.name}'s logic index : `, index);
          const logic = question.visibleIf![index];

          const matchingVisibleIfQuestion = userQuestionList.find(
            (response) =>
              response.parentQuestion &&
              // response.userAnswer &&
              response.parentQuestion.questionId === logic.selectQuestId
          );

          let logicOperator;
          if (logic.logicOperator === "and") {
            logicOperator = "&&";
          } else if (logic.logicOperator === "or") {
            logicOperator = "||";
          } else {
            logicOperator = "";
          }

          if (matchingVisibleIfQuestion !== undefined) {
            const userAnswer = matchingVisibleIfQuestion.userAnswer;
            let comparisonSymbol: string | undefined;
            let answerComparison;

            if (logic.comparisonOperator === "empty") {
              // comparisonSymbol = undefined;
              answerComparison = userAnswer !== undefined ? false : true;
            } else if (logic.comparisonOperator === "notempty") {
              // comparisonSymbol = undefined;
              answerComparison = userAnswer !== undefined ? true : false;
            } else if (logic.comparisonOperator === "=") {
              comparisonSymbol = "===";
              // console.log(
              //   "eval for equal: ",
              //   `'${userAnswer}' ${comparisonSymbol} '${logic.answerValue}'`
              // );
              answerComparison = eval(
                `'${userAnswer}' ${comparisonSymbol} '${logic.answerValue}'`
              );
            } else if (logic.comparisonOperator === "<>") {
              comparisonSymbol = "!==";
              answerComparison = eval(
                `'${userAnswer}' ${comparisonSymbol} '${logic.answerValue}'`
              );
            } else if (logic.comparisonOperator === "contain") {
              answerComparison =
                userAnswer !== undefined
                  ? userAnswer.includes(logic.answerValue)
                  : false;
            } else if (logic.comparisonOperator === "notcontain") {
              answerComparison =
                userAnswer !== undefined
                  ? !userAnswer.includes(logic.answerValue)
                  : true;
            } else if (logic.comparisonOperator === "allof") {
              if (
                logic.answerValue.every((choice: Choices) =>
                  userAnswer.includes(choice)
                )
              ) {
                console.log("The given array have all defined choices ");
                answerComparison = true;
              } else {
                answerComparison = false;
                console.log(
                  "The given array does not have all defined choices"
                );
              }
            } else if (logic.comparisonOperator === "anyof") {
              if (
                logic.answerValue.some((choice: Choices) =>
                  userAnswer.includes(choice)
                )
              ) {
                console.log("The given array have choice from defined choices");
                answerComparison = true;
              } else {
                answerComparison = false;
                console.log(
                  "The given array does not have choice from defined choices"
                );
              }
            } else {
              comparisonSymbol = logic!.comparisonOperator!;
              answerComparison = eval(
                `'${userAnswer}' ${comparisonSymbol} '${logic.answerValue}'`
              );
            }

            console.log(
              `ANSWER COMPARISON for ${question.name}: `,
              answerComparison
            );

            logics += `${logicOperator} ${answerComparison} `;
          } else if (matchingVisibleIfQuestion === undefined) {
            // Making Answer response false, If user taken question is not present in logic data

            console.log(
              "logic failed for: ",
              question.name,
              `${logicOperator} false `
            );
            logics += `${logicOperator} false `;
          }
        }

        console.log(`Logic to statisfy for ${question.name}`, logics);

        let finalLogicDecision = eval(logics);

        console.log(`FINAL LOGIC FOR ${question.name}`, finalLogicDecision);
        if (finalLogicDecision) {
          const generatedId = uuidv4();
          setGeneratedUserQuestionId(generatedId);
          const userQuestion: QueueQuestion = {
            userQuestionId: generatedId,
            parentQuestion: question,
            userAnswer: undefined,
            isAnswerInvalid: false,
          };
          enqueue(userQuestion);
          setAllSurveyQuestions((prev: Question[]) => {
            const remainQuesitons = [...prev].filter(
              (surveyQuestion: Question) => {
                return question.questionId !== surveyQuestion.questionId;
              }
            );
            return remainQuesitons;
          });
        }
      });
    }
  }, [allSurveyQuestions, enqueue, userQuestionList]);

  const scrollHandle = (questionId: string) => {
    const targetElement = document.getElementById(`${questionId}`);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  useEffect(() => {
    scrollHandle(questionsQueue[0]?.userQuestionId);
  }, [generatedUserQuestionId, questionsQueue]);

  const surveyWelcomeComponent = () => {
    return (
      <div className="h-full p-10 flex items-center justify-center">
        <div className="max-w-4xl p-8 bg-blue-50 shadow-xl rounded-md">
          {!isSurveyFinished ? (
            <>
              <h1 className="text-center text-xl font-bold mb-4 text-slate-600">
                Start the
                <span className="text-blue-500 text-2xl font-bold">{` ${rawSurveyData.name} `}</span>
                survey now!
              </h1>
              <Divider className="mb-4" />
              <p className="text-slate-600 mb-4 font-semibold">
                Welcome! Your insights matter. Contribute your valuable input
                and make a difference!
              </p>
            </>
          ) : (
            <>
              <h1 className="text-xl font-bold mb-4 text-slate-600">
                Thank You for Completing the
                <span className="text-blue-500 text-2xl font-bold">{` ${rawSurveyData.name} `}</span>
                Survey!
              </h1>
              <Divider className="mb-4" />

              <p className="text-slate-600 mb-4 font-semibold">
                We appreciate the time & effort you&apos;ve invested in sharing
                your thoughts..
              </p>
            </>
          )}

          <div className="flex items-center justify-center">
            {!isSurveyFinished ? (
              <Button
                isDisabled={rawSurveyData.questions.length < 1}
                color="primary"
                variant="shadow"
                radius="lg"
                onClick={() => {
                  setIsSurveyStarted(true);
                  handleSurveyData();
                }}
                className="flex gap-2 text-base font-semibold text-white rounded-md transition duration-300"
              >
                Start Survey
                <MoveRight size={"18"} />
              </Button>
            ) : (
              <Button
                color="primary"
                variant="shadow"
                radius="lg"
                onClick={() => {
                  setIsSurveyStarted(true);
                  setIsSurveyFinished(false);
                  handleSurveyData();
                }}
                className="flex gap-2 text-base font-semibold text-white rounded-md transition duration-300"
              >
                {userMode ? `Retake Survey` : `Preview Survey Again`}
                <MoveRight size={"18"} />
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const surveyFormComponent = () => {
    return (
      <section className="h-full grid grid-cols-12 gap-4 justify-center items-center ">
        {!userMode && (
          <aside className="col-span-2 grid grid-rows-12 overflow-auto w-full h-full bg-blue-50 shadow-xl border-small rounded-small border-default-200 dark:border-default-100">
            <h1 className="row-span-1 font-bold text-sm text-center text-blue-400 m-1 p-2 self-center bg-blue-200 rounded-small shadow-lg">
              Questions seen
            </h1>
            <Listbox
              aria-label="Listbox Variants"
              color={"primary"}
              variant={"light"}
              classNames={{
                base: "row-span-11 h-full overflow-auto",
                emptyContent: "text-lg text-center self-center",
              }}
              itemClasses={{ title: "font-semibold text-center text-base" }}
              emptyContent={"Add some questions..."}
            >
              {userQuestionList.map((question, index) => (
                <ListboxItem
                  onPress={() => scrollHandle(question.userQuestionId)}
                  key={`${question.userQuestionId}`}
                >
                  {`Question ${index + 1}`}
                </ListboxItem>
              ))}
            </Listbox>
          </aside>
        )}
        {userMode && questionsQueue.length < 1 && (
          <aside className="col-span-2 grid grid-rows-12 overflow-auto w-full h-full bg-blue-50 shadow-xl border-small rounded-small border-default-200 dark:border-default-100">
            <h1 className="row-span-1 font-bold text-sm text-center text-blue-400 m-1 p-2 self-center bg-blue-200 rounded-small shadow-lg">
              Survey responses
            </h1>
            <Listbox
              aria-label="Listbox Variants"
              color={"primary"}
              variant={"light"}
              classNames={{
                base: "row-span-11 h-full overflow-auto",
                emptyContent: "text-lg text-center self-center",
              }}
              itemClasses={{ title: "font-semibold text-center text-base" }}
              emptyContent={"Add some questions..."}
            >
              {userQuestionList.map((question, index) => (
                <ListboxItem
                  onPress={() => scrollHandle(question.userQuestionId)}
                  key={`${question.userQuestionId}`}
                >
                  {`Question ${index + 1}`}
                </ListboxItem>
              ))}
            </Listbox>
          </aside>
        )}
        <div
          className={`grid grid-rows-12 gap-4 overflow-auto w-full h-full  pe-1 ${
            userMode && questionsQueue.length > 0
              ? "col-span-12 "
              : "col-span-10"
          }`}
        >
          <div className="row-span-2 grid grid-cols-12 justify-center items-center bg-blue-50 shadow-lg p-4 rounded-xl">
            <h1 className="col-span-10 text-center text-2xl font-bold text-blue-600">
              {rawSurveyData.name
                ? rawSurveyData.name
                : `No Survey Name Available!`}
            </h1>
            <div className="col-span-2 flex items-center justify-center">
              {questionsQueue.length > 0 ? (
                <SurveyLeaveModel handleLeaveSurvey={handleLeaveSurvey} />
              ) : (
                <div></div>
              )}
            </div>
          </div>
          <AdminPreview
            userMode={userMode}
            userQuestionList={userQuestionList}
            setUserQuestionList={setUserQuestionList}
            questionsQueue={questionsQueue}
            setQuestionsQueue={setQuestionsQueue}
            dequeue={dequeue}
            setIsSurveyFinished={setIsSurveyFinished}
            handleLeaveSurvey={handleLeaveSurvey}
          />
          {/* {userMode ? (
            <UserQuestionMode
              userQuestionList={userQuestionList}
              setUserQuestionList={setUserQuestionList}
              questionsQueue={questionsQueue}
              setQuestionsQueue={setQuestionsQueue}
              dequeue={dequeue}
              setIsSurveyFinished={setIsSurveyFinished}
              handleLeaveSurvey={handleLeaveSurvey}
            />
          ) : (
            <AdminPreview
              userQuestionList={userQuestionList}
              setUserQuestionList={setUserQuestionList}
              questionsQueue={questionsQueue}
              setQuestionsQueue={setQuestionsQueue}
              dequeue={dequeue}
              setIsSurveyFinished={setIsSurveyFinished}
              handleLeaveSurvey={handleLeaveSurvey}
            />
          )} */}
        </div>
      </section>
    );
  };
  return (
    <>
      {isSurveyStarted && !isSurveyFinished
        ? surveyFormComponent()
        : surveyWelcomeComponent()}
    </>
  );
};

export default SurveyFormUsers;
