import styled from 'styled-components';

import { InputContainer } from '~/components/Input/styles';

export const LoginFormContainer = styled.div`
  display: flex;
  flex-direction: column;

  max-width: 480px;
  width: 100%;
`;

export const LoginFormStyled = styled.form`
  margin-top: 1.8rem;
  ${InputContainer} {
    margin-bottom: 1.4rem;
  }
`;

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
