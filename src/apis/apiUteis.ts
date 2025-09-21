import axios from 'axios';

async function buscaCep(cep: string) {
  try {
    const response = await axios({
      method: 'get',
      url: `https://viacep.com.br/ws/${cep}/json/`,
    });
    return response.data
  } catch (error) {
    console.error(error);
  }
}

export { buscaCep };
