import styled from 'styled-components';

export const CardContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  background-color: ${(props) => props.theme.colors.primary};
  padding: 2rem;
  border-radius: 24px;
  /* border: 4px solid ${(props) => props.theme.colors.primary}; */

  .icon {
    background-color: #fff;
    padding: 2rem;
    border-radius: 50%;
  }

  .content {
    margin-left: 2rem;

    h4 {
      font-size: 2.4rem;
      color: #fff;
    }

    p {
      font-size: 1.8rem;
      display: block;
      margin-bottom: 2rem;
      color: #fff;
    }
  }
`;
