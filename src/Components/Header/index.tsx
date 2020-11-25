import React from 'react';

import { Logo, Container, Block, ButtonBar } from './styles';

import logo from '../../Assets/jaguar.svg';
import Center from '../Center';
import Button from '../Button';
import { useHistory, useLocation } from 'react-router-dom';
import { Title } from '../Typography';

const Header: React.FC = () => {
  const location = useLocation();
  const history = useHistory();

  const handleClick = (path: string) => {
    return () => history.push(path);
  };

  return (
    <Container>
      <Block>
        <Center>
          <Logo src={logo} />
        </Center>
        <Center>
          <Title>Jaguars</Title>
        </Center>
        <Center>
          <ButtonBar>
            <Button
              onClick={handleClick('/')}
              active={location.pathname === '/'}
            >
              Home
            </Button>
            <Button
              onClick={handleClick('/staking')}
              active={location.pathname === '/staking'}
            >
              Stake
            </Button>
            <Button
              onClick={handleClick('/mining')}
              active={location.pathname === '/mining'}
            >
              Mine
            </Button>
          </ButtonBar>
        </Center>
      </Block>
    </Container>
  );
};

export default Header;
