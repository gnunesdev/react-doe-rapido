import { GetServerSideProps, NextPage } from 'next';

import { LoginForm } from './components/LoginForm';
import { LoginContainer } from './styles';
import { Header } from '~/components/Header';
import { PageContainer } from '~/components/PageContainer';

const LoginPage: NextPage = () => {
  return (
    <PageContainer>
      <Header />
      <LoginContainer>
        <LoginForm />
      </LoginContainer>
    </PageContainer>
  );
};

export default LoginPage;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
