import axios from 'axios';
import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { toast } from 'react-toastify';

import { LoginFormValidationSchema } from '../../utils';
import { ButtonsContainer, LoginFormContainer, LoginFormStyled } from './styles';
import { Button } from '~/components/Button';
import { Input } from '~/components/Input';
import { Title } from '~/components/Title';
import { login } from '~/features/user';
import { useAppDispatch } from '~/hooks/redux';
import { useMinWidth } from '~/hooks/useMinWidth';
import { Breakpoint } from '~/styles/variables';
import { fadeIn } from '~/utils/animations';

export function LoginForm() {
  const routes = useRouter();

  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginFormValidationSchema,
    onSubmit: async (values) => {
      try {
        await axios.post('/login', {
          email: values.email,
          password: values.password,
        });

        dispatch(
          login({
            name: 'nome teste',
            email: values.email,
          })
        );

        routes.push('backoffice');
      } catch (error) {
        console.error(error);
        toast.error('Algum erro ocorreu, verifiique as informações e tente novamente');
      }
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
