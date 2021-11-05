import { FaPhone, FaWhatsapp, FaEnvelope, FaShareAlt } from 'react-icons/fa';

import { ActionButtonContainer } from './styles';

interface ActionButtonProps {
  type: 'whats' | 'phone' | 'email' | 'share';
  whatsPhone?: string;
  phone?: string;
  email?: string;
}

export function ActionButton({ type, whatsPhone, phone, email }: ActionButtonProps) {
  function handleClick() {
    switch (type) {
      case 'whats' && whatsPhone:
        window.open(`https://api.whatsapp.com/send?phone=${whatsPhone}`, '_blank')?.focus();
        break;
      case 'phone':
        console.log('todo');
        break;
    }
  }

  return (
    <>
      {type === 'whats' && (
        <ActionButtonContainer>
          <FaWhatsapp color="#fff" size={28} />
        </ActionButtonContainer>
      )}
      {type === 'phone' && (
        <ActionButtonContainer>
          <FaPhone color="#fff" size={24} />
        </ActionButtonContainer>
      )}
      {type === 'email' && (
        <ActionButtonContainer>
          <FaEnvelope color="#fff" size={24} />
        </ActionButtonContainer>
      )}
      {type === 'share' && (
        <ActionButtonContainer>
          <FaShareAlt color="#fff" size={24} />
        </ActionButtonContainer>
      )}
    </>
  );
}
