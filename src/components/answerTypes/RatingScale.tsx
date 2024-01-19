"use client";

import React, { useEffect, useState } from "react";
import { Button, Divider, Chip } from "@nextui-org/react";
import Style from "../../style_module/startStyle.module.css";
import { Minus, Plus } from "lucide-react";
import { AnswerTypeComponentProps } from "@/types/questions";

const RatingScale = ({
  adminMode,
  question,
  index,
  handleDataChange,
  logic,
  handleLogicConditions,
}: AnswerTypeComponentProps) => {
  const [selectedStar, setSelectedStar] = useState<any>(adminMode ? 1 : 0);

  useEffect(() => {
    if (logic?.answerValue !== undefined) {
      setSelectedStar(logic?.answerValue);
    } else {
      setSelectedStar(0);
    }
  }, [logic?.answerValue, logic?.selectQuestId]);

  const handleStarClick = (selected: number) => {
    setSelectedStar(selected);
    if (adminMode) {
      console.log("Selected star:", selected);
    } else {
      handleLogicConditions!(index!, "answerValue", selected);
    }
  };

  const addOption = () => {
    if (question!.rateCount! < 20) {
      handleDataChange!(index!, "rateCount", question!.rateCount! + 1);
    }
  };

  const minusOption = () => {
    if (question!.rateCount! > 2) {
      handleDataChange!(index!, "rateCount", question!.rateCount! - 1);
      if (question!.rateCount! <= selectedStar) {
        setSelectedStar(1);
      }
    }
  };

  const renderAdminMode = () => {
    return (
      <>
        <h5 className="text-center pt-2 text-base font-medium text-blue-800">
          Answer type: Rating Scale
        </h5>
        <div className="mx-4 my-2">
          <Divider />
        </div>
        <div className="grid grid-cols-6 justify-center items-center gap-4 p-4">
          <div className="col-span-1 flex gap-2 justify-center">
            <Button
              onClick={minusOption}
              variant="flat"
              color="danger"
              size="sm"
              className="w-10"
            >
              <Minus size={16} />
            </Button>
            <Button
              onClick={addOption}
              variant="flat"
              color="success"
              size="sm"
            >
              <Plus size={16} />
            </Button>
          </div>
          {question!.rateType === "stars" ? (
            <div className={`${Style.stars} gap-2 col-span-5`}>
              {Array.from({ length: question!.rateCount! }).map((_, index) => {
                return (
                  <>
                    <input
                      type="radio"
                      key={`star-input-${index}-${
                        question!.questionId
                      }-${adminMode}`}
                      id={`star-${index}-${question!.questionId}-${adminMode}`}
                      value={`${index}`}
                      checked={selectedStar === index + 1}
                      onChange={() => handleStarClick(index + 1)}
                    />
                    <label
                      key={`star-label-${index}-${
                        question!.questionId
                      }-${adminMode}`}
                      htmlFor={`star-${index}-${
                        question!.questionId
                      }-${adminMode}`}
                      title="text"
                      className="p-1"
                    >
                      <svg
                        viewBox="0 0 576 512"
                        height="1em"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`${Style.star_solid}`}
                      >
                        <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                      </svg>
                    </label>
                  </>
                );
              })}
            </div>
          ) : (
            <div className={`${Style.number} gap-2 col-span-5`}>
              {Array.from({ length: question!.rateCount! }).map((_, index) => {
                return (
                  <div
                    key={`number-input-${index}-${
                      question!.questionId
                    }-${adminMode}`}
                  >
                    <input
                      type="radio"
                      id={`number-${index}-${
                        question!.questionId
                      }-${adminMode}`}
                      value={`${index}`}
                      checked={selectedStar === index + 1}
                      onChange={() => handleStarClick(index + 1)}
                    />
                    <label
                      htmlFor={`number-${index}-${
                        question!.questionId
                      }-${adminMode}`}
                      title="text"
                      className="p-1"
                    >
                      <Chip radius="full" size="lg">
                        {index + 1}
                      </Chip>
                    </label>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </>
    );
  };

  const renderUserMode = () => {
    const isInvalid = logic?.answerValue === undefined;

    return (
      <div className="flex flex-col items-center p-4">
        <p
          className={`${
            isInvalid
              ? "text-rose-500 font-semibold pb-2"
              : "text-green-500 font-semibold"
          } `}
        >
          {`${isInvalid ? `Please defined Rating` : ""}`}
        </p>

        {logic?.selectedQuestion?.rateType === "stars" ? (
          <div
            className={`${Style.stars} flex flex-wrap justify-center items-center`}
          >
            {Array.from({ length: logic?.selectedQuestion?.rateCount! }).map(
              (_, index) => {
                return (
                  <>
                    <input
                      type="radio"
                      key={`star-input-${index}-${logic?.selectedQuestion?.questionId}-${adminMode}-${logic.logicDataId}`}
                      id={`star-${index}-${logic?.selectedQuestion?.questionId}-${adminMode}-${logic.logicDataId}`}
                      value={`${index}`}
                      checked={selectedStar === index + 1}
                      onChange={() => handleStarClick(index + 1)}
                    />
                    <label
                      key={`star-label-${index}-${logic?.selectedQuestion?.questionId}-${adminMode}-${logic.logicDataId}`}
                      htmlFor={`star-${index}-${logic?.selectedQuestion?.questionId}-${adminMode}-${logic.logicDataId}`}
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
            {Array.from({ length: logic?.selectedQuestion?.rateCount! }).map(
              (_, index) => {
                return (
                  <div
                    key={`number-input-${index}-${
                      logic?.selectedQuestion?.questionId
                    }-${adminMode}-${logic!.logicDataId}`}
                  >
                    <input
                      type="radio"
                      id={`number-${index}-${
                        logic?.selectedQuestion?.questionId
                      }-${adminMode}-${logic!.logicDataId}`}
                      value={`${index}`}
                      checked={selectedStar === index + 1}
                      onChange={() => handleStarClick(index + 1)}
                    />
                    <label
                      htmlFor={`number-${index}-${
                        logic?.selectedQuestion?.questionId
                      }-${adminMode}-${logic!.logicDataId}`}
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

  return <div>{adminMode ? renderAdminMode() : renderUserMode()}</div>;
};

export default RatingScale;
