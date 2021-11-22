import { LinkButton } from './styles';

interface LinkProps {
  isButton?: boolean;
  href?: string;
  label: string;
  handleClick?: VoidFunction;
}

export const Link: React.VFC<React.ComponentProps<'a'> & LinkProps> = ({
  isButton,
  href,
  label,
  handleClick,
  target = '_self',
}) => {
  return isButton ? (
    <LinkButton onClick={handleClick} type="button">
      {label}
    </LinkButton>
  ) : (
    <a href={href} target={target}>
      {label}
    </a>
  );
};
