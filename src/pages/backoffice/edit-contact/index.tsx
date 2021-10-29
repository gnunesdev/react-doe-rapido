import { NextPage } from 'next';

import { Sidebar } from '~/components/Sidebar';

import { EditContactForm } from './components/EditContactForm';
import { EditContactContainer } from './styles';

const EditContactPage: NextPage = () => {
  return (
    <EditContactContainer>
      <Sidebar />
      <EditContactForm />
    </EditContactContainer>
  );
};

export default EditContactPage;
