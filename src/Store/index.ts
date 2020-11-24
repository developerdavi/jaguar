import * as redux from 'redux';

import accounts from './Reducers/Accounts';
import balances from './Reducers/Balances';
import contracts from './Reducers/Contracts';
import web3Reducer from './Reducers/Web3';
import web3Enabled from './Reducers/Web3Enabled';

const reducers = redux.combineReducers({
  web3: web3Reducer,
  web3Enabled: web3Enabled,
  accounts: accounts,
  balances: balances,
  ...contracts
});

const store = redux.createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
