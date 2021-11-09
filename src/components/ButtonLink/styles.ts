import NextLink, { LinkProps } from 'next/link';
import styled, { css, DefaultTheme } from 'styled-components';

interface ButtonContainerProps extends LinkProps {
  variant: 'primary' | 'secondary';
  width: number | 'auto';
}

const ButtonVariants = {
  primary: (theme: DefaultTheme) => css`
    background: ${theme.colors.primary};
    color: ${theme.foreground.primary};
  `,
  secondary: (theme: DefaultTheme) => css`
    background: ${theme.foreground.primary};
    color: ${theme.colors.primary};
    border: 1px solid ${theme.colors.primary};
  `,
};

export const Link = styled(NextLink)``;

export const ButtonContainer = styled.a<ButtonContainerProps>`
  width: ${(props) => `${props.width}px`};
  padding: 1.6rem;
  font-size: 1.8rem;
  font-weight: bold;
  transition: all 0.235s ease-in-out;
  text-align: center;

  ${({ theme, variant }) => css`
    ${ButtonVariants[variant](theme)}
  `}
`;
