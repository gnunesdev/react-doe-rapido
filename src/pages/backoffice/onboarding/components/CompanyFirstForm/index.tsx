import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { useOnboardingSteps } from '../../hooks/useOnboardingSteps';
import { CompanyFirstFormValidator } from '../../utils';
import {
  ButtonsContainer,
  CompanyFirstFormContainer,
  CompanyFirstFormStyled,
  InputRow,
} from './styles';
import { Button } from '~/components/Button';
import { Input } from '~/components/Input';
import { Select } from '~/components/Select';
import { Title } from '~/components/Title';
import { useCompanyContext } from '~/context/useCompany';
import { useUserContext } from '~/context/useUser';
import { useMinWidth } from '~/hooks/useMinWidth';
import { api } from '~/services/api';
import { ViacepAddress, getAddressByCep, isAddress } from '~/services/cep';
import { Breakpoint } from '~/styles/variables';
import { clearMask } from '~/utils';
import { STATE_LISTS } from '~/utils/address';
import { fadeIn } from '~/utils/animations';
import { isAxiosError } from '~/utils/http';

export function CompanyFirstForm() {
  const [isLoading, setIsLoading] = useState(false);

  const { goToNextStep } = useOnboardingSteps();
  const minWidth = useMinWidth();

  const { user } = useUserContext();
  const { updateCompany } = useCompanyContext();

  const formik = useFormik({
    initialValues: {
      tradingName: '',
      name: '',
      cnpj: '',
      cep: '',
      street: '',
      number: '',
      district: '',
      city: '',
      state: '',
    },
    onSubmit: async () => {
      try {
        setIsLoading(true);

        const company = {
          idUser: user.id,
          tradingName: formik.values.tradingName,
          name: formik.values.name,
          cnpj: clearMask(formik.values.cnpj),
          cep: clearMask(formik.values.cep),
          street: formik.values.street,
          number: formik.values.number,
          district: formik.values.district,
          city: formik.values.city,
          state: formik.values.state,
        };

        const { data: companyData } = await api.post('/company', {
          ...company,
        });

        await api.put(`/user/${user.id}`, {
          stepOnboarding: 'company2',
        });

        updateCompany({
          ...companyData,
        });
        goToNextStep();
      } catch (error) {
        if (isAxiosError(error) && error.response.status === 400) {
          toast.error(
            'Dados inválidos. Verifique se preencheu corretamente todos os campos e tente novamente.'
          );
        } else {
          toast.error(
            'Ocorreu algum erro no servidor, verifique as informações ou tente novamente mais tarde.'
          );
        }
      } finally {
        setIsLoading(false);
      }
    },
    validationSchema: CompanyFirstFormValidator,
  });

  async function handleBlurCep() {
    if (formik.values.cep.length < 8) {
      return;
    }

    try {
      const cepData = await getAddressByCep(formik.values.cep);

      if (cepData) {
        if (!isAddress(cepData.data)) {
          return;
        }

        const address: ViacepAddress = cepData.data;

        if (address) {
          formik.setFieldValue('street', address?.logradouro);
          formik.setFieldValue('district', address?.bairro);
          formik.setFieldValue('city', address?.localidade);
          formik.setFieldValue('state', address?.uf);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <CompanyFirstFormContainer
      as={motion.div}
      initial="hidden"
      animate="animate"
      variants={fadeIn}
    >
      <Title
        description="Cadastro de instituição"
        size={minWidth(Breakpoint.small) ? 'big' : 'medium'}
      />
      <div className="subtitle">
        Agora que você já se cadastrou como um administrador e confirmou seu email, você pode
        inserir e alterar os dados da instituição!
      </div>
      <CompanyFirstFormStyled onSubmit={formik.handleSubmit}>
        <Input
          name="tradingName"
          inputSize="big"
          onChange={formik.handleChange}
          label="Nome da empresa:"
          value={formik.values.tradingName}
          error={
            formik.touched.tradingName && formik.errors.tradingName
              ? formik.errors.tradingName
              : ''
          }
        />
        <InputRow>
          <Input
            name="name"
            inputSize="big"
            onChange={formik.handleChange}
            label="Razão social:"
            value={formik.values.name}
            error={formik.touched.name && formik.errors.name ? formik.errors.name : ''}
          />
          <Input
            name="cnpj"
            inputSize="big"
            onChange={formik.handleChange}
            label="Cnpj:"
            value={formik.values.cnpj}
            mask="99.999.999/9999-99"
            error={formik.touched.cnpj && formik.errors.cnpj ? formik.errors.cnpj : ''}
          />
        </InputRow>
        <InputRow>
          <Input
            name="cep"
            inputSize="big"
            onChange={formik.handleChange}
            onBlur={handleBlurCep}
            label="CEP:"
            mask="99999-999"
            value={formik.values.cep}
            error={formik.touched.cep && formik.errors.cep ? formik.errors.cep : ''}
          />
          <Input
            name="street"
            inputSize="big"
            onChange={formik.handleChange}
            label="Logradouro:"
            value={formik.values.street}
            error={formik.touched.street && formik.errors.street ? formik.errors.street : ''}
          />
        </InputRow>
        <InputRow>
          <Input
            name="number"
            inputSize="big"
            onChange={formik.handleChange}
            label="Número:"
            value={formik.values.number}
            error={formik.touched.number && formik.errors.number ? formik.errors.number : ''}
          />
          <Input
            name="district"
            inputSize="big"
            onChange={formik.handleChange}
            label="Bairro:"
            value={formik.values.district}
            error={
              formik.touched.district && formik.errors.district ? formik.errors.district : ''
            }
          />
        </InputRow>
        <InputRow>
          <Input
            name="city"
            inputSize="big"
            onChange={formik.handleChange}
            label="Cidade:"
            value={formik.values.city}
            error={formik.touched.city && formik.errors.city ? formik.errors.city : ''}
          />
          <Select
            name="state"
            label="Estado:"
            size="big"
            options={STATE_LISTS}
            value={formik.values.state}
            setValue={formik.setFieldValue}
            error={formik.touched.state && formik.errors.state ? formik.errors.state : ''}
          />
        </InputRow>
        <ButtonsContainer>
          <Button
            variant="primary"
            description="Salvar informações"
            type="submit"
            isLoading={isLoading}
          ></Button>
        </ButtonsContainer>
      </CompanyFirstFormStyled>
    </CompanyFirstFormContainer>
  );
}
