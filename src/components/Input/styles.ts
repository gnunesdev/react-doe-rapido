import styled from 'styled-components';

interface InputContainerProps {
  size: 'big' | 'medium';
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
  }
`;
