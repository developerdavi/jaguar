import { Reducer } from 'redux';

export interface IContracts {
  [key: string]: unknown;
  jaguarToken?: unknown;
  kseedToken?: unknown;
  kseedStakingContract?: unknown;
  ethStakingContract?: unknown;
}

const contracts: Reducer = (state: IContracts = {}, action) => {
  const name = action.name as string;
  switch (action.type) {
    case 'ADD_CONTRACT':
      state[name] = action.contract;
      return state;
    default:
      return state;
  }
};

export default contracts;
