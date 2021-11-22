import { Container } from './styles';
import { HeaderBackoffice } from '~/components/HeaderBackoffice';
import { PageContainer } from '~/components/PageContainer';
import { Sidebar } from '~/components/Sidebar';
import { UserWithImage } from '~/context/useUser';
import { SidebarProvider } from '~/hooks/useSidebarState';

interface BackofficeContainerProps {
  user: UserWithImage;
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
          <Sidebar user={user}></Sidebar>
          {children}
        </Container>
      </SidebarProvider>
    </PageContainer>
  );
};
