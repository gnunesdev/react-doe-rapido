import { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';

import { NextPage } from 'next';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';

import { Checkbox } from '~/components/Checkbox';
import { Input } from '~/components/Input';
import { Link } from '~/components/Link';
import { Text } from '~/components/Text';
import { Title } from '~/components/Title';
import { CompanyNeedsMap, CompanyValueType } from '~/constants';
import {
  getAddressByGeolocation,
  getCompanysByNearbyAddress,
} from '~/services/search';
import { CompanyListType } from '~/types/Company';

import { AddressSuggestions } from './components/AddressSuggestions';
import { CompanyList } from './components/CompanyList';
import { AppContainer, FiltersContainer, SearchBar } from './styles';

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
  const [needsFilters, setNeedsFilters] = useState<Array<string>>([]);

  function handleSelect(description: string) {
    setValue(description, false);
    clearSuggestions();

    searchCompanys();
  }

  async function handleGetCurrentAddress() {
    setIsAddressLoading(true);
    navigator.geolocation.getCurrentPosition(async (position) => {
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
      }
    });

    setIsAddressLoading(false);
  }

  async function searchCompanys() {
    try {
      const result = await getGeocode({ address: value });
      const { lat, lng } = await getLatLng(result[0]);

      const { data: companysData } = await getCompanysByNearbyAddress(
        String(lat),
        String(lng),
        needsFilters
      );

      console.log(companysData);
      setCompanys(companysData);
    } catch (error) {
      console.error(error);
    }
  }

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  function handleSelectNeedFilter(needId: string) {
    const needAlreadayFiltered = needsFilters.find((need) => need === needId);

    needAlreadayFiltered
      ? setNeedsFilters((needs) => needs.filter((need) => need !== needId))
      : setNeedsFilters((needs) => [...needs, needId]);

    searchCompanys();
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

        {companys.length > 0 ? (
          <FiltersContainer>
            <Text
              description="Instituições que precisam de:"
              fontSize="1.8"
              isBold={true}
            />
            <div>
              {Object.entries(CompanyNeedsMap).map(([needId, needValue]) => (
                <Checkbox
                  name={needValue}
                  key={needId}
                  label={needValue}
                  size="medium"
                  onChange={() => handleSelectNeedFilter(needId)}
                />
              ))}
            </div>
          </FiltersContainer>
        ) : (
          <Link
            label={
              isAddressLoading
                ? 'Carregando localização...'
                : 'Insira minha localização'
            }
            isButton={true}
            handleClick={handleGetCurrentAddress}
          />
        )}
      </SearchBar>
      {companys.length > 0 ? <CompanyList companys={companys} /> : ''}
    </AppContainer>
  );
};

export default AppPage;
