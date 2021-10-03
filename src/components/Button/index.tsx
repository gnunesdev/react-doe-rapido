import { ButtonContainer } from './styles';

interface ButtonProps {
  description?: string;
  variant: 'primary' | 'secondary';
  width?: number;
  type?: string;
  onClick?: VoidFunction;
}

export const Button: React.FC<React.ComponentProps<'button'> & ButtonProps> = ({
  description,
  onClick,
  variant,
  width = 200,
  type,
  children,
}) => {
  return (
    <ButtonContainer
      variant={variant}
      width={width}
      onClick={onClick}
      type={type}
    >
      {description ? description : children}
    </ButtonContainer>
  );
};
