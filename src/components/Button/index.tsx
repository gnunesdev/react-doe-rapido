import { ButtonContainer } from './styles';

interface ButtonProps {
  description: string;
  onClick?: VoidFunction;
}

export const Button: React.VFC<React.ComponentProps<'button'> & ButtonProps> =
  ({ description, onClick, ...props }) => {
    return (
      <ButtonContainer>
        <button onClick={onClick} {...props}>
          {description}
        </button>
      </ButtonContainer>
    );
  };
