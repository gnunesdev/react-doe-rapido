import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  min-height: ${(props) => props.theme.containers.page};
  display: flex;
`;
