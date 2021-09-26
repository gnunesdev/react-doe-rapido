import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html {
    font-size: 62.5%;
    scroll-behavior: smooth;
  }
  body {
    background: ${(props) => props.theme.colors.background};
  }
  body,
  input,
  textarea,
  select,
  button {
    font: 400 1rem "Roboto", sans-serif;
  }
  button {
    cursor: pointer;
    background: none;
    border: none;
    -webkit-appearance: none;
  }
  a, em {
    color: inherit;
    text-decoration: none;
  }
  ul, li {
    list-style-type: none;
  }
`;
