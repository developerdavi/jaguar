import styled from 'styled-components';

export const Block = styled.div`
  display: block;
  width: 100%;
`;

export const Logo = styled.img`
  display: block;
`;

export const Container = styled.div`
  padding: 30px;
`;

export const ButtonBar = styled.div`
  button:not(:last-child) {
    margin-right: 15px;
  }
`;
