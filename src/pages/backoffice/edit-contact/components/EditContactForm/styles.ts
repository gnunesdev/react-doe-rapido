import styled from 'styled-components';

import { InputContainer } from '~/components/Input/styles';
import { SelectContainer } from '~/components/Select/styles';

export const Container = styled.div`
  padding: 48px 64px;
  width: 100%;
  margin: 0 auto;
  max-width: 1140px;
`;

export const Form = styled.form`
  margin-top: 2rem;
`;

export const InputRow = styled.div`
  display: flex;
  margin-top: 2.4rem;

  &:first-child {
    ${InputContainer} {
      width: 100%;
    }
  }

  ${InputContainer}, ${SelectContainer} {
    width: 50%;

    &:not(:first-child) {
      margin-left: 14px;
    }
  }
`;
