import styled from 'styled-components';

import { medium, small } from '~/styles/variables';

export const Wrapper = styled.section`
  width: 100%;
  padding: 24px;
  background-color: #fff;

  .container {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .image {
    width: 100%;
    max-width: 280px;
    display: block;
  }
  .info {
    margin-top: 16px;
    width: 100%;
  }
  .title {
    color: ${(props) => props.theme.colors.primary};
    ${(props) => props.theme.typography.landingPage.title1}
    text-align: center;
  }
  .text {
    margin-top: 8px;
    color: ${(props) => props.theme.colors.primary};
    ${(props) => props.theme.typography.landingPage.text1}
    text-align: center;
  }

  @media (min-width: ${small}) {
    padding: 60px 40px;
    .container {
      flex-direction: row;
    }
    .image {
      min-width: 0;
      max-width: none;
      flex: 2;
    }
    .info {
      margin-left: 60px;
      flex: 3;
      max-width: 71rem;
    }
    .title {
      text-align: left;
      ${(props) => props.theme.typography.landingPage.title2}
    }
    .text {
      margin-top: 16px;
      text-align: left;
      ${(props) => props.theme.typography.landingPage.text2}
    }
  }

  @media (min-width: ${medium}) {
    padding: 90px 62px;
    .container {
      width: fit-content;
      margin: 0 auto;
    }
    .image {
      width: 429px;
      flex-grow: 0;
      flex-basis: auto;
    }
    .title {
      ${(props) => props.theme.typography.landingPage.title3}
      flex-grow: 0;
      flex-basis: auto;
    }
    .text {
      margin-top: 30px;
      ${(props) => props.theme.typography.landingPage.text3}
    }
  }
`;
