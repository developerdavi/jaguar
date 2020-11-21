import { Reducer } from 'redux';

const web3Reducer: Reducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_WEB3':
      return action.web3;
    default:
      return state;
  }
};

export default web3Reducer;
