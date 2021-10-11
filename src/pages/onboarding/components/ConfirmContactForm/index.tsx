import { useEffect, useState } from 'react';

import { useFormik } from 'formik';
import Link from 'next/link';
import { useTheme } from 'styled-components';

import { Button } from '~/components/Button';
import { Input } from '~/components/Input';
import { Link as ButtonLink } from '~/components/Link';
import { Text } from '~/components/Text';
import { Title } from '~/components/Title';

import {
  ButtonsContainer,
  CodeLinkContainer,
  ConfirmContactFormContainer,
  ConfirmContactFormStyled,
} from './styles';
import { useOnboardingSteps } from '../../hooks/useOnboardingSteps';

export function ConfirmContactForm() {
  const { colors } = useTheme();

  const [timeToResend, setTimeToResend] = useState(5);
  const [codeSent, setCodeSent] = useState(true);

  const { goToNextStep } = useOnboardingSteps();

  useEffect(() => {
    if (codeSent) {
      timeToResend > 0 &&
        setTimeout(() => {
          setTimeToResend((prevState) => prevState - 1);
        }, 1000);
    }
  }, [codeSent, timeToResend]);

  const formik = useFormik({
    initialValues: {
      confirmationCode: '',
    },
    onSubmit: (values) => {
      setCodeSent(true);
      goToNextStep();
    },
  });

  function handleResendCode() {
    setTimeToResend(60);
  }

  return (
    <ConfirmContactFormContainer>
      <Title description="Confirme seu e-mail" size="big" />
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
        />
        {codeSent && (
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
        )}
        <ButtonsContainer>
          <Button
            description="Confirme o código"
            type="submit"
            variant="primary"
          />
          <Button type="submit" variant="secondary">
            <Link href="/login">Voltar para o login</Link>
          </Button>
        </ButtonsContainer>
      </ConfirmContactFormStyled>
    </ConfirmContactFormContainer>
  );
}
