import styled from 'styled-components';

export const HeaderContainer = styled.header`
  width: 100%;
  height: 62px;
  padding: 0 24px;
  background: ${(props) => props.theme.colors.primary};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
`;

export const Title = styled.h1`
  ${(props) => props.theme.typography.headline}
  color: ${(props) => props.theme.foreground.primary};
`;

export const Icon = styled.div`
  margin-left: 8px;
`;

export const UserArea = styled.div`
  display: flex;
  align-items: center;
`;

export const UserName = styled.div`
  ${(props) => props.theme.typography.body2}
  color: ${(props) => props.theme.foreground.primary};
`;

export const UserIcon = styled.div`
  margin-left: 24px;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-color: orange;
`;
