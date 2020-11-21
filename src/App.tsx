import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Web3 from 'web3';

import kseedToken from './Assets/artifacts/KSEEDToken.json';
import jaguarToken from './Assets/artifacts/JaguarToken.json';
import kseedStaking from './Assets/artifacts/KSEEDStakingContract.json';

import './Assets/App.css';
import Routes from './Routes';

function App(): React.ReactElement {
  const dispatch = useDispatch();

  useEffect(() => {
    if (window.ethereum) {
      const _web3: Web3 = new Web3(window.ethereum);
      dispatch({ type: 'SET_WEB3', web3: _web3 });
      dispatch({ type: 'SET_WEB3_ENABLED', web3Enabled: true });



      dispatch({ type: 'ADD_CONTRACT', name: 'kseedToken', contract: kseedToken });
      dispatch({ type: 'ADD_CONTRACT', name: 'jaguarToken', contract: jaguarToken });
      dispatch({ type: 'ADD_CONTRACT', name: 'kseedStaking', contract: kseedStaking });
    } else {
      alert('Failed to connect to web3');
    }
  }, []);

  return <Routes/>;
}

export default App;
