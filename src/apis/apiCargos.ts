import axios, { AxiosError } from 'axios';
import api from "./axios";

async function getCargos() {
  try {
    const response = await api({
      method: 'get',
      url: `${process.env.REACT_APP_API}/cargos`,
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

// GET cargo por ID
async function getCargoById(id: number) {
  try {
    const response = await api({
      method: 'get',
      url: `${process.env.REACT_APP_API}/cargos/${id}`,
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

// POST - criar novo cargo
async function postCargo(cargoData: any) {
  try {
    const response = await api({
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'post',
      url: `${process.env.REACT_APP_API}/cargos`,
      data: cargoData
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

// PUT - atualizar cargo
async function putCargo(id: number, cargoData: any) {
  try {
    const response = await api({
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'put',
      url: `${process.env.REACT_APP_API}/cargos/${id}`,
      data: cargoData
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

export { getCargos, getCargoById, postCargo, putCargo };
