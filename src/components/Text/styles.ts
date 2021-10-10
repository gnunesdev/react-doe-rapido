import styled from 'styled-components';

interface TextProps {
  fontSize: string;
  color: string;
}

export const TextStyled = styled.p<TextProps>`
  font-size: ${(props) => `${props.fontSize}rem`};
  color: ${(props) => props.color};
`;
