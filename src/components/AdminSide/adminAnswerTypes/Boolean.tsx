import { Divider } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import Style from "../../../style_module/booleanStyle.module.css";
import { AnswerTypeComponentProps } from "@/types/questions";

const Boolean = ({
  adminMode,
  index,
  logic,
  handleLogicConditions,
}: AnswerTypeComponentProps) => {
  const [isChecked, setIsChecked] = useState(logic?.answerValue);

  useEffect(() => {
    if (logic?.answerValue !== undefined) {
      setIsChecked(logic?.answerValue);
    } else {
      setIsChecked(undefined);
    }
  }, [logic?.answerValue, logic?.selectQuestId]);
  const renderAdminMode = () => {
    return (
      <>
        <h5 className="text-center pt-2 text-base font-medium text-blue-800">
          Answer type: Yes / No
        </h5>
        <div className="mx-4 my-2">
          <Divider />
        </div>
        <div className="p-4 flex justify-center">
          <div
            className={`${Style.radio_inputs} gap-2 ${
              adminMode && "opacity-70"
            }`}
          >
            <label className={`${Style.radio} `}>
              <input
                disabled
                className="opacity-50"
                readOnly
                type="radio"
                checked={true}
              />
              <span className={`${Style.name}`}>No</span>
            </label>
            <label className={`${Style.radio}`}>
              <input disabled readOnly type="radio" checked={false} />
              <span className={`${Style.name}`}>Yes</span>
            </label>
          </div>
        </div>
      </>
    );
  };

  const renderUserMode = () => {
    const isInvalid = logic?.answerValue === undefined;
    return (
      <div className="p-4 flex flex-col items-center justify-center">
        <p
          className={`${
            isInvalid
              ? "text-rose-500 font-semibold  pb-2"
              : "text-green-500 font-semibold"
          }`}
        >
          {`${isInvalid ? `Please defined Yes or No` : ""}`}
        </p>
        <div
          className={`${Style.radio_inputs} gap-2 ${adminMode && "opacity-70"}`}
        >
          <label className={`${Style.radio} `}>
            <input
              className="opacity-50"
              type="radio"
              checked={isChecked === undefined ? undefined : !isChecked}
              value={"no"}
              onChange={() => setIsChecked(false)}
              onClick={() =>
                handleLogicConditions!(index!, "answerValue", false)
              }
            />
            <span
              className={`${Style.name} ${
                logic?.answerValue === undefined && "!bg-[#eee]"
              }`}
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
                handleLogicConditions!(index!, "answerValue", true)
              }
            />
            <span
              className={`${Style.name}  ${
                logic?.answerValue === undefined && "!bg-[#eee]"
              }`}
            >
              Yes
            </span>
          </label>
        </div>
      </div>
    );
  };

  return <div>{adminMode ? renderAdminMode() : renderUserMode()}</div>;
};

export default Boolean;
