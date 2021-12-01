import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTheme } from 'styled-components';

import { useOnboardingSteps } from '../../hooks/useOnboardingSteps';
import { CompanySecondFormValidationSchema } from '../../utils';
import { InputRow } from '../CompanyFirstForm/styles';
import {
  ButtonsContainer,
  CompanySecondFormContainer,
  CompanySecondFormStyled,
  NeedsContainer,
  TermsContainer,
} from './styles';
import { Button } from '~/components/Button';
import { Checkbox } from '~/components/Checkbox';
import { Input } from '~/components/Input';
import { Text } from '~/components/Text';
import { Title } from '~/components/Title';
import { UploadImage } from '~/components/UploadImage';
import { CompanyNeedsMap } from '~/constants';
import { useCompanyContext } from '~/context/useCompany';
import { useUserContext } from '~/context/useUser';
import { useMinWidth } from '~/hooks/useMinWidth';
import { api } from '~/services/api';
import { Breakpoint } from '~/styles/variables';
import { clearMask, maskPhone } from '~/utils';
import { fadeIn } from '~/utils/animations';

export function CompanySecondForm() {
  const { goToNextStep } = useOnboardingSteps();
  const minWidth = useMinWidth();

  const { company } = useCompanyContext();
  const { user } = useUserContext();

  const { colors } = useTheme();

  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      phoneWhatsapp: '',
      phone: '',
      email: '',
      image: '',
      needs: [],
      acceptedPrivacy: false,
    },
    onSubmit: async () => {
      try {
        setIsLoading(true);

        const companyData = {
          email: formik.values.email,
          phone: clearMask(formik.values.phone),
          phoneWhatsapp: clearMask(formik.values.phoneWhatsapp),
          needs: formik.values.needs,
          stepOnboarding: 'finished',
          ...(formik.values.image && { image: formik.values.image }),
        };

        await api.put(`/company/${company.id}`, {
          ...companyData,
        });

        await api.put(`/user/${user.id}`, {
          stepOnboarding: 'finished',
        });

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
    validationSchema: CompanySecondFormValidationSchema,
  });

  function handleChangePhone(e: any, field: string) {
    const valueMaskered = maskPhone(e.target.value);
    formik.setFieldValue(field, valueMaskered);
  }

  function handleBlurPhone() {
    if (formik.values.phone && !formik.errors.phone && !formik.values.phoneWhatsapp) {
      formik.setFieldValue('phoneWhatsapp', formik.values.phone);
    }
  }

  return (
    <CompanySecondFormContainer
      as={motion.div}
      initial="hidden"
      animate="animate"
      variants={fadeIn}
    >
      <Title
        description="Cadastro de instituição:"
        size={minWidth(Breakpoint.small) ? 'big' : 'medium'}
      />
      <CompanySecondFormStyled onSubmit={formik.handleSubmit}>
        <Input
          name="email"
          inputSize="big"
          onChange={formik.handleChange}
          label="E-mail:"
          error={formik.touched.email && formik.errors.email ? formik.errors.email : ''}
        />
        <InputRow>
          <Input
            name="phone"
            inputSize="big"
            onChange={(e) => handleChangePhone(e, 'phone')}
            onBlur={() => handleBlurPhone()}
            value={formik.values.phone}
            maxLength={14}
            label="Telefone:"
            error={formik.touched.phone && formik.errors.phone ? formik.errors.phone : ''}
          />
          <Input
            name="whats"
            inputSize="big"
            onChange={(e) => handleChangePhone(e, 'phoneWhatsapp')}
            value={formik.values.phoneWhatsapp}
            maxLength={14}
            label="Whatsapp (opcional):"
            error={
              formik.touched.phoneWhatsapp && formik.errors.phoneWhatsapp
                ? formik.errors.phoneWhatsapp
                : ''
            }
          />
        </InputRow>

        <InputRow>
          <UploadImage onChange={(value) => formik.setFieldValue('image', value)} />
        </InputRow>

        <NeedsContainer>
          <Title size="small" description="Principais necessidades" />
          {formik.touched.needs && formik.errors.needs && (
            <Text
              description={String(formik.errors.needs)}
              fontSize="1.4"
              color={colors.red}
            />
          )}
          {Object.entries(CompanyNeedsMap).map(([needId, needValue]) => (
            <Checkbox
              key={needId}
              label={needValue}
              size="medium"
              name="needs"
              value={needId}
              onChange={formik.handleChange}
              checked={formik.values.needs.includes(String(needId))}
            />
          ))}
        </NeedsContainer>
        <TermsContainer>
          <Title size="small" description="Termo de aceite" />
          {formik.touched.acceptedPrivacy && formik.errors.acceptedPrivacy && (
            <Text
              description="Você precisa aceitar os termos"
              fontSize="1.4"
              color={colors.red}
            />
          )}
          <Checkbox
            size="medium"
            name="acceptedPrivacy"
            onChange={formik.handleChange}
            checked={formik.values.acceptedPrivacy}
          >
            Aceito as&nbsp;
            <a
              className="link"
              href="https://storageaps.blob.core.windows.net/politica/POL%C3%8DTICA%20DE%20PRIVACIDADE.pdf"
              target="_blank"
              rel="noreferrer"
            >
              políticas de privacidade
            </a>
          </Checkbox>
        </TermsContainer>
        <ButtonsContainer>
          <Button
            variant="primary"
            description="Salvar informações"
            type="submit"
            isLoading={isLoading}
          />
        </ButtonsContainer>
      </CompanySecondFormStyled>
    </CompanySecondFormContainer>
  );
}
