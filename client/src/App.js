import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import DashboardScreen from './screens/DashboardScreen';

export default function App() {
  return (
    <Router>
      <Route path="/" exact component={HomeScreen} />
      <Route path="/dashboard" exact component={DashboardScreen} />
    </Router>
  );
}
