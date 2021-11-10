import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;
    colors: {
      primary: string;
      primaryHover: string;
      secondary: string;
      background: string;
      red: string;
    };
    foreground: {
      primary: string;
    };
    containers: {
      page: string;
    };
    typography: {
      landingPage: {
        title1: string;
        title2: string;
        title3: string;
        text1: string;
        text2: string;
        text3: string;
      };
      headline: string;
      title: string;
      body: string;
      body2: string;
    };
  }
}
