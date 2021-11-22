import * as Yup from 'yup';

export const ForgotPasswordValidator = Yup.object({
  email: Yup.string().required('Esse campo é obrigatório'),
  password: Yup.string()
    .required('Esse campo é obrigatório')
    .min(6, 'A senha precisa ter no mínimo 6 dígitos'),
  confirmPassword: Yup.string()
    .required('Esse campo é obrigatório')
    .oneOf([Yup.ref('newPassword')], 'As senhas não conferem'),
});

export const ChangeInputCodeValidator = Yup.object({
  code: Yup.string().required('Esse campo é obrigatório'),
});
