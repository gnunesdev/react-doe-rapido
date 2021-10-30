import { NextPage } from 'next';

import { EditContactForm } from './components/EditContactForm';
import { EditContactContainer } from './styles';
import { Sidebar } from '~/components/Sidebar';

const EditContactPage: NextPage = () => {
  return (
    <EditContactContainer>
      <Sidebar />
      <EditContactForm />
    </EditContactContainer>
  );
};

export default EditContactPage;
