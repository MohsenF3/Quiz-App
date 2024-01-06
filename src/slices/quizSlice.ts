import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { QuizState } from "../models/quizModels";

// Define the initial state for the quiz slice
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
    // Reducer to handle changing the quiz type
    changeType: (state, action: PayloadAction<string>) => {
      state.value.type = action.payload;
    },
    // Reducer to handle changing the quiz amount
    changeAmount: (state, action: PayloadAction<string>) => {
      state.value.amount = action.payload;
    },
    // Reducer to handle changing the quiz difficulty
    changeDiff: (state, action: PayloadAction<string>) => {
      state.value.diff = action.payload;
    },
    // Reducer to handle changing the quiz category
    changeCategory: (state, action: PayloadAction<string>) => {
      state.value.category = action.payload;
    },
    // Reducer to handle changing the quiz score
    changeScore: (state) => {
      state.value.score += 1;
    },
    // Reducer to reset the quiz state to its initial values
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
