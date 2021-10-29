import { NextPage } from 'next';

import { Sidebar } from '~/components/Sidebar';

import { EditCompanyForm } from './components/EditCompanyForm';
import { EditCompanyContainer } from './styles';

const EditCompanyPage: NextPage = () => {
  return (
    <>
      <EditCompanyContainer>
        <Sidebar />
        <EditCompanyForm />
      </EditCompanyContainer>
    </>
  );
};

export default EditCompanyPage;
