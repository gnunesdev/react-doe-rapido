import { Link } from '../Link';
import { LinksSection, SidebarContainer, Overlay, SidebarVolume } from './styles';
import Modal from '~/components/Modal';
import { signOut } from '~/context/useAuth';
import { useMinWidth } from '~/hooks/useMinWidth';
import { useSidebarContext } from '~/hooks/useSidebarState';
import { Breakpoint } from '~/styles/variables';

export interface InnerSidebarProps {
  isCollapsed: boolean;
}

const InnerSidebar: React.VFC<InnerSidebarProps> = ({ isCollapsed }) => {
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
          <li>Acessar instituição no app</li>
          <li>Compartilhar instituição</li>
          <li>Entre em contato conosco</li>
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

export function Sidebar() {
  const minWidth = useMinWidth();
  const { isCollapsed, toggleCollapsed } = useSidebarContext();
  return (
    <>
      {minWidth(Breakpoint.large) && <SidebarVolume />}
      <Modal>
        <InnerSidebar isCollapsed={!minWidth(Breakpoint.large) && isCollapsed} />
        {!minWidth(Breakpoint.large) && !isCollapsed && (
          <Overlay onClick={toggleCollapsed} />
        )}
      </Modal>
    </>
  );
}
