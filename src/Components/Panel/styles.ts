import styled from 'styled-components';

export const PanelContainer = styled.div`
  border-radius: 20px;
  border: 2px solid white;
  padding: 30px;

  h3 {
    margin-top: 0;
    margin-bottom: 5px;
  }

  > div:not(:last-of-type) {
    margin-bottom: 15px;
  }

  input {
    margin-bottom: 15px;
  }
`;
