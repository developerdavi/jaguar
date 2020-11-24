import { Reducer } from 'redux';

export type IAccounts = string[];

const accounts: Reducer = (state: IAccounts = [], action) => {
  switch (action.type) {
    case 'SET_ACCOUNTS':
      return action.accounts;
    default:
      return state;
  }
};

export default accounts;
