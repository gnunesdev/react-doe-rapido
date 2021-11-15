import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

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
import { Title } from '~/components/Title';
import { UploadImage } from '~/components/UploadImage';
import { CompanyNeedsMap } from '~/constants';
import { useCompanyContext } from '~/context/useCompany';
import { useMinWidth } from '~/hooks/useMinWidth';
import { api } from '~/services/api';
import { Breakpoint } from '~/styles/variables';
import { clearMask } from '~/utils';
import { fadeIn } from '~/utils/animations';

export function CompanySecondForm() {
  const { goToNextStep } = useOnboardingSteps();
  const minWidth = useMinWidth();

  const { company } = useCompanyContext();

  const formik = useFormik({
    initialValues: {
      phone: '',
      email: '',
      image: '',
      needs: [],
      acceptedTerms: false,
      acceptedPrivacy: false,
    },
    onSubmit: async () => {
      try {
        const companyData = {
          phone: formik.values.phone,
          email: formik.values.email,
          needs: formik.values.needs,
          ...(formik.values.image && { image: formik.values.image }),
        };

        await api.put(`/company/${company.id}`, {
          ...companyData,
        });

        goToNextStep();
      } catch (error) {
        console.error(error);
        toast.error(
          'Ocorreu algum erro no servidor, verifiique as informações ou tente novamente mais tarde.'
        );
      }
    },
    validationSchema: CompanySecondFormValidationSchema,
  });

  console.log(formik.values);

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
        <UploadImage onChange={(value) => formik.setFieldValue('image', value)} />
        <InputRow>
          <Input
            name="phone"
            inputSize="big"
            onChange={formik.handleChange}
            label="Telefone:"
            mask={
              clearMask(formik.values.phone).length >= 10
                ? '(99)99999-9999'
                : '(99)9999-9999'
            }
            error={formik.touched.phone && formik.errors.phone ? formik.errors.phone : ''}
          />
          <Input
            name="email"
            inputSize="big"
            onChange={formik.handleChange}
            label="E-mail:"
            error={formik.touched.email && formik.errors.email ? formik.errors.email : ''}
          />
        </InputRow>
        <NeedsContainer>
          <Title size="small" description="Principais necessidades" />
          {Object.entries(CompanyNeedsMap).map(([needId, needValue]) => (
            <Checkbox
              key={needId}
              label={needValue}
              size="medium"
              name="needs"
              value={needId}
              onChange={formik.handleChange}
              checked={formik.values.needs.includes(String(needId))}
              error={String(formik.errors.needs)}
            />
          ))}
        </NeedsContainer>
        <TermsContainer>
          <Title size="small" description="Termos de aceite" />
          <Checkbox
            label="Aceita os termos de uso"
            size="medium"
            name="acceptedTerms"
            onChange={formik.handleChange}
            error={String(formik.errors.needs)}
          >
            Aceito os termos de uso
          </Checkbox>
          <Checkbox
            label="Aceita os termos de uso"
            size="medium"
            name="acceptedPrivacy"
            onChange={formik.handleChange}
            error={String(formik.errors.needs)}
          >
            Aceito as políticas de privacidade
          </Checkbox>
        </TermsContainer>
        <ButtonsContainer>
          <Button variant="primary" description="Salvar informações" type="submit" />
        </ButtonsContainer>
      </CompanySecondFormStyled>
    </CompanySecondFormContainer>
  );
}
