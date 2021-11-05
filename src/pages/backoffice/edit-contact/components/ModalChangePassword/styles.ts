import styled from 'styled-components';

import { ButtonContainer } from '~/components/Button/styles';
import { InputContainer } from '~/components/Input/styles';
import { TextStyled } from '~/components/Text/styles';
import { TitleStyled } from '~/components/Title/styles';

export const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 60%);

  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContainer = styled.div`
  background: ${(props) => props.theme.colors.background};
  width: 620px;

  padding: 50px;

  ${ButtonContainer} {
    margin-top: 3rem;
    width: 100%;
  }

  ${TitleStyled} {
    text-align: center;
    margin-bottom: 2rem;
  }

  ${TextStyled} {
    margin-bottom: 1.8rem;
  }
`;

export const Form = styled.form`
  width: 100%;

  ${InputContainer} {
    :not(:first-child) {
      margin-top: 1.4rem;
    }
  }
`;
