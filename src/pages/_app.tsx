import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'styled-components';

import { OnboardingStepsProvider } from './backoffice/onboarding/hooks/useOnboardingSteps';
import { Header } from '~/components/Header';
import { SidebarProvider } from '~/hooks/useSidebarState';
import GlobalStyle from '~/styles/global';
import light from '~/styles/themes/light';

import 'react-toastify/dist/ReactToastify.min.css';
import { AuthProvider } from '~/context/useAuth';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={light}>
      <AuthProvider>
        <OnboardingStepsProvider>
          <SidebarProvider>
            <Header />
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
          </SidebarProvider>
        </OnboardingStepsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
export default MyApp;
