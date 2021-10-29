import { NextPage } from 'next';

import { EditCompanyForm } from './components/EditCompanyForm';
import { EditCompanyContainer } from './styles';
import { Sidebar } from '~/components/Sidebar';

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
