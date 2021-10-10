import styled from 'styled-components';

import { InputContainer } from '~/components/Input/styles';
import { TitleStyled } from '~/components/Title/styles';

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
  margin-top: 3.2rem;

  button {
    width: 50%;

    &:first-child {
      margin-right: 1rem;
    }
  }
`;

export const CodeLinkContainer = styled.div`
  margin-top: 0.8rem;
`;
