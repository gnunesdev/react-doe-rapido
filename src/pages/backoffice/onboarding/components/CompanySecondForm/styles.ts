import styled from 'styled-components';

import { InputContainer } from '~/components/Input/styles';
import { TextStyled } from '~/components/Text/styles';
import { TitleStyled } from '~/components/Title/styles';

export const CompanySecondFormContainer = styled.div`
  max-width: 1140px;
  width: 100%;
`;

export const CompanySecondFormStyled = styled.form`
  margin-top: 2rem;
`;

export const InputRow = styled.div`
  display: flex;
  margin-top: 1.4rem;

  ${InputContainer} {
    width: 50%;

    &:last-child {
      margin-left: 1.4rem;
    }
  }
`;

export const NeedsContainer = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 2.4rem;

  ${TitleStyled}, ${TextStyled} {
    margin-bottom: 0.4rem;
  }
`;

export const TermsContainer = styled.div`
  margin-top: 2.4rem;

  ${TitleStyled}, ${TextStyled} {
    margin-bottom: 0.4rem;
  }
`;

export const ButtonsContainer = styled.div`
  margin-top: 3rem;
`;
