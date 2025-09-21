import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({});

// interceptor para sempre anexar o token
api.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});

export default api;