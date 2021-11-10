import { NextPage } from 'next';

import { LoginForm } from './components/LoginForm';
import { LoginContainer } from './styles';
import { PageContainer } from '~/components/PageContainer';
import { withSSRGuest } from '~/utils/withSSRGuest';

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

export const getServerSideProps = withSSRGuest(async (context) => {
  return {
    props: {},
  };
});
