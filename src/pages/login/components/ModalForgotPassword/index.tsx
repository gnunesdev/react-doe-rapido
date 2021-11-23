import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { toast } from 'react-toastify';

import {
  ChangeInputCodeValidator,
  ForgotPasswordValidator,
  SelectEmailValidator,
} from '../../constants/utils';
import { dropIn } from './animation';
import { Form, ModalContainer, Overlay } from './styles';
import { Button } from '~/components/Button';
import { Input } from '~/components/Input';
import Modal from '~/components/Modal';
import { Text } from '~/components/Text';
import { Title } from '~/components/Title';
import { useMinWidth } from '~/hooks/useMinWidth';
import { publicApi } from '~/services/api';
import { Breakpoint } from '~/styles/variables';
import { isAxiosError } from '~/utils/http';

interface ModalForgotPasswordProps {
  handleCloseModal: VoidFunction;
}

interface ChangeValueStepProps {
  handleNewPasswordChosen: (password: string) => void;
  email: string;
}

interface SelectEmailStepProps {
  handleSelectEmail: (email: string) => void;
}

interface CodeStepProps {
  handleSetCodeValidated: VoidFunction;
  password: string;
  email: string;
}

type Step = 'email' | 'password' | 'code';

export function ModalForgotPassword({ handleCloseModal }: ModalForgotPasswordProps) {
  const [step, setStep] = useState<Step>('email');
  const [selectedEmail, setSelectedEmail] = useState('');
  const [selectedPassword, setSelectedPassword] = useState('');
  const minWidth = useMinWidth();

  function handleEmailSelected(email: string) {
    setSelectedEmail(email);
    setStep('password');
  }

  function handleNewPasswordSelected(password: string) {
    setSelectedPassword(password);
    setStep('code');
  }

  function handlePasswordRecovered() {
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
            description="Recuperar senha"
            size={minWidth(Breakpoint.small) ? 'big' : 'medium'}
          />
          {step === 'email' && <ChangeEmailStep handleSelectEmail={handleEmailSelected} />}
          {step === 'password' && (
            <ChangeValueStep
              handleNewPasswordChosen={handleNewPasswordSelected}
              email={selectedEmail}
            />
          )}
          {step === 'code' && (
            <CodeStep
              handleSetCodeValidated={handlePasswordRecovered}
              email={selectedEmail}
              password={selectedPassword}
            />
          )}
        </ModalContainer>
      </Overlay>
    </Modal>
  );
}

function ChangeEmailStep({ handleSelectEmail }: SelectEmailStepProps) {
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: () => handleSelectEmail(formik.values.email),
    validationSchema: SelectEmailValidator,
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Input
        name="email"
        label="E-mail:"
        inputSize="big"
        onChange={formik.handleChange}
        type="text"
        error={formik.touched.email && formik.errors.email ? formik.errors.email : ''}
      />
      <Button variant="primary" description="Confirmar" />
    </Form>
  );
}

function ChangeValueStep({ handleNewPasswordChosen, email }: ChangeValueStepProps) {
  const [isLoading, setIsLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      newPassword: '',
      confirmNewPassword: '',
    },
    validationSchema: ForgotPasswordValidator,
    onSubmit: async () => {
      try {
        setIsLoading(true);
        await publicApi.post('/email-change-password', { email: email });
        handleNewPasswordChosen(formik.values.newPassword);
      } catch (error) {
        toast.error(
          'Ocorreu algum erro, verifiique se as informações estão preenchidas corretamente e tente novamente.'
        );
      } finally {
        setIsLoading(false);
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

function CodeStep({ handleSetCodeValidated, email, password }: CodeStepProps) {
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
