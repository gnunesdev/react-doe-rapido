import styled from 'styled-components';

import { StepDescription } from './components/step/styles';
import { ButtonContainer } from '~/components/ButtonLink/styles';
import { medium, small } from '~/styles/variables';

export const Wrapper = styled.section`
  width: 100%;
  padding: 24px;
  background-color: #fff;
  .container {
    width: 100%;
    max-width: 485px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .header {
    display: flex;
    flex-direction: column;
    align-items: center;

    &__image {
      align-self: center;
      display: block;
      width: 100%;
      max-width: 220px;
    }
    &__info {
      margin-top: 8px;
    }
    &__title {
      color: ${(props) => props.theme.colors.primary};
      ${(props) => props.theme.typography.landingPage.title1}
      text-align: center;
    }
    &__text {
      margin-top: 8px;
      color: ${(props) => props.theme.colors.primary};
      ${(props) => props.theme.typography.landingPage.text1}
      text-align: center;
    }
  }

  .steps {
    margin-top: 64px;
    display: flex;
    flex-direction: column;
    align-items: center;

    &__arrow {
      color: ${(props) => props.theme.colors.primary};
      margin: 16px 0;
    }
  }

  ${ButtonContainer} {
    margin-top: 64px;
  }

  @media (min-width: ${small}) {
    padding: 60px 40px;

    .container {
      max-width: none;
    }

    .header {
      flex-direction: row-reverse;
      &__info {
        margin-top: 0;
        flex: 5;
      }
      &__image {
        margin-left: 32px;
        flex: 3;
        max-width: none;
        min-width: 0;
      }
      &__title {
        ${(props) => props.theme.typography.landingPage.title2}
        text-align: left;
      }
      &__text {
        margin-top: 16px;
        ${(props) => props.theme.typography.landingPage.text2}
        text-align: left;
      }
    }

    .steps {
      width: 100%;
      max-width: 720px;
      flex-direction: row;
      justify-content: space-between;
      &__arrow {
        margin: 0;
        transform: translateY(-35px) rotate(-90deg);
      }
    }
  }
  @media (min-width: ${medium}) {
    padding: 90px 62px;

    .container {
      max-width: 1200px;
    }
    .header {
      &__image {
        margin-left: 150px;
        width: 335px;
        flex-grow: 0;
        flex-basis: auto;
      }
      &__title {
        ${(props) => props.theme.typography.landingPage.title3}
      }
      &__text {
        margin-top: 32px;
        ${(props) => props.theme.typography.landingPage.text3}
      }
    }
    .steps {
      max-width: none;
      ${StepDescription} {
        font-size: 3.2rem;
      }
    }
    ${ButtonContainer} {
      font-size: 2.8rem;
    }
  }
`;
