import styled from 'styled-components';

interface CheckboxContainerProps {
  size: 'big' | 'medium';
  hasError: boolean;
}

export const CheckboxContainer = styled.div<CheckboxContainerProps>`
  display: flex;
  align-items: center;

  input {
    color: ${(props) => props.theme.colors.primary};
    border: 1px solid;
    padding: 0 0.7rem;

    transition: all 0.175s ease-in;
    margin-right: 0.6rem;

    border-color: ${(props) =>
      props.hasError ? props.theme.colors.red : props.theme.colors.primary};
  }

  label {
    cursor: pointer;
    color: ${(props) => props.theme.colors.primary};
    font-size: ${(props) => {
      switch (props.size) {
        case 'big':
          return '2.4rem';
        case 'medium':
          return '1.8rem';
      }
    }};
    font-weight: bold;
  }

  span {
    color: ${(props) => props.theme.colors.red};
    font-size: 1.2rem;
    display: block;
    margin-top: 0.6rem;
  }
`;
