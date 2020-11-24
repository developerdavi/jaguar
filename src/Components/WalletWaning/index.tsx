import React, { ReactElement } from 'react';
import theme from '../../Assets/Theme';
import loadEverything from '../../Helpers/LoadEverything';
import Button from '../Button';
import Container from '../Container';

import { WarningContainer } from './styles';

const WalletWarning = (): ReactElement => {
  const handleButtonClick = async () => {
    try {
      await window.ethereum.enable();
      loadEverything();
    } catch (error) {
      alert('Could not connect to wallet.');
    }
  };

  return (
    <WarningContainer>
      <Container>
        <span>Seems like you haven’t connected your wallet yet.</span>
        <Button onClick={handleButtonClick} color={theme.primary}>
          Connect
        </Button>
      </Container>
    </WarningContainer>
  );
};

export default WalletWarning;
