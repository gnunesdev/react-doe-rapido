import styled from 'styled-components';

import { ButtonContainer } from '~/components/Button/styles';
import { InputContainer } from '~/components/Input/styles';
import { TextStyled } from '~/components/Text/styles';
import { TitleStyled } from '~/components/Title/styles';

export const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 60%);

  z-index: 1;

  position: fixed;
  top: 0;
  left: 0;
`;

export const ModalContainer = styled.div`
  background: ${(props) => props.theme.colors.background};
  width: 620px;
  z-index: 2;

  position: fixed;

  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

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
