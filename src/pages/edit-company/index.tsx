import { NextPage } from 'next';

import { Sidebar } from '~/components/Sidebar';

import { EditCompanyShell } from './components/EditCompanyShell';
import { EditCompanyContainer } from './styles';

const EditCompany: NextPage = () => {
  return (
    <>
      <EditCompanyContainer>
        <Sidebar />
        <EditCompanyShell />
      </EditCompanyContainer>
    </>
  );
};

export default EditCompany;
