import styled from 'styled-components';

import { ActionButtonContainer } from '~/components/ActionButton/styles';
import { TitleStyled } from '~/components/Title/styles';
import { small } from '~/styles/variables';

export const CompanyDrawerContainer = styled.div`
  overflow: auto;
  height: 100vh;
  width: 90%;
  background: ${(props) => props.theme.colors.background};
  z-index: 4;
  position: fixed;
  top: 0;
  left: 0;

  @media (min-width: ${small}) {
    max-width: 480px;
  }
`;

export const Header = styled.header`
  height: 60px;
  width: 100%;
  background: ${(props) => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 20px;

  ${TitleStyled} {
    max-width: calc(100% - 60px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const Close = styled.button`
  align-self: stretch;
  margin-left: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  cursor: pointer;
`;

export const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 60%);

  z-index: 3;

  position: fixed;
  top: 0;
  left: 0;
`;

export const CompanyInfoContainer = styled.div`
  padding: 3rem;

  .address {
    margin-top: 1rem;
  }

  .distance {
    margin-top: 2rem;
  }

  .needs {
    margin-top: 2rem;
  }

  .contacts {
    margin-top: 2rem;

    strong {
      display: block;
      margin-bottom: 0.8rem;
    }

    p {
      text-overflow: ellipsis;

      overflow: hidden;

      &:not(:first-child) {
        margin-top: 0.2rem;
      }
    }
  }

  .actions {
    margin-top: 3rem;
    display: flex;
    align-items: center;

    ${ActionButtonContainer} {
      :not(:first-child) {
        margin-left: 0.6rem;
      }
    }
  }

  ul {
    margin-top: 0.6rem;
  }

  li {
    margin-left: 2rem;
    list-style-type: disc;
    font-size: 1.8rem;

    &:not(:last-child) {
      margin-bottom: 0.4rem;
    }
  }

  strong {
    font-size: 2rem;
  }
  p {
    font-size: 1.8rem;
  }
`;
