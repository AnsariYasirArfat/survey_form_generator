// import { Divider } from "@nextui-org/react";
// import React, { useState } from "react";
// import Style from "../../style_module/booleanStyle.module.css";
// import { AnswerTypeComponentProps } from "@/types/questions";

// const Boolean = ({
//   adminMode,
//   index,
//   logic,
//   handleLogicConditions,
// }: AnswerTypeComponentProps) => {
//   const [isChecked, setIsChecked] = useState(true);
//   return (
//     <div>
//       {adminMode && (
//         <>
//           <h5 className="text-center pt-2 text-base font-medium text-blue-800">
//             Answer type: Yes / No
//           </h5>
//           <div className="mx-4 my-2">
//             <Divider />
//           </div>
//         </>
//       )}
//       <div className="p-4 flex justify-center">
//         <div
//           className={`${Style.radio_inputs} gap-2 ${adminMode && "opacity-70"}`}
//         >
//           <label className={`${Style.radio} `}>
//             <input
//               disabled={adminMode}
//               className="opacity-50"
//               readOnly={adminMode}
//               type="radio"
//               checked={isChecked}
//               onChange={() => setIsChecked(true)}
//             />
//             <span className={`${Style.name}`}>No</span>
//           </label>
//           <label className={`${Style.radio}`}>
//             <input
//               disabled={adminMode}
//               readOnly={adminMode}
//               type="radio"
//               checked={!isChecked}
//               onChange={() => setIsChecked(false)}
//             />
//             <span className={`${Style.name}`}>Yes</span>
//           </label>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Boolean;

import { Divider } from "@nextui-org/react";
import React, { useState } from "react";
import Style from "../../style_module/booleanStyle.module.css";
import { AnswerTypeComponentProps } from "@/types/questions";

const Boolean = ({
  adminMode,
  index,
  logic,
  handleLogicConditions,
}: AnswerTypeComponentProps) => {
  const [isChecked, setIsChecked] = useState(logic?.answerValue || undefined);

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
  console.log(isChecked);
  const renderUserMode = () => {
    return (
      <div className="p-4 flex justify-center">
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
            <span className={`${Style.name}`}>No</span>
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
            <span className={`${Style.name}`}>Yes</span>
          </label>
        </div>
      </div>
    );
  };

  return <div>{adminMode ? renderAdminMode() : renderUserMode()}</div>;
};

export default Boolean;
