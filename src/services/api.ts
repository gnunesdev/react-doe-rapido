import axios, { AxiosError } from 'axios';
import { parseCookies, setCookie } from 'nookies';

import { signOut } from '~/context/useAuth';

let isRefreshing = false;
let failedRequestsQueue: any[] = [];

// can be called outside SSR
export const api = setupAuthorizedApi();

// needs to be instantieted to work in SSR
export function setupAuthorizedApi(context = undefined) {
  let cookies = parseCookies(context);

  const apiClient = axios.create({
    baseURL: 'https://doerapidoapi.azurewebsites.net/api',
    headers: {
      Authorization: `Bearer ${cookies['doerapido.token']}`,
    },
  });

  apiClient.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        cookies = parseCookies();

        const { 'doerapido.refreshToken': refreshToken, 'doerapido.token': token } = cookies;
        const originalConfig = error.config;

        if (!isRefreshing) {
          isRefreshing = true;

          api
            .post('/refresh-token', {
              token,
              refreshToken,
            })
            .then((response) => {
              const { token } = response.data;

              setCookie(undefined, 'doerapido.token', token, {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/',
              });
              setCookie(undefined, 'doerapido.refreshToken', response.data.refreshToken, {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/',
              });

              apiClient.defaults.headers['Authorization'] = `Bearer ${token}`;

              failedRequestsQueue.forEach((request) => request.onSuccess(token));
              failedRequestsQueue = [];
            })
            .catch((error) => {
              failedRequestsQueue.forEach((request) => request.onFailure(error));
              failedRequestsQueue = [];

              if (process.browser) {
                signOut();
              }
            })
            .finally(() => {
              isRefreshing = false;
            });
        }

        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({
            onSuccess: (token: string) => {
              originalConfig.headers['Authorization'] = `Bearer ${token}`;
              resolve(apiClient(originalConfig));
            },
            onFailure: (error: AxiosError) => {
              reject(error);
            },
          });
        });
      }

      return Promise.reject(error);
    }
  );

  return apiClient;
}

export const publicApi = axios.create({
  baseURL: 'https://doerapidoapi.azurewebsites.net/api',
});
