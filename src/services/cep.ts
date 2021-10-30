import { api } from './api';

export interface ViacepAddress {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  ddd: string;
  siafi: string;
}

export interface ViacepNotFound {
  erro: true;
}

export type ViacepResponse = ViacepAddress | ViacepNotFound;

export async function getAddressByCep(cep: string) {
  return api.get<ViacepResponse>(`https://viacep.com.br/ws/${cep}/json/`);
}

export const isAddress = (response: ViacepResponse): response is ViacepAddress =>
  !(response as ViacepNotFound).erro;
