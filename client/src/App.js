import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import DashboardScreen from './screens/DashboardScreen';
import AskUserScreen from './screens/AskUserScreen';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomeScreen} />
        <Route path="/dashboard" exact component={DashboardScreen} />
        <Route path="/ask/@:name" exact component={AskUserScreen} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}
