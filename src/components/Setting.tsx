import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Spinner } from "@material-tailwind/react";

import SelectItems from "./SelectItems";
import useAxios from "../hooks/useAxios";
import { changeAmount, selectValue } from "../slices/quizSlice";
import { ResponseForTriviaCategory } from "../models/quizModels";
import { useAppDispatch, useAppSelector } from "../app/hooks";

const Setting: React.FC = () => {
  // State to manage the number of questions
  const [number, setNumber] = useState("10");
  // Show error if user attempts to proceed without filling in all required settings
  const [err, setErr] = useState("");

  // Fetch trivia categories data
  const { data, loading, error } =
    useAxios<ResponseForTriviaCategory>("/api_category.php");

  const { type, diff, category, amount } = useAppSelector(selectValue);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Options for difficulty
  const difficultyOptions = [
    { id: "easy", name: "Easy" },
    { id: "medium", name: "Medium" },
    { id: "hard", name: "Hard" },
  ];

  // Options for question type
  const typeOptions = [
    { id: "multiple", name: "Multyple Choice" },
    { id: "boolean", name: "True / False" },
  ];

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(changeAmount(number));

    // Navigate to the questions page if all required settings are available
    if (type && diff && category && amount) {
      navigate("/questions");
    } else {
      // Set error message
      setErr("Please fill in all the required settings.");
    }
  };

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner color="blue" className="h-16 w-16" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <h1 className="text-3xl font-bold">{error}</h1>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <h1 className="text-3xl font-bold text-center text-white">
        Quiz <span className="text-purple-500">Room</span>
      </h1>

      <form onSubmit={handleSubmit} className="mt-10">
        <div className="flex flex-col gap-5">
          {/* Select component for choosing trivia category */}
          <SelectItems options={data?.trivia_categories} label="Category" />
          {/* Select component for choosing difficulty level */}
          <SelectItems options={difficultyOptions} label="Difficulty" />
          {/* Select component for choosing question type */}
          <SelectItems options={typeOptions} label="Type" />
          {/* Input for specifying the number of questions */}
          <Input
            crossOrigin={undefined}
            variant="static"
            value={number}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setNumber(event.target.value)
            }
            label="Amount Of Questions"
            type="number"
          />
        </div>
        {/* Show error message if there's an error */}
        {err && <p className="text-red-500 my-2 font-semibold">{err}</p>}
        <Button
          placeholder={undefined}
          type="submit"
          fullWidth
          color="green"
          className="mt-5"
        >
          Get Started
        </Button>
      </form>
    </div>
  );
};

export default Setting;
