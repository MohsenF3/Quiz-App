import { memo } from "react";
import { Button } from "@material-tailwind/react";
import { decode } from "html-entities";
import { QuestionProps } from "../lib/models/quizModels";

const Question = ({ options, handleClick }: QuestionProps) => {
  return (
    <div className="grid grid-cols-2  gap-4 mt-7">
      {options.map((option) => (
        <Button
          placeholder={undefined}
          key={option}
          color="amber"
          className="text-white"
          onClick={handleClick}
        >
          {decode(option)}
        </Button>
      ))}
    </div>
  );
};

export default memo(Question);
