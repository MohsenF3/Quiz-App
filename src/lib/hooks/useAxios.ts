import axios from "axios";
import { useEffect, useState } from "react";
import { UseAxiosReturnType } from "../models/quizModels";

axios.defaults.baseURL = "https://opentdb.com";

const useAxios = <T>(url: string): UseAxiosReturnType<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useAxios;
