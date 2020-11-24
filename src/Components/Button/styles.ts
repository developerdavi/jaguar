import styled from 'styled-components';

interface IButton {
  active?: boolean;
  borderColor?: string;
}

export const Container = styled.button<IButton>`
  padding: 5px 15px;
  border-radius: 20px;
  color: ${props =>
    props.color
      ? props.color
      : !props.active
        ? props.theme.white
        : props.theme.primary};
  border-color: ${props => (props.color ? props.color : 'white')};
  background: ${props => (props.active ? props.theme.white : 'transparent')};
  border-width: 2px;
  border-style: solid;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.25s;
  font-size: 18px;
  :hover {
    ${props =>
    props.active
      ? `background: ${(props: {
            active: boolean;
            theme: { primary: string };
          }) => (props.active ? 'transparent' : props.theme.primary)};
      color: ${(props: { theme: { white: string } }) => props.theme.white};`
      : null}
  }
`;
