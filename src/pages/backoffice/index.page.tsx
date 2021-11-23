import { AnimatePresence } from 'framer-motion';
import jwtDecode from 'jwt-decode';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import { useEffect, useState } from 'react';
import { FaUser, FaBuilding, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { BackofficeContainer } from './components/BackofficeContainer';
import { Card } from './components/Card';
import { ModalDeleteAccount } from './components/ModalDeleteAccount';
import { CardsContainer } from './styles';
import { destroyCookies, JwtTokenResponse } from '~/context/useAuth';
import { Company } from '~/context/useCompany';
import { User, UserWithImage } from '~/context/useUser';
import { setupAuthorizedApi } from '~/services/api';
import { withSSRAuth } from '~/utils/withSSRAuth';

interface BackofficePageProps {
  user: UserWithImage;
}

const BackofficePage: NextPage<BackofficePageProps> = ({ user }) => {
  const router = useRouter();

  const [isDeleteAccountModalOpen, toggleDeleteAccountModalOpen] = useState(false);

  useEffect(() => {
    if (router.query?.cameFromOnboarding) {
      toast.success(
        'Você finalizou seu cadastro, sua instituição já está aparecendo para os possíveis doadores!'
      );
    }
  });

  function handleToggleModal() {
    toggleDeleteAccountModalOpen((prevState) => !prevState);
  }

  return (
    <>
      <BackofficeContainer user={user}>
        <CardsContainer>
          <Card
            variant="company"
            Icon={FaBuilding}
            title="Editar instituição"
            description="Edite as informações da sua instituição para mantê-las 100% atualizadas, assim doadores podem te encontrar mais facilmente."
          />
          <Card
            variant="contact"
            Icon={FaUser}
            title="Editar contato"
            description="Edite as informações do seu usuário de acesso, altere senha e e-mail se necessário."
          />
          <Card
            variant="delete"
            Icon={FaTrash}
            title="Excluir conta"
            description="Se você deseja encerrar sua conta na plataforma, nós iremos excluir seus dados e você irá perder seu acesso."
            onClick={handleToggleModal}
          />
        </CardsContainer>
        <AnimatePresence>
          {isDeleteAccountModalOpen && (
            <ModalDeleteAccount closeModal={handleToggleModal} userId={user.id} />
          )}
        </AnimatePresence>
      </BackofficeContainer>
    </>
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

export default BackofficePage;
