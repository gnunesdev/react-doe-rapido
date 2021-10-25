import { NextPage } from 'next';

import { EditCompanyShell } from './components/EditCompanyShell';
import { EditCompanyContainer } from './styles';

const EditCompany: NextPage = () => {
  return (
    <EditCompanyContainer>
      <EditCompanyShell />
    </EditCompanyContainer>
  );
};

export default EditCompany;
