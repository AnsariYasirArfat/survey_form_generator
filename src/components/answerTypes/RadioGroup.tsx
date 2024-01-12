// "use client";

// import React, { ChangeEvent, useState } from "react";
// import {
//   RadioGroup as RadioType,
//   Radio,
//   Divider,
//   Button,
//   Input,
// } from "@nextui-org/react";
// import { Minus, Plus } from "lucide-react";
// import { AnswerTypeComponentProps } from "@/types/questions";

// const RadioGroup = ({
//   adminMode,
//   question,
//   index,
//   handleDataChange,
// }: AnswerTypeComponentProps) => {
//   const questionIndex = index;
//   const [choiceCount, setChoiceCount] = useState(3);
//   const [tempChoices, setTempChoices] = useState<any>(question.choices);

//   // console.log("radio tempChoice: ", tempChoices);
//   // console.log("radio original Choice: ", question.choices);

//   const addChoice = () => {
//     setTempChoices([
//       ...tempChoices,
//       { text: `Choice ${choiceCount}`, value: `Choice ${choiceCount}` },
//     ]);

//     const choices: any = question.choices;
//     const addedChoices = [
//       ...choices,
//       { text: `Choice ${choiceCount}`, value: `Choice ${choiceCount}` },
//     ];
//     handleDataChange(index, "choices", addedChoices);
//     setChoiceCount((prevCount) => prevCount + 1);
//   };

//   const minusChoice = (choiceToMinus: any) => {
//     if (question.choices!.length > 2) {
//       const udatedChoice = tempChoices.filter(
//         (tempChoice: any) => choiceToMinus !== tempChoice
//       );
//       setTempChoices(udatedChoice);

//       const choices: any = question.choices;
//       const minusChoice = choices.filter(
//         (choice: any) => choiceToMinus.text !== choice.text
//       );

//       handleDataChange(index, "choices", minusChoice);
//     }
//   };

//   const editTempChoice = (index: number, field: string, value: string) => {
//     setTempChoices((prevchoices: any) => {
//       const updatedChoices = [...prevchoices];
//       updatedChoices[index] = {
//         ...updatedChoices[index],
//         [field]: value,
//       };
//       return updatedChoices;
//     });
//   };

//   const updateChoiceTextInMainData = () => {
//     handleDataChange(questionIndex, "choices", tempChoices);
//   };

//   return (
//     <div>
//       {adminMode && (
//         <>
//           <h5 className="text-center pt-2 text-base font-medium text-blue-800">
//             Answer type: Radio Group
//           </h5>
//           <div className="mx-4 my-2">
//             <Divider />
//           </div>{" "}
//         </>
//       )}
//       <RadioType
//         // label="Add label if needed"
//         // isReadOnly
//         classNames={{
//           base: ["p-4"],
//         }}
//       >
//         {tempChoices?.map((tempChoice: any, index: number) => {
//           return (
//             <div
//               key={`radiogroup-${index}-${JSON.stringify(question)}`}
//               className="flex justify-between items-center"
//             >
//               <Radio
//                 classNames={{
//                   wrapper: [`${adminMode && "border-slate-400 border-2"}`],
//                 }}
//                 isDisabled={adminMode}
//                 value={tempChoice.value}
//                 size={"lg"}
//               />
//               <Input
//                 readOnly={!adminMode}
//                 size={"sm"}
//                 type="text"
//                 value={tempChoice.text}
//                 onChange={(e: ChangeEvent<HTMLInputElement>) =>
//                   editTempChoice(index, "text", e.target.value)
//                 }
//                 onBlur={updateChoiceTextInMainData}
//                 classNames={{
//                   base: ["me-4"],
//                   input: ["text-black capitalize font-semibold"],
//                 }}
//               />
//               {adminMode && (
//                 <Button
//                   onClick={() => minusChoice(tempChoice)}
//                   variant="bordered"
//                   color="danger"
//                   size="sm"
//                 >
//                   <Minus size={16} />
//                 </Button>
//               )}
//             </div>
//           );
//         })}
//         {adminMode && (
//           <div className="flex justify-between items-center">
//             <Radio value={"add"} isDisabled />
//             <Input
//               isDisabled
//               size={"sm"}
//               type="text"
//               value={`Choice ${choiceCount}`}
//               readOnly
//               classNames={{
//                 base: ["me-4"],
//                 input: ["text-black capitalize font-semibold"],
//               }}
//             />
//             <Button
//               onClick={addChoice}
//               variant="bordered"
//               color="success"
//               size="sm"
//             >
//               <Plus size={16} />
//             </Button>
//           </div>
//         )}
//       </RadioType>
//     </div>
//   );
// };

// export default RadioGroup;

"use client";

