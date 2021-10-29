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
    desktop: 'calc(100vh - 6.2rem)',
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
      font-size: 18px;
      font-weight: 900;
    `,
  },
};

export default theme;
