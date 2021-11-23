import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { ChangeInputCodeValidator, ChangePasswordValidator } from '../../constants/utils';
import { dropIn } from './animation';
import { Form, ModalContainer, Overlay } from './styles';
import { Button } from '~/components/Button';
import { Input } from '~/components/Input';
import Modal from '~/components/Modal';
import { Text } from '~/components/Text';
import { Title } from '~/components/Title';
import { User } from '~/context/useUser';
import { useMinWidth } from '~/hooks/useMinWidth';
import { publicApi } from '~/services/api';
import { Breakpoint } from '~/styles/variables';
import { isAxiosError } from '~/utils/http';

interface CodeStepProps {
  handleSetCodeValidated: VoidFunction;
  password: string;
  email: string;
}

interface ModalChangePasswordProps {
  handleCloseModal: VoidFunction;
  user: User;
}

interface ChangeValueStepProps {
  handleNewPasswordChosen: (newPassword: string) => void;
  user: User;
}

export function ModalChangePassword({ handleCloseModal, user }: ModalChangePasswordProps) {
  const [newPasswordChosen, setNewPasswordChosen] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const minWidth = useMinWidth();

  async function handleNewPasswordChosen(newPassword: string) {
    setNewPasswordChosen(true);
    setNewPassword(newPassword);
  }

  function handlePasswordChanged() {
    toast.success('Senha trocada com sucesso!');
    handleCloseModal();
  }

  return (
    <Modal>
      <Overlay
        onClick={handleCloseModal}
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <ModalContainer
          as={motion.div}
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
          variants={dropIn}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <Title
            description="Editar senha"
            size={minWidth(Breakpoint.small) ? 'big' : 'medium'}
          />
          {!newPasswordChosen ? (
            <ChangeValueStep handleNewPasswordChosen={handleNewPasswordChosen} user={user} />
          ) : (
            <CodeStep
              handleSetCodeValidated={handlePasswordChanged}
              password={newPassword}
              email={user.email}
            />
          )}
        </ModalContainer>
      </Overlay>
    </Modal>
  );
}

function ChangeValueStep({ handleNewPasswordChosen, user }: ChangeValueStepProps) {
  const [isLoading, setIsLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      newPassword: '',
      confirmNewPassword: '',
    },
    validationSchema: ChangePasswordValidator,
    onSubmit: async () => {
      try {
        setIsLoading(true);
        await publicApi.post('/email-change-password', { email: user.email });
        handleNewPasswordChosen(formik.values.newPassword);
      } catch (error) {
        toast.error(
          'Ocorreu algum erro no servidor, verifiique as informações ou tente novamente mais tarde.'
        );
      } finally {
        setIsLoading(true);
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Input
        name="newPassword"
        label="Nova senha:"
        inputSize="big"
        onChange={formik.handleChange}
        type="password"
        error={
          formik.touched.newPassword && formik.errors.newPassword
            ? formik.errors.newPassword
            : ''
        }
      />
      <Input
        name="confirmNewPassword"
        label="Confirma a nova senha:"
        inputSize="big"
        onChange={formik.handleChange}
        type="password"
        error={
          formik.touched.confirmNewPassword && formik.errors.confirmNewPassword
            ? formik.errors.confirmNewPassword
            : ''
        }
      />
      <Button variant="primary" description="Confirmar edição" isLoading={isLoading} />
    </Form>
  );
}

function CodeStep({ handleSetCodeValidated, password, email }: CodeStepProps) {
  const minWidth = useMinWidth();
  const [isLoading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      code: '',
    },
    validationSchema: ChangeInputCodeValidator,
    onSubmit: async () => {
      try {
        setLoading(true);
        const data = {
          password,
          email,
          code: +formik.values.code,
        };
        await publicApi.post('/change-password', data);
        handleSetCodeValidated();
      } catch (e) {
        if (isAxiosError(e) && e.response.status === 400) {
          toast.error('Código inválido ou expirado');
        } else {
          toast.error(
            'Ocorreu algum erro no servidor, verifiique as informações ou tente novamente mais tarde.'
          );
        }
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <>
      <Text
        description="Enviamos um e-mail pra você com um código de liberação para que você altere a senha, por favor, insira-o abaixo:"
        fontSize={minWidth(Breakpoint.small) ? '1.8' : '1.6'}
        isBold={false}
      />
      <Form onSubmit={formik.handleSubmit}>
        <Input
          name="code"
          label="Código"
          inputSize="big"
          onChange={formik.handleChange}
          error={formik.errors.code}
        />
        <Button
          variant="primary"
          description="Avançar"
          type="submit"
          isLoading={isLoading}
        />
      </Form>
    </>
  );
}
