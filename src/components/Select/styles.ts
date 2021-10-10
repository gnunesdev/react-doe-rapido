import styled from 'styled-components';

interface SelectContainerProps {
  size: 'big' | 'medium';
  hasError: boolean;
}

export const SelectContainer = styled.div<SelectContainerProps>`
  display: flex;
  flex-direction: column;

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

  select {
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

    padding: 0 0.4rem;

    transition: all 0.175s ease-in;
    width: 100%;
  }

  span {
    color: ${(props) => props.theme.colors.red};
    font-size: 1.2rem;
    display: block;
    margin-top: 0.6rem;
  }
`;
