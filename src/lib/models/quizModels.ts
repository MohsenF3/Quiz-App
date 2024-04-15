export type UseAxiosReturnType<T> = {
  data: T | null;
  loading: boolean;
  error: string;
};

export type QuizState = {
  value: {
    type: string;
    amount: string;
    diff: string;
    category: string;
    score: number;
  };
};

export type TriviaCategory = {
  id: number | string;
  name: string;
};

export type Results = {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

export type ResponseForTriviaCategory = {
  trivia_categories: TriviaCategory[];
};

export type ResponseForQuestions = {
  response_code: number;
  results: Results[];
};

export interface SelectItemsProps {
  options: TriviaCategory[] | undefined;
  label: string;
}

export interface QuestionProps {
  options: string[];
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
