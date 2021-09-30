import { Provider } from 'react-redux';

import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';

import { store } from '~/store';
import GlobalStyle from '~/styles/global';
import light from '~/styles/themes/light';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={light}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}
export default MyApp;
