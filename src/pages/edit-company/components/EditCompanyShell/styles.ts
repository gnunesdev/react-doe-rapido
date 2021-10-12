import styled from 'styled-components';

import { InputContainer } from '~/components/Input/styles';
import { SelectContainer } from '~/components/Select/styles';

export const Container = styled.div`
  padding: 48px 64px;
  max-width: 1140px;
  width: 100%;
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
