import styled from 'styled-components';

interface ButtonContainerProps {
  variant: 'primary' | 'secondary';
  width: number;
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: ${(props) => `${props.width}px`};
  padding: 1.6rem;
  background: ${(props) => {
    switch (props.variant) {
      case 'primary':
        return props.theme.colors.primary;
      case 'secondary':
        return props.theme.colors.white;
    }
  }};
  color: ${(props) => {
    switch (props.variant) {
      case 'primary':
        return props.theme.colors.white;
      case 'secondary':
        return props.theme.colors.primary;
    }
  }};
  border: ${(props) => {
    switch (props.variant) {
      case 'secondary':
        return `1px solid ${props.theme.colors.primary}`;
    }
  }};
  font-size: 1.8rem;
  font-weight: bold;

  transition: all 0.235s ease-in-out;
`;
