import * as Yup from 'yup';

export const ContactFormValidationSchema = Yup.object({
  name: Yup.string().required('Esse campo é obrigatório'),
  email: Yup.string().email('Digite um e-mail válido').required('Esse campo é obrigatório'),
  password: Yup.string()
    .required('Esse campo é obrigatório')
    .min(6, 'A senha precisa ter no mínimo 6 dígitos'),
  confirmPassword: Yup.string()
    .required('Esse campo é obrigatório')
    .oneOf([Yup.ref('password')], 'As senhas não conferem'),
});

export const CodeFormValidationSchema = Yup.object({
  confirmationCode: Yup.string()
    .required('Esse campo é obrigatório')
    .min(5, 'O código precisa ter 5 dígitos')
    .max(5, 'O código precisa ter 5 dígitos'),
});

export const CompanyFirstFormValidator = Yup.object({
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
});

export const CompanySecondFormValidationSchema = Yup.object({
  phone: Yup.string().required('Esse campo é obrigatório'),
  email: Yup.string().email('Digite um e-mail válido').required('Esse campo é obrigatório'),
  needs: Yup.array().min(1, 'Marque pelo menos uma necessidade'),
});
