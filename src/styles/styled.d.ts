import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;
    colors: {
      primary: string;
      secondary: string;
      background: string;
      red: string;
    };
    foreground: {
      primary: string;
    };
    containers: {
      desktop: string;
    };
    typography: {
      headline: string;
      title: string;
      body: string;
    };
  }
}
