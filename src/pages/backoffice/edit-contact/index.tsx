import { NextPage } from 'next';

import { BackofficeContainer } from '../components/BackofficeContainer';
import { EditContactForm } from './components/EditContactForm';

const EditContactPage: NextPage = () => {
  return (
    <BackofficeContainer>
      <EditContactForm />
    </BackofficeContainer>
  );
};

export default EditContactPage;
