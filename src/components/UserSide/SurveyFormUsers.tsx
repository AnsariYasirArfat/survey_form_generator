"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Listbox, ListboxItem } from "@nextui-org/react";
import AdminPreview from "./AdminPreview";
import {
  Question,
  SurveyForm,
  QueueQuestion,
  Choices,
} from "@/types/questions";
import { v4 as uuidv4 } from "uuid";

const SurveyFormUsers = () => {
  const [userSurveyName, setUserSurveyName] = useState<string>("");
  const [generatedUserQuestionId, setGeneratedUserQuestionId] = useState("");
  const [questionsQueue, setQuestionsQueue] = useState<QueueQuestion[]>([]);
  const [allSurveyQuestions, setAllSurveyQuestions] = useState<Question[]>([]);
  const [userQuestionList, setUserQuestionList] = useState<QueueQuestion[]>([]);

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
    // console.log(`
    // INITIAL USE EFFECT HOOK
    // INITIAL USE EFFECT HOOK
    // INITIAL USE EFFECT HOOK
    //     INITIAL USE EFFECT HOOK
    // INITIAL USE EFFECT HOOK
    // INITIAL USE EFFECT HOOK
    // INITIAL USE EFFECT HOOK
    // INITIAL USE EFFECT HOOK
    // INITIAL USE EFFECT HOOK
    // INITIAL USE EFFECT HOOK
    // `);

    const storedData = localStorage.getItem("surveyFormData");
    const parsedData: SurveyForm = storedData && JSON.parse(storedData);
    setUserSurveyName(parsedData.name);

    if (parsedData && parsedData.questions.length > 0) {
      const noVisibleIfQuestionsQueue: QueueQuestion[] = [];
      const visibleIfQuestionsArray: Question[] = [];

      // Process each question in the survey data
      parsedData.questions.forEach((question) => {
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
  }, []);

  useEffect(() => {
    if (userQuestionList.length > 0) {
      allSurveyQuestions.forEach((question: Question) => {
        let shouldSkipQuestion = false;
        let logics = "";

        for (let index = 0; index < question.visibleIf!.length; index++) {
          console.log("main logic runs FOR: ", question.name);
          console.log("index: ", index);
          const logic = question.visibleIf![index];
          // console.log("logic: ", logic);

          const matchingVisibleIfQuestion = userQuestionList.find(
            (response) =>
              response.parentQuestion &&
              // response.userAnswer &&
              response.parentQuestion.questionId === logic.selectQuestId
          );

          // if (matchingVisibleIfQuestion === undefined) {
          //   shouldSkipQuestion = true;
          //   console.log("logic failed for: ", question.name);
          //   break;
          // }
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

            let logicOperator;
            if (logic.logicOperator === "and") {
              logicOperator = "&&";
            } else if (logic.logicOperator === "or") {
              logicOperator = "||";
            } else {
              logicOperator = "";
            }

            logics += `${logicOperator} ${answerComparison} `;
          }
        }

        if (shouldSkipQuestion) {
          return;
        }

        console.log("Logic to statisfy: ", logics);

        function evaluateLogic() {
          const result = eval(logics);
          return result ? result : false;
        }
        let finalLogicDecision = evaluateLogic();

        console.log("FINAL LOGIC FOR QUESTION: ", finalLogicDecision);
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
    scrollHandle(generatedUserQuestionId);
  }, [generatedUserQuestionId]);
  return (
    <section className="h-full grid grid-cols-12 gap-4 justify-center items-center ">
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
      <div className="grid grid-rows-12 gap-4 overflow-auto h-full col-span-10 pe-1">
        <div className="row-span-2 bg-blue-50 shadow-lg p-4 rounded-xl flex justify-center items-center">
          <h1 className="text-center text-2xl font-bold text-blue-600">
            {userSurveyName ? userSurveyName : `No Survey Name Available!`}
          </h1>
        </div>

        <AdminPreview
          allSurveyQuestions={allSurveyQuestions}
          setAllSurveyQuestions={setAllSurveyQuestions}
          userQuestionList={userQuestionList}
          setUserQuestionList={setUserQuestionList}
          questionsQueue={questionsQueue}
          setQuestionsQueue={setQuestionsQueue}
          dequeue={dequeue}
          enqueue={enqueue}
          setGeneratedUserQuestionId={setGeneratedUserQuestionId}
        />
      </div>
    </section>
  );
};

export default SurveyFormUsers;
