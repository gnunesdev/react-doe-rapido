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

export const SelectedImage = styled.div`
  display: flex;
  align-items: center;

  .image {
    max-height: 42px;
  }

  .name {
    margin-left: 12px;
    color: #666666;
    font-size: 1.6rem;
    line-height: 1.9rem;
  }

  .close {
    margin-left: 4px;
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
