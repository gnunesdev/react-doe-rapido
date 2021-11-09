import { Link } from '../Link';
import { LinksSection, SidebarContainer, Overlay, SidebarVolume } from './styles';
import Modal from '~/components/Modal';
import { useSidebarContext } from '~/context/useSidebarState';
import { useMinWidth } from '~/hooks/useMinWidth';
import { Breakpoint } from '~/styles/variables';

export interface InnerSidebarProps {
  isCollapsed: boolean;
}

const InnerSidebar: React.FC<InnerSidebarProps> = ({ isCollapsed }) => {
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
