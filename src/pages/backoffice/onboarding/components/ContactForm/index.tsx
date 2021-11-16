import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { useOnboardingSteps } from '../../hooks/useOnboardingSteps';
import { ContactFormValidationSchema } from '../../utils';
import { ContactFormStyled, ContactFormContainer, ButtonsContainer } from './styles';
import { Button } from '~/components/Button';
import { ButtonLink } from '~/components/ButtonLink';
import { Input } from '~/components/Input';
import { Title } from '~/components/Title';
import { useUserContext } from '~/context/useUser';
import { useMinWidth } from '~/hooks/useMinWidth';
import { publicApi } from '~/services/api';
import { Breakpoint } from '~/styles/variables';
import { fadeIn } from '~/utils/animations';

export function ContactForm() {
  const { goToNextStep } = useOnboardingSteps();
  const { updateUser } = useUserContext();
  const minWidth = useMinWidth();

  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async () => {
      try {
        setIsLoading(true);

        const user = {
          name: formik.values.name,
          email: formik.values.email,
          password: formik.values.password,
        };

        const { data: userData } = await publicApi.post('/user', {
          ...user,
        });

        updateUser({ id: userData.id, name: userData.name, email: userData.email });

        goToNextStep();
      } catch (error) {
        console.error(error);
        toast.error(
          'Ocorreu algum erro no servidor, verifiique as informações ou tente novamente mais tarde.'
        );
      } finally {
        setIsLoading(false);
      }
    },
    validationSchema: ContactFormValidationSchema,
  });

  return (
    <ContactFormContainer
      as={motion.div}
      initial="hidden"
      animate="animate"
      variants={fadeIn}
    >
      <Title
        description="Cadastro de acesso:"
        size={minWidth(Breakpoint.small) ? 'big' : 'medium'}
      />
      <ContactFormStyled onSubmit={formik.handleSubmit}>
        <Input
          name="name"
          label="Nome:"
          inputSize="big"
          onChange={formik.handleChange}
          error={formik.touched.name && formik.errors.name ? formik.errors.name : ''}
        />
        <Input
          name="email"
          label="Email:"
          inputSize="big"
          onChange={formik.handleChange}
          error={formik.touched.email && formik.errors.email ? formik.errors.email : ''}
        />
        <Input
          name="password"
          label="Senha:"
          inputSize="big"
          onChange={formik.handleChange}
          type="password"
          error={
            formik.touched.password && formik.errors.password ? formik.errors.password : ''
          }
        />
        <Input
          name="confirmPassword"
          label="Confirme sua senha:"
          inputSize="big"
          type="password"
          onChange={formik.handleChange}
          error={
            formik.touched.confirmPassword && formik.errors.confirmPassword
              ? formik.errors.confirmPassword
              : ''
          }
        />
        <ButtonsContainer>
          <Button
            variant="primary"
            type="submit"
            description="Enviar"
            isLoading={isLoading}
          />
          <ButtonLink description="Voltar para o login" href="/login" variant="secondary" />
        </ButtonsContainer>
      </ContactFormStyled>
    </ContactFormContainer>
  );
}
