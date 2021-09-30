import { login, logout } from '~/features/user';
import { useAppDispatch } from '~/hooks/redux';

import { LinksSection, SidebarContainer } from './styles';

export function Sidebar() {
  const dispatch = useAppDispatch();

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
      <button
        onClick={() =>
          dispatch(login({ name: 'Guilheme', email: 'gnunesinf@gmail.com' }))
        }
      >
        Login teste
      </button>
      <button onClick={() => dispatch(logout())}>Logout</button>
    </SidebarContainer>
  );
}
