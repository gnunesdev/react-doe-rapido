import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import Link from 'next/link';

import { useOnboardingSteps } from '../../hooks/useOnboardingSteps';
import { LoginFormValidationSchema } from '../../utils';
import { ContactFormStyled, ContactFormContainer, ButtonsContainer } from './styles';
import { Button } from '~/components/Button';
import { Input } from '~/components/Input';
import { Title } from '~/components/Title';
import { fadeIn } from '~/utils/animations';

export function ContactForm() {
  const { goToNextStep } = useOnboardingSteps();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: () => {
      goToNextStep();
    },
    validationSchema: LoginFormValidationSchema,
  });

  return (
    <ContactFormContainer
      as={motion.div}
      initial="hidden"
      animate="animate"
      variants={fadeIn}
    >
      <Title description="Cadastro de acesso:" size="big" />
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
          <Button variant="primary" type="submit" description="Enviar" />
          <Link href="/teste">
            <Button variant="secondary" description="Voltar para o login" />
          </Link>
        </ButtonsContainer>
      </ContactFormStyled>
    </ContactFormContainer>
  );
}
