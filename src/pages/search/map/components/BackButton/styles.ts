import styled from 'styled-components';

export const BackButtonContainer = styled.button`
  background: ${(props) => props.theme.colors.primary};
  border-radius: 50%;

  position: fixed;
  bottom: 2rem;
  left: 2rem;

  width: 60px;
  height: 60px;
`;
