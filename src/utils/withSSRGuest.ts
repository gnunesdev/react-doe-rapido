import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next';
import { parseCookies } from 'nookies';

export function withSSRGuest<P>(fn: GetServerSideProps<P>) {
  return async (
    context: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(context);

    if (
      cookies['onboarding'] &&
      cookies['onboarding'] !== 'finished' &&
      cookies['doerapido.token']
    ) {
      return {
        redirect: {
          destination: '/backoffice/onboarding',
          permanent: false,
        },
      };
    }

    if (cookies['doerapido.token']) {
      return {
        redirect: {
          destination: '/backoffice',
          permanent: false,
        },
      };
    }

    return await fn(context);
  };
}
