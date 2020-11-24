import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';

import App from './App';
import './Assets/index.css';
import theme from './Assets/Theme';
import store from './Store';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ethereum: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    __REDUX_DEVTOOLS_EXTENSION__: any;
  }
}

const Wrapper = styled.div`
  background-color: ${props => props.theme.primary};
  color: ${props => props.theme.white};
  width: 100%;
  height: 100%;
`;

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Wrapper>
        <Provider store={store}>
          <App />
        </Provider>
      </Wrapper>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
