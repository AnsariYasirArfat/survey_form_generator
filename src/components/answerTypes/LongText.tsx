import { Divider, Textarea } from "@nextui-org/react";
import React from "react";

const LongText = ({ adminMode }: { adminMode: boolean }) => {
  return (
    <div>
      {adminMode && (
        <>
          <h5 className="text-center pt-2 text-base font-medium text-blue-800">
            Answer type: Long text
          </h5>
          <div className="mx-4 my-2">
            <Divider />
          </div>
        </>
      )}

      <Textarea
        readOnly={adminMode}
        placeholder="Write your answer..."
        classNames={{
          base: ["w-full p-4 "],
        }}
      />
    </div>
  );
};

export default LongText;
