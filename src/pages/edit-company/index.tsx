import { NextPage } from 'next';

import { Header } from '~/components/Header';
import { Sidebar } from '~/components/Sidebar';

import { EditCompanyShell } from './components/EditCompanyShell';
import { EditCompanyContainer } from './styles';

const EditCompany: NextPage = () => {
  return (
    <>
      <Header />
      <EditCompanyContainer>
        <Sidebar />
        <EditCompanyShell />
      </EditCompanyContainer>
    </>
  );
};

export default EditCompany;
