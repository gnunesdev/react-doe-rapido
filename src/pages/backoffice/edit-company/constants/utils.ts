import * as Yup from 'yup';

export const EditCompanyFormValidator = Yup.object({
  tradingName: Yup.string().required('Esse campo é obrigatório'),
  name: Yup.string().required('Esse campo é obrigatório'),
  cnpj: Yup.string()
    .required('Esse campo é obrigatório')
    .matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, 'Insira um CNPJ válido'),
  cep: Yup.string()
    .required('Esse campo é obrigatório')
    .matches(/^\d{5}-\d{3}$/, 'Insira um CEP válido'),
  street: Yup.string().required('Esse campo é obrigatório'),
  number: Yup.string().required('Esse campo é obrigatório'),
  district: Yup.string().required('Esse campo é obrigatório'),
  city: Yup.string().required('Esse campo é obrigatório'),
  state: Yup.string().required('Esse campo é obrigatório'),
  phone: Yup.string().required('Esse campo é obrigatório'),
  email: Yup.string().email('Digite um e-mail válido').required('Esse campo é obrigatório'),
  needs: Yup.array().min(1, 'Marque pelo menos uma necessidade'),
});
