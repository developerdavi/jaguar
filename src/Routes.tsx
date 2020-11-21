import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './Pages/HomePage';

const Routes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={HomePage}/>
      </Switch>
    </Router>
  );
};

export default Routes;
