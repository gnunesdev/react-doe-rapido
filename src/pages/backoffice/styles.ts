import styled from 'styled-components';

import { CardContainer } from './components/Card/styles';
import { small } from '~/styles/variables';

export const CardsContainer = styled.div`
  margin: 4rem auto 0;
  padding: 0 4rem 4rem;

  @media (min-width: ${small}) {
    padding: 0 4rem;
  }

  display: flex;
  flex-direction: column;
  align-items: center;

  ${CardContainer} {
    &:not(:first-child) {
      margin-top: 1.4rem;
    }
  }
`;
