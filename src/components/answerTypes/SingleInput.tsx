// import { AnswerTypeComponentProps } from "@/types/questions";
// import { Divider, Input, Slider, Switch } from "@nextui-org/react";
// import React, { ChangeEvent, useState } from "react";

// const SingleInput = ({
//   adminMode,
//   question,
//   index,
//   logic,
//   handleDataChange,
//   handleLogicConditions,
// }: AnswerTypeComponentProps) => {
//   const [isSelected, setIsSelected] = useState(false);
//   const [answerValue, setAnswerValue] = useState("");
//   return (
//     <div>
//       {adminMode && (
//         <>
//           <h5 className="text-center pt-2 text-base font-medium text-blue-800">
//             Answer type: Single Input{" "}
//             {question!.inputType && (
//               <>
//                 <span>{question!.inputType}</span>
//               </>
//             )}
//           </h5>
//           <div className="mx-4 my-2">
//             <Divider />
//           </div>
//         </>
//       )}
//       {question!.inputType !== "range" ? (
//         adminMode ? (
//           <Input
//             readOnly
//             type={question!.inputType}
//             placeholder={`Enter your ${question!.inputType}`}
//             // value={adminMode ? "" : answerValue}

//             classNames={{
//               base: ["w-full p-4"],
//             }}
//           />
//         ) : (
//           <Input
//             // readOnly={adminMode}
//             type={logic?.selectedQuestion!.inputType}
//             placeholder={`Enter your ${logic?.selectedQuestion!.inputType}`}
//             value={logic?.answerValue ? logic?.answerValue : answerValue}
//             onChange={(e: ChangeEvent<HTMLInputElement>) => {
//               setAnswerValue(e.target.value);
//             }}
//             onBlur={() => {
//               handleLogicConditions!(index, "answerValue", answerValue);
//             }}
//             classNames={{
//               base: ["w-full p-4"],
//             }}
//           />
//         )
//       ) : (
//         <>
//           {adminMode ? (
//             <>
//               <div className="w-full grid grid-cols-5 gap-2 p-4 ">
//                 <Switch
//                   className="justify-self-center"
//                   isSelected={isSelected}
//                   onValueChange={setIsSelected}
//                   size="sm"
//                 >
//                   Show Steps?
//                 </Switch>
//                 <Input
//                   type="number"
//                   label="Steps Limit?"
//                   labelPlacement="outside"
//                   placeholder="0.00"
//                   size="sm"
//                   value={`${question!.step}`}
//                   onChange={(e) => {
//                     handleDataChange!(index, "step", e.target.valueAsNumber);
//                   }}
//                 />
//                 <Input
//                   type="number"
//                   label="Min Limit"
//                   placeholder="0.00"
//                   labelPlacement="outside"
//                   size="sm"
//                   value={`${question!.min}`}
//                   onChange={(e) =>
//                     handleDataChange!(index, "min", e.target.valueAsNumber)
//                   }
//                 />
//                 <Input
//                   type="number"
//                   label="Max Limit"
//                   placeholder="0.00"
//                   labelPlacement="outside"
//                   size="sm"
//                   value={`${question!.max}`}
//                   onChange={(e) =>
//                     handleDataChange!(index, "max", e.target.valueAsNumber)
//                   }
//                 />
//                 <Input
//                   type="number"
//                   label="Defaule Value"
//                   labelPlacement="outside"
//                   size="sm"
//                   min={0}
//                   value={`${question!.defaultValue}`}
//                   onChange={(e) => {
//                     handleDataChange!(
//                       index,
//                       "defaultValue",
//                       e.target.valueAsNumber
//                     );
//                   }}
//                 />
//               </div>
//               <Slider
//                 isDisabled
//                 size="md"
//                 color="primary"
//                 label={"Range"}
//                 step={question!.step}
//                 showSteps={true}
//                 // showSteps={question!.step ? isSelected : false}
//                 minValue={question!.min}
//                 maxValue={question!.max}
//                 defaultValue={question!.defaultValue}
//                 className="w-full p-4"
//               />
//             </>
//           ) : (
//             <Slider
//               size="md"
//               color="primary"
//               label={"Range"}
//               step={question!.step}
//               showSteps={true}
//               minValue={question!.min}
//               maxValue={question!.max}
//               defaultValue={question!.defaultValue}
//               className="w-full p-4"
//             />
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default SingleInput;

import { AnswerTypeComponentProps } from "@/types/questions";
import { Divider, Input, Slider, Switch } from "@nextui-org/react";
import React, { ChangeEvent, useState } from "react";

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
  const [answerValue, setAnswerValue] = useState(logic?.answerValue || "");

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
    return (
      <>
        {logic?.selectedQuestion?.inputType !== "range" && (
          <Input
            type={logic?.selectedQuestion!.inputType}
            placeholder={`Enter your ${logic?.selectedQuestion!.inputType}`}
            value={answerValue}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setAnswerValue(e.target.value);
            }}
            onBlur={() => {
              if (answerValue) {
                handleLogicConditions!(logicIndex!, "answerValue", answerValue);
              } else {
                handleLogicConditions!(logicIndex!, "answerValue", undefined);
              }
            }}
            classNames={{
              base: ["w-full p-4"],
            }}
          />
        )}
        {logic?.selectedQuestion?.inputType === "range" && (
          <Slider
            size="md"
            color="primary"
            label={"Range"}
            value={answerValue}
            onChange={setAnswerValue}
            onBlur={() => {
              handleLogicConditions!(logicIndex!, "answerValue", answerValue);
            }}
            step={logic?.selectedQuestion!.step}
            showSteps={true}
            minValue={logic?.selectedQuestion!.min}
            maxValue={logic?.selectedQuestion!.max}
            defaultValue={logic?.selectedQuestion!.defaultValue}
            className="w-full p-4"
          />
        )}
      </>
    );
  };

  return <div>{adminMode ? renderAdminMode() : renderUserMode()}</div>;
};

export default SingleInput;
