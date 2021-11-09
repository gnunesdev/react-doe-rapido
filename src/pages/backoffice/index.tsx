import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

import { BackofficeContainer } from './components/BackofficeContainer';

const BackofficePage: NextPage = () => {
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
      <BackofficeContainer></BackofficeContainer>
    </>
  );
};

export default BackofficePage;
