import { LinksSection, SidebarContainer } from './styles';

export function Sidebar() {
  return (
    <SidebarContainer>
      <LinksSection>
        <h3>Cadastros</h3>
        <ul>
          <li>Editar instituição</li>
          <li>Editar contato</li>
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
}
