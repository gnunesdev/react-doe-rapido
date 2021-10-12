import styled from 'styled-components';

export const SidebarContainer = styled.nav`
  width: 280px;
  height: calc(100vh - 62px);

  background: ${(props) => props.theme.colors.primary};

  display: block;
  padding: 2.4rem;
`;

export const LinksSection = styled.div`
  &:not(:first-child) {
    margin-top: 4rem;
  }

  h3 {
    color: ${(props) => props.theme.colors.white};
    font-size: 1.8rem;
  }

  ul {
    margin-top: 1.4rem;
  }

  li {
    font-size: 1.6rem;
    color: ${(props) => props.theme.colors.white};

    &:not(:first-child) {
      margin-top: 0.8rem;
    }
  }
`;