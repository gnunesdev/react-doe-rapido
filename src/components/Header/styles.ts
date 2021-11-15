import styled from 'styled-components';

import { large, small } from '~/styles/variables';

export const HeaderVolume = styled.div`
  width: 100%;
  height: 62px;
`;

export const HeaderContainer = styled.header`
  width: 100%;
  height: 62px;
  padding-left: 18px;
  padding-right: 24px;
  background: ${(props) => props.theme.colors.primary};
  position: fixed;
  z-index: 2;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (min-width: ${large}) {
    padding-left: 24px;
  }
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

export const Menu = styled.div`
  align-self: stretch;
  width: 62px;
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;

  cursor: pointer;
`;

export const Title = styled.h1`
  ${(props) => props.theme.typography.headline}
  color: ${(props) => props.theme.foreground.primary};
`;

export const Icon = styled.div`
  margin-left: 8px;
`;
