import { useRouter } from 'next/router';
import { FaArrowLeft } from 'react-icons/fa';

import { BackButtonContainer } from './styles';

export function BackButton() {
  const router = useRouter();

  function handleBack() {
    router.push('/search');
  }

  return (
    <BackButtonContainer onClick={handleBack}>
      <FaArrowLeft size={36} color="#fff" />
    </BackButtonContainer>
  );
}
