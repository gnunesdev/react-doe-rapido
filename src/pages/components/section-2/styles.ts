import styled from 'styled-components';

import { ButtonContainer } from '~/components/ButtonLink/styles';
import { medium, small } from '~/styles/variables';

export const Wrapper = styled.section`
  width: 100%;
  padding: 24px;
  background-color: ${(props) => props.theme.colors.primary};
  .container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .title {
    color: ${(props) => props.theme.foreground.primary};
    ${(props) => props.theme.typography.landingPage.title1}
    text-align: center;
  }
  .text {
    margin-top: 8px;
    color: ${(props) => props.theme.foreground.primary};
    ${(props) => props.theme.typography.landingPage.text1}
    text-align: center;
  }
  ${ButtonContainer} {
    margin-top: 20px;
  }

  @media (min-width: ${small}) {
    padding: 60px 0;

    .container {
      max-width: 650px;
      margin: 0 auto;
    }
    .title {
      ${(props) => props.theme.typography.landingPage.title2}
    }
    .text {
      margin-top: 16px;
      ${(props) => props.theme.typography.landingPage.text2}
    }
    ${ButtonContainer} {
      margin-top: 24px;
    }
  }
  @media (min-width: ${medium}) {
    .container {
      max-width: 900px;
    }
    .title {
      ${(props) => props.theme.typography.landingPage.title3}
    }
    .text {
      ${(props) => props.theme.typography.landingPage.text3}
    }
    ${ButtonContainer} {
      margin-top: 32px;
    }
  }
`;
