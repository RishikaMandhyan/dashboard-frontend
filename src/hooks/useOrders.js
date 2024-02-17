import { useState } from "react";
import useAxiosPrivateInstance from "./useAxiosPrivateInstance";
import { useEffect } from "react";

const useOrders = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState({});
  const [page, setPage] = useState(0);

  const axiosPrivateInstance = useAxiosPrivateInstance();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axiosPrivateInstance.get(`/orders/${page + 1}`);
        setData(res.data);
      } catch (err) {
        console.error(err);
        setError(err);
      }
    };

    getData();

    //do something in this cleanup function something related to cancelling the requests when component unmounts
    return () => {};
  }, [axiosPrivateInstance, page]);

  return { data, setData, error, page, setPage };
};

export default useOrders;
