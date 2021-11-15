import { createContext, useContext, useState } from 'react';

export interface Company {
  id: number;
  tradingName: string;
  name: string;
  cnpj: string;
  cep: string;
  street: string;
  number: string;
  district: string;
  city: string;
  state: string;
  phone?: string;
  email?: string;
  image?: string;
  needs: number[];
}

interface CompanyContextData {
  company: Company;
  updateCompany: (company: Company) => void;
}

const CompanyContext = createContext({} as CompanyContextData);

export const CompanyProvider = ({ children }) => {
  const [company, setCompany] = useState<Company>();

  function updateCompany(company: Company) {
    console.log({ company });
    setCompany(company);
  }

  return (
    <CompanyContext.Provider value={{ company, updateCompany }}>
      {children}
    </CompanyContext.Provider>
  );
};

export function useCompanyContext() {
  const context = useContext(CompanyContext);

  if (!context) {
    throw Error('Context was not provided');
  }

  return context;
}
