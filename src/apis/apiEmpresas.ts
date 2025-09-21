import axios, { AxiosError } from "axios";
import api from "./axios";

async function getAllEmpresas(filters: string | null) {
  try {
    const response = await api({
      method: "get",
      url: `${process.env.REACT_APP_API}/empresas`,
      /* params: {
        ...filters,
      } */
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

async function getEmpresa(id: string) {
  try {
    const response = await api({
      method: "get",
      url: `${process.env.REACT_APP_API}/empresas/${id}`,
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

async function postEmpresa(postBody: Empresa) {
  try {
    const response = await api({
      method: "post",
      url: `${process.env.REACT_APP_API}/empresas`,
      data: postBody,
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

async function putEmpresa(postBody: Empresa, id: string) {
  try {
    const response = await api({
      method: "put",
      url: `${process.env.REACT_APP_API}/empresas/${id}`,
      data: postBody,
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

async function deleteEmpresa(id: string) {
  try {
    const response = await api({
      method: "delete",
      url: `${process.env.REACT_APP_API}/empresas/${id}`,
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

export { getAllEmpresas, getEmpresa, postEmpresa, putEmpresa, deleteEmpresa };
