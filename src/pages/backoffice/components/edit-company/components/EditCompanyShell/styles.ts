import styled from 'styled-components';

import { InputContainer } from '~/components/Input/styles';
import { SelectContainer } from '~/components/Select/styles';
import { TitleStyled } from '~/components/Title/styles';

export const Container = styled.div`
  flex: 1;
  padding: 48px 64px;
  max-width: 1140px;
`;

export const Form = styled.form`
  margin-top: 20px;
`;

export const InputRow = styled.div`
  display: flex;
  margin-top: 24px;

  ${InputContainer}, ${SelectContainer} {
    width: 50%;

    &:last-child {
      margin-left: 14px;
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
