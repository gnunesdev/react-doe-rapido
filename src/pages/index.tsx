import { useEffect } from 'react';

import type { NextPage } from 'next';

import { getCompanysToRenderInMap } from '~/services/map';

import VercelLogo from '../assets/vercel.svg';

const Home: NextPage = () => {
  async function get() {
    const teste = await getCompanysToRenderInMap('138616983');
    console.log('teste', teste);
  }

  useEffect(() =>
    (() => {
      get();
    })()
  );

  return (
    <>
      <h1>teste</h1>
      <VercelLogo />
    </>
  );
};

export default Home;
