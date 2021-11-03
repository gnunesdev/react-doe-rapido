import styled from 'styled-components';

import { ButtonContainer } from '~/components/Button/styles';
import { InputContainer } from '~/components/Input/styles';
import { medium } from '~/styles/variables';

export const LoginFormContainer = styled.div`
  width: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;

  @media (min-width: ${medium}) {
    max-width: 480px;
    padding: 0;
  }
`;

export const LoginFormStyled = styled.form`
  width: 100%;
  margin-top: 18px;
  ${InputContainer} {
    &:not(:first-child) {
      margin-top: 14px;
    }
  }
`;

export const ButtonsContainer = styled.div`
  margin-top: 24px;
  width: 100%;
  display: flex;
  flex-direction: column;

  ${ButtonContainer} {
    flex: 1;
    &:not(:first-child) {
      margin-top: 16px;
    }
  }

  @media (min-width: ${medium}) {
    flex-direction: row;

    ${ButtonContainer} {
      &:not(:first-child) {
        margin-top: 0;
        margin-left: 16px;
      }
    }
  }
`;
