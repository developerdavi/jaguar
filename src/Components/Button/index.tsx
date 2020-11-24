import React, { ReactElement } from 'react';

import { Container } from './styles';

const Button = ({
  active,
  onClick,
  color,
  children
}: {
  active?: boolean;
  onClick?:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
  children: string;
  color?: string;
}): ReactElement => {
  return (
    <Container onClick={onClick} active={active} color={color}>
      {children}
    </Container>
  );
};

export default Button;
