import Link from 'next/link';
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
  HeaderLeft,
  Menu,
} from './styles';
import { useUserContext } from '~/context/useUser';
import { useMinWidth } from '~/hooks/useMinWidth';
import { useSidebarContext } from '~/hooks/useSidebarState';
import { Breakpoint } from '~/styles/variables';

export function HeaderBackoffice() {
  const { foreground } = useTheme();
  const { toggleCollapsed } = useSidebarContext();

  const { user } = useUserContext();

  const minWidth = useMinWidth();

  const shouldRenderSidebarHidden = !minWidth(Breakpoint.large);

  const handleCollapseSidebar = () => {
    toggleCollapsed();
  };

  return (
    <>
      <HeaderVolume />
      <HeaderContainer>
        <HeaderLeft>
          {shouldRenderSidebarHidden && (
            <Menu onClick={handleCollapseSidebar}>
              <FaBars color={foreground.primary} size={24} />
            </Menu>
          )}
          <Link href="/">
            <Logo>
              <Title>doe.rápido</Title>
              <Icon>
                <FaHandHoldingHeart color={foreground.primary} size={24} />
              </Icon>
            </Logo>
          </Link>
        </HeaderLeft>

        <UserArea>
          {minWidth(Breakpoint.small) && <UserName>{user?.name}</UserName>}
          <UserIcon src="https://i.pinimg.com/originals/b5/66/ea/b566eae21682bc79e1918c24149b2578.gif" />
        </UserArea>
      </HeaderContainer>
    </>
  );
}
