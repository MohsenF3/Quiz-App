import React, { useCallback, useEffect, useState } from "react";
import { decode } from "html-entities";
import { Link, useNavigate } from "react-router-dom";

import useAxios from "../lib/hooks/useAxios";
import { changeScore, selectValue } from "../lib/slices/quizSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { ResponseForQuestions } from "../lib/models/quizModels";
import Loading from "./Loading";
import { getRandomInt } from "../lib/utils";
import Question from "./Question";
import { Button } from "@material-tailwind/react";

const Questions: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const navigate = useNavigate();

  const { type, diff, category, amount } = useAppSelector(selectValue);
  const dispatch = useAppDispatch();

  // fetch data
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

  const onClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
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
      setCurrentQuestion((pre) => pre + 1);
    },
    [currentQuestion]
  );

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="w-full h-full flex flex-col gap-5 items-center justify-center">
        <h1 className="text-2xl font-medium">Something Went Wrong!</h1>
        <Button placeholder="" color="brown">
          <Link to="/setting">Go To Setting</Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      {!!data && (
        <>
          <h1 className="text-center">
            Question : {currentQuestion + 1} / {data.results.length}
          </h1>
          <div>
            <p className="mt-5">
              {decode(data.results[currentQuestion].question)}
            </p>
            <Question options={options} handleClick={onClick} />
          </div>
        </>
      )}
    </div>
  );
};

export default Questions;
