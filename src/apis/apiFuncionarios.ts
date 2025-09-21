import axios, { AxiosError } from "axios";
import api from "./axios";


async function getAll(filters: string | null) {
  try {
    const response = await api({
      method: 'get',
      url: `${process.env.REACT_APP_API}/funcionarios`,
/*       params: {
        ...filters,
      } */
    });
    
    return { status: response.status, data: response.data }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        return { status: axiosError.response.status, data: axiosError.message }
      }
      console.error(axiosError.message);
      return { status: axiosError.status ? axiosError.status : 500, data: axiosError.message }
    } else {
      return { status: 400, data: error }
    }
  }
}

async function getFuncionario(id: string) {
  try {
    const response = await api({
      method: 'get',
      url: `${process.env.REACT_APP_API}/funcionarios/${id}`,
    });
    
    return { status: response.status, data: response.data }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        return { status: axiosError.response.status, data: axiosError.message }
      }
      console.error(axiosError.message);
      return { status: axiosError.status ? axiosError.status : 500, data: axiosError.message }
    } else {
      return { status: 400, data: error }
    }
  }
}

async function postFuncionario(postBody: Funcionario) {
  console.log(postBody)
  try {
    const response = await api({
      method: 'post',
      url: `${process.env.REACT_APP_API}/funcionarios`,
      data: postBody
    });

    return { status: response.status, data: response.data }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        return { status: axiosError.response.status, data: axiosError.message }
      }
      console.error(axiosError.message);
      return { status: axiosError.status ? axiosError.status : 500, data: axiosError.message }
    } else {
      return { status: 400, data: error }
    }
  }
}

async function postFotoFuncionario(formData: FormData, id: string) {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API}/funcionarios/foto/${id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    // Atualizar avatar com a URL salva no servidor
    if (response.data.path) {
      //setAvatarSrc(`http://localhost:3001/${response.data.path}`);
      return { status: response.status, data: response.data }
    }

  } catch (error: any) {
    console.error('Erro ao enviar avatar:', error);
  }
}

async function putFuncionario(postBody: Funcionario, id: string) {
  console.log(postBody)
  try {
    const response = await api({
      method: 'put',
      url: `${process.env.REACT_APP_API}/funcionarios/${id}`,
      data: postBody
    });

    return { status: response.status, data: response.data }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        return { status: axiosError.response.status, data: axiosError.message }
      }
      console.error(axiosError.message);
      return { status: axiosError.status ? axiosError.status : 500, data: axiosError.message }
    } else {
      return { status: 400, data: error }
    }
  }
} 

/*async function deleteProtocolo(token: string | null, proCodigo: string, ptlCodigo: string) {
  try {
    const response = await api({
      method: 'delete',
      url: `${process.env.REACT_APP_SERVICE_API}/rest/json/protocolo/${ptlCodigo}?proCodigo=${proCodigo}`,
    });

    return { status: response.status, data: response.data }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        return { status: axiosError.response.status, data: axiosError.message }
      }
      console.error(axiosError.message);
      return { status: axiosError.status ? axiosError.status : 500, data: axiosError.message }
    } else {
      return { status: 400, data: error }
    }
  }
}

async function updateProtocoloStatus(postBody: { status: boolean }, token: string | null, proCodigo: string, ptlCodigo: number | string) {
  try {
    const response = await api({
      method: 'put',
      url: `${process.env.REACT_APP_SERVICE_API}/rest/json/protocolo/status/${ptlCodigo}?proCodigo=${proCodigo}`,
      data: postBody
    });

    return { status: response.status, data: response.data }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        return { status: axiosError.response.status, data: axiosError.message }
      }
      console.error(axiosError.message);
      return { status: axiosError.status ? axiosError.status : 500, data: axiosError.message }
    } else {
      return { status: 400, data: error }
    }
  }
} */

export { getAll, getFuncionario, postFuncionario, postFotoFuncionario, putFuncionario };
