import { NextPage } from 'next';

import { LoginForm } from './components/LoginForm';
import { LoginContainer } from './styles';
import { PageContainer } from '~/components/PageContainer';

const LoginPage: NextPage = () => {
  return (
    <PageContainer>
      <LoginContainer>
        <LoginForm />
      </LoginContainer>
    </PageContainer>
  );
};

export default LoginPage;
