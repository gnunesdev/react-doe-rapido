import styled from 'styled-components';

interface InputContainerProps {
  size: 'big' | 'medium';
  hasError: boolean;
}

export const InputContainer = styled.div<InputContainerProps>`
  display: flex;
  flex-direction: column;

  input {
    height: ${(props) => {
      switch (props.size) {
        case 'big':
          return '3.6rem';
        case 'medium':
          return '2.4rem';
      }
    }};
    font-size: ${(props) => {
      switch (props.size) {
        case 'big':
          return '1.8rem';
        case 'medium':
          return '2.4rem';
      }
    }};
    color: ${(props) => props.theme.colors.primary};
    border: 1px solid;
    border-color: ${(props) =>
      props.hasError ? props.theme.colors.red : props.theme.colors.primary};

    transition: all 0.175s ease-in;
  }

  label {
    color: ${(props) => props.theme.colors.primary};
    font-size: ${(props) => {
      switch (props.size) {
        case 'big':
          return '1.8rem';
        case 'medium':
          return '2.4rem';
      }
    }};
    font-weight: bold;
    margin-bottom: 0.6rem;
  }

  span {
    color: ${(props) => props.theme.colors.red};
    font-size: 1.2rem;
    display: block;
    margin-top: 0.6rem;
  }
`;
