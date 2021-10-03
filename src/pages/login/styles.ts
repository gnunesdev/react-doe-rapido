import styled from 'styled-components';

import { InputContainer } from '~/components/Input/styles';

export const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: ${(props) => props.theme.containers.desktop};
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FormStyled = styled.form`
  margin-top: 1.8rem;
  width: 480px;

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
