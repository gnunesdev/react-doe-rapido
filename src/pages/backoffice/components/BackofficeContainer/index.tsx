import { Container } from './styles';
import { PageContainer } from '~/components/PageContainer';
import { Sidebar } from '~/components/Sidebar';

export const BackofficeContainer: React.FC<React.ComponentProps<'div'>> = ({ children }) => {
  return (
    <PageContainer>
      <Container>
        <Sidebar></Sidebar>
        {children}
      </Container>
    </PageContainer>
  );
};
