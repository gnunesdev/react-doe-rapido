import { AnimatePresence, motion } from 'framer-motion';
import { NextPage } from 'next';
import { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';

import { AddressSuggestions } from './components/AddressSuggestions';
import { CompanyList, CompanyListSkeleton } from './components/CompanyList';
import { Filters } from './components/Filters';
import { FiltersModal } from './components/FiltersModal';
import { SearchContainer, SearchBar, SearchContent } from './styles';
import { Button } from '~/components/Button';
import { Header } from '~/components/Header';
import { Input } from '~/components/Input';
import { Link } from '~/components/Link';
import { PageContainer } from '~/components/PageContainer';
import { Title } from '~/components/Title';
import { useMinWidth } from '~/hooks/useMinWidth';
import { getAddressByGeolocation, getCompanysByNearbyAddress } from '~/services/search';
import { Breakpoint } from '~/styles/variables';
import { CompanyInList } from '~/types/Company';
import { fadeIn } from '~/utils/animations';
import { isAxiosError } from '~/utils/http';

const AppPage: NextPage = () => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({ debounce: 500 });

  const [isAddressLoading, setIsAddressLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [isFiltersModalOpen, toggleFiltersModal] = useState(false);

  const [needsFilters, setNeedsFilters] = useState<Array<string>>([]);
  const [companies, setCompanies] = useState<CompanyInList[]>([]);
  const [range, setRange] = useState<number>(10);

  const minWidth = useMinWidth();

  function handleToggleFiltersModal() {
    toggleFiltersModal((prevState) => {
      const state = !prevState ? 'open' : 'closed';
      if (state === 'open') {
        document.documentElement.style.overflow = 'hidden';
      } else {
        document.documentElement.style.overflow = 'auto';
      }
      return !prevState;
    });
  }

  function handleSelect(description: string) {
    setValue(description, false);
    clearSuggestions();

    searchCompanys(description);
  }

  async function handleGetCurrentAddress() {
    setIsAddressLoading(true);
    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        const { data: geocodeResponse } = await getAddressByGeolocation(
          String(position.coords.latitude),
          String(position.coords.longitude)
        );
        const address = geocodeResponse.results[0]?.formatted_address;
        setValue(address);

        setIsAddressLoading(false);
      } catch (error) {
        console.error(error);
      } finally {
        setIsAddressLoading(false);
      }
    });
  }

  async function searchCompanys(description?: string, needs?: string[]) {
    try {
      setIsLoading(true);
      const result = await getGeocode({ address: description || value });
      const { lat, lng } = await getLatLng(result[0]);
      const { data: nearbyCompanies } = await getCompanysByNearbyAddress(
        String(lat),
        String(lng),
        needs,
        range
      );
      setCompanies(nearbyCompanies);
    } catch (error) {
      if (isAxiosError(error) && error.response.status === 404) {
        toast.error('Nenhuma instituição foi encontrada :(', {
          autoClose: 6000,
        });
        setCompanies([]);
      } else {
        toast.error(
          'Ocorreu algum erro no servidor, verifique as informações ou tente novamente mais tarde.'
        );
      }
    } finally {
      setIsLoading(false);
    }
  }

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  function handleSelectNeedFilter(needId: string, shouldSearch = true) {
    const needAlreadyFiltered = needsFilters.find((need) => need === needId);

    let needsToFilter = [];

    if (needAlreadyFiltered) {
      needsToFilter = needsFilters.filter((need) => need !== needId);
    } else {
      needsToFilter = [...needsFilters, needId];
    }

    setNeedsFilters(needsToFilter);

    if (shouldSearch) {
      searchCompanys(undefined, needsToFilter);
    }
  }

  function handleChangeRange(range: number) {
    setRange(range);
  }

  return (
    <PageContainer>
      <Header />
      <SearchContainer showingResults={companies.length > 0 || isLoading}>
        <SearchContent as={motion.div} initial="hidden" animate="animate" variants={fadeIn}>
          <Title
            description="Pesquisa de instituições"
            size={minWidth(Breakpoint.small) ? 'big' : 'medium'}
          />
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

            {companies.length > 0 || isLoading ? (
              minWidth(Breakpoint.small) ? (
                <Filters
                  needsSelected={needsFilters}
                  handleSelectFilter={handleSelectNeedFilter}
                />
              ) : (
                <Button
                  variant="secondary"
                  onClick={handleToggleFiltersModal}
                  description="Filtros"
                  width={'auto'}
                />
              )
            ) : (
              <Link
                label={
                  isAddressLoading ? 'Carregando localização...' : 'Insira minha localização'
                }
                isButton={true}
                handleClick={handleGetCurrentAddress}
              />
            )}
          </SearchBar>
          {companies.length > 0 && !isLoading ? (
            <CompanyList needsSelected={needsFilters} companys={companies} />
          ) : (
            isLoading && <CompanyListSkeleton />
          )}
        </SearchContent>
      </SearchContainer>
      <AnimatePresence>
        {isFiltersModalOpen && (
          <FiltersModal
            needsFilters={needsFilters}
            range={range}
            handleSelectNeedFilter={handleSelectNeedFilter}
            handleToggleFiltersModal={handleToggleFiltersModal}
            handleSearchCompanys={searchCompanys}
            handleSelectRange={handleChangeRange}
          />
        )}
      </AnimatePresence>
    </PageContainer>
  );
};

export default AppPage;
