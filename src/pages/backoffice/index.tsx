import jwtDecode from 'jwt-decode';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

import { BackofficeContainer } from './components/BackofficeContainer';
import { JwtTokenResponse } from '~/context/useAuth';
import { User } from '~/context/useUser';
import { setupAuthorizedApi } from '~/services/api';
import { withSSRAuth } from '~/utils/withSSRAuth';

interface BackofficePageProps {
  user: User;
}

const BackofficePage: NextPage<BackofficePageProps> = ({ user }) => {
  const router = useRouter();

  useEffect(() => {
    if (router.query?.cameFromOnboarding) {
      toast.success(
        'Você finalizou seu cadastro, sua instituição já está aparecendo para os possíveis doadores!'
      );
    }
  });

  return (
    <>
      <BackofficeContainer user={user} />
    </>
  );
};

export const getServerSideProps = withSSRAuth(async (context) => {
  const { 'doerapido.token': token } = parseCookies(context);
  const { id }: JwtTokenResponse = jwtDecode(token);

  const api = setupAuthorizedApi(context);

  const { data: user } = await api.get<User>(`/user/${id}`);

  return {
    props: {
      user,
    },
  };
});

export default BackofficePage;
