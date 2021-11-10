import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';

import { LoginFormValidationSchema } from '../../utils';
import { ButtonsContainer, LoginFormContainer, LoginFormStyled } from './styles';
import { Button } from '~/components/Button';
import { Input } from '~/components/Input';
import { Title } from '~/components/Title';
import { useAuthContext } from '~/context/useAuth';
import { useMinWidth } from '~/hooks/useMinWidth';
import { Breakpoint } from '~/styles/variables';
import { fadeIn } from '~/utils/animations';

export function LoginForm() {
  const { signIn } = useAuthContext();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginFormValidationSchema,
    onSubmit: async (values) => {
      const user = { email: values.email, password: values.password };
      await signIn(user);
    },
  });

  const minWidth = useMinWidth();

  return (
    <LoginFormContainer as={motion.div} initial="hidden" animate="animate" variants={fadeIn}>
      <Title
        description="Insira suas informações"
        size={minWidth(Breakpoint.medium) ? 'big' : 'medium'}
      />

      <LoginFormStyled onSubmit={formik.handleSubmit}>
        <Input
          label="Email:"
          name="email"
          inputSize="big"
          error={formik.touched.email && formik.errors.email ? formik.errors.email : ''}
          onChange={formik.handleChange}
        />
        <Input
          label="Senha:"
          name="password"
          type="password"
          inputSize="big"
          onChange={formik.handleChange}
          error={
            formik.touched.password && formik.errors.password ? formik.errors.password : ''
          }
        />
        <ButtonsContainer>
          <Button variant="primary" description="Login" type="submit" width="auto" />
          <Button variant="secondary" type="button" width="auto">
            <Link href="/backoffice/onboarding/contact">Cadastre-se</Link>
          </Button>
        </ButtonsContainer>
      </LoginFormStyled>
    </LoginFormContainer>
  );
}
