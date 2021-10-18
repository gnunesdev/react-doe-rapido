import styled from 'styled-components';

import { LinkButton } from '~/components/Link/styles';

export const AppContainer = styled.div`
  max-width: 1280px;
  width: 100%;

  margin: 0 auto;
  padding-top: 6rem;
`;

export const SearchBar = styled.div`
  margin-top: 2rem;

  position: relative;

  ${LinkButton} {
    margin-top: 1rem;
  }
`;
