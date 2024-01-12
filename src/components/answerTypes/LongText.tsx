// import { Divider, Textarea } from "@nextui-org/react";
// import React from "react";

// const LongText = ({ adminMode }: { adminMode: boolean }) => {
//   return (
//     <div>
//       {adminMode && (
//         <>
//           <h5 className="text-center pt-2 text-base font-medium text-blue-800">
//             Answer type: Long text
//           </h5>
//           <div className="mx-4 my-2">
//             <Divider />
//           </div>
//         </>
//       )}

//       <Textarea
//         readOnly={adminMode}
//         placeholder="Write your answer..."
//         classNames={{
//           base: ["w-full p-4 "],
//         }}
//       />
//     </div>
//   );
// };

// export default LongText;

// LongText.tsx

import { AnswerTypeComponentProps } from "@/types/questions";
import { Divider, Textarea } from "@nextui-org/react";
import React, { useState } from "react";

const LongText = ({
  adminMode,
  index,
  logic,
  handleLogicConditions,
}: AnswerTypeComponentProps) => {
  const [answerValue, setAnswerValue] = useState(logic?.answerValue || "");

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
    return (
      <>
        <Textarea
          placeholder={`Enter your long text`}
          value={answerValue}
          onChange={(e) => {
            setAnswerValue(e.target.value);
          }}
          onBlur={() => {
            if (answerValue) {
              handleLogicConditions!(index, "answerValue", answerValue);
            } else {
              handleLogicConditions!(index, "answerValue", undefined);
            }
          }}
          classNames={{
            base: ["w-full p-4"],
          }}
        />
      </>
    );
  };

  return <div>{adminMode ? renderAdminMode() : renderUserMode()}</div>;
};

export default LongText;
