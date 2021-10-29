import * as Yup from 'yup';

export const LoginFormValidationSchema = Yup.object({
  email: Yup.string().email('Digite um e-mail válido').required('Esse campo é obrigatório'),
  password: Yup.string().required('Esse campo é obrigatório'),
});
