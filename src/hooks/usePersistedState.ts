import { useState, useEffect } from 'react';

import Cookie from 'js-cookie';

export default function usePersistedState(key: string, initialState: any) {
  const [state, setState] = useState(() => {
    const storageValue = Cookie.get(key);

    if (storageValue) {
      return JSON.parse(storageValue);
    } else {
      return initialState;
    }
  });

  useEffect(() => {
    Cookie.set(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}
