import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  title: 'light',
  colors: {
    primary: '#3483B4',
    secondary: '#62b6cb',
    background: '#F3F3F3',
    red: '#ff4d4d',
  },
  foreground: {
    primary: '#FFF',
  },
  containers: {
    page: 'calc(100vh - 62px)',
  },
  typography: {
    headline: `
      font-size: 2.4rem;
      font-weight: 900;
    `,
    title: `
      font-size: 3.6rem;
      font-weight: 900;
    `,
    body: `
      font-size: 1.8rem;
      font-weight: 900;
    `,
    body2: `
      font-size: 2.0rem;
      font-weight: 900;
    `,
  },
};

export default theme;
