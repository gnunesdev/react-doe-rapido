import { ButtonContainer } from './styles';

interface ButtonProps {
  description?: string;
  variant: 'primary' | 'secondary' | 'tertiary';
  width?: number | 'auto';
  type?: string;
  onClick?: VoidFunction;
  isLoading?: boolean;
}

export const Button: React.FC<React.ComponentProps<'button'> & ButtonProps> = ({
  description,
  onClick,
  variant,
  width = 200,
  type,
  children,
  isLoading,
}) => {
  return (
    <ButtonContainer variant={variant} width={width} onClick={onClick} type={type}>
      {isLoading ? (
        <img src="/loading.svg" alt="Carregando" />
      ) : description ? (
        description
      ) : (
        children
      )}
    </ButtonContainer>
  );
};
