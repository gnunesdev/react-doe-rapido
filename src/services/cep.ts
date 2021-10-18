import { api } from './api';

export async function getAddressByCep(cep: string) {
  try {
    const result = api.get(`https://viacep.com.br/ws/${cep}/json/`);

    return result;
  } catch (error: any) {
    console.error(error);
  }
}
