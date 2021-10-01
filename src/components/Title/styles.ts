import styled from 'styled-components';

interface TitleStyledProps {
  size: 'big' | 'medium' | 'small';
}

export const TitleStyled = styled.h3<TitleStyledProps>`
  font-size: ${(props) => {
    switch (props.size) {
      case 'big':
        return '3.6rem';
      case 'medium':
        return '2.4rem';
      case 'small':
        return '1.8rem';
    }
  }};

  color: ${(props) => props.theme.colors.primary};
`;
