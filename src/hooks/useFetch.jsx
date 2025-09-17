import { useState, useEffect } from "react";
export default function useFetch(url) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) {
          throw "Unable to fetch data from api.";
        }
        const data = await response.json();
        setLoading(false);
        setError(null);
        setData(data);
      } catch (error) {
        setError(error);
      }
    }

    fetchData();
  }, [url]);

  return { data, loading, error };
}
