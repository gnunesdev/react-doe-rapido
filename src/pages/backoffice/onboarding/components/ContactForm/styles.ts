import styled from 'styled-components';

import { ButtonContainer } from '~/components/Button/styles';
import { ButtonContainer as ButtonLinkContainer } from '~/components/ButtonLink/styles';
import { InputContainer } from '~/components/Input/styles';
import { small } from '~/styles/variables';

export const ContactFormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  @media (min-width: ${small}) {
    max-width: 480px;
  }
`;

export const ContactFormStyled = styled.form`
  margin-top: 1.8rem;

  ${InputContainer} {
    margin-bottom: 1.4rem;
  }
`;

export const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 24px;

  ${ButtonContainer}, ${ButtonLinkContainer} {
    width: auto;
    &:not(:first-child) {
      margin-top: 8px;
    }
  }

  @media (min-width: ${small}) {
    flex-direction: row;
    ${ButtonContainer}, ${ButtonLinkContainer} {
      flex: 1;
      &:not(:first-child) {
        margin-top: 0;
        margin-left: 8px;
      }
    }
  }
`;
