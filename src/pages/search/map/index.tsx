import { GoogleMap, InfoWindow, Marker } from '@react-google-maps/api';
import { url } from 'inspector';
import { GetServerSideProps, NextPage } from 'next';
import router, { useRouter } from 'next/router';
import { useCallback, useMemo, useRef, useState } from 'react';

import { CompanyDrawer } from './components/CompanyDrawer';
import { CompanyButton } from './styles';
import { getCompanysToRenderInMap } from '~/services/map';
import { Company } from '~/types/Company';

const containerStyle = {
  width: '100vw',
  height: 'calc(100vh - 6.2rem)',
};

interface MapPageProps {
  companies: Array<Company>;
}

const MapPage: NextPage<MapPageProps> = ({ companies }) => {
  const routes = useRouter();
  const { drawerId } = routes.query;

  const centerScreen = useMemo(() => {
    return { lat: Number(companies[0].lat), lng: Number(companies[0].long) };
  }, [companies]);

  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

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
    router.push(`/search/map?id=${id}&drawerId=${selectedCompany?.id_company}`, undefined, {
      shallow: true,
    });
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
      {companies.map((company) => (
        <Marker
          position={{ lat: Number(company.lat), lng: Number(company.long) }}
          key={company.id_company}
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
          <CompanyButton onClick={handleOpenDrawer}>{selectedCompany.name}</CompanyButton>
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

  const companies = await getCompanysToRenderInMap(String(id));

  if (companies.length === 0) {
    return {
      redirect: {
        destination: '/search',
        permanent: false,
      },
    };
  }

  if (drawerId) {
    const companyExists = companies.find(
      (company) => company.id_company === Number(drawerId)
    );
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
      companies,
    },
  };
};

export default MapPage;
