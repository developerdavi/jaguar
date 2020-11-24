import styled from 'styled-components';

export const WarningContainer = styled.div`
  background-color: ${props => props.theme.white};
  color: ${props => props.theme.primary};
  padding: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  font-weight: 500;

  span {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  div *:not(last-of-type) {
    margin-right: 10px;
  }

  span:last-of-type {
    margin-right: 0px;
  }
`;
