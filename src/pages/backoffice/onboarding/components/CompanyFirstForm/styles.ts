import styled from 'styled-components';

import { InputContainer } from '~/components/Input/styles';
import { SelectContainer } from '~/components/Select/styles';

export const CompanyFirstFormContainer = styled.div`
  max-width: 1140px;
  width: 100%;
`;

export const CompanyFirstFormStyled = styled.form`
  margin-top: 2rem;
`;

export const InputRow = styled.div`
  display: flex;
  margin-top: 2.4rem;

  ${InputContainer}, ${SelectContainer} {
    width: 50%;

    &:last-child {
      margin-left: 1.4rem;
    }
  }
`;

export const ButtonsContainer = styled.div`
  margin-top: 3rem;
`;
