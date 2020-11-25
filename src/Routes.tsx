import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Container from './Components/Container';
import Header from './Components/Header';
import HomePage from './Pages/HomePage';
import MiningPage from './Pages/MiningPage';
import StakingPage from './Pages/StakingPage';

const Routes: React.FC = () => {
  return (
    <Router>
      <Container>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/staking" component={StakingPage} />
          <Route exact path="/mining" component={MiningPage} />
        </Switch>
      </Container>
    </Router>
  );
};

export default Routes;
