import styled from 'styled-components';

import { ButtonContainer } from '~/components/Button/styles';
import { TextStyled } from '~/components/Text/styles';
import { TitleStyled } from '~/components/Title/styles';
import { small } from '~/styles/variables';

export const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 60%);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContainer = styled.div`
  background: #fff;

  width: calc(100% - 48px);
  max-width: 620px;
  padding: 24px;

  @media (min-width: ${small}) {
    padding: 48px;
  }

  ${TitleStyled} {
    text-align: center;
    margin-bottom: 2rem;
  }

  ${TextStyled} {
    margin-bottom: 1.8rem;
  }

  ${ButtonContainer} {
    margin-top: 1rem;
    width: 100%;
  }
`;
