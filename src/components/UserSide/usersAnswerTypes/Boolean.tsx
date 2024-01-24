import React, { useState } from "react";
import Style from "../../../style_module/booleanStyle.module.css";
import { UserAnswerTypeProps } from "@/types/questions";

const Boolean = ({
  question,
  index,
  handleAdminPreviewQuestions,
}: UserAnswerTypeProps) => {
  const [isChecked, setIsChecked] = useState(question?.userAnswer);

  // useEffect(() => {
  //   if (logic?.answerValue !== undefined) {
  //     setIsChecked(logic?.answerValue);
  //   } else {
  //     setIsChecked(undefined);
  //   }
  // }, [logic?.answerValue, logic?.selectQuestId]);

  const isInvalid =
    question?.isAnswerInvalid && question?.userAnswer === undefined;

  return (
    <div className="p-4 flex flex-col items-center justify-center">
      <p
        className={`${
          isInvalid
            ? "text-rose-500 font-semibold  pb-2 capitalize text-sm"
            : "text-green-500 font-semibold"
        }`}
      >
        {`${isInvalid ? `Response is required!` : ""}`}
      </p>
      <div className={`${Style.radio_inputs} gap-2 `}>
        <label className={`${Style.radio} `}>
          <input
            className="opacity-50"
            type="radio"
            checked={isChecked === undefined ? undefined : !isChecked}
            value={"no"}
            onChange={() => setIsChecked(false)}
            onClick={() =>
              handleAdminPreviewQuestions!(index!, "userAnswer", false)
            }
          />
          <span
            className={`${Style.name}
            ${question?.userAnswer === undefined && "!bg-[#eee]"}
            `}
            // className={`${Style.name}`}
          >
            No
          </span>
        </label>
        <label className={`${Style.radio}`}>
          <input
            type="radio"
            checked={isChecked === undefined ? undefined : isChecked}
            value={"yes"}
            onChange={() => setIsChecked(true)}
            onClick={() =>
              handleAdminPreviewQuestions!(index!, "userAnswer", true)
            }
          />
          <span
            className={`${Style.name}  ${
              question?.userAnswer === undefined && "!bg-[#eee]"
            }`}
            // className={`${Style.name}`}
          >
            Yes
          </span>
        </label>
      </div>
    </div>
  );
};

export default Boolean;
