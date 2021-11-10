import styled from 'styled-components';

export interface IconProps {
  size: number;
}

export const StepContainer = styled.div``;

export const Icon = styled.div<IconProps>`
  margin: 0 auto;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

export const StepDescription = styled.div`
  margin-top: 8px;
  font-size: 2.6rem;
  font-weight: bold;
  text-align: center;
  color: ${(props) => props.theme.colors.primary};
`;
