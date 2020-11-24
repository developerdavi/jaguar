import React, { useEffect } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';

import './Assets/App.css';
import Routes from './Routes';
import WalletWarning from './Components/WalletWaning';
import Wallet from './Components/Wallet';
import loadEverything from './Helpers/LoadEverything';

function App(): React.ReactElement {
  const web3Enabled = useSelector((x: RootStateOrAny) => x.web3Enabled);

  useEffect(() => {
    if (window.ethereum) {
      loadEverything();
    } else {
      alert('Failed to connect to web3');
    }
  }, []);

  return (
    <>
      {web3Enabled ? <Wallet /> : <WalletWarning />}
      <Routes />
    </>
  );
}

export default App;
