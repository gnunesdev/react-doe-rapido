import styled, { css, DefaultTheme } from 'styled-components';

interface ButtonContainerProps {
  variant: 'primary' | 'secondary' | 'tertiary';
  width: number | 'auto';
}

const ButtonVariants = {
  primary: (theme: DefaultTheme) => css`
    color: ${theme.foreground.primary};

    &:before {
      background: ${theme.colors.primary};
    }

    &:after {
      background: ${theme.colors.primaryHover};
    }
  `,
  secondary: (theme: DefaultTheme) => css`
    &:before {
      background: #fff;
    }
    &:after {
      background: ${theme.colors.primary};
    }
    &:hover {
      color: #fff;
    }
    color: ${theme.colors.primary};
    border: 1px solid ${theme.colors.primary};
  `,
  tertiary: (theme: DefaultTheme) => css`
    &:before {
      background: #fff;
    }
    &:after {
      background: ${theme.colors.primaryHover};
    }
    &:hover {
      color: #fff;
    }
    color: ${theme.colors.primary};
  `,
};

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: ${(props) => `${props.width}px`};
  padding: 1.6rem;

  font-size: 1.8rem;
  font-weight: bold;
  position: relative;
  overflow: hidden;

  transition: all 0.235s ease-in-out;

  z-index: 1;

  ${({ theme, variant }) => css`
    ${ButtonVariants[variant](theme)}
  `}

  &:before {
    content: '';
    z-index: -2;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  &:after {
    content: '';
    position: absolute;
    z-index: -1;
    height: 100%;
    top: 0;
    transform: skew(50deg);
    transition: 0.285s ease-in;
    width: 140%;
    left: -160%;
  }

  &:hover {
    &:after {
      height: 100%;
      left: -20%;
    }
  }
`;
