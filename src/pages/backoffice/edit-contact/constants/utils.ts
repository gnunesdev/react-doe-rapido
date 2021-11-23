import * as Yup from 'yup';

export const EditContactFormValidator = Yup.object({
  name: Yup.string().required('Esse campo é obrigatório'),
});

export const ChangeInputCodeValidator = Yup.object({
  code: Yup.string().required('Esse campo é obrigatório'),
});

export const ChangeEmailValidator = Yup.object({
  newEmail: Yup.string().required('Esse campo é obrigatório'),
  confirmNewEmail: Yup.string()
    .required('Esse campo é obrigatório')
    .oneOf([Yup.ref('newEmail')], 'Os emails não conferem'),
});

export const ChangePasswordValidator = Yup.object({
  newPassword: Yup.string()
    .required('Esse campo é obrigatório')
    .min(6, 'A senha precisa ter no mínimo 6 dígitos'),
  confirmNewPassword: Yup.string()
    .required('Esse campo é obrigatório')
    .oneOf([Yup.ref('newPassword')], 'As senhas não conferem'),
});
