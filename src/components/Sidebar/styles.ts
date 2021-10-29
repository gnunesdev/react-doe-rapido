import styled from 'styled-components';

export const SidebarContainer = styled.nav`
  min-width: 280px;
  max-width: 280px;
  min-height: calc(100vh - 62px);

  background: ${(props) => props.theme.colors.primary};

  display: block;
  padding: 2.4rem;
`;

export const LinksSection = styled.div`
  &:not(:first-child) {
    margin-top: 4rem;
  }

  h3 {
    color: #fff;
    font-size: 1.8rem;
  }

  ul {
    margin-top: 1.4rem;
  }

  li {
    font-size: 1.6rem;
    color: #fff;

    &:not(:first-child) {
      margin-top: 0.8rem;
    }
  }
`;
