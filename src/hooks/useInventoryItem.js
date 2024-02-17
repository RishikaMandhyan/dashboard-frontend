import { useState, useEffect } from "react";
import useAxiosPrivateInstance from "./useAxiosPrivateInstance";

const useInventoryItem = (id) => {
  const [data, setData] = useState({});
  const [name, setName] = useState("");
  const [maxQuantity, setMaxQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const axiosPrivateInstance = useAxiosPrivateInstance();

  useEffect(() => {
    async function getData() {
      try {
        const res = await axiosPrivateInstance.get(`/inventory/${id}`);
        setData(res?.data);
        console.log(res?.data);
        setName(res?.data?.name);
        setMaxQuantity(res?.data?.maxQuantity);
        setPrice(res?.data?.price);
      } catch (err) {
        console.error(err);
      }
    }

    getData();
  }, [id]);

  console.log(name);
  return { data, name, setName, maxQuantity, setMaxQuantity, price, setPrice };
};

export default useInventoryItem;
