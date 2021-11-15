import Link from 'next/link';
import { FaHandHoldingHeart } from 'react-icons/fa';
import { useTheme } from 'styled-components';

import { HeaderContainer, Icon, Logo, Title, HeaderVolume, HeaderLeft } from './styles';

export function Header() {
  const { foreground } = useTheme();

  return (
    <>
      <HeaderVolume />
      <HeaderContainer>
        <HeaderLeft>
          <Link href="/">
            <Logo>
              <Title>doe.rápido</Title>
              <Icon>
                <FaHandHoldingHeart color={foreground.primary} size={24} />
              </Icon>
            </Logo>
          </Link>
        </HeaderLeft>
      </HeaderContainer>
    </>
  );
}
