import styled from 'styled-components';

import { Container } from '~/components/PageContainer/styles';
import { small } from '~/styles/variables';

export const StyledPageContainer = styled(Container)`
  font-family: 'Montserrat', sans-serif;
`;

export const Footer = styled.footer`
  width: 100%;
  padding: 16px;
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.foreground.primary};
  font-size: 1.8rem;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: ${small}) {
    padding: 24px 48px;
    flex-direction: row;
  }
`;

export const FooterSection = styled.div`
  &:not(:first-child) {
    margin-top: 4px;
  }
  @media (min-width: ${small}) {
    &:not(:first-child) {
      margin-top: 0;
    }
  }
`;
