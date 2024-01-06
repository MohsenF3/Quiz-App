import axios from "axios";
import { useEffect, useState } from "react";
import { UseAxiosReturnType } from "../models/quizModels";

// Set the default base URL for Axios
axios.defaults.baseURL = "https://opentdb.com";

const useAxios = <T>(url: string): UseAxiosReturnType<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resposne = await axios.get(url);
        setData(resposne.data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useAxios;
