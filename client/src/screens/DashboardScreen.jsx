import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useState as useHookState } from '@hookstate/core';
import store from '../state/store';

export default function DashboardScreen({ history }) {
  const { userDetails } = useHookState(store);

  useEffect(() => {
    if (!userDetails.get()) {
      history.push('/');
    }
  }, [history, userDetails]);

  return (
    <>
      <Navbar page="dashboard" history={history} />
    </>
  );
}
