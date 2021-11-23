import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useTheme } from 'styled-components';

import { fadeLeft } from './animation';
import {
  CompanyDrawerContainer,
  CompanyInfoContainer,
  Header,
  Overlay,
  Close,
} from './styles';
import { ActionButton } from '~/components/ActionButton';
import Modal from '~/components/Modal';
import { Title } from '~/components/Title';
import { CompanyNeedsMap } from '~/constants';
import { getCompanyById } from '~/services/search';
import { Company } from '~/types/Company';
import { maskPhone } from '~/utils';

interface CompanyDrawerProps {
  closeModal: VoidFunction;
  companyData: Company;
  companyId: string | null;
}

export function CompanyDrawer({ closeModal, companyData, companyId }: CompanyDrawerProps) {
  const { foreground } = useTheme();

  function handleCloseModal() {
    closeModal();
  }

  const [company, setCompany] = useState<Company>(companyData);

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
        <Overlay
          onClick={() => handleCloseModal()}
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <CompanyDrawerContainer
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            as={motion.div}
            variants={fadeLeft}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Header>
              <Title description={company.name} size="medium" color={foreground.primary} />
              <Close onClick={() => handleCloseModal}>
                <FaTimes color={foreground.primary} size={24} />
              </Close>
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
              {company.distance > 0 && (
                <div className="distance">
                  <strong>
                    Distância aproximada {Number(company.distance / 1000).toFixed(1)}km
                  </strong>
                </div>
              )}
              <div className="needs">
                <strong>Principais necessidades:</strong>
                <ul>
                  {company.needs.map((need) => (
                    <li key={need}>{CompanyNeedsMap[need]}</li>
                  ))}
                </ul>
              </div>
              <div className="contacts">
                <strong>Contatos:</strong>
                <p>Email: {company.email}</p>
                <p>Telefone: {maskPhone(company.phone)}</p>
                {company.phoneWhatsapp && (
                  <p>Whatsapp: {maskPhone(company.phoneWhatsapp)}</p>
                )}
              </div>
              <div className="actions">
                {company.phoneWhatsapp && (
                  <ActionButton type="whats" whatsPhone={company.phoneWhatsapp} />
                )}
                <ActionButton type="phone" phone={company.phone} />
                <ActionButton type="email" email={company.email} />
                <ActionButton type="share" />
              </div>
            </CompanyInfoContainer>
          </CompanyDrawerContainer>
        </Overlay>
      </Modal>
    )
  );
}
