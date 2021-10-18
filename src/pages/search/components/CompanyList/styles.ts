import styled from 'styled-components';

import { ButtonContainer } from '~/components/Button/styles';

export const CompanyListContainer = styled.div`
  margin-top: 3rem;

  li {
    margin-top: 1.4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:not(:last-child) {
      border-bottom: 1px solid ${(props) => props.theme.colors.primary};
    }

    strong {
      font-size: 1.8rem;
    }

    p {
      font-size: 1.6rem;
      margin-top: 0.4rem;
    }

    span {
      display: block;
      font-weight: bold;
      font-size: 1.6rem;
      margin-top: 1rem;
      margin-bottom: 1.4rem;
    }

    ${ButtonContainer} {
      margin-bottom: rem;
    }
  }
`;
