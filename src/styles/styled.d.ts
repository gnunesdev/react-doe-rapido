import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;
    spacing: {
      space400: '6.4rem';
      space300: '4.8rem';
      space200: '2.4rem';
      space100: '1.2rem';
      space50: '.8rem';
    };
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
