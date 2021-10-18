import { TitleStyled } from './styles';

interface TitleProps {
  size: 'big' | 'medium' | 'small';
  description: string;
  color?: string;
}

export function Title({ size, description, color }: TitleProps) {
  return (
    <TitleStyled size={size} color={color}>
      {description}
    </TitleStyled>
  );
}
