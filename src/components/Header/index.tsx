import { FaHandHoldingHeart } from 'react-icons/fa';
import { useTheme } from 'styled-components';

import { HeaderContainer, Icon, Logo, Title, UserArea, UserIcon, UserName } from './styles';
import { useAppSelector } from '~/hooks/redux';

export function Header() {
  const { foreground } = useTheme();

  const user = useAppSelector((state) => state.user.value);

  return (
    <HeaderContainer>
      <Logo>
        <Title>doe.rápido</Title>
        <Icon>
          <FaHandHoldingHeart color={foreground.primary} size={24} />
        </Icon>
      </Logo>
      <UserArea>
        <UserName>{(user && user.email) || 'Mestre Rato'}</UserName>
        <UserIcon src="https://i.pinimg.com/originals/b5/66/ea/b566eae21682bc79e1918c24149b2578.gif" />
      </UserArea>
    </HeaderContainer>
  );
}
