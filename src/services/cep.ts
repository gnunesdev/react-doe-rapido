import axios from 'axios';

export async function getAddressByCep(cep: string) {
  try {
    const result = axios.get(`https://viacep.com.br/ws/${cep}/json/`);

    return result;
  } catch (error: any) {
    console.error(error);
  }
}
