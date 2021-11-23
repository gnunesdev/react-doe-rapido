import * as Yup from 'yup';

export const SelectEmailValidator = Yup.object({
  email: Yup.string().required('Esse campo é obrigatório'),
});

export const ForgotPasswordValidator = Yup.object({
  newPassword: Yup.string()
    .required('Esse campo é obrigatório')
    .min(6, 'A senha precisa ter no mínimo 6 dígitos'),
  confirmNewPassword: Yup.string()
    .required('Esse campo é obrigatório')
    .oneOf([Yup.ref('newPassword')], 'As senhas não conferem'),
});

export const ChangeInputCodeValidator = Yup.object({
  code: Yup.string().required('Esse campo é obrigatório'),
});
