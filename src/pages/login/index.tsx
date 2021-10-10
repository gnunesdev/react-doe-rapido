import { NextPage } from 'next';

import { LoginForm } from './components/LoginForm';
import { LoginContainer } from './styles';

const LoginPage: NextPage = () => {
  return (
    <LoginContainer>
      <LoginForm />
    </LoginContainer>
  );
};

export default LoginPage;
