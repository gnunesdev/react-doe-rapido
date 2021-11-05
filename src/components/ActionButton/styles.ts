import styled from 'styled-components';

export const ActionButtonContainer = styled.button`
  width: 48px;
  height: 48px;
  background: ${(props) => props.theme.colors.primary};
  border-radius: 16px;

  transition: all 0.175s ease-in;

  &:hover {
    border-radius: 50%;
    background: ${(props) => props.theme.colors.primaryHover};
  }
`;
