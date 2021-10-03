import styled from 'styled-components';

export const HeaderContainer = styled.header`
  width: 100vw;
  height: 6.2rem;
  background: ${(props) => props.theme.colors.primary};

  display: flex;
  align-items: center;

  padding: 0 2.4rem;

  h1 {
    font-size: 2.8rem;
    font-weight: bold;
    display: block;

    color: ${(props) => props.theme.colors.white};

    margin-right: 0.8rem;
  }
`;
