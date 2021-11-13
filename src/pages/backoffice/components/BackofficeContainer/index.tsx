import { Container } from './styles';
import { HeaderBackoffice } from '~/components/HeaderBackoffice';
import { PageContainer } from '~/components/PageContainer';
import { Sidebar } from '~/components/Sidebar';
import { SidebarProvider } from '~/hooks/useSidebarState';

export const BackofficeContainer: React.FC = ({ children }) => {
  return (
    <PageContainer>
      <SidebarProvider>
        <HeaderBackoffice />
        <Container>
          <Sidebar></Sidebar>
          {children}
        </Container>
      </SidebarProvider>
    </PageContainer>
  );
};
