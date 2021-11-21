import { useState } from 'react';
import { toast } from 'react-toastify';

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
        'Ocorreu algum erro no servidor, verifiique as informações ou tente novamente mais tarde.'
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal>
      <Overlay onClick={closeModal}>
        <ModalContainer onClick={(e: React.MouseEvent) => e.stopPropagation()}>
          <Title
            description="Editar e-mail"
            size={minWidth(Breakpoint.small) ? 'big' : 'medium'}
          />
          <Text
            description="Você tem certeza que quer excluir os dados da plataforma? Esta ação não poderá ser desfeita e você precisará efetuar um novo cadastro."
            fontSize={minWidth(Breakpoint.small) ? '1.8' : '1.4'}
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
