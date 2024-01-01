import { Textarea } from "@nextui-org/react";
import React from "react";

const LongText = () => {
  return (
    <div>
      <h5 className="p-2 text-base font-medium text-blue-600">
        Answer type: Long text
      </h5>
      <Textarea
        label="Answer Field"
        readOnly
        // placeholder="User will provide answer here"
        classNames={{
          base: ["w-full p-4 "],
        }}
      />
    </div>
  );
};

export default LongText;
