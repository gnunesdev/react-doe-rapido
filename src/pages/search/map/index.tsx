import { useCallback, useMemo, useRef, useState } from 'react';

import { GoogleMap, InfoWindow, Marker } from '@react-google-maps/api';
import { GetServerSideProps, NextPage } from 'next';
import router, { useRouter } from 'next/router';

import { getCompanysToRenderInMap } from '~/services/map';
import { CompanyMapType } from '~/types/Company';

import { mapStyle } from '../constants';
import { CompanyDrawer } from './components/CompanyDrawer';
import { CompanyButton } from './styles';

const containerStyle = {
  width: '100vw',
  height: 'calc(100vh - 6.2rem)',
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

interface MapPageProps {
  companys: Array<CompanyMapType>;
}

const MapPage: NextPage<MapPageProps> = ({ companys }) => {
  const routes = useRouter();
  const { drawerId } = routes.query;

  const centerScreen = useMemo(() => {
    return { lat: Number(companys[0].lat), lng: Number(companys[0].long) };
  }, [companys]);

  const [selectedCompany, setSelectedCompany] = useState<CompanyMapType | null>(
    null
  );

  const [isDrawerOpen, setIsDrawerOpen] = useState(Boolean(drawerId));

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback((lat, lng) => {
    mapRef.current.panTo({ lat, lng });
    // mapRef.current.setZoom(14);
  }, []);

  function handleOpenDrawer() {
    const { id } = routes.query;
    router.push(
      `/search/map?id=${id}&drawerId=${selectedCompany?.id}`,
      undefined,
      { shallow: true }
    );
    setIsDrawerOpen(true);
  }

  function handleCloseDrawer() {
    const { id } = routes.query;
    router.push(`/search/map?id=${id}`, undefined, { shallow: true });
    setIsDrawerOpen(false);
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={centerScreen}
      zoom={14}
      onLoad={onMapLoad}
      options={{
        mapId: 'e258f25e5d7f6c6e',
      }}
    >
      {companys.map((company) => (
        <Marker
          position={{ lat: Number(company.lat), lng: Number(company.long) }}
          key={company.id}
          onClick={() => {
            panTo(Number(company.lat), Number(company.long));
            setSelectedCompany(company);
          }}
        />
      ))}
      {selectedCompany && (
        <InfoWindow
          position={{
            lat: Number(selectedCompany.lat),
            lng: Number(selectedCompany.long),
          }}
          onCloseClick={() => {
            setSelectedCompany(null);
          }}
        >
          <CompanyButton onClick={handleOpenDrawer}>
            {selectedCompany.name}
          </CompanyButton>
        </InfoWindow>
      )}
      {isDrawerOpen && (
        <CompanyDrawer
          closeModal={handleCloseDrawer}
          companyData={selectedCompany}
          companyId={String(routes.query?.id)}
        />
      )}
    </GoogleMap>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id, drawerId } = query;

  if (!id) {
    return {
      redirect: {
        destination: '/app',
        permanent: false,
      },
    };
  }

  const response = await getCompanysToRenderInMap(String(id));
  const companys: [CompanyMapType] | undefined = response?.data;

  if (companys.length === 0) {
    return {
      redirect: {
        destination: '/search',
        permanent: false,
      },
    };
  }

  if (drawerId) {
    const companyExists = companys.find((company) => company.id === drawerId);
    console.log(companys);

    if (!companyExists) {
      return {
        redirect: {
          destination: '/search',
          permanent: false,
        },
      };
    }
  }

  return {
    props: {
      companys,
    },
  };
};

export default MapPage;
