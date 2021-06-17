import React, { useEffect } from 'react';
import { useState as useHookState } from '@hookstate/core';
import store from '../state/store';

export default function DashboardScreen({ history }) {
  const { userDetails } = useHookState(store);

  useEffect(() => {
    if (!userDetails.get()) {
      history.push('/');
    }
  }, [history, userDetails]);

  return <div>Dashboard Screen</div>;
}
