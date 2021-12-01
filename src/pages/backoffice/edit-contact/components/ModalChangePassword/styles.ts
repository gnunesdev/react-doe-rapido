import styled from 'styled-components';

import { ButtonContainer } from '~/components/Button/styles';
import { InputContainer } from '~/components/Input/styles';
import { TextStyled } from '~/components/Text/styles';
import { TitleStyled } from '~/components/Title/styles';
import { small } from '~/styles/variables';

export const Overlay = styled.div`
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 60%);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContainer = styled.div`
  width: calc(100% - 48px);

  max-width: 620px;
  background: ${(props) => props.theme.colors.background};
  padding: 24px;

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

  @media (min-width: ${small}) {
    padding: 48px;
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
