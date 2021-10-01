import { TitleStyled } from './styles';

interface TitleProps {
  size: 'big' | 'medium' | 'small';
  description: string;
}

export function Title({ size, description }: TitleProps) {
  return <TitleStyled size={size}>{description}</TitleStyled>;
}
