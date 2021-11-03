import styled from 'styled-components';

import { InputContainer } from '~/components/Input/styles';
import { SelectContainer } from '~/components/Select/styles';
import { medium } from '~/styles/variables';

export const Container = styled.div`
  padding: 32px 24px;
  width: 100%;
  margin: 0 auto;
  max-width: 1140px;
  @media (min-width: ${medium}) {
    padding: 48px 64px;
  }
`;

export const Form = styled.form`
  margin-top: 2rem;
`;

export const InputRow = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 24px;

  &:first-child {
    ${InputContainer} {
      width: 100%;
    }
  }

  ${InputContainer}, ${SelectContainer} {
    &:not(:first-child) {
      margin-top: 24px;
    }
  }

  @media (min-width: ${medium}) {
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
