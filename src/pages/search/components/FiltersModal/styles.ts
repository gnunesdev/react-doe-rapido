import styled from 'styled-components';

import { ButtonContainer } from '~/components/Button/styles';

export const FiltersModalContainer = styled.div`
  width: 84%;
  height: 100vh;

  top: 0;
  right: 0;

  position: fixed;
  z-index: 6;

  background: #fff;

  header {
    background: ${(props) => props.theme.colors.primary};
    height: 6.2rem;
    display: flex;
    align-items: center;
    padding-left: 2rem;
  }

  section {
    padding: 2.4rem;

    ${ButtonContainer} {
      margin-top: 3rem;
    }
  }
`;

export const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 60%);
  position: absolute;
  top: 0;
  left: 0;

  z-index: 5;

  display: flex;
  align-items: center;
  justify-content: center;
`;
