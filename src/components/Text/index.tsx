import { TextStyled } from './styles';

interface TextProps {
  description: string;
  fontSize: string;
  color?: string;
  isBold?: boolean;
}

export const Text: React.VFC<TextProps> = ({ description, fontSize, color, isBold }) => {
  return (
    <TextStyled fontSize={fontSize} color={color} isBold={isBold}>
      {description}
    </TextStyled>
  );
};
