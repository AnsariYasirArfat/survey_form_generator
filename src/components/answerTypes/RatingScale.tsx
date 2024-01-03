import { Button, Chip, Divider } from "@nextui-org/react";
import React, { useState } from "react";
import Style from "../../style_module/startStyle.module.css";
import { Minus, Plus } from "lucide-react";
import { Question } from "../QuestionForm";

interface RatingScaleProps {
  question: Question;
}
const RatingScale = ({ question }: RatingScaleProps) => {
  // const [isChecked, setIsChecked] = useState(true);
  const [selectedStar, setSelectedStar] = useState<number>(1);
  const [rateCount, setRateCount] = useState([{}, {}, {}, {}, {}]);

  const handleStarClick = (selected: number) => {
    setSelectedStar(selected);
    console.log("Selected star:", selected);
  };
  const addOption = () => {
    if (rateCount.length < 20) {
      setRateCount([...rateCount, {}]);
    }
  };

  const minusOption = () => {
    if (rateCount.length > 2) {
      setRateCount(rateCount.slice(0, -1));

      if (rateCount.length <= selectedStar) {
        setSelectedStar(1);
      }
    }
  };

  return (
    <div>
      <h5 className="text-center pt-2 text-base font-medium text-blue-800">
        Answer type: Rating Scale
      </h5>
      <div className="mx-4 my-2">
        <Divider />
      </div>
      <div className="grid grid-cols-6 justify-center items-center gap-4 p-4">
        <div className="col-span-1 flex gap-2 justify-center">
          <Button
            onClick={minusOption}
            variant="flat"
            color="danger"
            size="sm"
            className="w-10"
          >
            <Minus size={16} />
          </Button>
          <Button onClick={addOption} variant="flat" color="success" size="sm">
            <Plus size={16} />
          </Button>
        </div>

        {question.rateType === "stars" ? (
          <div className={`${Style.stars} gap-2 col-span-5`}>
            {rateCount.map((star, index) => {
              return (
                <>
                  <input
                    type="radio"
                    key={`star-input-${index}-${question.questionId}`}
                    id={`star-${index}-${question.questionId}`}
                    value={`${index}`}
                    checked={selectedStar === index + 1}
                    onChange={() => handleStarClick(index + 1)}
                    // hidden
                    // style={{ display: "none" }}
                  />
                  <label
                    key={`star-label-${index}-${question.questionId}`}
                    htmlFor={`star-${index}-${question.questionId}`}
                    title="text"
                    className="p-1"
                  >
                    <svg
                      viewBox="0 0 576 512"
                      height="1em"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`${Style.star_solid}`}
                    >
                      <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                    </svg>
                  </label>
                </>
              );
            })}
          </div>
        ) : (
          <div className={`${Style.number} gap-2 col-span-5`}>
            {rateCount.map((star, index) => {
              return (
                <div key={`number-input-${index}-${question.questionId}`}>
                  <input
                    type="radio"
                    // key={`number-input-${question.questionId}`}
                    id={`number-${index}-${question.questionId}`}
                    value={`${index}`}
                    checked={selectedStar === index + 1}
                    onChange={() => handleStarClick(index + 1)}
                    // hidden
                    // style={{ display: "none" }}
                  />
                  <label
                    // key={`number-label-${question.questionId}`}
                    htmlFor={`number-${index}-${question.questionId}`}
                    title="text"
                    className="p-1"
                  >
                    <Chip radius="full" size="lg">
                      {index + 1}
                    </Chip>
                  </label>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default RatingScale;
