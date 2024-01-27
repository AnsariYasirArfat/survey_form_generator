"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Listbox, ListboxItem } from "@nextui-org/react";
import AdminPreview from "./AdminPreview";
import { Question, SurveyForm, UserQuestion } from "@/types/questions";
import { v4 as uuidv4 } from "uuid";

const SurveyFormUsers = () => {
  const [userSurveyName, setUserSurveyName] = useState<string>("");

  const [generatedUserQuestionId, setGeneratedUserQuestionId] = useState("");

  const [questionsQueue, setQuestionsQueue] = useState<Question[]>([]);
  const [allSurveyQuestions, setAllSurveyQuestions] = useState<Question[]>([]);
  const [userQuestionList, setUserQuestionList] = useState<UserQuestion[]>([]);

  console.log("Questions Queue List", questionsQueue);
  console.log("All Survey Questions List", allSurveyQuestions);
  console.log("User Question List", userQuestionList);

  const enqueue = useCallback(
    (question: Question) => {
      setQuestionsQueue([...questionsQueue, question]);
    },
    [questionsQueue]
  );

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
    setUserSurveyName(parsedData.name);

    if (parsedData && parsedData.questions.length > 0) {
      // Initialize the queue data array and userSurveyQuestions array
      const noVisibleIfQuestionsQueue: Question[] = [];
      const visibleIfQuestionsArray: Question[] = [];

      // // Process each question in the survey data
      parsedData.questions.forEach((question) => {
        // Check if the question has visibleIf property
        if (question.visibleIf && question.visibleIf.length > 0) {
          visibleIfQuestionsArray.push(question);
        } else {
          noVisibleIfQuestionsQueue.push(question);
        }
      });

      // Dequeue the first question from the queue and add it to userQuestionList
      if (noVisibleIfQuestionsQueue.length > 0) {
        const dequeuedQuestion = noVisibleIfQuestionsQueue.shift();
        const userQuestion: UserQuestion = {
          userQuestionId: uuidv4(),
          // questionNo: `Question 1`,
          parentQuestion: dequeuedQuestion,
          userAnswer: undefined,
          isAnswerInvalid: false,
        };
        setUserQuestionList([userQuestion]);
      }

      // Set the initial state for the queue data array and userSurveyQuestions array
      setQuestionsQueue(noVisibleIfQuestionsQueue);
      setAllSurveyQuestions(visibleIfQuestionsArray);
    }
  }, []);

  useEffect(() => {
    allSurveyQuestions.forEach((question) => {
      let shouldSkipQuestion = false;
      const logics = [];

      for (let index = 0; index < question.visibleIf!.length; index++) {
        console.log("main logic runs");
        const logic = question.visibleIf![index];
        const matchingVisibleIfQuestion = userQuestionList.find(
          (response, index) =>
            // index < userQuestionList.length - 1 &&
            response.parentQuestion &&
            response.userAnswer &&
            response.parentQuestion.questionId === logic.selectQuestId
        );

        if (!matchingVisibleIfQuestion) {
          shouldSkipQuestion = true;
          break;
        }

        const userAnswer = matchingVisibleIfQuestion.userAnswer;
        const answerComparison = userAnswer === logic.answerValue;
        logics.push(`${index > 0 && logic.logicOperator} ${answerComparison}`);
      }

      if (shouldSkipQuestion) {
        return;
      }

      if (logics.length > 0) {
        console.log("Logic to statisfy: ", logics);
        enqueue(question);
        setAllSurveyQuestions((prev) => {
          return prev.filter((surveyQuestion) => {
            question.questionId !== surveyQuestion.questionId;
          });
        });
        return;
      } else {
        return;
      }
    });
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
