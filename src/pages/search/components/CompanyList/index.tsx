import { useRouter } from 'next/router';

import { Button } from '~/components/Button';
import { Text } from '~/components/Text';
import { CompanyListType } from '~/types/Company';

import { CompanyListContainer } from './styles';

interface CompanyListProps {
  companys: Array<CompanyListType>;
}

export function CompanyList({ companys }: CompanyListProps) {
  const routes = useRouter();

  function handleSeeOnMap(id: string) {
    routes.push(`/search/map?id=${id}`);
  }

  return (
    <CompanyListContainer>
      <Text fontSize="1.8" description="Resultados:" isBold={true} />
      <ul>
        {companys.map((company) => (
          <li key={company.id_company}>
            <div>
              <strong>{company.name}</strong>
              <p>{company.address}</p>
              <span>Distância aproximada: {company.distance / 1000}km</span>
            </div>
            <Button
              variant="primary"
              description="Ver no mapa"
              onClick={() => handleSeeOnMap(String(company.id_company))}
            />
          </li>
        ))}
      </ul>
    </CompanyListContainer>
  );
}
