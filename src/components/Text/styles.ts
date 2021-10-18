import styled from 'styled-components';

interface TextProps {
  fontSize: string;
  color?: string;
  isBold?: boolean;
}

export const TextStyled = styled.p<TextProps>`
  color: ${(props) => (props.color ? props.color : props.theme.colors.primary)};

  font-size: ${(props) => `${props.fontSize}rem`};
  font-weight: ${(props) => (props.isBold ? 'bold' : 'normal')};
`;
