import { NextPage } from 'next';

import { BackofficeContainer } from '../components/BackofficeContainer';
import { EditContactForm } from './components/EditContactForm';
import { withSSRAuth } from '~/utils/withSSRAuth';

const EditContactPage: NextPage = () => {
  return (
    <BackofficeContainer>
      <EditContactForm />
    </BackofficeContainer>
  );
};

export const getServerSideProps = withSSRAuth(async (context) => {
  return {
    props: {},
  };
});

export default EditContactPage;
