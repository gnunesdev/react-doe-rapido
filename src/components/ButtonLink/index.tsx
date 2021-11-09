import { Link, ButtonContainer } from './styles';

interface ButtonProps {
  description: string;
  href: string;
  variant: 'primary' | 'secondary';
  width?: number | 'auto';
  onClick?: VoidFunction;
}

export const ButtonLink: React.FC<React.ComponentProps<'button'> & ButtonProps> = ({
  description,
  variant,
  width = 200,
  href,
}) => {
  return (
    <Link href={href} passHref>
      <ButtonContainer variant={variant} width={width} href={href}>
        {description}
      </ButtonContainer>
    </Link>
  );
};
