import styled from 'styled-components';

import { TextStyled } from '~/components/Text/styles';

export const InfoBannerContainer = styled.div`
  position: fixed;

  top: 8rem;
  left: 2rem;

  background: ${(props) => props.theme.colors.primary};
  border-radius: 4px;
  box-shadow: 0px 0px 10px -3px rgba(0, 0, 0, 0.85);

  padding: 1.2rem 2rem;

  > div {
    display: flex;
    align-items: center;
  }

  ${TextStyled} {
    margin-left: 1rem;
    max-width: 300px;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
`;

export const InfoBannerContainerMobile = styled.div`
  position: absolute;
  background: ${(props) => props.theme.colors.primary};
  border-radius: 50%;
`;

export const InfoBannerMobileButton = styled.div`
  position: fixed;
  bottom: 90px;
  left: 20px;
  background: ${(props) => props.theme.colors.primary};
  border-radius: 50%;
  width: 60px;
  height: 60px;

  cursor: pointer;

  box-shadow: 0px 0px 8px -3px rgba(0, 0, 0, 0.85);

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 60%);
  position: fixed;
  top: 0;
  left: 0;

  z-index: 5;
`;

export const BannerMobile = styled.div`
  background: ${(props) => props.theme.colors.primary};
  z-index: 6;

  width: calc(100% - 4rem);

  left: 50%;
  transform: translateX(-50%);

  position: absolute;
  overflow: hidden;
  padding: 2rem;

  > div {
    display: flex;
    align-items: center;
  }

  ${TextStyled} {
    margin-left: 1rem;
    max-width: 300px;
  }
`;
