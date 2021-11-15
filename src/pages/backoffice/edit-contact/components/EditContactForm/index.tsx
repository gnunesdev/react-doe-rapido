import { useFormik } from 'formik';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';

import { EditContactFormValidator } from '../../constants/utils';
import { ModalChangeEmail } from '../ModalChangeEmail';
import { ModalChangePassword } from '../ModalChangePassword';
import { Container, InputRow, Form, ButtonsContainer } from './styles';
import { Button } from '~/components/Button';
import { Input } from '~/components/Input';
import { Title } from '~/components/Title';
import { User } from '~/context/useUser';
import { useMinWidth } from '~/hooks/useMinWidth';
import { Breakpoint } from '~/styles/variables';

interface EditContactFormProps {
  user: User;
}

export function EditContactForm({ user }: EditContactFormProps) {
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
    onSubmit: () => {
      // console.log('OPA!');
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
            onChange={formik.handleChange}
            label="E-mail"
            handleChangeModalInput={handleToggleEmailModalOpen}
          ></Input>
          <Input
            name="password"
            type="password"
            inputSize="big"
            onChange={formik.handleChange}
            label="Senha"
            handleChangeModalInput={handleTogglePasswordModalOpen}
          ></Input>
        </InputRow>
      </Form>

      <AnimatePresence>
        {isChangeEmailModalOpen && (
          <ModalChangeEmail handleCloseModal={handleToggleEmailModalOpen} />
        )}

        {isChangePasswordModalOpen && (
          <ModalChangePassword handleCloseModal={handleTogglePasswordModalOpen} />
        )}
      </AnimatePresence>
      <ButtonsContainer>
        <Button variant="primary" description="Salvar informações" type="submit" />
      </ButtonsContainer>
    </Container>
  );
}
