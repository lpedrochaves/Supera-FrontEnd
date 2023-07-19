import axios from "axios";
import { useEffect, useState } from "react";

const api = axios.create({
  baseURL: "http://localhost:8080/transferencia/paginada?size=8&page=0",
});
export function APIResponse(url) {
  const [isFetching, setIsFetching] = useState(true);
  const [data, setProdutos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get(url)
      .then((response) => {
        setProdutos(response.data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsFetching(false);
      });
    // eslint-disable-next-line
  }, []);

  return { data, isFetching, error };
}
export function ApiBuscaTotal(url) {
  const [isFetching, setIsFetching] = useState(true);
  const [dataBusca, setProdutos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get(url)
      .then((response) => {
        if (response.status === 200) {
          setProdutos(response.data);
          //  window.location.reload();
        }
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsFetching(false);
      });
    // eslint-disable-next-line
  }, []);

  return { dataBusca, isFetching, error };
}

export default api;
