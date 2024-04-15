import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "@material-tailwind/react";

import SelectItems from "./SelectItems";
import useAxios from "../lib/hooks/useAxios";
import { changeAmount, selectValue } from "../lib/slices/quizSlice";
import { ResponseForTriviaCategory } from "../lib/models/quizModels";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Loading from "./Loading";
import { difficultyOptions, typeOptions } from "../lib/placeholder";

const Setting: React.FC = () => {
  const [number, setNumber] = useState("10");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const { type, diff, category, amount } = useAppSelector(selectValue);
  const dispatch = useAppDispatch();

  // Fetch trivia categories data
  const { data, loading, error } =
    useAxios<ResponseForTriviaCategory>("/api_category.php");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(changeAmount(number));

    if (type && diff && category && amount) {
      navigate("/questions");
    } else {
      setErr("Please fill in all the required settings.");
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <h1 className="text-3xl font-bold">{error}</h1>
      </div>
    );
  }

  const changeNumber = (event: React.ChangeEvent<HTMLInputElement>) =>
    setNumber(event.target.value);

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
            onChange={changeNumber}
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
