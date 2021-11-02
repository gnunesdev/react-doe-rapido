import { Container } from './styles';

export const PageContainer: React.FC<React.ComponentProps<'div'>> = ({ children }) => {
  return <Container>{children}</Container>;
};
