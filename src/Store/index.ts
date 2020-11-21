import * as redux from 'redux';
import contracts from './Reducers/Contracts';

import web3Reducer from './Reducers/Web3';
import web3Enabled from './Reducers/Web3Enabled';

const reducers = redux.combineReducers({
  web3: web3Reducer,
  web3Enabled: web3Enabled,
  contracts: contracts
});

const store = redux.createStore(reducers);

export default store;
