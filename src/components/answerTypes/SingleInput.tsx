import { AnswerTypeComponentProps } from "@/types/questions";
import { Divider, Input, Slider, Switch } from "@nextui-org/react";
import React, { ChangeEvent, useEffect, useState } from "react";

const SingleInput = ({
  adminMode,
  question,
  index,
  logic,
  handleDataChange,
  handleLogicConditions,
}: AnswerTypeComponentProps) => {
  let questionIndex: number | undefined, logicIndex: number | undefined;
  if (adminMode) {
    questionIndex = index;
  } else if (logic && !adminMode) {
    logicIndex = index;
  }
  const [isSelected, setIsSelected] = useState(false);
  const [answerValue, setAnswerValue] = useState(logic?.answerValue);
  const [rangValue, setRangValue] = useState(logic?.answerValue || 0);
  useEffect(() => {
    setAnswerValue("");
    setRangValue(null);
  }, [logic?.selectQuestId]);

  const renderAdminMode = () => {
    return (
      <>
        <h5 className="text-center pt-2 text-base font-medium text-blue-800">
          Answer type: Single Input{" "}
          {question!.inputType && (
            <>
              <span>{question!.inputType}</span>
            </>
          )}
        </h5>
        <div className="mx-4 my-2">
          <Divider />
        </div>
        {question?.inputType !== "range" && (
          <>
            <Input
              type={question!.inputType}
              placeholder={`Enter your ${question!.inputType}`}
              value=""
              readOnly
              classNames={{
                base: ["w-full p-4"],
              }}
            />
          </>
        )}
        {question?.inputType === "range" && (
          <>
            <div className="w-full grid grid-cols-5 gap-2 p-4 ">
              <Switch
                className="justify-self-center"
                isSelected={isSelected}
                onValueChange={setIsSelected}
                size="sm"
              >
                Show Steps?
              </Switch>
              <Input
                type="number"
                label="Steps Limit?"
                labelPlacement="outside"
                placeholder="0.00"
                size="sm"
                value={`${question!.step}`}
                onChange={(e) => {
                  handleDataChange!(
                    questionIndex!,
                    "step",
                    e.target.valueAsNumber
                  );
                }}
              />
              <Input
                type="number"
                label="Min Limit"
                placeholder="0.00"
                labelPlacement="outside"
                size="sm"
                value={`${question!.min}`}
                onChange={(e) =>
                  handleDataChange!(
                    questionIndex!,
                    "min",
                    e.target.valueAsNumber
                  )
                }
              />
              <Input
                type="number"
                label="Max Limit"
                placeholder="0.00"
                labelPlacement="outside"
                size="sm"
                value={`${question!.max}`}
                onChange={(e) =>
                  handleDataChange!(
                    questionIndex!,
                    "max",
                    e.target.valueAsNumber
                  )
                }
              />
              <Input
                type="number"
                label="Defaule Value"
                labelPlacement="outside"
                size="sm"
                min={0}
                value={`${question!.defaultValue}`}
                onChange={(e) => {
                  handleDataChange!(
                    questionIndex!,
                    "defaultValue",
                    e.target.valueAsNumber
                  );
                }}
              />
            </div>
            <Slider
              isDisabled
              size="md"
              color="primary"
              label={"Range"}
              step={question!.step}
              showSteps={true}
              minValue={question!.min}
              maxValue={question!.max}
              defaultValue={question!.defaultValue}
              className="w-full p-4"
            />
          </>
        )}
      </>
    );
  };

  const renderUserMode = () => {
    const isInvalid = logic?.answerValue === undefined;

    return (
      <>
        {logic?.selectedQuestion?.inputType !== "range" && (
          <Input
            type={logic?.selectedQuestion!.inputType}
            placeholder={`Enter your ${logic?.selectedQuestion!.inputType}`}
            value={answerValue}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (logic?.selectedQuestion?.inputType === "number") {
                setAnswerValue(e.target.valueAsNumber);
              } else {
                setAnswerValue(e.target.value);
              }
            }}
            onBlur={() => {
              if (
                logic?.selectedQuestion?.inputType === "number" &&
                answerValue
              ) {
                handleLogicConditions!(logicIndex!, "answerValue", answerValue);
              } else if (
                logic?.selectedQuestion?.inputType !== "number" &&
                answerValue.trim()
              ) {
                handleLogicConditions!(logicIndex!, "answerValue", answerValue);
              } else {
                handleLogicConditions!(logicIndex!, "answerValue", undefined);
              }
            }}
            classNames={{
              base: ["w-full p-4"],
            }}
            isInvalid={isInvalid}
            color={isInvalid ? "danger" : "default"}
            errorMessage={isInvalid && "Please defined answer"}
          />
        )}
        {logic?.selectedQuestion?.inputType === "range" && (
          <div className="flex flex-col gap-2  p-4 w-full h-full items-start justify-center">
            <Slider
              size="md"
              color={isInvalid ? "danger" : "primary"}
              label={"Define Range?"}
              value={rangValue}
              onChange={setRangValue}
              onBlur={() => {
                handleLogicConditions!(logicIndex!, "answerValue", rangValue);
              }}
              step={logic?.selectedQuestion!.step}
              showSteps={true}
              minValue={logic?.selectedQuestion!.min}
              maxValue={logic?.selectedQuestion!.max}
              defaultValue={logic?.selectedQuestion!.defaultValue}
              className="w-full"
            />
            {
              isInvalid && (
                <p className="text-rose-500 font-semibold">
                  Please define the range.
                </p>
              ) /* : (
              <p className="text-green-500 font-semibold">
                Range defined successfully.
              </p>
            ) */
            }
          </div>
        )}
      </>
    );
  };

  return <div>{adminMode ? renderAdminMode() : renderUserMode()}</div>;
};

export default SingleInput;
