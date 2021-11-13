import { parseCookies, setCookie } from 'nookies';
import { useState, useEffect } from 'react';

export default function usePersistedState(key: string, initialState: any) {
  const [state, setState] = useState(() => {
    const cookies = parseCookies();
    const storageValue = cookies[key];

    if (storageValue) {
      return cookies[key];
    } else {
      return initialState;
    }
  });

  useEffect(() => {
    setCookie(undefined, key, state, {
      path: '/',
    });
  }, [key, state]);

  return [state, setState];
}
