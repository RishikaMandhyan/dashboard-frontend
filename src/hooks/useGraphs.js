import { useState, useEffect } from "react";
import useAxiosPrivateInstance from "./useAxiosPrivateInstance";

function useGraphs(month) {
  const [data, setData] = useState([]);
  const [err, setErr] = useState({});

  const axiosPrivateInstance = useAxiosPrivateInstance();

  const urls = [
    {
      url: `/sales-analytics?month=${month}`,
    },
    {
      url: `/orders-analytics?month=${month}`,
    },
    {
      url: `/platform-analytics?month=${month}`,
    },
    {
      url: `/category-analytics?month=${month}`,
    },
  ];

  useEffect(() => {
    async function getData() {
      try {
        const apiPromises = urls.map(async (item) => {
          try {
            const res = await axiosPrivateInstance.get(item.url);
            return res;
          } catch (err) {
            console.error(err);
            return err;
          }
        });

        const finalRes = await Promise.all(apiPromises);
        //console.log(finalRes);
        setData([...finalRes.map((item) => item.data)]);
      } catch (err) {
        //console.error(err);
      }
    }

    getData();
  }, [axiosPrivateInstance]);

  return { data, setData };
}

export default useGraphs;
