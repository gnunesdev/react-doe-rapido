import { NextPage } from 'next';

import { Title } from '~/components/Title';

import { LoginForm } from './components/LoginForm';
import { FormContainer, LoginContainer } from './styles';

const LoginPage: NextPage = () => {
  return (
    <LoginContainer>
      <FormContainer>
        <Title description="Insira suas informações" size="big" />
        <LoginForm />
      </FormContainer>
    </LoginContainer>
  );
};

export default LoginPage;
