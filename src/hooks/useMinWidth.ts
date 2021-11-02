import { useState, useEffect } from 'react';

import { Breakpoint } from '~/styles/variables';

export const useMinWidth = () => {
  const [screenWidth, setScreenWidth] = useState<number>(Breakpoint.large);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    window.addEventListener('resize', () => setScreenWidth(window.innerWidth));
    return () =>
      window.removeEventListener('resize', () => setScreenWidth(window.innerWidth));
  }, []);

  return (breakpoint: Breakpoint) => screenWidth >= breakpoint;
};
