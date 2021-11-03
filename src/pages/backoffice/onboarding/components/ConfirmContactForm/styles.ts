import styled from 'styled-components';

import { InputContainer } from '~/components/Input/styles';
import { TitleStyled } from '~/components/Title/styles';
import { medium } from '~/styles/variables';

export const ConfirmContactFormContainer = styled.div`
  max-width: 480px;
  width: 100%;

  ${TitleStyled} {
    margin-bottom: 1rem;
  }

  ${InputContainer} {
    margin-top: 1.4rem;
  }
`;

export const ConfirmContactFormStyled = styled.form``;

export const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 3.2rem;

  button {
    width: auto;
    &:not(:first-child) {
      margin-top: 8px;
    }
  }

  @media (min-width: ${medium}) {
    flex-direction: row;
    button {
      flex: 1;
      &:not(:first-child) {
        margin-top: 0;
        margin-left: 8px;
      }
    }
  }
`;

export const CodeLinkContainer = styled.div`
  margin-top: 0.8rem;
`;
