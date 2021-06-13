import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';

export default function App() {
  return (
    <Router>
      <Route path="/" exact component={HomeScreen} />
    </Router>
  );
}
