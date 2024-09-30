import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const useFetch = (url) => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    let mounted = true; // Utilisé pour éviter les fuites de mémoire

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(url);
        if (mounted) { // Vérifie si le composant est toujours monté
          setData(res.data);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Nettoyage lors du démontage du composant
    return () => {
      mounted = false;
    };
  }, [url]);

  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      setData(res.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredData = data.filter(item => item.namek === user.username && item.historiq === "yes");

  return { data: filteredData, loading, error, reFetch };
};

export default useFetch;
