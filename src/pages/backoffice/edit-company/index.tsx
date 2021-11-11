import { useFormik } from 'formik';
import { NextPage } from 'next';
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
import { useMinWidth } from '~/hooks/useMinWidth';
import { getAddressByCep, isAddress } from '~/services/cep';
import { Breakpoint } from '~/styles/variables';
import { cleanPhone } from '~/utils';
import { STATE_LISTS } from '~/utils/address';

const EditCompanyPage: NextPage = () => {
  const minWidth = useMinWidth();
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
      phone: '',
      email: '',
      image: '',
      needs: [],
    },
    onSubmit: () => {
      try {
        console.log(formik.values);
        toast.success('Informações atualizadas com sucesso!');
      } catch (error) {
        console.error('error');
        toast.error(
          'Ocorreu algum erro no servidor, verifiique as informações ou tente novamente mais tarde.'
        );
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
        'Ocorreu algum erro no servidor, verifiique as informações ou tente novamente mais tarde.'
      );
    }
  }

  return (
    <BackofficeContainer>
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
              label="Rua:"
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
              label="Número:"
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
          <ImageInput>
            <UploadImage onChange={(value) => formik.setFieldValue('image', value)} />
          </ImageInput>
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
              />
            ))}
          </NeedsContainer>
          <ButtonsContainer>
            <Button
              variant="primary"
              description="Salvar informações"
              type="submit"
            ></Button>
          </ButtonsContainer>
        </Form>
      </Container>
    </BackofficeContainer>
  );
};

export default EditCompanyPage;
