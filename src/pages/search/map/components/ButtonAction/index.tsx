import { FaAt, FaPhone, FaShare, FaWhatsapp } from 'react-icons/fa';

import { CompanyMapType } from '~/types/Company';

interface ButtonActionProps {
  type: 'whats' | 'email' | 'phone' | 'share';
  company: CompanyMapType;
}

export function ButtonAction({ type }: ButtonActionProps) {
  return (
    <button>
      {type === 'whats' && <FaWhatsapp />}
      {type === 'email' && <FaAt />}
      {type === 'phone' && <FaPhone />}
      {type === 'phone' && <FaShare />}
    </button>
  );
}
