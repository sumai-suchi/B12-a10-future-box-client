import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    "https://b12-a10-future-box-server-hazel.vercel.app/",
  headers: {
    "Content-Type": "application/json",
  },
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
