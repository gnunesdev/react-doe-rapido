import { FaHandHoldingHeart, FaBars } from 'react-icons/fa';
import { useTheme } from 'styled-components';

import {
  HeaderContainer,
  Icon,
  Logo,
  Title,
  UserArea,
  UserIcon,
  UserName,
  HeaderVolume,
  Left,
  Menu,
} from './styles';
import { useSidebarContext } from '~/context/useSidebarState';
import { useAppSelector } from '~/hooks/redux';
import { useMinWidth } from '~/hooks/useMinWidth';
import { Breakpoint } from '~/styles/variables';

export function Header() {
  const { foreground } = useTheme();
  const { toggleCollapsed } = useSidebarContext();

  const user = useAppSelector((state) => state.user.value);
  const minWidth = useMinWidth();

  const handleCollapseSidebar = () => {
    toggleCollapsed();
  };

  return (
    <>
      <HeaderVolume />
      <HeaderContainer>
        <Left>
          {!minWidth(Breakpoint.large) && (
            <Menu onClick={handleCollapseSidebar}>
              <FaBars color={foreground.primary} size={24} />
            </Menu>
          )}
          <Logo>
            <Title>doe.rápido</Title>
            <Icon>
              <FaHandHoldingHeart color={foreground.primary} size={24} />
            </Icon>
          </Logo>
        </Left>

        <UserArea>
          {minWidth(Breakpoint.medium) && (
            <UserName>
              {(user && user.email) ||
                'Mestre Rato, Mestre Rato, Mestre Rato, Mestre Rato, Mestre Rato, Mestre Rato, Mestre Rato, Mestre Rato, Mestre Rato, Mestre Rato, Mestre Rato, Mestre Rato'}
            </UserName>
          )}
          <UserIcon src="https://i.pinimg.com/originals/b5/66/ea/b566eae21682bc79e1918c24149b2578.gif" />
        </UserArea>
      </HeaderContainer>
    </>
  );
}
