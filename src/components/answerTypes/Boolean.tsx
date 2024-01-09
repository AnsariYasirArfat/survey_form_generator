import { Divider } from "@nextui-org/react";
import React, { useState } from "react";
import Style from "../../style_module/booleanStyle.module.css";

const Boolean = ({ adminMode }: { adminMode: boolean }) => {
  const [isChecked, setIsChecked] = useState(true);
  return (
    <div>
      {adminMode && (
        <>
          <h5 className="text-center pt-2 text-base font-medium text-blue-800">
            Answer type: Yes / No
          </h5>
          <div className="mx-4 my-2">
            <Divider />
          </div>
        </>
      )}
      <div className="p-4 flex justify-center">
        <div
          className={`${Style.radio_inputs} gap-2 ${adminMode && "opacity-70"}`}
        >
          <label className={`${Style.radio} `}>
            <input
              disabled={adminMode}
              className="opacity-50"
              readOnly={adminMode}
              type="radio"
              checked={isChecked}
              onChange={() => setIsChecked(true)}
            />
            <span className={`${Style.name}`}>No</span>
          </label>
          <label className={`${Style.radio}`}>
            <input
              disabled={adminMode}
              readOnly={adminMode}
              type="radio"
              checked={!isChecked}
              onChange={() => setIsChecked(false)}
            />
            <span className={`${Style.name}`}>Yes</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Boolean;
