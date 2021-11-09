import styled from 'styled-components';

import { InputContainer } from '~/components/Input/styles';
import { SelectContainer } from '~/components/Select/styles';
import { small } from '~/styles/variables';

export const CompanyFirstFormContainer = styled.div`
  max-width: 1140px;
  width: 100%;
`;

export const CompanyFirstFormStyled = styled.form`
  margin-top: 2rem;
`;

export const InputRow = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2.4rem;

  ${InputContainer}, ${SelectContainer} {
    &:not(:first-child) {
      margin-top: 24px;
    }
  }

  @media (min-width: ${small}) {
    flex-direction: row;
    ${InputContainer}, ${SelectContainer} {
      flex: 1;
      &:not(:first-child) {
        margin-top: 0;
        margin-left: 16px;
      }
    }
  }
`;

export const ButtonsContainer = styled.div`
  margin-top: 3rem;
`;
