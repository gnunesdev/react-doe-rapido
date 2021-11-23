import { useFormik } from 'formik';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { EditContactFormValidator } from '../../constants/utils';
import { ModalChangeEmail } from '../ModalChangeEmail';
import { ModalChangePassword } from '../ModalChangePassword';
import { Container, InputRow, Form, ButtonsContainer } from './styles';
import { Button } from '~/components/Button';
import { Input } from '~/components/Input';
import { Title } from '~/components/Title';
import { User } from '~/context/useUser';
import { useMinWidth } from '~/hooks/useMinWidth';
import { api } from '~/services/api';
import { Breakpoint } from '~/styles/variables';

interface EditContactFormProps {
  user: User;
}

export function EditContactForm({ user }: EditContactFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isChangeEmailModalOpen, toggleChangeEmailModalOpen] = useState(false);
  const [isChangePasswordModalOpen, toggleChangePasswordModalOpen] = useState(false);
  const minWidth = useMinWidth();

  function handleToggleEmailModalOpen() {
    toggleChangeEmailModalOpen((oldState) => !oldState);
  }

  function handleTogglePasswordModalOpen() {
    toggleChangePasswordModalOpen((oldState) => !oldState);
  }

  const formik = useFormik({
    initialValues: {
      name: user.name,
    },
    onSubmit: async () => {
      try {
        setIsLoading(true);
        await api.put(`/user/${user.id}`, {
          name: formik.values.name,
        });
        toast.success('Informações atualizadas com sucesso!');
      } catch (error) {
        console.error(error);
        toast.error(
          'Ocorreu algum erro no servidor, verifique as informações ou tente novamente mais tarde.'
        );
      } finally {
        setIsLoading(false);
      }
    },
    validationSchema: EditContactFormValidator,
  });

  return (
    <Container>
      <Title
        description="Editar contato"
        size={minWidth(Breakpoint.small) ? 'big' : 'medium'}
      />
      <Form onSubmit={formik.handleSubmit}>
        <Input
          name="name"
          inputSize="big"
          onChange={formik.handleChange}
          value={formik.values.name}
          label="Nome"
          error={formik.touched.name && formik.errors.name ? formik.errors.name : ''}
        ></Input>
        <InputRow>
          <Input
            name="email"
            inputSize="big"
            label="E-mail"
            handleChangeModalInput={handleToggleEmailModalOpen}
          ></Input>
          <Input
            name="password"
            type="password"
            inputSize="big"
            label="Senha"
            handleChangeModalInput={handleTogglePasswordModalOpen}
          ></Input>
        </InputRow>

        <ButtonsContainer>
          <Button
            variant="primary"
            description="Salvar informações"
            type="submit"
            isLoading={isLoading}
          />
        </ButtonsContainer>
      </Form>

      <AnimatePresence>
        {isChangeEmailModalOpen && (
          <ModalChangeEmail handleCloseModal={handleToggleEmailModalOpen} />
        )}

        {isChangePasswordModalOpen && (
          <ModalChangePassword
            user={user}
            handleCloseModal={handleTogglePasswordModalOpen}
          />
        )}
      </AnimatePresence>
    </Container>
  );
}
