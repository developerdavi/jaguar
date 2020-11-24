import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Container from './Components/Container';
import Header from './Components/Header';
import HomePage from './Pages/HomePage';

const Routes: React.FC = () => {
  return (
    <Router>
      <Container>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
        </Switch>
      </Container>
    </Router>
  );
};

export default Routes;
