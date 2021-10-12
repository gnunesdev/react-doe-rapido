import * as Yup from 'yup';

export const LoginFormValidationSchema = Yup.object({
  name: Yup.string().required('Esse campo é obrigatório'),
  email: Yup.string()
    .email('Digite um e-mail válido')
    .required('Esse campo é obrigatório'),
  password: Yup.string()
    .required('Esse campo é obrigatório')
    .min(6, 'A senha precisa ter no mínimo 6 dígitos'),
  confirmPassword: Yup.string()
    .required('Esse campo é obrigatório')
    .oneOf([Yup.ref('password')], 'As senhas não conferem'),
});

export const CompanySecondFormValidationSchema = Yup.object({
  phone: Yup.string().required('Esse campo é obrigatório'),
  email: Yup.string()
    .email('Digite um e-mail válido')
    .required('Esse campo é obrigatório'),
  needs: Yup.array().min(1, 'Marque pelo menos uma necessidade'),
});
