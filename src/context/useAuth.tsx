import jwtDecode from 'jwt-decode';
import Router, { useRouter } from 'next/router';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useCompanyContext } from './useCompany';
import { User, useUserContext } from './useUser';
import { api, publicApi } from '~/services/api';

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthProviderContextData {
  isLoggedIn: false;
  signIn: (credentials: SignInCredentials) => void;
  signInOnOnboarding: (access: AccessCredential) => void;
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

export interface JwtTokenResponse {
  email: string;
  exp: number;
  iat: number;
  id: string;
  nbf: number;
  unique_name: string;
}

interface AccessCredential {
  token: string;
  refreshToken: string;
}

export function signOut() {
  destroyCookie(undefined, 'doerapido.token', { path: '/' });
  destroyCookie(undefined, 'doerapido.refreshToken', { path: '/' });

  Router.push('/');
}

const AuthContext = createContext({} as AuthProviderContextData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const isLoggedIn = false;

  const { updateUser } = useUserContext();
  const { updateCompany } = useCompanyContext();

  useEffect(() => {
    const { 'doerapido.token': token } = parseCookies();

    if (token && router.pathname.split('/').includes('onboarding')) {
      const data: JwtTokenResponse = jwtDecode(token);
      updateInfoOnLogin(data.id);
    }
  }, []);

  async function updateInfoOnLogin(id: string) {
    try {
      const dataUser = await api(`/user/${id}`);

      if (dataUser.data) {
        updateUser({
          id: dataUser.data.user?.id,
          email: dataUser.data.user?.email,
          name: dataUser.data.user?.name,
        });
      }

      const dataCompany = await api(`/companyByUserId/${id}`);

      if (dataCompany.data) {
        updateCompany(dataCompany.data.company);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await publicApi.post<LoginResponse>('login', {
        email,
        password,
      });

      const { user: userData, access, company: companyData } = response.data;

      setCookie(undefined, 'doerapido.token', access.token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      });
      setCookie(undefined, 'doerapido.refreshToken', access.refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      });

      updateUser({
        id: userData.id,
        email: userData.email,
        name: userData.name,
      });

      if (companyData) {
        updateCompany(companyData);
      }

      api.defaults.headers['Authorization'] = `Bearer ${access.token}`;

      const cookies = parseCookies();

      if (cookies.onboardingStep !== 'finished') {
        router.push(`/backoffice/onboarding/${cookies.onboardingStep}`);
      } else {
        router.push('/backoffice');
      }
    } catch (error) {
      console.error('error', error);
      toast.error(
        'Ocorreu algum erro no servidor, verifiique as informações ou tente novamente mais tarde.'
      );
    }
  }

  async function signInOnOnboarding({ token, refreshToken }: AccessCredential) {
    try {
      setCookie(undefined, 'doerapido.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      });
      setCookie(undefined, 'doerapido.refreshToken', refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      });

      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      const jwtData: JwtTokenResponse = jwtDecode(token);

      const { data: userData } = await api.get(`/user/${jwtData.id}`);

      updateUser({
        id: userData.id,
        email: userData.email,
        name: userData.name,
      });
    } catch (error) {
      console.error('error', error);
      toast.error(
        'Ocorreu algum erro no servidor, verifiique as informações ou tente novamente mais tarde.'
      );
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        signIn,
        signInOnOnboarding,
      }}
    >
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
