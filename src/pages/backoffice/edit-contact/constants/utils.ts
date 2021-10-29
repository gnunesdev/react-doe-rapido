import * as Yup from 'yup';

export const EditContactFormValidator = Yup.object({
  name: Yup.string().required('Esse campo é obrigatório'),
});

export const ChangeInputCodeValidator = Yup.object({
  code: Yup.string().required('Esse campo é obrigatório'),
});

export const ChangeEmailValidator = Yup.object({
  oldEmail: Yup.string().required('Esse campo é obrigatório'),
  newEmail: Yup.string().required('Esse campo é obrigatório'),
});

export const ChangePasswordValidator = Yup.object({
  oldPassword: Yup.string()
    .required('Esse campo é obrigatório')
    .min(6, 'A senha precisa ter no mínimo 6 dígitos'),
  newPassword: Yup.string()
    .required('Esse campo é obrigatório')
    .min(6, 'A senha precisa ter no mínimo 6 dígitos'),
  confirmNewPassword: Yup.string()
    .required('Esse campo é obrigatório')
    .oneOf([Yup.ref('password')], 'As senhas não conferem'),
});
