import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import { useState } from 'react';

import { ChangeEmailValidator, ChangeInputCodeValidator } from '../../constants/utils';
import { dropIn } from './animation';
import { Form, ModalContainer, Overlay } from './styles';
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

interface ChangeValueStepProps {
  handleCloseModal: VoidFunction;
}

interface ModalChangeEmailProps {
  handleCloseModal: VoidFunction;
}

export function ModalChangeEmail({ handleCloseModal }: ModalChangeEmailProps) {
  const [codeValidated, setCodeValidated] = useState(false);
  const minWidth = useMinWidth();

  function handleSetCodeValidated() {
    setCodeValidated(true);
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
          onClick={(e) => e.stopPropagation()}
          variants={dropIn}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <Title description="Editar e-mail" size={minWidth(Breakpoint.medium) ? 'big' : 'medium'} />
          {!codeValidated ? (
            <CodeStep handleSetCodeValidated={handleSetCodeValidated} />
          ) : (
            <ChangeValueStep handleCloseModal={handleCloseModal} />
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
  const minWidth = useMinWidth();

  return (
    <>
      <Text
        description="Enviamos um e-mail pra você com um código de liberação para que você altere a senha, por favor, insira-o abaixo:"
        fontSize={minWidth(Breakpoint.medium) ? '1.8' : '1.4'}
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
