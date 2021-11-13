import { useFormik } from 'formik';
import { apiResolver } from 'next/dist/server/api-utils';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useTheme } from 'styled-components';

import { useOnboardingSteps } from '../../hooks/useOnboardingSteps';
import { CodeFormValidationSchema } from '../../utils';
import {
  ButtonsContainer,
  CodeLinkContainer,
  ConfirmContactFormContainer,
  ConfirmContactFormStyled,
} from './styles';
import { Button } from '~/components/Button';
import { Input } from '~/components/Input';
import { Link as ButtonLink } from '~/components/Link';
import { Text } from '~/components/Text';
import { Title } from '~/components/Title';
import { useAuthContext } from '~/context/useAuth';
import { useUserContext } from '~/context/useUser';
import { useMinWidth } from '~/hooks/useMinWidth';
import { publicApi } from '~/services/api';
import { Breakpoint } from '~/styles/variables';

export function ConfirmContactForm() {
  const { colors } = useTheme();
  const { goToNextStep } = useOnboardingSteps();
  const { signInOnOnboarding } = useAuthContext();
  const { user } = useUserContext();

  const minWidth = useMinWidth();

  const [timeToResend, setTimeToResend] = useState(60);

  useEffect(() => {
    timeToResend > 0 &&
      setTimeout(() => {
        setTimeToResend((prevState) => prevState - 1);
      }, 1000);
  }, [timeToResend]);

  const formik = useFormik({
    initialValues: {
      confirmationCode: '',
    },
    onSubmit: async () => {
      try {
        const { data: confirmEmailResponse } = await publicApi.post('/confirm-email', {
          code: formik.values.confirmationCode,
          email: user.email,
        });
        await signInOnOnboarding(confirmEmailResponse.access);
        goToNextStep();
      } catch (error) {
        console.error(error);
        toast.error(
          'Ocorreu algum erro no servidor, verifiique as informações ou tente novamente mais tarde.'
        );
      }
    },
    validationSchema: CodeFormValidationSchema,
  });

  async function handleResendCode() {
    // await publicApi.post('/confirm-email', {
    //   id: user
    // })
    setTimeToResend(60);
  }

  return (
    <ConfirmContactFormContainer>
      <Title
        description="Confirme seu e-mail"
        size={minWidth(Breakpoint.small) ? 'big' : 'medium'}
      />
      <ConfirmContactFormStyled onSubmit={formik.handleSubmit}>
        <Text
          fontSize="1.8"
          color={colors.primary}
          description="Enviamos um código para seu e-mail cadastrado, por favor insira-o abaixo
        para finalizar seu cadastro:"
        />
        <Input
          name="confirmationCode"
          inputSize="big"
          onChange={formik.handleChange}
          error={
            formik.touched.confirmationCode && formik.errors.confirmationCode
              ? formik.errors.confirmationCode
              : ''
          }
        />
        <CodeLinkContainer>
          {timeToResend > 0 ? (
            <Text
              fontSize="1.8"
              color={colors.primary}
              description={`Enviar novamente (${String(timeToResend)})`}
            />
          ) : (
            <ButtonLink
              label="Enviar novamente"
              handleClick={handleResendCode}
              isButton={true}
            />
          )}
        </CodeLinkContainer>
        <ButtonsContainer>
          <Button description="Confirme o código" type="submit" variant="primary" />
          <Button type="submit" variant="secondary">
            <Link href="/login">Voltar para o login</Link>
          </Button>
        </ButtonsContainer>
      </ConfirmContactFormStyled>
    </ConfirmContactFormContainer>
  );
}
