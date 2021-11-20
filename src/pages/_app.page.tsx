import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'styled-components';

import { OnboardingStepsProvider } from './backoffice/onboarding/hooks/useOnboardingSteps';
import { AuthProvider } from '~/context/useAuth';
import { CompanyProvider } from '~/context/useCompany';
import { UserProvider } from '~/context/useUser';
import GlobalStyle from '~/styles/global';
import light from '~/styles/themes/light';

import 'react-toastify/dist/ReactToastify.min.css';
import 'react-loading-skeleton/dist/skeleton.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={light}>
      <UserProvider>
        <CompanyProvider>
          <AuthProvider>
            <OnboardingStepsProvider>
              <GlobalStyle />
              <Component {...pageProps} />
              <ToastContainer
                theme="colored"
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </OnboardingStepsProvider>
          </AuthProvider>
        </CompanyProvider>
      </UserProvider>
    </ThemeProvider>
  );
}
export default MyApp;
