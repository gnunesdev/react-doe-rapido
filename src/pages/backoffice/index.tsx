import { GetServerSideProps, NextPage } from 'next';

import { useAppSelector } from '~/hooks/redux';

import { Sidebar } from './components/Sidebar';

const BackofficePage: NextPage = () => {
  return (
    <>
      <Sidebar />
    </>
  );
};

export default BackofficePage;
