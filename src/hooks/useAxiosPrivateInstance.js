import axiosPrivateInstance from "../axios";
import { useSelector } from "react-redux";
import useRefreshToken from "./useRefreshToken";
import { useEffect } from "react";

//this hook is to apply interceptors to our axiosPrivateInstance which we made inside axios.js file
//and then return tht instance
const useAxiosPrivateInstance = () => {
  const user = useSelector((state) => state.user);
  const refresh = useRefreshToken();

  useEffect(() => {
    const requestIntercept = axiosPrivateInstance.interceptors.request.use(
      (req) => {
        if (user?.accessToken) {
          req.headers.Authorization = `Bearer ${user?.accessToken}`;
        }
        return req;
      },
      (err) => {
        return Promise.reject(err);
      }
    );
    const responseIntercept = axiosPrivateInstance.interceptors.response.use(
      (res) => {
        return res;
      },
      async (err) => {
        const prevRequest = err?.config;
        if (err?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true; //to make sure that we try to refresh one failed accessToken only once
          try {
            const newAccessToken = await refresh();
            prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return axiosPrivateInstance(prevRequest);
          } catch (err) {
            console.error(err);
          }
        }
        return Promise.reject(err);
      }
    );

    return () => {
      axiosPrivateInstance.interceptors.request.eject(requestIntercept);
      axiosPrivateInstance.interceptors.response.eject(responseIntercept);
    };
  }, [user, refresh]);

  return axiosPrivateInstance;
};

export default useAxiosPrivateInstance;
