import axios, { AxiosError } from "axios";
import api from "./axios";

interface Usuario {
  id_usuario?: number;
  nome_usuario: string;
  login: string;
  senha?: string;
}

// GET todos os usuários
async function getAllUsuarios() {
  try {
    const response = await api({
      method: 'get',
      url: `${process.env.REACT_APP_API}/usuarios`,
    });

    return { status: response.status, data: response.data };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      return {
        status: axiosError.response ? axiosError.response.status : 500,
        data: axiosError.message,
      };
    }
    return { status: 400, data: error };
  }
}

// GET usuário por ID
async function getUsuario(id: string) {
  try {
    const response = await api({
      method: 'get',
      url: `${process.env.REACT_APP_API}/usuarios/${id}`,
    });

    return { status: response.status, data: response.data };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      return {
        status: axiosError.response ? axiosError.response.status : 500,
        data: axiosError.message,
      };
    }
    return { status: 400, data: error };
  }
}

// POST criar usuário
async function postUsuario(postBody: Usuario) {
  try {
    const response = await api.post(
      `${process.env.REACT_APP_API}/usuarios`,
      postBody
    );

    return { status: response.status, data: response.data };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      return {
        status: axiosError.response ? axiosError.response.status : 500,
        data: axiosError.message,
      };
    }
    return { status: 400, data: error };
  }
}

// PUT atualizar usuário
async function putUsuario(id: string, postBody: Usuario) {
  try {
    const response = await api({
      method: 'put',
      url: `${process.env.REACT_APP_API}/usuarios/${id}`,
      data: postBody,
    });

    return { status: response.status, data: response.data };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      return {
        status: axiosError.response ? axiosError.response.status : 500,
        data: axiosError.message,
      };
    }
    return { status: 400, data: error };
  }
}

// DELETE usuário
async function deleteUsuario(id: string) {
  try {
    const response = await api({
      method: 'delete',
      url: `${process.env.REACT_APP_API}/usuarios/${id}`,
    });

    return { status: response.status, data: response.data };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      return {
        status: axiosError.response ? axiosError.response.status : 500,
        data: axiosError.message,
      };
    }
    return { status: 400, data: error };
  }
}

// POST login (retorna token JWT)
async function loginUsuario(postBody: { login: string; senha: string }) {
    console.log(postBody.login, postBody.senha)
  try {
    const response = await api.post(
      `${process.env.REACT_APP_API}/usuarios/login`,
      postBody
    );

    return { status: response.status, data: response.data };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      return {
        status: axiosError.response ? axiosError.response.status : 500,
        data: axiosError.message,
      };
    }
    return { status: 400, data: error };
  }
}

export {
  getAllUsuarios,
  getUsuario,
  postUsuario,
  putUsuario,
  deleteUsuario,
  loginUsuario
};
