import * as Yup from 'yup';

import { clearMask } from '~/utils';

export const EditCompanyFormValidator = Yup.object({
  tradingName: Yup.string().required('Esse campo é obrigatório'),
  name: Yup.string().required('Esse campo é obrigatório'),
  cnpj: Yup.string()
    .required('Esse campo é obrigatório')
    .test('validateCnpj', 'Insira um CNPJ válido', (value) => {
      const valueWithoutMask = clearMask(value);
      return valueWithoutMask.length === 14;
    }),
  cep: Yup.string()
    .required('Esse campo é obrigatório')
    .test('validateCep', 'Insira um CEP válido', (value) => {
      const valueWithoutMask = clearMask(value);
      return valueWithoutMask.length === 8;
    }),
  street: Yup.string().required('Esse campo é obrigatório'),
  number: Yup.string().required('Esse campo é obrigatório'),
  district: Yup.string().required('Esse campo é obrigatório'),
  city: Yup.string().required('Esse campo é obrigatório'),
  state: Yup.string().required('Esse campo é obrigatório'),
  phone: Yup.string()
    .required('Esse campo é obrigatório')
    .test('validatePhone', 'Insira um número válido', (value) => {
      const valueWithoutMask = clearMask(value);
      return valueWithoutMask.length === 11 || valueWithoutMask.length === 10;
    }),
  phoneWhatsapp: Yup.string().test('validatePhone', 'Insira um número válido', (value) => {
    const valueWithoutMask = clearMask(value);
    return valueWithoutMask.length === 11 || valueWithoutMask.length === 10;
  }),
  email: Yup.string().email('Digite um e-mail válido').required('Esse campo é obrigatório'),
  needs: Yup.array().min(1, 'Marque pelo menos uma necessidade'),
});
