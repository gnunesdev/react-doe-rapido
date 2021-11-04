import { useRouter } from 'next/router';

import { CompanyListContainer, ItemInfo } from './styles';
import { Button } from '~/components/Button';
import { Text } from '~/components/Text';
import { useMinWidth } from '~/hooks/useMinWidth';
import { Breakpoint } from '~/styles/variables';
import { CompanyInList } from '~/types/Company';

interface CompanyListProps {
  companys: Array<CompanyInList>;
}

export function CompanyList({ companys }: CompanyListProps) {
  const routes = useRouter();
  const minWidth = useMinWidth();

  function handleSeeOnMap(id: string) {
    routes.push(`/search/map?id=${id}`);
  }

  return (
    <CompanyListContainer>
      <Text fontSize="1.8" description="Resultados:" isBold={true} />
      <ul>
        {companys.map((company) => (
          <li
            key={company.id_company}
            {...(!minWidth(Breakpoint.medium) && {
              onClick: () => handleSeeOnMap('' + company.id_company),
            })}
          >
            <ItemInfo>
              <strong>
                {company.name +
                  'MESTRE RATO, MESTRE RATO, MESTRE RATO, MESTRE RATO, MESTRE RATO, MESTRE RATO'}
              </strong>
              <p>
                {company.address +
                  'MESTRE RATO, MESTRE RATO, MESTRE RATO, MESTRE RATO, MESTRE RATO, MESTRE RATO'}
              </p>
              <span>Distância aproximada: {company.distance / 1000}km</span>
            </ItemInfo>
            {minWidth(Breakpoint.medium) && (
              <Button
                variant="primary"
                description="Ver no mapa"
                onClick={() => handleSeeOnMap(String(company.id_company))}
              />
            )}
          </li>
        ))}
      </ul>
    </CompanyListContainer>
  );
}
