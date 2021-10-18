import { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';

import { NextPage } from 'next';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';

import { Input } from '~/components/Input';
import { Link } from '~/components/Link';
import { Title } from '~/components/Title';
import {
  getAddressByGeolocation,
  getCompanysByNearbyAddress,
} from '~/services/search';
import { CompanyListType } from '~/types/Company';

import { AddressSuggestions } from './components/AddressSuggestions';
import { CompanyList } from './components/CompanyList';
import { AppContainer, SearchBar } from './styles';

const AppPage: NextPage = () => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({ debounce: 500 });

  const [isAddressLoading, setIsAddressLoading] = useState(false);
  const [companys, setCompanys] = useState<Array<CompanyListType>>([]);

  async function handleSelect(description: string) {
    setValue(description, false);
    clearSuggestions();

    await searchCompanys();
  }

  async function handleGetCurrentAddress() {
    navigator.geolocation.getCurrentPosition(async (position) => {
      setIsAddressLoading(true);

      try {
        const { data: geoAddress } = await getAddressByGeolocation(
          String(position.coords.latitude),
          String(position.coords.longitude)
        );

        const address = geoAddress?.results[0]?.formatted_address;
        setValue(address);

        setIsAddressLoading(false);
      } catch (error) {
        console.error(error);
        setIsAddressLoading(false);
      }
    });
  }

  async function searchCompanys() {
    try {
      const result = await getGeocode({ address: value });
      const { lat, lng } = await getLatLng(result[0]);

      const { data: companysData } = await getCompanysByNearbyAddress(
        String(lat),
        String(lng)
      );

      setCompanys(companysData);
    } catch (error) {
      console.error(error);
    }
  }

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  return (
    <AppContainer>
      <Title description="Pesquisa de instituições" size="big" />
      <SearchBar>
        <Input
          label="Digite seu endereço:"
          inputSize="big"
          name="address"
          onChange={handleInput}
          disabled={!ready}
          value={value}
        />
        {status === 'OK' && (
          <AddressSuggestions address={data} handleSelect={handleSelect} />
        )}
        <Link
          label={
            isAddressLoading
              ? 'Carregando localização...'
              : 'Insira minha localização'
          }
          isButton={true}
          handleClick={handleGetCurrentAddress}
        />
      </SearchBar>
      {companys.length > 0 ? <CompanyList companys={companys} /> : ''}
    </AppContainer>
  );
};

export default AppPage;
