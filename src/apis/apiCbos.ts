import axios, { AxiosError } from 'axios';
import api from "./axios";

async function getCbos() {
  try {
    const response = await api({
      method: 'get',
      url: `${process.env.REACT_APP_API}/cbos`,
    });
    return { status: response.status, data: response.data };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        return { status: axiosError.response.status, data: axiosError.message };
      }
      console.error(axiosError.message);
      return { status: axiosError.status ? axiosError.status : 500, data: axiosError.message };
    } else {
      return { status: 400, data: error };
    }
  }
}

async function getCboById(id: number) {
  try {
    const response = await api({
      method: 'get',
      url: `${process.env.REACT_APP_API}/cbos/${id}`,
    });
    return { status: response.status, data: response.data };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        return { status: axiosError.response.status, data: axiosError.message };
      }
      console.error(axiosError.message);
      return { status: axiosError.status ? axiosError.status : 500, data: axiosError.message };
    } else {
      return { status: 400, data: error };
    }
  }
}

export { getCbos, getCboById };
