import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;

    colors: {
      primary: string;
      secondary: string;

      background: string;
      backgroundHarder: string;

      text: string;
      coloredText: string;

      gray: string;
      gray200: string;
      gray100: string;
    };
  }
}
