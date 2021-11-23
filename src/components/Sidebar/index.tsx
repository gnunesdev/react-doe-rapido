import { toast } from 'react-toastify';

import { Link } from '../Link';
import { LinksSection, SidebarContainer, Overlay, SidebarVolume } from './styles';
import Modal from '~/components/Modal';
import { signOut } from '~/context/useAuth';
import { UserWithImage } from '~/context/useUser';
import { useMinWidth } from '~/hooks/useMinWidth';
import { useSidebarContext } from '~/hooks/useSidebarState';
import { Breakpoint } from '~/styles/variables';

export interface InnerSidebarProps {
  isCollapsed: boolean;
  user: UserWithImage;
}

interface SideBarProps {
  user: UserWithImage;
}

export function Sidebar({ user }: SideBarProps) {
  const minWidth = useMinWidth();
  const { isCollapsed, toggleCollapsed } = useSidebarContext();
  return (
    <>
      {minWidth(Breakpoint.large) && <SidebarVolume />}
      <Modal>
        <InnerSidebar isCollapsed={!minWidth(Breakpoint.large) && isCollapsed} user={user} />
        {!minWidth(Breakpoint.large) && !isCollapsed && (
          <Overlay onClick={toggleCollapsed} />
        )}
      </Modal>
    </>
  );
}

const InnerSidebar: React.VFC<InnerSidebarProps> = ({ isCollapsed, user }) => {
  function handleCopyLink() {
    navigator.clipboard.writeText(
      `${location.origin}/search/map?id=${user.companyId}&drawerId=${user.companyId}`
    );
    toast.info('Link copiado para área de transferência');
  }

  return (
    <SidebarContainer isCollapsed={isCollapsed}>
      <LinksSection>
        <h3>Cadastros</h3>
        <ul>
          <li>
            <Link label="Editar instituição" href="/backoffice/edit-company"></Link>
          </li>
          <li>
            <Link label="Editar contato" href="/backoffice/edit-contact"></Link>
          </li>
        </ul>
      </LinksSection>
      <LinksSection>
        <h3>Úteis</h3>
        <ul>
          <li>
            <Link
              href={`/search/map?id=${user.companyId}&drawerId=${user.companyId}`}
              target="_blank"
              label="Acessar instituição no mapa"
            />
          </li>
          <li>
            <Link
              handleClick={handleCopyLink}
              target="_blank"
              label="Compartilhar instituição"
              isButton={true}
            />
          </li>
          <li>
            <Link
              href="mailto:doe.rapido@gmail.com?subject=Doação"
              target="_blank"
              label="Entre em contato conosco"
            />
          </li>
        </ul>
      </LinksSection>
      <LinksSection>
        <h3>Sistema</h3>
        <ul>
          <Link label="Sair da aplicação" isButton={true} handleClick={signOut} />
        </ul>
      </LinksSection>
    </SidebarContainer>
  );
};
