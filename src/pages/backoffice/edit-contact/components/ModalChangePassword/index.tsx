import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import { useState } from 'react';

import { ChangeInputCodeValidator, ChangePasswordValidator } from '../../constants/utils';
import { dropIn } from './animation';
import { Form, ModalContainer, Overlay } from './styles';
import { Button } from '~/components/Button';
import { Input } from '~/components/Input';
import Modal from '~/components/Modal';
import { Text } from '~/components/Text';
import { Title } from '~/components/Title';

interface CodeStepProps {
  handleSetCodeValidated: VoidFunction;
}

interface ModalChangePasswordProps {
  handleCloseModal: VoidFunction;
}

export function ModalChangePassword({ handleCloseModal }: ModalChangePasswordProps) {
  const [codeValidated, setCodeValidated] = useState(false);

  function handleSetCodeValidated() {
    setCodeValidated(true);
  }

  return (
    <Modal>
      <Overlay onClick={handleCloseModal}>
        <ModalContainer
          as={motion.div}
          onClick={(e) => e.stopPropagation()}
          variants={dropIn}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <Title description="Editar senha" size="big" />
          {!codeValidated ? (
            <CodeStep handleSetCodeValidated={handleSetCodeValidated} />
          ) : (
            <ChangeValueStep />
          )}
        </ModalContainer>
      </Overlay>
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

function ChangeValueStep() {
  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    onSubmit: () => {
      // console.log('123');
    },
    validationSchema: ChangePasswordValidator,
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Input
        name="code"
        label="Senha atual:"
        inputSize="big"
        onChange={formik.handleChange}
        type="password"
      />
      <Input
        name="code"
        label="Nova senha:"
        inputSize="big"
        onChange={formik.handleChange}
        type="password"
      />
      <Input
        name="code"
        label="Confirma a nova senha:"
        inputSize="big"
        onChange={formik.handleChange}
        type="password"
      />
      <Button variant="primary" description="Confirmar edição" />
    </Form>
  );
}
