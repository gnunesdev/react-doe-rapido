import { NextPage } from 'next';

import { Header } from '~/components/Header';

import { Sidebar } from './components/Sidebar';

const Backoffice: NextPage = () => {
  return (
    <>
      <Header />
      <Sidebar />
    </>
  );
};

export default Backoffice;
