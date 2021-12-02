import styled from 'styled-components';

import { ButtonContainer } from '~/components/Button/styles';

export const FiltersModalContainer = styled.div`
  flex: 1;
  width: 84%;
  max-width: 460px;
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

  .needs {
    margin-top: 12px;
  }

  .range {
    margin-top: 8px;
    display: flex;
    align-items: center;
    &__value {
      min-width: 7.2rem;
      margin-left: 8px;
      text-align: center;
      ${(props) => props.theme.typography.body}
      color: ${(props) => props.theme.colors.primary}
    }
  }
`;

export const Overlay = styled.div`
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 60%);
  position: absolute;
  top: 0;
  left: 0;

  z-index: 5;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  overflow: auto;
`;
