import { Container } from './styles';
import { HeaderBackoffice } from '~/components/HeaderBackoffice';
import { PageContainer } from '~/components/PageContainer';
import { Sidebar } from '~/components/Sidebar';
import { User } from '~/context/useUser';
import { SidebarProvider } from '~/hooks/useSidebarState';

interface BackofficeContainerProps {
  user: User;
}

export const BackofficeContainer: React.FC<BackofficeContainerProps> = ({
  children,
  user,
}) => {
  return (
    <PageContainer>
      <SidebarProvider>
        <HeaderBackoffice user={user} />
        <Container>
          <Sidebar></Sidebar>
          {children}
        </Container>
      </SidebarProvider>
    </PageContainer>
  );
};
