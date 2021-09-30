import { FaHandHoldingHeart } from 'react-icons/fa';

import { useTheme } from 'styled-components';

import { useAppSelector } from '~/hooks/redux';

import { HeaderContainer } from './styles';

export function Header() {
  const { colors } = useTheme();

  const user = useAppSelector((state) => state.user.value);

  return (
    <HeaderContainer>
      <h1>doe.rápido</h1>
      <FaHandHoldingHeart color={colors.white} size={24} />
      {user && <p>{user.email}</p>}
    </HeaderContainer>
  );
}
