import { Card, CardBody, Divider } from "@nextui-org/react";
import React from "react";

const DefaultAnswer = () => {
  return (
    <div>
      <h5 className="text-center pt-2 text-base font-medium text-blue-800">
        Answer type: Choose the answer type below.
      </h5>
      <div className="mx-4 my-2">
        <Divider />
      </div>

      <div className="p-4 ">
        <Card
          isBlurred
          shadow="none"
          radius="sm"
          classNames={{
            base: ["w-full p-4 "],
          }}
        >
          <CardBody>
            <p className="text-center font-medium text-blue-900">
              You haven&apos;t selected any type yet. Please choose a type for
              the answer.
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default DefaultAnswer;
