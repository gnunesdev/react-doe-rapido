import jwtDecode from 'jwt-decode';
import { NextPage } from 'next';
import { parseCookies } from 'nookies';

import { BackofficeContainer } from '../components/BackofficeContainer';
import { EditContactForm } from './components/EditContactForm';
import { JwtTokenResponse } from '~/context/useAuth';
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

  const { data: user } = await api.get<User>(`/user/${id}`);
  const { data: company } = await api.get<Company>(`/companyByUserId/${id}`);

  const userData = {
    ...user,
    image: company.image,
  };

  return {
    props: {
      user: userData,
    },
  };
});

export default EditContactPage;
