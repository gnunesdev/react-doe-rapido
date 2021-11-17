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
import { UserWithImage } from '~/context/useUser';
import { useMinWidth } from '~/hooks/useMinWidth';
import { useSidebarContext } from '~/hooks/useSidebarState';
import { Breakpoint } from '~/styles/variables';

interface HeaderBackofficeProps {
  user: UserWithImage;
}

export function HeaderBackoffice({ user }: HeaderBackofficeProps) {
  const { foreground } = useTheme();
  const { toggleCollapsed } = useSidebarContext();

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
          {minWidth(Breakpoint.small) && <UserName>{user.name}</UserName>}
          {user.image && <UserIcon src={user.image} />}
        </UserArea>
      </HeaderContainer>
    </>
  );
}
