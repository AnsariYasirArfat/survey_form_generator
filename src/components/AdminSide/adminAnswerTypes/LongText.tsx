import { AnswerTypeComponentProps } from "@/types/questions";
import { Divider, Textarea } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

const LongText = ({
  adminMode,
  index,
  logic,
  handleLogicConditions,
}: AnswerTypeComponentProps) => {
  const [answerValue, setAnswerValue] = useState(logic?.answerValue);

  useEffect(() => {
    if (logic?.answerValue !== undefined) {
      setAnswerValue(logic?.answerValue);
    } else {
      setAnswerValue("");
    }
  }, [logic?.answerValue, logic?.selectQuestId]);

  const renderAdminMode = () => {
    return (
      <>
        <h5 className="text-center pt-2 text-base font-medium text-blue-800">
          Answer type: Long Text
        </h5>
        <div className="mx-4 my-2">
          <Divider />
        </div>
        <Textarea
          placeholder={`Enter your long text`}
          value=""
          readOnly
          classNames={{
            base: ["w-full p-4"],
          }}
        />
      </>
    );
  };

  const renderUserMode = () => {
    const isInvalid = logic?.answerValue === undefined;
    return (
      <>
        <Textarea
          placeholder={`Enter your long text`}
          value={answerValue}
          onChange={(e) => {
            setAnswerValue(e.target.value);
          }}
          onBlur={() => {
            if (answerValue.trim()) {
              handleLogicConditions!(index!, "answerValue", answerValue);
            } else {
              handleLogicConditions!(index!, "answerValue", undefined);
            }
          }}
          classNames={{
            base: ["w-full p-4"],
          }}
          isInvalid={isInvalid}
          color={isInvalid ? "danger" : "default"}
          errorMessage={isInvalid && "Please defined answer"}
        />
      </>
    );
  };

  return <div>{adminMode ? renderAdminMode() : renderUserMode()}</div>;
};

export default LongText;
