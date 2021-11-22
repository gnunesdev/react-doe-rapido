import jwtDecode from 'jwt-decode';
import { NextPage } from 'next';
import { parseCookies } from 'nookies';

import { BackofficeContainer } from '../components/BackofficeContainer';
import { EditContactForm } from './components/EditContactForm';
import { destroyCookies, JwtTokenResponse } from '~/context/useAuth';
import { Company } from '~/context/useCompany';
import { User, UserWithImage } from '~/context/useUser';
import { setupAuthorizedApi } from '~/services/api';
import { withSSRAuth } from '~/utils/withSSRAuth';

interface EditContactPageProps {
  user: UserWithImage;
}

const EditContactPage: NextPage<EditContactPageProps> = ({ user }) => {
  return (
    <BackofficeContainer user={user}>
      <EditContactForm user={user} />
    </BackofficeContainer>
  );
};

export const getServerSideProps = withSSRAuth(async (context) => {
  const { 'doerapido.token': token } = parseCookies(context);
  const { id }: JwtTokenResponse = jwtDecode(token);

  const api = setupAuthorizedApi(context);

  try {
    const { data: user } = await api.get<User>(`/user/${id}`);
    const { data: company } = await api.get<Company>(`/companyByUserId/${id}`);

    const userData = {
      ...user,
      companyId: company.id,
      image: company.image,
    };

    return {
      props: {
        user: userData,
      },
    };
  } catch (error) {
    console.error(error);
    destroyCookies(context);

    return {
      redirect: {
        destination: `/login`,
        permanent: false,
      },
    };
  }
});

export default EditContactPage;
