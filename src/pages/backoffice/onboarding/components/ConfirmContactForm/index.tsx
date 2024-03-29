import { useFormik } from 'formik';
import NextLink from 'next/link';
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
import { ButtonLink } from '~/components/ButtonLink';
import { Input } from '~/components/Input';
import { Link } from '~/components/Link';
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

  const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(true);
        const { data: confirmEmailResponse } = await publicApi.post('/confirm-email', {
          code: formik.values.confirmationCode,
          email: user.email,
        });
        await signInOnOnboarding(confirmEmailResponse.access);
        goToNextStep();
      } catch (error) {
        console.error(error);
        toast.error(
          'Ocorreu algum erro no servidor, verifique as informações ou tente novamente mais tarde.'
        );
      } finally {
        setIsLoading(false);
      }
    },
    validationSchema: CodeFormValidationSchema,
  });

  async function handleResendCode() {
    try {
      await publicApi.post('/send-new-code', {
        email: user.email,
      });
      toast.success('Um novo código foi enviado para seu e-mail');
    } catch (error) {
      console.error(error);
      toast.error(
        'Ocorreu algum erro no servidor, verifique as informações ou tente novamente mais tarde.'
      );
    }
    toast;
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
            <Link label="Enviar novamente" handleClick={handleResendCode} isButton={true} />
          )}
        </CodeLinkContainer>
        <ButtonsContainer>
          <Button
            className="button"
            description="Confirme o código"
            type="submit"
            variant="primary"
            isLoading={isLoading}
          />
          <ButtonLink
            className="button"
            description="Voltar para o login"
            href="/login"
            variant="secondary"
          />
        </ButtonsContainer>
      </ConfirmContactFormStyled>
    </ConfirmContactFormContainer>
  );
}
