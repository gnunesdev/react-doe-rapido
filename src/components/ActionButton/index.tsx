import { FaPhone, FaWhatsapp, FaEnvelope, FaShareAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { ActionButtonContainer } from './styles';

interface ActionButtonProps {
  type: 'whats' | 'phone' | 'email' | 'share';
  whatsPhone?: string;
  phone?: string;
  email?: string;
}

export function ActionButton({ type, whatsPhone }: ActionButtonProps) {
  function handleClick() {
    switch (type) {
      case 'whats':
        window.open(`https://api.whatsapp.com/send?phone=${whatsPhone}`, '_blank');
        break;
      case 'phone':
        window.open(`tel:11951584888`, '_blank');
        break;
      case 'email':
        window.open(`mailto:carlos.henrique0307200@gmial.com?subject=Assunto`, '_blank');
        break;
      case 'share':
        navigator.clipboard.writeText(window.location.href);
        toast.info('Link copiado para área de transferência');
        break;
    }
  }

  return (
    <>
      {type === 'whats' && (
        <ActionButtonContainer onClick={handleClick}>
          <FaWhatsapp color="#fff" size={28} />
        </ActionButtonContainer>
      )}
      {type === 'phone' && (
        <ActionButtonContainer onClick={handleClick}>
          <FaPhone color="#fff" size={24} />
        </ActionButtonContainer>
      )}
      {type === 'email' && (
        <ActionButtonContainer onClick={handleClick}>
          <FaEnvelope color="#fff" size={24} />
        </ActionButtonContainer>
      )}
      {type === 'share' && (
        <ActionButtonContainer onClick={handleClick}>
          <FaShareAlt color="#fff" size={24} />
        </ActionButtonContainer>
      )}
    </>
  );
}
