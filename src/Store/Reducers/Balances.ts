import { Reducer } from 'redux';

const DEFAULT_STATE = {
  eth: 0,
  jaguar: 0
};

const balances: Reducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case 'SET_BALANCES':
      return action.balances;
    default:
      return state;
  }
};

export default balances;
