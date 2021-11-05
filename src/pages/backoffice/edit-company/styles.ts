import styled from 'styled-components';

import { InputContainer } from '~/components/Input/styles';
import { SelectContainer } from '~/components/Select/styles';
import { TitleStyled } from '~/components/Title/styles';
import { large } from '~/styles/variables';

export const Container = styled.div`
  padding: 48px 64px;
  width: 90%;
  margin: 0 auto;
`;

export const Form = styled.form`
  margin-top: 20px;
`;

export const InputRow = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 24px;

  ${InputContainer}, ${SelectContainer} {
    &:not(:first-child) {
      margin-top: 24px;
    }
  }

  @media (min-width: ${large}) {
    flex-direction: row;
    ${InputContainer}, ${SelectContainer} {
      flex: 1;
      &:not(:first-child) {
        margin-top: 0;
        margin-left: 14px;
      }
    }
  }
`;

export const ButtonsContainer = styled.div`
  margin-top: 3rem;
`;

export const NeedsContainer = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 2.4rem;

  ${TitleStyled} {
    margin-bottom: 1rem;
  }
`;
