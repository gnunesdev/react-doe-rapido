import { useFormik } from 'formik';
import { useState } from 'react';

import { ChangeInputCodeValidator, ChangePasswordValidator } from '../../constants/utils';
import { Form, ModalContainer } from './styles';
import { Button } from '~/components/Button';
import { Input } from '~/components/Input';
import Modal from '~/components/Modal';
import { Text } from '~/components/Text';
import { Title } from '~/components/Title';
import { useMinWidth } from '~/hooks/useMinWidth';
import { Overlay } from '~/pages/search/map/components/CompanyDrawer/styles';
import { Breakpoint } from '~/styles/variables';

interface CodeStepProps {
  handleSetCodeValidated: VoidFunction;
}

interface ModalChangePasswordProps {
  handleCloseModal: VoidFunction;
}

interface ChangeValueStepProps {
  handleCloseModal: VoidFunction;
}

export function ModalChangePassword({ handleCloseModal }: ModalChangePasswordProps) {
  const [codeValidated, setCodeValidated] = useState(false);
  const minWidth = useMinWidth();

  function handleSetCodeValidated() {
    setCodeValidated(true);
  }

  return (
    <Modal>
      <ModalContainer>
        <Title
          description="Editar senha"
          size={minWidth(Breakpoint.small) ? 'big' : 'medium'}
        />
        {!codeValidated ? (
          <CodeStep handleSetCodeValidated={handleSetCodeValidated} />
        ) : (
          <ChangeValueStep handleCloseModal={handleCloseModal} />
        )}
      </ModalContainer>
      <Overlay onClick={handleCloseModal} />
    </Modal>
  );
}

function CodeStep({ handleSetCodeValidated }: CodeStepProps) {
  const minWidth = useMinWidth();
  const formik = useFormik({
    initialValues: {
      code: '',
    },
    onSubmit: () => handleSetCodeValidated(),
    validationSchema: ChangeInputCodeValidator,
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
        <Button variant="primary" description="Avançar" type="submit" />
      </Form>
    </>
  );
}

function ChangeValueStep({ handleCloseModal }: ChangeValueStepProps) {
  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    onSubmit: () => {
      handleCloseModal();
    },
    validationSchema: ChangePasswordValidator,
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Input
        name="oldPassword"
        label="Senha atual:"
        inputSize="big"
        onChange={formik.handleChange}
        type="password"
        error={
          formik.touched.oldPassword && formik.errors.oldPassword
            ? formik.errors.oldPassword
            : ''
        }
      />
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
      <Button variant="primary" description="Confirmar edição" />
    </Form>
  );
}