import React, { ChangeEvent, useState } from "react";
import { RadioGroup, Radio, Divider, Button, Input } from "@nextui-org/react";
import { Minus, Plus } from "lucide-react";
import { AnswerTypeComponentProps } from "@/types/questions";

const RadioChoices = ({
  adminMode,
  question,
  index,
  handleDataChange,
  logic,
  handleLogicConditions,
}: AnswerTypeComponentProps) => {
  const questionIndex = index;
  const [choiceCount, setChoiceCount] = useState(3);
  const [tempChoices, setTempChoices] = useState<any>(
    question && question!.choices
  );
  const [selected, setSelected] = useState(logic?.answerValue || "");

  const addChoice = () => {
    setTempChoices([
      ...tempChoices,
      { text: `Choice ${choiceCount}`, value: `Choice ${choiceCount}` },
    ]);

    const choices: any = question!.choices;
    const addedChoices = [
      ...choices,
      { text: `Choice ${choiceCount}`, value: `Choice ${choiceCount}` },
    ];
    handleDataChange!(questionIndex, "choices", addedChoices);
    setChoiceCount((prevCount) => prevCount + 1);
  };

  const minusChoice = (choiceToMinus: any) => {
    if (question!.choices!.length > 2) {
      const updatedChoice = tempChoices.filter(
        (tempChoice: any) => choiceToMinus !== tempChoice
      );
      setTempChoices(updatedChoice);
      const choices: any = question!.choices;
      const minusChoice = choices.filter(
        (choice: any) => choiceToMinus.text !== choice.text
      );
      handleDataChange!(questionIndex, "choices", minusChoice);
    }
  };

  const editTempChoice = (index: number, field: string, value: string) => {
    setTempChoices((prevChoices: any) => {
      const updatedChoices = [...prevChoices];
      updatedChoices[index] = {
        ...updatedChoices[index],
        [field]: value,
      };
      return updatedChoices;
    });
  };

  const updateChoiceTextInMainData = () => {
    handleDataChange!(questionIndex, "choices", tempChoices);
  };

  const renderAdminMode = () => {
    return (
      <>
        <h5 className="text-center pt-2 text-base font-medium text-blue-800">
          Answer type: Radio Group
        </h5>
        <div className="mx-4 my-2">
          <Divider />
        </div>

        <RadioGroup
          classNames={{
            base: ["p-4"],
          }}
        >
          {tempChoices.map((tempChoice: any, choiceIndex: number) => {
            return (
              <div
                key={choiceIndex}
                className="flex justify-between items-center"
              >
                <Radio
                  classNames={{
                    wrapper: [`${adminMode && "border-slate-400 border-2"}`],
                  }}
                  isDisabled
                  value={tempChoice.value}
                  size={"lg"}
                />
                <Input
                  size={"sm"}
                  type="text"
                  value={tempChoice.text}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    editTempChoice(choiceIndex, "text", e.target.value)
                  }
                  onBlur={updateChoiceTextInMainData}
                  classNames={{
                    base: ["me-4"],
                    input: ["text-black capitalize font-semibold"],
                  }}
                />
                <Button
                  onClick={() => minusChoice(tempChoice)}
                  variant="bordered"
                  color="danger"
                  size="sm"
                >
                  <Minus size={16} />
                </Button>
              </div>
            );
          })}

          <div className="flex justify-between items-center">
            <Radio value={"add"} isDisabled size={"lg"} />
            <Input
              isDisabled
              size={"sm"}
              type="text"
              value={`Choice ${choiceCount}`}
              readOnly
              classNames={{
                base: ["me-4"],
                input: ["text-black capitalize font-semibold"],
              }}
            />
            <Button
              onClick={addChoice}
              variant="bordered"
              color="success"
              size="sm"
            >
              <Plus size={16} />
            </Button>
          </div>
        </RadioGroup>
      </>
    );
  };

  const renderUserMode = () => {
    return (
      <>
        <RadioGroup
          value={selected}
          onValueChange={setSelected}
          onBlur={() => {
            if (selected) {
              handleLogicConditions!(index, "answerValue", selected);
            } else {
              handleLogicConditions!(index, "answerValue", undefined);
            }
          }}
          classNames={{
            base: ["p-4"],
          }}
        >
          {logic?.selectedQuestion?.choices!.map(
            (choice: any, choiceIndex: number) => {
              return (
                <div
                  key={choiceIndex}
                  className="flex justify-between items-center"
                >
                  <Radio value={choice.value} size={"lg"} />
                  <Input
                    readOnly
                    size={"sm"}
                    type="text"
                    value={choice.text}
                    classNames={{
                      base: ["me-4"],
                      input: ["text-black capitalize font-semibold"],
                    }}
                  />
                </div>
              );
            }
          )}
        </RadioGroup>
      </>
    );
  };

  return <div>{adminMode ? renderAdminMode() : renderUserMode()}</div>;
};

export default RadioChoices;
