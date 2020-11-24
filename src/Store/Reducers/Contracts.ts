import { Reducer } from 'redux';
import { Contract } from 'web3-eth-contract';

const kseedToken: Reducer = (state: Contract, action) => {
  switch (action.type) {
    case 'SET_KSEED_TOKEN':
      return action.contract;
    default:
      return state || {};
  }
};

const jaguarToken: Reducer = (state: Contract, action) => {
  switch (action.type) {
    case 'SET_JAGUAR_TOKEN':
      return action.contract;
    default:
      return state || {};
  }
};

const kseedStaking: Reducer = (state: Contract, action) => {
  switch (action.type) {
    case 'SET_KSEED_STAKING_TOKEN':
      return action.contract;
    default:
      return state || {};
  }
};

const ethStaking: Reducer = (state: Contract, action) => {
  switch (action.type) {
    case 'SET_KSEED_TOKEN':
      return action.contract;
    default:
      return state || {};
  }
};

export default {
  kseedToken,
  jaguarToken,
  kseedStaking,
  ethStaking
};
