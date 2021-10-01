import { useState } from 'react';

import { useFormik } from 'formik';
import { NextPage } from 'next';

import { Button } from '~/components/Button';
import { Input } from '~/components/Input';
import { Title } from '~/components/Title';

import { FormContainer, FormStyled, LoginContainer } from './styles';

const LoginPage: NextPage = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      console.log('values', values);
    },
  });

  return (
    <LoginContainer>
      <FormContainer>
        <Title description="Insira suas informações" size="big" />
        <FormStyled onSubmit={formik.handleSubmit}>
          <Input
            label="Email:"
            name="email"
            size="big"
            onChange={formik.handleChange}
          />
          <Input
            label="Senha:"
            name="password"
            size="big"
            onChange={formik.handleChange}
          />
          <Button description="Login" type="submit" />
        </FormStyled>
      </FormContainer>
    </LoginContainer>
  );
};

export default LoginPage;
