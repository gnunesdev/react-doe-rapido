import { useEffect, useState } from 'react';

import { useTheme } from 'styled-components';

import Modal from '~/components/Modal';
import { Title } from '~/components/Title';
import { CompanyNeedsMap } from '~/constants';
import { getCompanyById } from '~/services/search';
import { CompanyMapType } from '~/types/Company';

import {
  CompanyDrawerContainer,
  CompanyInfoContainer,
  Header,
  Overlay,
} from './styles';

interface CompanyDrawerProps {
  closeModal: VoidFunction;
  companyData: CompanyMapType | null;
  companyId: string | null;
}

export function CompanyDrawer({
  closeModal,
  companyData,
  companyId,
}: CompanyDrawerProps) {
  const { colors } = useTheme();

  const [company, setCompany] = useState<CompanyMapType | null>(companyData);

  useEffect(() => {
    if (!companyData) {
      getCompanyData();
    }
  }, []);

  async function getCompanyData() {
    if (companyId) {
      try {
        const { data: companyResult } = await getCompanyById(companyId);
        setCompany(companyResult);
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    company && (
      <Modal>
        <CompanyDrawerContainer>
          <Header>
            <Title
              description={company.name}
              size="medium"
              color={colors.white}
            />
          </Header>
          <CompanyInfoContainer>
            <strong>{company.name}</strong>
            <div className="address">
              <p>
                {company.street}, {company.number}
              </p>
              <p>
                {company.district} - {company.city}, {company.state}
              </p>
            </div>
            <div className="distance">
              <strong>Distância aproximada {company.distance / 1000}km</strong>
            </div>
            <div className="needs">
              <strong>Principais necessidades:</strong>
              <ul>
                {company.needs.map((need) => (
                  <li key={need}>{CompanyNeedsMap[need]}</li>
                ))}
              </ul>
            </div>
            <div className="actions"></div>
          </CompanyInfoContainer>
        </CompanyDrawerContainer>
        <Overlay onClick={closeModal} />
      </Modal>
    )
  );
}
