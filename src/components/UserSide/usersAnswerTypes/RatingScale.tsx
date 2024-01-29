"use client";

import React, { useEffect, useState } from "react";
import { Chip } from "@nextui-org/react";
import Style from "../../../style_module/startStyle.module.css";
import { UserAnswerTypeProps } from "@/types/questions";

const RatingScale = ({
  isCurrentQuestion,
  question,
  index,
  handleAdminPreviewQuestions,
}: UserAnswerTypeProps) => {
  const [selectedStar, setSelectedStar] = useState<any>(0);

  useEffect(() => {
    if (question?.userAnswer !== undefined) {
      setSelectedStar(question?.userAnswer);
    } else {
      setSelectedStar(0);
    }
  }, [question?.userAnswer, question?.userQuestionId]);

  const takenQuestion = () => {
    return (
      <div className="flex flex-col items-center p-4">
        {question!.parentQuestion?.rateType === "stars" ? (
          <div
            className={`${Style.stars} flex flex-wrap justify-center items-center`}
          >
            {Array.from({ length: question!.parentQuestion?.rateCount! }).map(
              (_, index) => {
                return (
                  <>
                    <input
                      type="radio"
                      key={`star-input-${index}-${
                        question!.parentQuestion?.questionId
                      }-${question?.userQuestionId}`}
                      id={`star-${index}-${
                        question!.parentQuestion?.questionId
                      }-${question?.userQuestionId}`}
                      value={`${index}`}
                      checked={selectedStar === index + 1}
                    />
                    <label
                      key={`star-label-${index}-${
                        question!.parentQuestion?.questionId
                      }-${question?.userQuestionId}`}
                      htmlFor={`star-${index}-${
                        question!.parentQuestion?.questionId
                      }-${question?.userQuestionId}`}
                      title="text"
                      className={`p-1 ${selectedStar === 0 && "!fill-[#ccc]"}`}
                    >
                      <svg
                        viewBox="0 0 576 512"
                        height="1em"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`${
                          selectedStar === 0 ? "!fill-[#ccc]" : Style.star_solid
                        }`}
                      >
                        <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                      </svg>
                    </label>
                  </>
                );
              }
            )}
          </div>
        ) : (
          <div
            className={`${Style.number} flex flex-wrap justify-center items-center`}
          >
            {Array.from({ length: question!.parentQuestion?.rateCount! }).map(
              (_, index) => {
                return (
                  <div
                    key={`number-input-${index}-${
                      question!.parentQuestion?.questionId
                    }-${question?.userQuestionId}`}
                  >
                    <input
                      type="radio"
                      id={`number-${index}-${
                        question!.parentQuestion?.questionId
                      }-${question?.userQuestionId}`}
                      value={`${index}`}
                      checked={selectedStar === index + 1}
                    />
                    <label
                      htmlFor={`number-${index}-${
                        question!.parentQuestion?.questionId
                      }-${question?.userQuestionId}`}
                      title="text"
                      className="p-1"
                    >
                      <Chip radius="full" size="lg">
                        {index + 1}
                      </Chip>
                    </label>
                  </div>
                );
              }
            )}
          </div>
        )}
      </div>
    );
  };
  const currentQuestion = () => {
    const handleStarClick = (selected: number) => {
      setSelectedStar(selected);

      handleAdminPreviewQuestions!(index!, "userAnswer", selected);
    };

    const isInvalid =
      question?.isAnswerInvalid && question?.userAnswer === undefined;
    return (
      <div className="flex flex-col items-center p-4">
        <p
          className={`${
            isInvalid
              ? "text-rose-500 pb-2 capitalize font-semibold text-sm"
              : "text-green-500 font-semibold"
          } `}
        >
          {`${isInvalid ? `Rating is required!` : ""}`}
        </p>

        {question!.parentQuestion?.rateType === "stars" ? (
          <div
            className={`${Style.stars} flex flex-wrap justify-center items-center`}
          >
            {Array.from({ length: question!.parentQuestion?.rateCount! }).map(
              (_, index) => {
                return (
                  <>
                    <input
                      type="radio"
                      key={`star-input-${index}-${
                        question!.parentQuestion?.questionId
                      }-${question?.userQuestionId}`}
                      id={`star-${index}-${
                        question!.parentQuestion?.questionId
                      }-${question?.userQuestionId}`}
                      value={`${index}`}
                      checked={selectedStar === index + 1}
                      onChange={() => handleStarClick(index + 1)}
                    />
                    <label
                      key={`star-label-${index}-${
                        question!.parentQuestion?.questionId
                      }-${question?.userQuestionId}`}
                      htmlFor={`star-${index}-${
                        question!.parentQuestion?.questionId
                      }-${question?.userQuestionId}`}
                      title="text"
                      className={`p-1 ${selectedStar === 0 && "!fill-[#ccc]"}`}
                    >
                      <svg
                        viewBox="0 0 576 512"
                        height="1em"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`${
                          selectedStar === 0 ? "!fill-[#ccc]" : Style.star_solid
                        }`}
                      >
                        <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                      </svg>
                    </label>
                  </>
                );
              }
            )}
          </div>
        ) : (
          <div
            className={`${Style.number} flex flex-wrap justify-center items-center`}
          >
            {Array.from({ length: question!.parentQuestion?.rateCount! }).map(
              (_, index) => {
                return (
                  <div
                    key={`number-input-${index}-${
                      question!.parentQuestion?.questionId
                    }-${question?.userQuestionId}`}
                  >
                    <input
                      type="radio"
                      id={`number-${index}-${
                        question!.parentQuestion?.questionId
                      }-${question?.userQuestionId}`}
                      value={`${index}`}
                      checked={selectedStar === index + 1}
                      onChange={() => handleStarClick(index + 1)}
                    />
                    <label
                      htmlFor={`number-${index}-${
                        question!.parentQuestion?.questionId
                      }-${question?.userQuestionId}`}
                      title="text"
                      className="p-1"
                    >
                      <Chip radius="full" size="lg">
                        {index + 1}
                      </Chip>
                    </label>
                  </div>
                );
              }
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div>{isCurrentQuestion ? currentQuestion() : takenQuestion()}</div>
    </>
  );
};

export default RatingScale;
