import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { QuizState } from "../models/quizModels";

const initialState: QuizState = {
  value: {
    type: "",
    amount: "10",
    diff: "",
    category: "",
    score: 0,
  },
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    changeType: (state, action: PayloadAction<string>) => {
      state.value.type = action.payload;
    },
    changeAmount: (state, action: PayloadAction<string>) => {
      state.value.amount = action.payload;
    },
    changeDiff: (state, action: PayloadAction<string>) => {
      state.value.diff = action.payload;
    },
    changeCategory: (state, action: PayloadAction<string>) => {
      state.value.category = action.payload;
    },
    changeScore: (state) => {
      state.value.score += 1;
    },
    resetState: (state) => {
      state.value = initialState.value;
    },
  },
});

export const selectValue = (state: RootState) => state.quiz.value;

export const {
  changeAmount,
  changeCategory,
  changeDiff,
  changeScore,
  changeType,
  resetState,
} = quizSlice.actions;

export default quizSlice.reducer;
