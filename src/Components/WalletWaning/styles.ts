import styled from 'styled-components';

export const WarningContainer = styled.div`
  background-color: ${props => props.theme.white};
  color: ${props => props.theme.primary};
  padding: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  font-size: 18px;
  div {
    display: flex;
    flex: 1;
    justify-content: space-between;
    span {
      line-height: 32px;
      font-weight: 500;
    }
  }
`;
