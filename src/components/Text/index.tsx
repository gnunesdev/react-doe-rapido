import { TextStyled } from './styles';

interface TextProps {
  description: string;
  fontSize: string;
  color: string;
}

export const Text: React.FC<TextProps> = ({ description, fontSize, color }) => {
  return (
    <TextStyled fontSize={fontSize} color={color}>
      {description}
    </TextStyled>
  );
};
