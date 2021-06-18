import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import DashboardScreen from './screens/DashboardScreen';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomeScreen} />
        <Route path="/dashboard" exact component={DashboardScreen} />
        <Route
          path="/ask/@:name"
          exact
          component={({ match }) => <p>Ask {match.params.name}</p>}
        />
        <Route component={HomeScreen} />
      </Switch>
    </Router>
  );
}
