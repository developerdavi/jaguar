import { Reducer } from 'redux';

const web3Enabled: Reducer = (state = false, action) => {
  switch (action.type) {
    case 'SET_WEB3_ENABLED':
      return action.web3Enabled;
    default:
      return state;
  }
};

export default web3Enabled;
