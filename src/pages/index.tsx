import type { NextPage } from 'next';
import { useEffect } from 'react';

import Section1 from './components/section-1';
import Section2 from './components/section-2';
import Section3 from './components/section-3';
import { StyledPageContainer, Footer, FooterSection } from './styles';
import { useMinWidth } from '~/hooks/useMinWidth';
import { getCompanysToRenderInMap } from '~/services/map';
import { Breakpoint } from '~/styles/variables';

const Home: NextPage = () => {
  const minWidth = useMinWidth();

  return (
    <StyledPageContainer>
      <Section1></Section1>
      <Section2></Section2>
      <Section3></Section3>
      <Footer>
        <FooterSection>© Copyright 2021 doe.rápido</FooterSection>
        {minWidth(Breakpoint.small) && '\u00A0-\u00A0'}
        <FooterSection> Todos os direitos reservados</FooterSection>
      </Footer>
    </StyledPageContainer>
  );
};

export default Home;
