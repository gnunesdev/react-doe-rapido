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
} from './styles';
import { Button } from '~/components/Button';
import { Checkbox } from '~/components/Checkbox';
import { Input } from '~/components/Input';
import { Title } from '~/components/Title';
import { UploadImage } from '~/components/UploadImage';
import { CompanyNeedsMap } from '~/constants';
import { useMinWidth } from '~/hooks/useMinWidth';
import { Breakpoint } from '~/styles/variables';
import { cleanPhone } from '~/utils';
import { fadeIn } from '~/utils/animations';

export function CompanySecondForm() {
  const { goToNextStep } = useOnboardingSteps();
  const minWidth = useMinWidth();

  const formik = useFormik({
    initialValues: {
      phone: '',
      email: '',
      needs: [],
    },
    onSubmit: () => {
      try {
        goToNextStep();
      } catch (error) {
        console.error('error');
        toast.error(
          'Ocorreu algum erro no servidor, verifiique as informações ou tente novamente mais tarde.'
        );
      }
    },
    validationSchema: CompanySecondFormValidationSchema,
  });

  return (
<<<<<<< HEAD
    <CompanySecondFormContainer
      as={motion.div}
      initial="hidden"
      animate="animate"
      variants={fadeIn}
    >
      <Title description="Cadastro de instituição:" size={minWidth(Breakpoint.medium) ? 'big' : 'medium'} />
=======
    <CompanySecondFormContainer>
      <Title
        description="Cadastro de instituição:"
        size={minWidth(Breakpoint.small) ? 'big' : 'medium'}
      />
>>>>>>> db5e743 (feat(landingPage): fazer landingPage)
      <CompanySecondFormStyled onSubmit={formik.handleSubmit}>
        <UploadImage />
        <InputRow>
          <Input
            name="phone"
            inputSize="big"
            onChange={formik.handleChange}
            label="Telefone:"
            mask={
              cleanPhone(formik.values.phone).length >= 10
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
          {Object.values(CompanyNeedsMap).map((need) => (
            <Checkbox
              key={need}
              label={need}
              size="medium"
              name="needs"
              value={need}
              onChange={formik.handleChange}
              error={String(formik.errors.needs)}
            />
          ))}
        </NeedsContainer>
        <ButtonsContainer>
          <Button variant="primary" description="Salvar informações" type="submit" />
        </ButtonsContainer>
      </CompanySecondFormStyled>
    </CompanySecondFormContainer>
  );
}
