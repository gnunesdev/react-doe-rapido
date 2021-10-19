import styled from 'styled-components';

import { CheckboxContainer } from '~/components/Checkbox/styles';
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

export const FiltersContainer = styled.div`
  margin-top: 1.4rem;

  ${CheckboxContainer} {
    &:not(:first-child) {
      margin-left: 1.2rem;
    }
  }

  > div {
    margin-top: 0.8rem;
    display: flex;
  }
`;
