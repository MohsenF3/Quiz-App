// The return type for the useAxios hook
export type UseAxiosReturnType<T> = {
  data: T | null;
  loading: boolean;
  error: string;
};

// State shape for the quiz slice
export type QuizState = {
  value: {
    type: string;
    amount: string;
    diff: string;
    category: string;
    score: number;
  };
};

// Represents a trivia category
export type TriviaCategory = {
  id: number | string;
  name: string;
};

// Represents a set of results from a trivia quiz
export type Results = {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

// Response structure for fetching trivia categories
export type ResponseForTriviaCategory = {
  trivia_categories: TriviaCategory[];
};

// Response structure for fetching trivia questions
export type ResponseForQuestions = {
  response_code: number;
  results: Results[];
};

// Props for SelectItems component
export interface SelectItemsProps {
  options: TriviaCategory[] | undefined;
  label: string;
}
