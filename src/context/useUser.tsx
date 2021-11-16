import { createContext, useContext, useState } from 'react';

export interface User {
  id: number;
  name: string;
  email: string;
}

interface UserContextData {
  user: User;
  updateUser: (user: User) => void;
}

const UserContext = createContext({} as UserContextData);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState<User>();

  console.log({ user });

  function updateUser({ id, name, email }) {
    setUser({ id, name, email });
  }

  return (
    <UserContext.Provider value={{ user, updateUser }}>{children}</UserContext.Provider>
  );
};

export function useUserContext() {
  const context = useContext(UserContext);

  if (!context) {
    throw Error('Context was not provided');
  }

  return context;
}
