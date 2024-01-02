import { Divider, Switch } from "@nextui-org/react";
import { MoonIcon, SunIcon } from "lucide-react";
import React, { useState } from "react";
import Style from "./booleanStyle.module.css";

const Boolean = () => {
  const [isChecked, setIsChecked] = useState(true);
  return (
    <div>
      <h5 className="text-center pt-2 text-base font-medium text-blue-800">
        Answer type: Yes / No
      </h5>
      <div className="mx-4 my-2">
        <Divider />
      </div>

      <div className="p-4 flex justify-center">
        <div className={`${Style.radio_inputs} gap-2`}>
          <label className={`${Style.radio} `}>
            <input
              type="radio"
              checked={isChecked}
              onChange={() => setIsChecked(true)}
            />
            <span className={`${Style.name}`}>NO</span>
          </label>
          <label className={`${Style.radio} `}>
            <input
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
