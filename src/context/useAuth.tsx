import jwtDecode from 'jwt-decode';
import Router, { useRouter } from 'next/router';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { api, publicApi } from '~/services/api';

interface User {
  id: number;
  name: string;
  email: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthProviderContextData {
  user: User;
  isLoggedIn: false;
  signIn: (credentials: SignInCredentials) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface LoginResponse {
  access: {
    token: string;
    refreshToken: string;
  };
  company: any;
  user: User;
}

interface JwtTokenResponse {
  email: string;
  exp: number;
  iat: number;
  id: string;
  nbf: number;
  unique_name: string;
}

export function signOut() {
  destroyCookie(undefined, 'doerapido.token');
  destroyCookie(undefined, 'doerapido.refreshToken');

  Router.push('/login');
}

const AuthContext = createContext({} as AuthProviderContextData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();

  const [user, setUser] = useState<User>();
  const [company, setCompany] = useState<any>();
  const isLoggedIn = false;

  useEffect(() => {
    const { 'doerapido.token': token } = parseCookies();

    if (token) {
      const data: JwtTokenResponse = jwtDecode(token);
      updateInfoOnLogin(data.id);
    }
  }, []);

  async function updateInfoOnLogin(id: string) {
    try {
      const { data: user } = await api(`/user/${id}`);
      const { data: company } = await api(`/companyByUserId/${id}`);

      setUser({
        id: user.id,
        email: user.name,
        name: user.name,
      });

      setCompany({
        company,
      });
    } catch (error) {
      console.error(error);
      signOut();
    }
  }

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await publicApi.post<LoginResponse>('login', {
        email,
        password,
      });

      const { user, access, company } = response.data;

      setCookie(undefined, 'doerapido.token', access.token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      });
      setCookie(undefined, 'doerapido.refreshToken', access.refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      });

      setUser({
        id: user.id,
        email: user.email,
        name: user.name,
      });

      if (company) {
        setCompany(company);
      }

      api.defaults.headers['Authorization'] = `Bearer ${access.token}`;

      router.push('/backoffice');
    } catch (error) {
      console.error('error', error);
      toast.error(
        'Ocorreu algum erro no servidor, verifiique as informações ou tente novamente mais tarde.'
      );
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error('Context was not provided');
  }

  return context;
}
