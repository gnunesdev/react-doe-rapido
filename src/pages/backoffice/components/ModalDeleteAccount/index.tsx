import { motion } from 'framer-motion';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { dropIn } from './animation';
import { ModalContainer, Overlay } from './styles';
import { Button } from '~/components/Button';
import Modal from '~/components/Modal';
import { Text } from '~/components/Text';
import { Title } from '~/components/Title';
import { signOut } from '~/context/useAuth';
import { useMinWidth } from '~/hooks/useMinWidth';
import { api } from '~/services/api';
import { Breakpoint } from '~/styles/variables';

interface ModalDeleteAccountProps {
  closeModal: VoidFunction;
  userId: number;
}

export function ModalDeleteAccount({ closeModal, userId }: ModalDeleteAccountProps) {
  const minWidth = useMinWidth();
  const [isLoading, setIsLoading] = useState(false);

  async function handleDeleteAccount() {
    try {
      setIsLoading(true);

      await api.post(`/deleteUser/${userId}`);

      signOut();
    } catch (error) {
      console.error(error);
      toast.error(
        'Ocorreu algum erro no servidor, verifique as informações ou tente novamente mais tarde.'
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal>
      <Overlay
        onClick={closeModal}
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <ModalContainer
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
          as={motion.div}
          variants={dropIn}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <Title
            description="Excluir conta"
            size={minWidth(Breakpoint.small) ? 'big' : 'medium'}
          />
          <Text
            description="Você tem certeza que quer excluir os dados da plataforma? Esta ação não poderá ser desfeita e você precisará efetuar um novo cadastro."
            fontSize={minWidth(Breakpoint.small) ? '1.8' : '1.6'}
          />
          <Button
            variant="primary"
            description="Excluir dados"
            onClick={handleDeleteAccount}
            isLoading={isLoading}
          />
        </ModalContainer>
      </Overlay>
    </Modal>
  );
}
