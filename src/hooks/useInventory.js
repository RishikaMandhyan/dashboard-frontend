import { useState, useEffect } from "react";
import useAxiosPrivateInstance from "./useAxiosPrivateInstance";

function useInventory(query) {
  const axiosPrivateInstance = useAxiosPrivateInstance();
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const res = await axiosPrivateInstance(`/inventory?q=${query}`);
        setData(res?.data);
      } catch (err) {
        console.error(err);
      }
    }
    getData();
  }, [query]);

  return { data, setData };
}

export default useInventory;
