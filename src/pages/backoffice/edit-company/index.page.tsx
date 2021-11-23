import { useFormik } from 'formik';
import jwtDecode from 'jwt-decode';
import { NextPage } from 'next';
import { parseCookies } from 'nookies';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { BackofficeContainer } from '../components/BackofficeContainer';
import { EditCompanyFormValidator } from './constants/utils';
import {
  ButtonsContainer,
  Container,
  Form,
  InputRow,
  NeedsContainer,
  ImageInput,
} from './styles';
import { Button } from '~/components/Button';
import { Checkbox } from '~/components/Checkbox';
import { Input } from '~/components/Input';
import { Select } from '~/components/Select';
import { Title } from '~/components/Title';
import { UploadImage } from '~/components/UploadImage';
import { CompanyNeedsMap } from '~/constants';
import { destroyCookies, JwtTokenResponse } from '~/context/useAuth';
import { Company } from '~/context/useCompany';
import { User, UserWithImage } from '~/context/useUser';
import { useMinWidth } from '~/hooks/useMinWidth';
import { api, setupAuthorizedApi } from '~/services/api';
import { getAddressByCep, isAddress } from '~/services/cep';
import { Breakpoint } from '~/styles/variables';
import { clearMask, maskPhone } from '~/utils';
import { STATE_LISTS } from '~/utils/address';
import { withSSRAuth } from '~/utils/withSSRAuth';

interface EditCompanyPageProps {
  company: Company;
  user: UserWithImage;
}

const EditCompanyPage: NextPage<EditCompanyPageProps> = ({ company, user }) => {
  const minWidth = useMinWidth();

  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      tradingName: company.tradingName,
      name: company.name,
      cnpj: company.cnpj,
      cep: company.cep,
      street: company.street,
      number: company.number,
      district: company.district,
      city: company.city,
      state: company.state,
      phone: maskPhone(company.phone),
      phoneWhatsapp: maskPhone(company.phoneWhatsapp),
      email: company.email,
      image: company.image,
      needs: company.needs.map((needValue) => String(needValue)),
    },
    onSubmit: async () => {
      try {
        setIsLoading(true);
        const companyData = {
          tradingName: formik.values.tradingName,
          name: formik.values.name,
          cnpj: clearMask(formik.values.cnpj),
          cep: clearMask(formik.values.cep),
          street: formik.values.street,
          number: formik.values.number,
          district: formik.values.district,
          city: formik.values.city,
          state: formik.values.state,
          phone: clearMask(formik.values.phone),
          phoneWhatsapp: clearMask(formik.values.phoneWhatsapp),
          email: formik.values.email,
          image: formik.values.image,
          needs: formik.values.needs.map((needValue) => Number(needValue)),
        };

        const { data: companyResponseData } = await api.put(`/company/${company.id}`, {
          ...companyData,
        });

        if (companyResponseData) {
          toast.success('Informações atualizadas com sucesso!');
        }
      } catch (error) {
        console.error(error);
        toast.error(
          'Ocorreu algum erro no servidor, verifique as informações ou tente novamente mais tarde.'
        );
      } finally {
        setIsLoading(false);
      }
    },
    validationSchema: EditCompanyFormValidator,
  });

  async function onCepBlur() {
    const cep = formik.values.cep.replace(/\D+/g, '');
    if (cep.length < 8) {
      return;
    }

    try {
      const cepData = await getAddressByCep(cep);
      if (!isAddress(cepData.data)) {
        return;
      }
      formik.setFieldValue('street', cepData.data.logradouro);
      formik.setFieldValue('district', cepData.data.bairro);
      formik.setFieldValue('city', cepData.data.localidade);
      formik.setFieldValue('state', cepData.data.uf);
    } catch (e) {
      console.error('error');
      toast.error(
        'Ocorreu algum erro no servidor, verifique as informações ou tente novamente mais tarde.'
      );
    }
  }

  function handleChangePhone(e: any, field: string) {
    const valueMaskered = maskPhone(e.target.value);
    formik.setFieldValue(field, valueMaskered);
  }

  return (
    <BackofficeContainer user={user}>
      <Container>
        <Title
          description="Editar instituição"
          size={minWidth(Breakpoint.small) ? 'big' : 'medium'}
        />
        <Form onSubmit={formik.handleSubmit}>
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
              onBlur={onCepBlur}
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
              error={
                formik.touched.street && formik.errors.street ? formik.errors.street : ''
              }
            />
          </InputRow>
          <InputRow>
            <Input
              name="number"
              inputSize="big"
              onChange={formik.handleChange}
              label="Logradouro:"
              value={formik.values.number}
              error={
                formik.touched.number && formik.errors.number ? formik.errors.number : ''
              }
            />
            <Input
              name="district"
              inputSize="big"
              onChange={formik.handleChange}
              label="Bairro:"
              value={formik.values.district}
              error={
                formik.touched.district && formik.errors.district
                  ? formik.errors.district
                  : ''
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
          <InputRow>
            <Input
              name="phone"
              inputSize="big"
              onChange={(e) => handleChangePhone(e, 'phone')}
              value={formik.values.phone}
              maxLength={14}
              label="Telefone:"
              error={formik.touched.phone && formik.errors.phone ? formik.errors.phone : ''}
            />
            <Input
              name="phoneWhatsapp"
              inputSize="big"
              onChange={(e) => handleChangePhone(e, 'phoneWhatsapp')}
              label="Whatsapp (opcional):"
              value={formik.values.phoneWhatsapp}
              maxLength={14}
              error={
                formik.touched.phoneWhatsapp && formik.errors.phoneWhatsapp
                  ? formik.errors.phoneWhatsapp
                  : ''
              }
            />
          </InputRow>
          <InputRow>
            <Input
              name="email"
              inputSize="big"
              onChange={formik.handleChange}
              label="E-mail:"
              error={formik.touched.email && formik.errors.email ? formik.errors.email : ''}
              value={formik.values.email}
            />
          </InputRow>
          <ImageInput>
            <UploadImage onChange={(value) => formik.setFieldValue('image', value)} />
          </ImageInput>
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
                checked={formik.values.needs.includes(needId)}
              />
            ))}
          </NeedsContainer>
          <ButtonsContainer>
            <Button
              variant="primary"
              description="Salvar informações"
              type="submit"
              isLoading={isLoading}
            ></Button>
          </ButtonsContainer>
        </Form>
      </Container>
    </BackofficeContainer>
  );
};

export const getServerSideProps = withSSRAuth(async (context) => {
  const { 'doerapido.token': token } = parseCookies(context);
  const { id }: JwtTokenResponse = jwtDecode(token);

  const api = setupAuthorizedApi(context);

  try {
    const { data: user } = await api.get<User>(`/user/${id}`);
    const { data: company } = await api.get<Company>(`/companyByUserId/${id}`);

    const userData = {
      ...user,
      companyId: company.id,
      image: company.image,
    };

    return {
      props: {
        user: userData,
        company,
      },
    };
  } catch (error) {
    console.error(error);
    destroyCookies(context);

    return {
      redirect: {
        destination: `/login`,
        permanent: false,
      },
    };
  }
});

export default EditCompanyPage;
