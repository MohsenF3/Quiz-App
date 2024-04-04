import React, { useEffect, useState } from "react";
import { decode } from "html-entities";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";

import useAxios from "../hooks/useAxios";
import { changeScore, selectValue } from "../slices/quizSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { ResponseForQuestions } from "../models/quizModels";
import Loading from "./Loading";

const getRandomInt = (max: number): number => Math.floor(Math.random() * max);

const Questions: React.FC = () => {
  const [currentQuestion, setCurrentQestion] = useState(0);
  const [options, setOptions] = useState<string[]>([]);

  const { type, diff, category, amount } = useAppSelector(selectValue);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  let api = `/api.php?amount=${amount}&category=${category}&difficulty=${diff}&type=${type}`;
  const { data, loading, error } = useAxios<ResponseForQuestions>(api);

  useEffect(() => {
    if (data?.results.length) {
      const question = data.results[currentQuestion];

      let answers: string[] = [];

      if (question.type === "multiple") {
        // Multiple-choice question
        answers = [...question.incorrect_answers];
        answers.splice(
          getRandomInt(question.incorrect_answers.length),
          0,
          question.correct_answer
        );
      } else if (question.type === "boolean") {
        // True/false question
        answers = ["True", "False"];
        // Shuffle the answers for variety
        answers.sort(() => Math.random() - 0.5);
      }

      setOptions(answers);
    }
  }, [data, currentQuestion]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (currentQuestion + 1 === data?.results.length) {
      // Navigate to the score page when all questions are answered
      navigate("/score");
    }

    // Check if the clicked option is the correct answer and update the score
    if (
      event.currentTarget.textContent ===
      data?.results[currentQuestion].correct_answer
    ) {
      dispatch(changeScore());
    }

    // Move to the next question
    setCurrentQestion((pre) => pre + 1);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <h1>Something Went Wrong!</h1>
        <Link to="/setting">Go To Setting</Link>
      </div>
    );
  }

  return (
    <div>
      {data && (
        <>
          <h1 className="text-center">
            Question : {currentQuestion + 1} / {data.results.length}
          </h1>
          <div>
            <p className="mt-5">
              {decode(data.results[currentQuestion].question)}
            </p>
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
          </div>
        </>
      )}
    </div>
  );
};

export default Questions;
