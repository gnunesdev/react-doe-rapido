import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';

import { Header } from '~/components/Header';
import { store } from '~/store';
import GlobalStyle from '~/styles/global';
import light from '~/styles/themes/light';

import { OnboardingStepsProvider } from './onboarding/hooks/useOnboardingSteps';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={light}>
        <OnboardingStepsProvider>
          <Header />
          <GlobalStyle />
          <Component {...pageProps} />
        </OnboardingStepsProvider>
        <ToastContainer
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
      </ThemeProvider>
    </Provider>
  );
}
export default MyApp;
