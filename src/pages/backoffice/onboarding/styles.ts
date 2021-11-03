import styled from 'styled-components';

import { medium } from '~/styles/variables';

export const OnboardingContainer = styled.div`
  padding: 32px 24px;
  min-height: ${(props) => props.theme.containers.page};
  display: flex;
  justify-content: center;
  @media (min-width: ${medium}) {
    align-items: center;
  }
`;
