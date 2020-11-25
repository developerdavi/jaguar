import styled from 'styled-components';

export const Title = styled.h1`
  font-size: 48px;
  margin-top: 10px;
`;

export const PageTitle = styled(Title)`
  font-size: 36px;
`;

export const Paragraph = styled.p`
  font-size: 18px;
  color: ${props => props.theme.white};
`;
