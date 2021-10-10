import styled from 'styled-components';

export const UploadImageContainer = styled.div`
  display: flex;
  flex-direction: column;

  span {
    color: ${(props) => props.theme.colors.primary};
    font-size: 1.8rem;
    font-weight: bold;
    margin-bottom: 0.6rem;
  }

  input {
    display: none;
  }
`;
