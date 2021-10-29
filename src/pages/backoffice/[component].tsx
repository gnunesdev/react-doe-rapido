import { GetServerSideProps, NextPage } from 'next';

import EditCompany from './components/edit-company';
import { Sidebar } from '~/components/Sidebar';

interface BackofficePageProps {
  componentToRender: string;
}

const BackofficePage: NextPage<BackofficePageProps> = ({ componentToRender }) => {
  return (
    <>
      <Sidebar />
      {componentToRender === 'edit-company' && <EditCompany />}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { component } = query;

  return {
    props: {
      componentToRender: component,
    },
  };
};

export default BackofficePage;
