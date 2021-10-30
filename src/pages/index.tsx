import type { NextPage } from 'next';
import { useEffect } from 'react';

import VercelLogo from '../assets/vercel.svg';
import { getCompanysToRenderInMap } from '~/services/map';

const Home: NextPage = () => {
  async function get() {
    await getCompanysToRenderInMap('138616983');
    // const teste = await getCompanysToRenderInMap('138616983');
    // console.log('teste', teste);
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
