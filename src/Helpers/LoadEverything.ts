import Web3 from 'web3';

import store from '../Store';
import { AbiItem } from '../types';

import kseedToken from '../Assets/artifacts/KSEEDToken.json';
import jaguarToken from '../Assets/artifacts/JaguarToken.json';
import kseedStaking from '../Assets/artifacts/KSEEDStakingContract.json';

export default async function loadEverything(): Promise<void> {
  const web3: Web3 = new Web3(window.ethereum);
  store.dispatch({ type: 'SET_WEB3', web3 });

  const isEnabled = await window.ethereum._metamask.isEnabled();

  if (!isEnabled) {
    return;
  }

  const accounts = await web3.eth.getAccounts();
  store.dispatch({ type: 'SET_ACCOUNTS', accounts });
  store.dispatch({ type: 'SET_WEB3_ENABLED', web3Enabled: true });

  const addContract = (
    name: string,
    address: string | undefined,
    abi: unknown
  ) => {
    const contract = new web3.eth.Contract(abi as AbiItem, address);
    store.dispatch({ type: `SET_${name}`, contract });
  };

  addContract(
    'JAGUAR_TOKEN',
    process.env.REACT_APP_JAGUAR_TOKEN,
    jaguarToken.abi
  );
  addContract('KSEED_TOKEN', process.env.REACT_APP_KSEED_TOKEN, kseedToken.abi);
  addContract(
    'KSEED_STAKING_TOKEN',
    process.env.REACT_APP_KSEED_STAKING_TOKEN,
    kseedStaking.abi
  );
}
