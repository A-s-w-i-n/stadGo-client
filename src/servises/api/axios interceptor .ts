import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

const api : AxiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

api.interceptors.request.use(
  (config) => {
    // const token =JSON.parse(localStorage.getItem('user')as string)
    // const tokens= token.token

    // if(tokens){
    //   config.headers['authorization'] = `Bearer ${tokens}`
    // }
    
    
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (respose: AxiosResponse) => {
    return respose;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default api;


