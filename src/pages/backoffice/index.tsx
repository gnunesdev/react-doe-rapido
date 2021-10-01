import { NextPage } from 'next';

import { Header } from '~/components/Header';

import { Sidebar } from './components/Sidebar';

const BackofficePage: NextPage = () => {
  return (
    <>
      <Header />
      <Sidebar />
    </>
  );
};

export default BackofficePage;
