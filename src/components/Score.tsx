import React from "react";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

import { resetState, selectValue } from "../lib/slices/quizSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";

const Score: React.FC = () => {
  const { score, amount } = useAppSelector(selectValue);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // click event to reset state and navigate to the setting page
  const handleClick = () => {
    dispatch(resetState());
    navigate("/setting");
  };

  // Function to determine the message and color based on the user's score
  const getScoreInfo = () => {
    const userScore = (Number(score) / Number(amount)) * 100;
    let message = "";
    let color = "";

    // Assign message and color based on the user's score range
    if (userScore <= 30) {
      message = "Better luck next time!";
      color = "text-red-400";
    } else if (userScore <= 70) {
      message = "Good effort!";
      color = "text-orange-400";
    } else {
      message = "Excellent job!";
      color = "text-green-400";
    }

    return { message, color };
  };

  const { message, color } = getScoreInfo();

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div>
        <p className={`text-2xl font-bold mb-3  ${color}`}>{message}</p>

        <h1 className="text-3xl font-bold mb-5">Final Score : {score}</h1>

        <Button placeholder={undefined} onClick={handleClick} color="indigo">
          Back To Setting
        </Button>
      </div>
    </div>
  );
};

export default Score;
