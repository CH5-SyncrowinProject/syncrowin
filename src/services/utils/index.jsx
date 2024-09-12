import axios from "axios";
import history from "../navigation/index";

export const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});


export const loginApi = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

loginApi.interceptors.request.use(
  async (config) => config,
  (error) => Promise.reject(error)
);

api.interceptors.request.use(
  async (config) => {
    const authToken = localStorage.getItem("token");
    if (authToken) {
      // eslint-disable-next-line no-param-reassign
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    // Do something before request is sent
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status == 401 || error.response.status == 503) {
        localStorage.clear();
        history.replace("login");
      }
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error);
    }
    console.log(error.config);
    return error;
  }
);
