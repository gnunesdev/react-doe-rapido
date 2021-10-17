import { GetServerSideProps, NextPage } from 'next';

import { Header } from '~/components/Header';
import { Sidebar } from '~/components/Sidebar';

const BackofficePage: NextPage = () => {
  return (
    <>
      <Sidebar />
    </>
  );
};

export default BackofficePage;
