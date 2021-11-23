import styled from 'styled-components';

export const AddressSuggestionsContainer = styled.div`
  display: flex;
  flex-direction: column;

  border: 1px solid ${(props) => props.theme.colors.primary};
  border-top: none;
  border-bottom: none;

  position: absolute;
  width: 100%;
  top: 6.3rem;

  z-index: 2;

  li {
    background-color: #fff;
    padding: 1.2rem 1rem;

    font-size: 1.6rem;

    border-bottom: 1px solid ${(props) => props.theme.colors.primary};

    cursor: pointer;
  }
`;
