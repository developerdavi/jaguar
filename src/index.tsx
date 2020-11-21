import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import 'dotenv/config';

import App from './App';
import './Assets/index.css';
import store from './Store';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface Window { ethereum: any; }
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
