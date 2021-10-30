import { LinkButton } from './styles';

interface LinkProps {
  isButton?: boolean;
  href?: string;
  label: string;
  handleClick?: VoidFunction;
}

export const Link: React.VFC<LinkProps> = ({ isButton, href, label, handleClick }) => {
  return isButton ? (
    <LinkButton onClick={handleClick}>{label}</LinkButton>
  ) : (
    <a href={href}>{label}</a>
  );
};
