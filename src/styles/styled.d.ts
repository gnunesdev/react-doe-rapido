import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;

    colors: {
      primary: string;
      secondary: string;

      background: string;

      white: string;
      black: string;
      red: string;
    };

    containers: {
      desktop: string;
    };
  }
}
