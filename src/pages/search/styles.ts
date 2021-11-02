import styled from 'styled-components';

import { CheckboxContainer } from '~/components/Checkbox/styles';
import { LinkButton } from '~/components/Link/styles';
import { medium } from '~/styles/variables';

export interface SearchContainerProps {
  showingResults: boolean;
}

export const SearchContainer = styled.div<SearchContainerProps>`
  width: 100%;
  min-height: ${(props) => props.theme.containers.page};
  padding: 16px 32px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  @media (min-width: ${medium}) {
    padding-top: ${(props) => (props.showingResults ? '32px' : '30vh')};
  }
`;

export const SearchContent = styled.div`
  width: 100%;
  @media (min-width: ${medium}) {
    max-width: 1280px;
  }
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
`;

export const Filters = styled.div`
  overflow: auto;
  margin-top: 0.8rem;
  display: flex;
  ${CheckboxContainer} {
    &:not(:first-child) {
      margin-left: 1.2rem;
    }
    label {
      white-space: nowrap;
    }
  }
`;
