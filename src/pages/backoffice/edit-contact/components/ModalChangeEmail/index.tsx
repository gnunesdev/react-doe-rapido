import { useFormik } from 'formik';
import { useState } from 'react';

import { ChangeEmailValidator, ChangeInputCodeValidator } from '../../constants/utils';
import { Form, ModalContainer } from './styles';
import { Button } from '~/components/Button';
import { Input } from '~/components/Input';
import Modal from '~/components/Modal';
import { Text } from '~/components/Text';
import { Title } from '~/components/Title';
import { Overlay } from '~/pages/search/map/components/CompanyDrawer/styles';

interface CodeStepProps {
  handleSetCodeValidated: VoidFunction;
}

interface ChangeValueStepProps {
  handleCloseModal: VoidFunction;
}

interface ModalChangeEmailProps {
  handleCloseModal: VoidFunction;
}

export function ModalChangeEmail({ handleCloseModal }: ModalChangeEmailProps) {
  const [codeValidated, setCodeValidated] = useState(false);

  function handleSetCodeValidated() {
    setCodeValidated(true);
  }

  return (
    <Modal>
      <ModalContainer>
        <Title description="Editar e-mail" size="big" />
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
        fontSize="1.8"
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
      oldEmail: '',
      newEmail: '',
    },
    validationSchema: ChangeEmailValidator,
    onSubmit: () => {
      // console.log('123');
      handleCloseModal();
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Input
        name="oldEmail"
        label="E-mail antigo:"
        inputSize="big"
        onChange={formik.handleChange}
        error={
          formik.touched.oldEmail && formik.errors.oldEmail ? formik.errors.oldEmail : ''
        }
      />
      <Input
        name="newEmail"
        label="E-mail novo:"
        inputSize="big"
        onChange={formik.handleChange}
        error={
          formik.touched.newEmail && formik.errors.newEmail ? formik.errors.newEmail : ''
        }
      />
      <Button variant="primary" description="Confirmar edição" />
    </Form>
  );
}
