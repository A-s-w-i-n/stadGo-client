import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});
export const apiAuth: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

api.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("user") as string)
    const tokens = token.token;

    if (tokens) {
      config.headers["authorization"] = `Bearer ${tokens}`;
    }

    // const ownerToken = JSON.parse(localStorage.getItem("owner") as string)
    // console.log(ownerToken, "aaaaaa");

    // const ownerTockens = ownerToken;
    // console.log(ownerTockens, "aaa");

    // if (ownerTockens) {
    //   config.headers["ownerAuthorization"] = `Bearer ${ownerTockens}`
    // }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

apiAuth.interceptors.response.use(
  (respose: AxiosResponse) => {
    return respose;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default api;
