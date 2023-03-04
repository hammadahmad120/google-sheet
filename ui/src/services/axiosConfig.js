import axios from "axios";

const Axios = axios.create({
  baseURL: process.env.REACT_APP_API_SERVER,
});

Axios.defaults.headers["content-type"] = "application/json";
Axios.defaults.headers["accept"] = "application/json";

Axios.interceptors.request.use((req) => {
  // in case some req interceptors are required
  return req;
});

Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default Axios;
