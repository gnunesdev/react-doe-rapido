import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { ChangeEmailValidator, ChangeInputCodeValidator } from '../../constants/utils';
import { dropIn } from './animation';
import { Form, ModalContainer, Overlay } from './styles';
import { Button } from '~/components/Button';
import { Input } from '~/components/Input';
import Modal from '~/components/Modal';
import { Text } from '~/components/Text';
import { Title } from '~/components/Title';
import { useMinWidth } from '~/hooks/useMinWidth';
import { api } from '~/services/api';
import { Breakpoint } from '~/styles/variables';
import { isAxiosError } from '~/utils/http';

interface CodeStepProps {
  handleSetCodeValidated: VoidFunction;
  email: string;
}

interface ChangeValueStepProps {
  handleNewEmailChosen: (newEmail: string) => void;
}

interface ModalChangeEmailProps {
  handleCloseModal: VoidFunction;
}

export function ModalChangeEmail({ handleCloseModal }: ModalChangeEmailProps) {
  const [newEmailChosen, setNewEmailChosen] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const minWidth = useMinWidth();

  async function handleNewEmailChosen(newEmail: string) {
    try {
      setNewEmailChosen(true);
      setNewEmail(newEmail);
    } catch (e) {
      toast.error(
        'Ocorreu algum erro no servidor, verifiique as informações ou tente novamente mais tarde.'
      );
    }
  }

  function handleSetCodeValidated() {
    toast.success('E-mail trocado com sucesso!');
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
            description="Editar e-mail"
            size={minWidth(Breakpoint.small) ? 'big' : 'medium'}
          />
          {!newEmailChosen ? (
            <ChangeValueStep handleNewEmailChosen={handleNewEmailChosen} />
          ) : (
            <CodeStep handleSetCodeValidated={handleSetCodeValidated} email={newEmail} />
          )}
        </ModalContainer>
      </Overlay>
    </Modal>
  );
}

function ChangeValueStep({ handleNewEmailChosen }: ChangeValueStepProps) {
  const [isLoading, setIsLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      newEmail: '',
      confirmNewEmail: '',
    },
    validationSchema: ChangeEmailValidator,
    onSubmit: async () => {
      try {
        setIsLoading(true);
        await api.post('/email-change-login');
        handleNewEmailChosen(formik.values.newEmail);
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
        name="newEmail"
        label="E-mail novo:"
        inputSize="big"
        onChange={formik.handleChange}
        error={
          formik.touched.newEmail && formik.errors.newEmail ? formik.errors.newEmail : ''
        }
      />
      <Input
        name="confirmNewEmail"
        label="Confirmar e-mail novo:"
        inputSize="big"
        onChange={formik.handleChange}
        error={
          formik.touched.confirmNewEmail && formik.errors.confirmNewEmail
            ? formik.errors.confirmNewEmail
            : ''
        }
      />

      <Button variant="primary" description="Confirmar edição" isLoading={isLoading} />
    </Form>
  );
}

function CodeStep({ handleSetCodeValidated, email }: CodeStepProps) {
  const minWidth = useMinWidth();
  const [isLoading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      code: '',
    },
    validationSchema: ChangeInputCodeValidator,
    onSubmit: async () => {
      try {
        const data = {
          email,
          code: +formik.values.code,
        };
        await api.post('/change-login', data);
        handleSetCodeValidated();
      } catch (e) {
        if (isAxiosError(e) && e.response.status === 401) {
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
        fontSize={minWidth(Breakpoint.small) ? '1.8' : '1.4'}
        isBold={true}
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
