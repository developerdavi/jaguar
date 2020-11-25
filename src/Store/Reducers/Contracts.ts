import { Reducer } from 'redux';
import { Contract } from 'web3-eth-contract';

const jaguarToken: Reducer = (state: Contract, action) => {
  switch (action.type) {
    case 'SET_JAGUAR_TOKEN':
      return action.contract;
    default:
      return state || {};
  }
};

const ethStaking: Reducer = (state: Contract, action) => {
  switch (action.type) {
    case 'SET_ETH_STAKING_TOKEN':
      return action.contract;
    default:
      return state || {};
  }
};

export default {
  jaguarToken,
  ethStaking
};
